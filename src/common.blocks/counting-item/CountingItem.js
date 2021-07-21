import declinationByNumber from '@/js/helpers/declinationByNumber';
import Observable from '@/js/Observable/Observable';

class CountingItem extends Observable {
  constructor(elem) {
    super();

    this.elem = elem;
    this.wordsDeclension = this.elem.dataset.words ? JSON.parse(this.elem.dataset.words) : null;

    this.plusBtn = this.getPlusBtn();
    this.minusBtn = this.getMinusBtn();
    this.valueElem = this.getValueElem();
    this.value = Number(this.valueElem.innerText);
    this.name = this.getNameElem().innerText.toLowerCase();

    this._handlePlusBtnClick = this._handlePlusBtnClick.bind(this);
    this._handleMinusBtnClick = this._handleMinusBtnClick.bind(this);

    this._initButtons();

    this._addToJqueryData();
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
        this.minusBtn.classList.add('counting-item__change-button_disabled');
      } else {
        this.minusBtn.classList.remove('counting-item__change-button_disabled');
      }
    }

    this.notify({
      type: 'UPDATE_VALUE',
      value: this.value,
      valueText: this.getValueText(),
    });
    return this.value;
  }

  _addToJqueryData() {
    if ($) {
      $(this.elem).data({
        instance: this,
      });
    }
  }

  _initButtons() {
    this.plusBtn.addEventListener('click', this._handlePlusBtnClick);
    this.minusBtn.addEventListener('click', this._handleMinusBtnClick);

    if (this.value === 0) {
      this.minusBtn.classList.add('counting-item__change-button_disabled');
    }
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
