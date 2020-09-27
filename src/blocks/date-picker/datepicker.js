import 'jquery-ui/ui/widgets/datepicker'
import '@/js/jquery.datepicker.extension.range.min'
import 'jquery-ui/themes/base/all.css'

let clearBtn     = '<button class="ui-datepicker-current ' +
    'ui-state-default ui-corner-all ' +
    'ui-datepicker-custom-button ui-datepicker-clear-button" '+
    'type="button">Очистить</button> '

let applyBtn     = '<button class="ui-datepicker-current ' +
    'ui-state-default ui-corner-all ' +
    'ui-datepicker-custom-button ui-datepicker-apply-button" '+
    'type="button">Применить</button> '



$('.date-picker_single').datepicker({
    range: 'period',
    showButtonPanel: true,
    currentText: clearBtn  + applyBtn,
    firstDay: 1,
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'd M',
    monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
    onSelect: function(dateText, inst, extensionRange) {
        if (extensionRange.startDateText !== extensionRange.endDateText) {
            $('[name="all-dates"]').val(extensionRange.startDateText + " - " + extensionRange.endDateText)
        }

        setTimeout(function (){
            $('.ui-datepicker-apply-button').click(closeDatepicker);
            $('.ui-datepicker-clear-button').click(clearInputs);
        }, 100)
    }
})



$('.date-picker_double').datepicker({
    range: 'period',
    showButtonPanel: true,
    currentText: clearBtn + applyBtn,
    firstDay: 1,
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd.mm.yy',

    onSelect: function(dateText, inst, extensionRange) {
        $('[name="start-date"]').val(extensionRange.startDateText)

        $('[name="end-date"]').val(extensionRange.endDateText)

        setTimeout(function (){
            $('.ui-datepicker-apply-button').click(closeDatepicker);
            $('.ui-datepicker-clear-button').click(clearInputs);
        }, 100)
    }
})



$('.ui-datepicker-apply-button').click(closeDatepicker);
$('.ui-datepicker-clear-button').click(clearInputs);


function closeDatepicker() {
    let datepickerElem = this.closest('.date-picker')

    datepickerElem.classList.remove('date-picker_expanded')
}

function clearInputs() {
    let inputs = this.closest('.date-picker').querySelectorAll('.date-picker__input')

    for (let input of inputs) {
        input.value = ''
    }
}