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
            .text(numPrettify(ui.values[0]) + rubSymbol + ' - ' + numPrettify(ui.values[1]) + rubSymbol)
    }
})

$(sliderSelector).parent().find(valueSelector)
    .text(numPrettify(values[0]) + rubSymbol + ' - ' + numPrettify(values[1]) + rubSymbol)


function numPrettify(num) {
    let n = num.toString()
    let separator = " "
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
}