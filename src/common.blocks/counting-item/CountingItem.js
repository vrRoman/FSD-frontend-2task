import autoBind from 'auto-bind';

import declinationByNumber from '@/js/helpers/declinationByNumber';
import Observable from '@/js/Observable/Observable';

class CountingItem extends Observable {
  constructor(elem) {
    super();
    autoBind(this);

    this.elem = elem;
    this.changeButtonDisabledClass = 'counting-item__change-button_disabled';
    this.wordsDeclension = null;
    this.plusBtn = null;
    this.minusBtn = null;
    this.valueElem = null;
    this.value = null;
    this.name = null;
  }

  init() {
    this.wordsDeclension = this.elem.dataset.words ? JSON.parse(this.elem.dataset.words) : null;
    this.plusBtn = this.getPlusBtn();
    this.minusBtn = this.getMinusBtn();
    this.valueElem = this.getValueElem();
    this.value = Number(this.valueElem.innerText);
    this.name = this.getNameElem().innerText.toLowerCase();

    this.plusBtn.addEventListener('click', this._handlePlusBtnClick);
    this.minusBtn.addEventListener('click', this._handleMinusBtnClick);

    if (this.value === 0) {
      this.minusBtn.classList.add(this.changeButtonDisabledClass);
    }

    this.addToJqueryData(this.elem);
  }

  getValue() {
    return this.value;
  }

  getValueText() {
    if (this.value === 0) {
      return '';
    }

    let { name } = this;

    if (this.wordsDeclension) {
      name = declinationByNumber(this.value, this.wordsDeclension).toLowerCase();
    }

    return `${this.value} ${name}`;
  }

  getNameElem() {
    const nameElemSelector = '.js-counting-item__name .js-heading';
    return this.elem.querySelector(nameElemSelector);
  }

  getPlusBtn() {
    return this.elem.querySelector('.js-counting-item__change-button_action_increase');
  }

  getMinusBtn() {
    return this.elem.querySelector('.js-counting-item__change-button_action_decrease');
  }

  getValueElem() {
    return this.elem.querySelector('.js-counting-item__value .js-heading');
  }

  setValue(newValue) {
    if (newValue >= 0) {
      this.value = newValue;

      this.valueElem.innerText = this.value;
      if (newValue === 0) {
        this.minusBtn.classList.add(this.changeButtonDisabledClass);
      } else {
        this.minusBtn.classList.remove(this.changeButtonDisabledClass);
      }
    }

    this.notify({
      type: 'UPDATE_VALUE',
      value: this.value,
      valueText: this.getValueText(),
    });
    return this.value;
  }

  _handlePlusBtnClick() {
    const newValue = this.value + 1;
    this.setValue(newValue);
  }

  _handleMinusBtnClick() {
    const newValue = this.value - 1;
    this.setValue(newValue);
  }
}

export default CountingItem;
