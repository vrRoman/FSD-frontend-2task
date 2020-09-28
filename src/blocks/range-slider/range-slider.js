import 'jquery-ui/ui/widgets/slider'


const rubSymbol = '₽'

const sliderSelector = '.range-slider__slider'
const valueSelector = '.range-slider__value'

const values = [5000, 10000]


$(sliderSelector).slider({
    range: true,
    min: 200,
    max: 15400,
    values: values,
    slide: function(event, ui) {
        $(this).parent()
            .find(valueSelector)
            .text(ui.values[0] + rubSymbol + ' - ' + ui.values[1] + rubSymbol)
    }
})

$(sliderSelector).parent().find(valueSelector)
    .text(values[0] + rubSymbol + ' - ' + values[1] + rubSymbol)