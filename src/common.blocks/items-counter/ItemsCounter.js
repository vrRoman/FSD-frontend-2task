import autoBind from 'auto-bind';

import declinationByNumber from '@/js/helpers/declinationByNumber';
import Observable from '@/js/Observable/Observable';

class ItemsCounter extends Observable {
  constructor(element) {
    super();
    autoBind(this);

    this.elem = element;
    this.clearBtn = null;
    this.applyBtn = null;
    this.itemElems = null;
    this.countingItemInstances = null;
    this.wordForValueTextReplacing = null;
    this.itemIndexForSeparateCount = null;
    this.clearBtnDisabledClass = 'items-counter__clear-button_disabled';
  }

  init() {
    this.clearBtn = this.getClearBtn();
    this.applyBtn = this.getApplyBtn();
    this.itemElems = this.getItemElems();
    this.countingItemInstances = this.getCountingItemInstances();
    this.wordForValueTextReplacing = JSON.parse(this.elem.dataset.replaceText);
    this.itemIndexForSeparateCount = JSON.parse(this.elem.dataset.separateItem);

    this._addListenersToButtons();
    this._updateClearButton();
    this._subscribeToItems();
    this.addToJqueryData(this.elem);
  }

  update(action) {
    if (action.type === 'UPDATE_VALUE') {
      this._updateClearButton();
      this.notify({
        type: 'UPDATE_VALUE',
        value: this.getValues(),
        valueText: this._convertValuesToText(),
      });
    }
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

  getCountingItemInstances() {
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
      const textsList = [];
      this.countingItemInstances.forEach((inst) => {
        if (inst.getValueText() !== '') {
          textsList.push(inst.getValueText());
        }
      });
      textsList.forEach((text, index) => {
        if (index !== 0) {
          fullText += ', ';
        }
        fullText += text;
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
    this.notify({
      type: 'CLICK_CLEAR-BUTTON',
      value: this.getValues(),
      valueText: this._convertValuesToText(),
    });
  }

  _handleApplyBtnClick() {
    this._updateClearButton();
    this.notify({
      type: 'CLICK_APPLY-BUTTON',
      value: this.getValues(),
      valueText: this._convertValuesToText(),
    });
  }
}

export default ItemsCounter;
