import RangeSlider from '@/common.blocks/range-slider/RangeSlider';

$('.js-range-slider').each(function init() {
  const rangeSlider = new RangeSlider(this);
  rangeSlider.init();
});
