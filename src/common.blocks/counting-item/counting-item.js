class CountingItem {
  constructor(elem) {
    this.elem = elem;
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
    return `${this.value} ${this.name}`;
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
