import 'jquery-ui/ui/widgets/datepicker';
import './jquery.datepicker.extension.range.min';

class DatePicker {
  constructor({
    element,
    options = {},
    initialDate = [null, null],
    isTextDouble = false,
  }) {
    this.clearBtnHTML = '<button class="ui-datepicker-current '
      + 'ui-state-default ui-corner-all '
      + 'ui-datepicker-custom-button ui-datepicker-clear-button js-ui-datepicker-clear-button" '
      + 'type="button">Очистить</button> ';
    this.applyBtnHTML = '<button class="ui-datepicker-current '
      + 'ui-state-default ui-corner-all '
      + 'ui-datepicker-custom-button ui-datepicker-apply-button js-ui-datepicker-apply-button" '
      + 'type="button">Применить</button> ';
    this.monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
    ];
    this.monthNamesShort = [
      'янв', 'фев', 'мар', 'апр', 'май', 'июн',
      'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
    ];
    this.dayNames = [
      'Воскресенье', 'Понедельник', 'Вторник',
      'Среда', 'Четверг', 'Пятница', 'Суббота',
    ];
    this.dayNamesShort = [
      'Вс', 'Пн', 'Вт',
      'Ср', 'Чт', 'Пт', 'Сб',
    ];
    this.dayNamesMin = [
      'Вс', 'Пн', 'Вт',
      'Ср', 'Чт', 'Пт', 'Сб',
    ];

    this.$elem = $(element);
    this.extensionRangeObject = {};
    this.handleApplyButtonClick = this.handleApplyButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.isTextDouble = isTextDouble;
    this.defaultOptions = {
      range: 'period',
      showButtonPanel: true,
      currentText: this.clearBtnHTML + this.applyBtnHTML,
      firstDay: 1,
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: 'dd.mm.yy',
      monthNames: this.monthNames,
      monthNamesShort: this.monthNamesShort,
      dayNames: this.dayNames,
      dayNamesShort: this.dayNamesShort,
      dayNamesMin: this.dayNamesMin,
      onSelect: this.onSelect,
    };
    this.options = {
      ...this.defaultOptions,
      ...options,
    };

    this.init();
    this.setDate(initialDate);

    this.observers = [];
  }

  init() {
    this.$elem.datepicker(this.options);
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify(action) {
    this.observers.forEach((observer) => {
      observer.update(action);
    });
  }

  getClearBtn() {
    return $(this.$elem.find('.js-ui-datepicker-clear-button'));
  }

  getApplyBtn() {
    return $(this.$elem.find('.js-ui-datepicker-apply-button'));
  }

  updateClearBtn() {
    if (this.$elem.datepicker('getDate')) {
      this.getClearBtn().removeClass('ui-datepicker-clear-button_disabled');
    } else {
      this.getClearBtn().addClass('ui-datepicker-clear-button_disabled');
    }
  }

  setDate(dateObjects, dateTexts = [null, null]) {
    this.$elem.datepicker('setDate', dateObjects);
    [this.extensionRangeObject.startDate, this.extensionRangeObject.endDate] = dateObjects;
    [this.extensionRangeObject.startDateText, this.extensionRangeObject.endDateText] = dateTexts;

    this.getClearBtn().click(this.handleClearButtonClick);
    this.getApplyBtn().click(this.handleApplyButtonClick);
    this.updateClearBtn();
  }

  handleApplyButtonClick() {
    const dates = [this.extensionRangeObject.startDate, this.extensionRangeObject.endDate];
    const dateTexts = [
      this.extensionRangeObject.startDateText, this.extensionRangeObject.endDateText,
    ];

    this.setDate(dates, dateTexts);

    let valueText;
    if (this.isTextDouble) {
      valueText = dateTexts;
    } else if (dateTexts[0] && dateTexts[1]) {
      valueText = `${dateTexts[0]} - ${dateTexts[1]}`;
    } else {
      valueText = null;
    }

    this.notify({
      type: 'CLICK_APPLY-BUTTON',
      value: dates,
      valueText,
    });
  }

  handleClearButtonClick() {
    this.setDate([null, null]);
    this.notify({
      type: 'CLICK_CLEAR-BUTTON',
      value: [null, null],
      valueText: null,
    });
  }

  onSelect(dateText, inst, extensionRange) {
    this.extensionRangeObject = extensionRange;
    setTimeout(() => {
      this.getApplyBtn().click(this.handleApplyButtonClick);
      this.getClearBtn().click(this.handleClearButtonClick);
    }, 100);
  }
}

export default DatePicker;
