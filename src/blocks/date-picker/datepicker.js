import 'jquery-ui/ui/widgets/datepicker';
import '@blocks/date-picker/jquery.datepicker.extension.range.min';

const clearBtn = '<button class="ui-datepicker-current '
  + 'ui-state-default ui-corner-all '
  + 'ui-datepicker-custom-button ui-datepicker-clear-button js-ui-datepicker-clear-button" '
  + 'type="button">Очистить</button> ';

const applyBtn = '<button class="ui-datepicker-current '
  + 'ui-state-default ui-corner-all '
  + 'ui-datepicker-custom-button ui-datepicker-apply-button js-ui-datepicker-apply-button" '
  + 'type="button">Применить</button> ';

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const monthNamesShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const dayNamesShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const dayNamesMin = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function closeDatepicker() {
  const datepickerElem = this.closest('.date-picker');

  datepickerElem.classList.remove('date-picker_expanded');
}

function clearInputs() {
  const inputs = this.closest('.date-picker').querySelectorAll('.date-picker__input');

  for (let i = 0; i < inputs.length; i += 1) {
    inputs[i].value = '';
  }
}

$('.js-date-picker_single').datepicker({
  range: 'period',
  showButtonPanel: true,
  currentText: clearBtn + applyBtn,
  firstDay: 1,
  showOtherMonths: true,
  selectOtherMonths: true,
  dateFormat: 'd M',
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  dayNamesMin,

  onSelect(dateText, inst, extensionRange) {
    const datePickerElem = inst.input;

    if (extensionRange.startDateText !== extensionRange.endDateText) {
      datePickerElem.find('[name="all-dates"]').val(`${extensionRange.startDateText} - ${extensionRange.endDateText}`);
    }

    setTimeout(() => {
      $('.js-ui-datepicker-apply-button').click(closeDatepicker);
      $('.js-ui-datepicker-clear-button').click(clearInputs);
    }, 100);
  },
});

$('.js-date-picker_double').datepicker({
  range: 'period',
  showButtonPanel: true,
  currentText: clearBtn + applyBtn,
  firstDay: 1,
  showOtherMonths: true,
  selectOtherMonths: true,
  dateFormat: 'dd.mm.yy',
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  dayNamesMin,

  onSelect(dateText, inst, extensionRange) {
    const datePickerElem = inst.input;

    datePickerElem.find('[name="start-date"]').val(extensionRange.startDateText);

    datePickerElem.find('[name="end-date"]').val(extensionRange.endDateText);

    setTimeout(() => {
      $('.js-ui-datepicker-apply-button').click(closeDatepicker);
      $('.js-ui-datepicker-clear-button').click(clearInputs);
    }, 100);
  },
});

$('.js-ui-datepicker-apply-button').click(closeDatepicker);
$('.js-ui-datepicker-clear-button').click(clearInputs);
