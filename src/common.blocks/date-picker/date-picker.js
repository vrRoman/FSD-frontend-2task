import 'jquery-ui/ui/widgets/datepicker';
import '@common.blocks/date-picker/jquery.datepicker.extension.range.min';

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

function checkDateAndUpdateClearBtn($datepicker) {
  $datepicker.each((i, elem) => {
    if ($(elem).datepicker('getDate')) {
      $($(elem).find('.js-ui-datepicker-clear-button')).removeClass('ui-datepicker-clear-button_disabled');
    } else {
      $($(elem).find('.js-ui-datepicker-clear-button')).addClass('ui-datepicker-clear-button_disabled');
    }
  });
}

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
    checkDateAndUpdateClearBtn($datepicker);
  }

  $datepicker.removeClass('date-picker_expanded');
}

function clearDate($datepicker) {
  const $inputs = $datepicker.find('.date-picker__input');
  $inputs.val('');

  $datepicker.datepicker('setDate', [null, null]);
  checkDateAndUpdateClearBtn($datepicker);
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
    $($datepicker.find('.js-ui-datepicker-apply-button')).click(handleApplyButtonClick);
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

  $datepicker.find('.js-ui-datepicker-apply-button').click(() => {
    applyDate($datepicker, false);
  });
  $datepicker.find('.js-ui-datepicker-clear-button').click(() => {
    clearDate($datepicker);
    $datepicker.find('.js-ui-datepicker-apply-button').click(() => {
      applyDate($datepicker, false);
    });
  });

  checkDateAndUpdateClearBtn($datepicker);
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

setDatepickerDate($('.js-date-picker'), [null, null]);

export { setDatepickerDate, onSelect };
