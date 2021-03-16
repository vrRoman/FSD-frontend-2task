class CountingItem {
  constructor(elem, wordsDeclension = null) {
    this.elem = elem;
    this.wordsDeclension = wordsDeclension;

    this.plusBtn = this.getPlusBtn();
    this.minusBtn = this.getMinusBtn();
    this.valueElem = this.getValueElem();
    this.value = +this.valueElem.innerText;
    this.name = this.getNameElem().innerText.toLowerCase();
    this.handlePlusBtnClick = this.handlePlusBtnClick.bind(this);
    this.handleMinusBtnClick = this.handleMinusBtnClick.bind(this);

    this.initButtons();

    this.observers = [];
  }

  static declinationByNumber(number, words) {
    const lastTwoDigits = Math.abs(number) % 100;
    const lastDigit = lastTwoDigits % 10;

    if (lastTwoDigits > 10 && lastTwoDigits < 20) {
      return words[2];
    }
    if (lastDigit > 1 && lastDigit < 5) {
      return words[1];
    }
    if (lastDigit === 1) {
      return words[0];
    }
    return words[2];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
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
      name = CountingItem.declinationByNumber(this.value, this.wordsDeclension);
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

  initButtons() {
    this.plusBtn.addEventListener('click', this.handlePlusBtnClick);
    this.minusBtn.addEventListener('click', this.handleMinusBtnClick);

    if (this.value === 0) {
      this.minusBtn.classList.add('counting-item__change-button_disabled');
    }
  }

  handlePlusBtnClick() {
    const newValue = this.value + 1;
    this.setValue(newValue);
  }

  handleMinusBtnClick() {
    const newValue = this.value - 1;
    this.setValue(newValue);
  }
}

export default CountingItem;
