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

function applyDates($dropdown, dates) {
  const $inputs = $dropdown.find('.date-picker__input');
  if (dates) {
    if ($inputs.length === 1) {
      if (dates[0] && dates[1]) {
        $inputs.val(`${dates[0]} - ${dates[1]}`);
      }
    } else if ($inputs.length === 2) {
      $inputs.each((i, elem) => {
        $(elem).val(dates[i]);
      });
    }

    $dropdown.datepicker('setDate', dates);
  }

  $dropdown.removeClass('date-picker_expanded');
}

function clearDate($dropdown) {
  const inputs = $dropdown.find('.date-picker__input');
  inputs.val('');

  $dropdown.datepicker('setDate', [null, null]);
}

function onSelect(dateText, inst, extensionRange) {
  const $dropdown = inst.dpDiv.parent();
  let dates = [extensionRange.startDateText, extensionRange.endDateText];

  function handleApplyButtonClick() {
    applyDates($dropdown, dates);
    $('.js-ui-datepicker-clear-button').click(() => {
      clearDate($dropdown);
      dates = [null, null];
      $('.js-ui-datepicker-apply-button').click(handleApplyButtonClick);
    });
  }

  setTimeout(() => {
    $('.js-ui-datepicker-apply-button').click(handleApplyButtonClick);
    $('.js-ui-datepicker-clear-button').click(() => {
      clearDate($dropdown);
      dates = [null, null];
      $('.js-ui-datepicker-apply-button').click(handleApplyButtonClick);
    });
  }, 100);
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
  onSelect,
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

  onSelect,
});

$('.js-ui-datepicker-apply-button').click(function handleApplyButtonClick() {
  applyDates($(this.closest('.js-date-picker')), false);
});
$('.js-ui-datepicker-clear-button').click(function handleClearButtonClick() {
  clearDate($(this.closest('.js-date-picker')));
});
