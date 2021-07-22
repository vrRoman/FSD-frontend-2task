import autoBind from 'auto-bind';
import Observable from '@/js/Observable/Observable';

class DatePicker extends Observable {
  constructor(element) {
    super();

    this.clearBtnHTML = `<button class="ui-datepicker-current 
      ui-state-default ui-corner-all 
      ui-datepicker-custom-button ui-datepicker-clear-button js-ui-datepicker-clear-button" 
      type="button">Очистить</button> `;
    this.applyBtnHTML = `<button class="ui-datepicker-current
      ui-state-default ui-corner-all
      ui-datepicker-custom-button ui-datepicker-apply-button js-ui-datepicker-apply-button"
      type="button">Применить</button> `;
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
    this.$clearButton = this.updateClearButton();
    this.$applyButton = this.updateApplyButton();
    this.extensionRangeObject = {};
    this.isTextDouble = JSON.parse(this.$elem[0].dataset.isTextDouble);
    this.dateFormat = this.$elem[0].dataset.dateFormat ? this.$elem[0].dataset.dateFormat : 'dd.mm.yy';

    autoBind(this);

    this.options = {
      range: 'period',
      showButtonPanel: true,
      currentText: this.clearBtnHTML + this.applyBtnHTML,
      firstDay: 1,
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: this.dateFormat,
      monthNames: this.monthNames,
      monthNamesShort: this.monthNamesShort,
      dayNames: this.dayNames,
      dayNamesShort: this.dayNamesShort,
      dayNamesMin: this.dayNamesMin,
      onSelect: this._handleDateSelect,
    };

    this._init();

    this.initialDate = JSON.parse(this.$elem[0].dataset.initialDate);
    this.initialDate[0] = this.initialDate[0] ? new Date(this.initialDate[0]) : null;
    this.initialDate[1] = this.initialDate[1] ? new Date(this.initialDate[1]) : null;
    this.setDate(this.initialDate);

    this.addToJqueryData(this.$elem);
  }

  setDate(dateObjects, dateTexts = [null, null]) {
    this.$elem.datepicker('setDate', dateObjects);
    [this.extensionRangeObject.startDate, this.extensionRangeObject.endDate] = dateObjects;
    [this.extensionRangeObject.startDateText, this.extensionRangeObject.endDateText] = dateTexts;

    this.updateClearButton();
    this.updateApplyButton();
    this.updateClearButtonClasses();
  }

  // JQuery перерендеривает кнопки при выборе даты и изменении даты,
  // поэтому их нужно каждый раз обновлять
  updateClearButton() {
    this.$clearButton = $(this.$elem.find('.js-ui-datepicker-clear-button'));

    this.$clearButton.on('click', this._handleClearButtonClick);

    return this.$clearButton;
  }

  updateApplyButton() {
    this.$applyButton = $(this.$elem.find('.js-ui-datepicker-apply-button'));
    this.$applyButton.on('click', this._handleApplyButtonClick);
    return this.$applyButton;
  }

  updateClearButtonClasses() {
    if (this.$elem.datepicker('getDate')) {
      this.$clearButton.removeClass('ui-datepicker-clear-button_disabled');
    } else {
      this.$clearButton.addClass('ui-datepicker-clear-button_disabled');
    }
  }

  _init() {
    this.$elem.datepicker(this.options);
  }

  _handleApplyButtonClick() {
    const dates = [this.extensionRangeObject.startDate, this.extensionRangeObject.endDate];
    const dateTexts = [
      this.extensionRangeObject.startDateText, this.extensionRangeObject.endDateText,
    ];
    const dateTextsDefined = Boolean(dateTexts[0] && dateTexts[1]);

    this.setDate(dates, dateTexts);

    let valueText;
    if (this.isTextDouble) {
      valueText = dateTexts;
    } else if (dateTextsDefined) {
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

  _handleClearButtonClick() {
    this.setDate([null, null]);
    this.notify({
      type: 'CLICK_CLEAR-BUTTON',
      value: [null, null],
      valueText: null,
    });
  }

  _handleDateSelect(dateText, inst, extensionRange) {
    this.extensionRangeObject = extensionRange;
    setTimeout(() => {
      this.updateClearButton();
      this.updateApplyButton();
    }, 100);
  }
}

export default DatePicker;
