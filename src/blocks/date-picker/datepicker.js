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

function applyDate($datepicker, dateTexts, datesObjects) {
  const $inputs = $datepicker.find('.date-picker__input');
  if (dateTexts) {
    if ($inputs.length === 1) {
      if (dateTexts[0] && dateTexts[1]) {
        $inputs.val(`${dateTexts[0]} - ${dateTexts[1]}`);
      }
    } else if ($inputs.length === 2) {
      $inputs.each((i, elem) => {
        $(elem).val(dateTexts[i]);
      });
    }

    $datepicker.datepicker('setDate', datesObjects || dateTexts);
  }

  $datepicker.removeClass('date-picker_expanded');
}

function clearDate($datepicker) {
  const inputs = $datepicker.find('.date-picker__input');
  inputs.val('');

  $datepicker.datepicker('setDate', [null, null]);
}

function onSelect(dateText, inst, extensionRange) {
  const $datepicker = inst.dpDiv.parent();
  let dates = [extensionRange.startDateText, extensionRange.endDateText];

  function handleApplyButtonClick() {
    applyDate($datepicker, dates, [extensionRange.startDate, extensionRange.endDate]);
    $($datepicker.find('.js-ui-datepicker-clear-button')).click(() => {
      clearDate($datepicker);
      dates = [null, null];
      $($datepicker.find('.js-ui-datepicker-apply-button')).click(handleApplyButtonClick);
    });
  }

  setTimeout(() => {
    $($datepicker.find('.js-ui-datepicker-apply-button')).click(handleApplyButtonClick);
    $($datepicker.find('.js-ui-datepicker-clear-button')).click(() => {
      clearDate($datepicker);
      dates = [null, null];
      $($datepicker.find('.js-ui-datepicker-apply-button')).click(handleApplyButtonClick);
    });
  }, 100);
}

function setDatepickerDate($datepicker, dates) {
  $datepicker.datepicker('setDate', dates);

  const $applyBtn = $datepicker.find('.js-ui-datepicker-apply-button');
  const $clearBtn = $datepicker.find('.js-ui-datepicker-clear-button');

  $applyBtn.click(function handleApplyButtonClick() {
    applyDate($(this.closest('.js-date-picker')), false);
  });
  $clearBtn.click(function handleClearButtonClick() {
    clearDate($(this.closest('.js-date-picker')));
  });
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
  applyDate($(this.closest('.js-date-picker')), false);
});
$('.js-ui-datepicker-clear-button').click(function handleClearButtonClick() {
  clearDate($(this.closest('.js-date-picker')));
});

export { setDatepickerDate, onSelect };
