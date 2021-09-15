import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/slider.css';
import 'jquery-ui/ui/widgets/slider';

import RangeSlider from '@/common.blocks/range-slider/RangeSlider';

$('.js-range-slider').each(function init() {
  const rangeSlider = new RangeSlider(this);
  rangeSlider.init();
});
