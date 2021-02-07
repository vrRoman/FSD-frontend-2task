import CountingItem from '@common.blocks/counting-item/counting-item';

class ItemsCounter {
  constructor(elem, wordToValueTextReplace = false) {
    this.elem = elem;
    this.clearBtn = this.getClearBtn();
    this.applyBtn = this.getApplyBtn();
    this.itemElems = this.getItemElems();
    this.countingItemInstances = this.createCountingItemInstances();
    this.wordToValueTextReplace = wordToValueTextReplace;

    this.handleApplyBtnClick = this.handleApplyBtnClick.bind(this);
    this.handleClearBtnClick = this.handleClearBtnClick.bind(this);

    this.addListenersToButtons();

    this.observers = [];
    this.subscribeToItems();
  }

  notify(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }

  update(action) {
    if (action.type === 'UPDATE_VALUE') {
      if (this.isWithoutButtons()) {
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
    const clearBtnSelector = '.items-counter__clear-button';
    return this.elem.querySelector(clearBtnSelector);
  }

  getApplyBtn() {
    const applyBtnSelector = '.items-counter__apply-button';
    return this.elem.querySelector(applyBtnSelector);
  }

  getItemElems() {
    const itemSelector = '.counting-item';
    return this.elem.querySelectorAll(itemSelector);
  }

  isWithoutButtons() {
    const withoutButtonsClass = 'items-counter_without-buttons';
    return this.elem.classList.contains(withoutButtonsClass);
  }

  handleClearBtnClick() {
    this.countingItemInstances.forEach((inst) => {
      inst.setValue(0);
    });
    this.notify({
      type: 'CLICK_CLEAR-BUTTON',
      value: this.getValues(),
      valueText: this.convertValuesToText(),
    });
  }

  handleApplyBtnClick() {
    this.notify({
      type: 'CLICK_APPLY-BUTTON',
      value: this.getValues(),
      valueText: this.convertValuesToText(),
    });
  }

  convertValuesToText() {
    let fullText = '';
    if (this.wordToValueTextReplace) {
      let valuesSum = 0;
      this.countingItemInstances.forEach((inst) => {
        valuesSum += inst.getValue();
      });
      fullText += `${valuesSum} ${this.wordToValueTextReplace}`;
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

  createCountingItemInstances() {
    const instances = [];

    this.itemElems.forEach((elem) => {
      const countingItem = new CountingItem(elem);

      instances.push(countingItem);
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
