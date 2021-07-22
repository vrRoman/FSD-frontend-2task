import autoBind from 'auto-bind';
import prettifyNumber from '@/js/helpers/prettifyNumber';

class RangeSlider {
  constructor(elem) {
    this.rubSymbol = '₽';
    this.sliderSelector = '.js-range-slider__slider';
    this.valueSelector = '.js-range-slider__value';

    this.elem = elem;
    this.sliderElem = this.getSlider();
    this.valueElem = this.getValueElem();
    this.values = [5000, 10000];

    autoBind(this);

    this._init();
  }

  getSlider() {
    return this.elem.querySelector(this.sliderSelector);
  }

  getValueElem() {
    return this.elem.querySelector(this.valueSelector);
  }

  _init() {
    $(this.sliderElem).slider({
      range: true,
      min: 200,
      max: 15400,
      values: this.values,
      slide: this._handleSliderValuesChanged,
    });
    this._updateValueElem();
  }

  _updateValueElem() {
    const firstPrice = `${prettifyNumber(this.values[0])}${this.rubSymbol}`;
    const secondPrice = `${prettifyNumber(this.values[1])}${this.rubSymbol}`;

    this.valueElem.innerText = `${firstPrice} - ${secondPrice}`;
  }

  _handleSliderValuesChanged(event, ui) {
    this.values = [...ui.values];
    this._updateValueElem();
  }
}

export default RangeSlider;
