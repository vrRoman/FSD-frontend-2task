import autoBind from 'auto-bind';

class RangeSlider {
  constructor(elem) {
    this.rubSymbol = '₽';
    this.sliderSelector = '.js-range-slider__slider';
    this.valueSelector = '.js-range-slider__value';

    this.elem = elem;
    this.values = [5000, 10000];

    autoBind(this);

    this._init();
  }

  static prettifyNum(num) {
    const n = num.toString();
    const separator = ' ';
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${separator}`);
  }

  getSlider() {
    return this.elem.querySelector(this.sliderSelector);
  }

  getValueElem() {
    return this.elem.querySelector(this.valueSelector);
  }

  _init() {
    $(this.getSlider()).slider({
      range: true,
      min: 200,
      max: 15400,
      values: this.values,
      slide: this._handleSliderValuesChanged,
    });
    this._updateValueElem();
  }

  _updateValueElem() {
    const firstPrice = `${RangeSlider.prettifyNum(this.values[0])}${this.rubSymbol}`;
    const secondPrice = `${RangeSlider.prettifyNum(this.values[1])}${this.rubSymbol}`;

    this.getValueElem().innerText = `${firstPrice} - ${secondPrice}`;
  }

  _handleSliderValuesChanged(event, ui) {
    this.values = [...ui.values];
    this._updateValueElem();
  }
}

export default RangeSlider;
