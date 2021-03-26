import CountingItem from '@/common.blocks/counting-item/counting-item';

class ItemsCounter {
  constructor(element) {
    this.elem = element;
    this.clearBtn = this.getClearBtn();
    this.applyBtn = this.getApplyBtn();
    this.itemElems = this.getItemElems();
    this.countingItemInstances = this.getCountingItemInstances();
    this.wordForValueTextReplacing = JSON.parse(this.elem.dataset.replaceText);
    this.itemIndexForSeparateCount = JSON.parse(this.elem.dataset.separateItem);
    this.clearBtnDisabledClass = 'items-counter__clear-button_disabled';

    this.handleApplyBtnClick = this.handleApplyBtnClick.bind(this);
    this.handleClearBtnClick = this.handleClearBtnClick.bind(this);

    this.addListenersToButtons();

    this.updateClearButton();

    this.observers = [];
    this.subscribeToItems();

    this.addToJqueryData();
  }

  addToJqueryData() {
    if ($) {
      $(this.elem).data({
        instance: this,
      });
    }
  }

  notify(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }

  update(action) {
    if (action.type === 'UPDATE_VALUE') {
      if (this.isWithoutButtons()) {
        this.updateClearButton();
        this.notify({
          type: 'UPDATE_VALUE',
          value: this.getValues(),
          valueText: this.convertValuesToText(),
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

  isWithoutButtons() {
    const withoutButtonsClass = 'items-counter_without-buttons';
    return this.elem.classList.contains(withoutButtonsClass);
  }

  updateClearButton() {
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

  handleClearBtnClick() {
    this.countingItemInstances.forEach((inst) => {
      inst.setValue(0);
    });
    this.updateClearButton();
    this.notify({
      type: 'CLICK_CLEAR-BUTTON',
      value: this.getValues(),
      valueText: this.convertValuesToText(),
    });
  }

  handleApplyBtnClick() {
    this.updateClearButton();
    this.notify({
      type: 'CLICK_APPLY-BUTTON',
      value: this.getValues(),
      valueText: this.convertValuesToText(),
    });
  }

  convertValuesToText() {
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
          word = CountingItem.declinationByNumber(
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
          word = CountingItem.declinationByNumber(
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

  addListenersToButtons() {
    this.clearBtn.addEventListener('click', this.handleClearBtnClick);
    this.applyBtn.addEventListener('click', this.handleApplyBtnClick);
  }

  getCountingItemInstances() {
    const instances = [];

    this.itemElems.forEach((elem) => {
      instances.push($(elem).data('instance'));
    });

    return instances;
  }

  subscribeToItems() {
    this.countingItemInstances.forEach((inst) => {
      inst.subscribe(this);
    });
  }
}

export default ItemsCounter;
