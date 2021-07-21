import declinationByNumber from '../../js/helpers/declinationByNumber';

class ItemsCounter {
  constructor(element) {
    this.elem = element;
    this.clearBtn = this.getClearBtn();
    this.applyBtn = this.getApplyBtn();
    this.itemElems = this.getItemElems();
    this.countingItemInstances = this._getCountingItemInstances();
    this.wordForValueTextReplacing = JSON.parse(this.elem.dataset.replaceText);
    this.itemIndexForSeparateCount = JSON.parse(this.elem.dataset.separateItem);
    this.clearBtnDisabledClass = 'items-counter__clear-button_disabled';

    this._handleApplyBtnClick = this._handleApplyBtnClick.bind(this);
    this._handleClearBtnClick = this._handleClearBtnClick.bind(this);

    this._addListenersToButtons();

    this._updateClearButton();

    this.observers = [];
    this._subscribeToItems();

    this._addToJqueryData();
  }

  update(action) {
    if (action.type === 'UPDATE_VALUE') {
      if (this._isWithoutButtons()) {
        this._updateClearButton();
        this._notify({
          type: 'UPDATE_VALUE',
          value: this.getValues(),
          valueText: this._convertValuesToText(),
        });
      }
    }
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  getValues() {
    const values = [];

    this.countingItemInstances.forEach((inst) => {
      const value = inst.getValue();
      values.push(value);
    });

    return values;
  }

  getClearBtn() {
    const clearBtnSelector = '.js-items-counter__clear-button';
    return this.elem.querySelector(clearBtnSelector);
  }

  getApplyBtn() {
    const applyBtnSelector = '.js-items-counter__apply-button';
    return this.elem.querySelector(applyBtnSelector);
  }

  getItemElems() {
    const itemSelector = '.js-counting-item';
    return this.elem.querySelectorAll(itemSelector);
  }

  _notify(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }

  _addToJqueryData() {
    if ($) {
      $(this.elem).data({
        instance: this,
      });
    }
  }

  _getCountingItemInstances() {
    const instances = [];

    this.itemElems.forEach((elem) => {
      instances.push($(elem).data('instance'));
    });

    return instances;
  }

  _subscribeToItems() {
    this.countingItemInstances.forEach((inst) => {
      inst.subscribe(this);
    });
  }

  _updateClearButton() {
    let valuesSum = 0;
    this.getValues().forEach((val) => {
      valuesSum += val;
    });
    if (valuesSum === 0) {
      this.clearBtn.classList.add(this.clearBtnDisabledClass);
    } else {
      this.clearBtn.classList.remove(this.clearBtnDisabledClass);
    }
  }

  _isWithoutButtons() {
    const withoutButtonsClass = 'items-counter_without-buttons';
    return this.elem.classList.contains(withoutButtonsClass);
  }

  _convertValuesToText() {
    let fullText = '';
    if (this.wordForValueTextReplacing) {
      if (this.itemIndexForSeparateCount !== null) {
        let valuesSumWithoutSeparateItem = 0;
        this.countingItemInstances.forEach((inst, index) => {
          if (index !== this.itemIndexForSeparateCount) {
            valuesSumWithoutSeparateItem += inst.getValue();
          }
        });

        let word = this.wordForValueTextReplacing;
        if (Array.isArray(this.wordForValueTextReplacing)) {
          word = declinationByNumber(
            valuesSumWithoutSeparateItem, this.wordForValueTextReplacing,
          );
        }

        const separateItem = this.countingItemInstances[this.itemIndexForSeparateCount];

        if (valuesSumWithoutSeparateItem) {
          fullText = `${valuesSumWithoutSeparateItem} ${word}`;
          if (separateItem.getValue()) {
            fullText += `, ${separateItem.getValueText()}`;
          }
        } else if (separateItem.getValue()) {
          fullText += separateItem.getValueText();
        }
      } else {
        let valuesSum = 0;
        this.countingItemInstances.forEach((inst) => {
          valuesSum += inst.getValue();
        });

        let word = this.wordForValueTextReplacing;
        if (Array.isArray(this.wordForValueTextReplacing)) {
          word = declinationByNumber(
            valuesSum, this.wordForValueTextReplacing,
          );
        }

        if (valuesSum !== 0) {
          fullText += `${valuesSum} ${word}`;
        }
      }
    } else {
      const maxItemsNumInText = 2;
      const textsList = [];
      this.countingItemInstances.forEach((inst) => {
        if (inst.getValueText() !== '') {
          textsList.push(inst.getValueText());
        }
      });
      textsList.forEach((text, index) => {
        if (index !== 0) {
          if (index < maxItemsNumInText) {
            fullText += ', ';
          }
        }
        if (index < maxItemsNumInText) {
          fullText += text;
        }
        if (index === maxItemsNumInText - 1) {
          fullText += '...';
        }
      });
    }
    return fullText;
  }

  _addListenersToButtons() {
    this.clearBtn.addEventListener('click', this._handleClearBtnClick);
    this.applyBtn.addEventListener('click', this._handleApplyBtnClick);
  }

  _handleClearBtnClick() {
    this.countingItemInstances.forEach((inst) => {
      inst.setValue(0);
    });
    this._updateClearButton();
    this._notify({
      type: 'CLICK_CLEAR-BUTTON',
      value: this.getValues(),
      valueText: this._convertValuesToText(),
    });
  }

  _handleApplyBtnClick() {
    this._updateClearButton();
    this._notify({
      type: 'CLICK_APPLY-BUTTON',
      value: this.getValues(),
      valueText: this._convertValuesToText(),
    });
  }
}

export default ItemsCounter;
