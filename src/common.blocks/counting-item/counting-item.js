class CountingItem {
  constructor(elem) {
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

    this.observers = [];

    this._addToJqueryData();
  }

  static declinationByNumber(number, words) {
    const lastTwoDigits = Math.abs(number) % 100;
    const lastDigit = lastTwoDigits % 10;
    const lastTwoDigitsFrom10To20 = lastTwoDigits > 10 && lastTwoDigits < 20;
    const lastDigitFrom1To5 = lastDigit > 1 && lastDigit < 5;

    if (lastTwoDigitsFrom10To20) {
      return words[2];
    }
    if (lastDigitFrom1To5) {
      return words[1];
    }
    if (lastDigit === 1) {
      return words[0];
    }
    return words[2];
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
      name = CountingItem.declinationByNumber(this.value, this.wordsDeclension).toLowerCase();
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

    this._notify({
      type: 'UPDATE_VALUE',
      value: this.value,
      valueText: this.getValueText(),
    });
    return this.value;
  }

  subscribe(observer) {
    this.observers.push(observer);
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
