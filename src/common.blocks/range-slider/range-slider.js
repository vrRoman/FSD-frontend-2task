import 'jquery-ui/ui/widgets/slider';

const rubSymbol = '₽';

const sliderSelector = '.js-range-slider__slider';
const valueSelector = '.js-range-slider__value';

const values = [5000, 10000];

const numPrettify = (num) => {
  const n = num.toString();
  const separator = ' ';
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1${separator}`);
};

$(sliderSelector).slider({
  range: true,
  min: 200,
  max: 15400,
  values,
  slide(event, ui) {
    $(this).parent()
      .find(valueSelector)
      .text(`${numPrettify(ui.values[0]) + rubSymbol} - ${numPrettify(ui.values[1])}${rubSymbol}`);
  },
});

$(sliderSelector).parent().find(valueSelector)
  .text(`${numPrettify(values[0]) + rubSymbol} - ${numPrettify(values[1])}${rubSymbol}`);
