import '@/js/index'

import '@/sass/main.sass'
import '@/sass/ui-kit.sass'
import './form-elements.sass'

import '../../../blocks/text-field/text-field.js'

import './form-elements.pug'

import 'jquery-mask-plugin'

import '../../../js/dropdown.js'

import 'jquery-ui/ui/widgets/datepicker'
import 'jquery-ui/themes/base/all.css'

import '@/js/jquery.datepicker.extension.range.min'

import '../../../blocks/dropdown/dropdown.js'
import '../../../blocks/date-picker/datepicker'



$('.date-picker__input_single').datepicker({
    range: 'period',
    dateFormat: 'd M',
    monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    onSelect: function(dateText, inst, extensionRange) {
        if (extensionRange.startDateText !== extensionRange.endDateText) {
            $('[name="all-dates"]').val(extensionRange.startDateText + " - " + extensionRange.endDateText)
        }
    }
})

$('.date-picker__input_double').datepicker({
    range: 'period',
    dateFormat: 'dd.mm.yy',
    onSelect: function(dateText, inst, extensionRange) {
        if (extensionRange.startDateText !== extensionRange.endDateText) {
            $('[name="start-date"]').val(extensionRange.startDateText)
            $('[name="end-date"]').val(extensionRange.endDateText)
        }
    }
})


$('.masked-date input').mask('99.99.9999')




