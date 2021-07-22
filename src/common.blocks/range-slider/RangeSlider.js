import autoBind from 'auto-bind';
import prettifyNumber from '@/js/helpers/prettifyNumber';

class RangeSlider {
  constructor(elem) {
    autoBind(this);

    this.elem = elem;
    this.sliderElem = null;
    this.valueElem = null;

    this.rubSymbol = '₽';
    this.sliderSelector = '.js-range-slider__slider';
    this.valueSelector = '.js-range-slider__value';
    this.values = [5000, 10000];
  }

  init() {
    this.sliderElem = this.getSlider();
    this.valueElem = this.getValueElem();

    $(this.sliderElem).slider({
      range: true,
      min: 200,
      max: 15400,
      values: this.values,
      slide: this._handleSliderValuesChanged,
    });
    this._updateValueElem();
  }

  getSlider() {
    return this.elem.querySelector(this.sliderSelector);
  }

  getValueElem() {
    return this.elem.querySelector(this.valueSelector);
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
