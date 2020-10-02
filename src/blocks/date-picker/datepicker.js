import 'jquery-ui/ui/widgets/datepicker'
import '@blocks/date-picker/jquery.datepicker.extension.range.min'


let clearBtn     = '<button class="ui-datepicker-current ' +
    'ui-state-default ui-corner-all ' +
    'ui-datepicker-custom-button ui-datepicker-clear-button" '+
    'type="button">Очистить</button> '

let applyBtn     = '<button class="ui-datepicker-current ' +
    'ui-state-default ui-corner-all ' +
    'ui-datepicker-custom-button ui-datepicker-apply-button" '+
    'type="button">Применить</button> '

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const monthNamesShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const dayNamesShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const dayNamesMin = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']



$('.date-picker_single').datepicker({
    range: 'period',
    showButtonPanel: true,
    currentText: clearBtn  + applyBtn,
    firstDay: 1,
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'd M',
    monthNames, monthNamesShort,
    dayNames, dayNamesShort, dayNamesMin,

    onSelect: function(dateText, inst, extensionRange) {
        const datePickerElem = inst.input

        if (extensionRange.startDateText !== extensionRange.endDateText) {
            datePickerElem.find('[name="all-dates"]').val(extensionRange.startDateText + " - " + extensionRange.endDateText)
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
    monthNames, monthNamesShort,
    dayNames, dayNamesShort, dayNamesMin,

    onSelect: function(dateText, inst, extensionRange) {
        const datePickerElem = inst.input

        datePickerElem.find('[name="start-date"]').val(extensionRange.startDateText)

        datePickerElem.find('[name="end-date"]').val(extensionRange.endDateText)

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




$('.date-picker-example').datepicker({
    range: 'period',
    showButtonPanel: true,
    currentText: clearBtn + applyBtn,
    firstDay: 1,
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd.mm.yy',
    monthNames, monthNamesShort,
    dayNames, dayNamesShort, dayNamesMin,
})

$('.date-picker-example').datepicker('setDate', [new Date(2019, 7, 19), new Date(2019, 7, 23)])