import autoBind from 'auto-bind';
import Observable from '@/js/Observable/Observable';

import data from './date-picker-data';

class DatePicker extends Observable {
  constructor(element) {
    super();
    autoBind(this);

    this.$elem = $(element);
    this.extensionRangeObject = {};
    this.isTextDouble = null;
    this.$clearButton = null;
    this.$applyButton = null;
    this.dateFormat = null;
    this.initialDate = null;
  }

  init() {
    this.$clearButton = this.updateClearButton();
    this.$applyButton = this.updateApplyButton();
    this.isTextDouble = JSON.parse(this.$elem[0].dataset.isTextDouble);
    this.dateFormat = this.$elem[0].dataset.dateFormat ? this.$elem[0].dataset.dateFormat : 'dd.mm.yy';
    this.initialDate = JSON.parse(this.$elem[0].dataset.initialDate)
      .map((dateString) => dateString && new Date(dateString));

    this.$elem.datepicker({
      range: 'period',
      minDate: new Date(),
      showButtonPanel: true,
      currentText: data.clearBtnHTML + data.applyBtnHTML,
      firstDay: 1,
      showOtherMonths: true,
      selectOtherMonths: true,
      dateFormat: this.dateFormat,
      monthNames: data.monthNames,
      monthNamesShort: data.monthNamesShort,
      dayNames: data.dayNames,
      dayNamesShort: data.dayNamesShort,
      dayNamesMin: data.dayNamesMin,
      onSelect: this._handleDateSelect,
      onChangeMonthYear: this._handleChangeMonthYear,
    });

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

  _getDatesInfo() {
    const dates = [this.extensionRangeObject.startDate, this.extensionRangeObject.endDate];
    const dateTexts = [
      this.extensionRangeObject.startDateText, this.extensionRangeObject.endDateText,
    ];
    const isDateTextsDefined = Boolean(dateTexts[0] && dateTexts[1]);

    let valueText;
    if (this.isTextDouble) {
      valueText = dateTexts;
    } else if (isDateTextsDefined) {
      valueText = `${dateTexts[0]} - ${dateTexts[1] ?? ''}`;
    } else {
      valueText = null;
    }

    return { dates, dateTexts, valueText };
  }

  _handleApplyButtonClick() {
    const { dates, dateTexts, valueText } = this._getDatesInfo();

    this.setDate(dates, dateTexts);

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

    const { dates, dateTexts, valueText } = this._getDatesInfo();

    if (this.extensionRangeObject.step === 0) {
      this.setDate(dates, dateTexts);
    }

    this.notify({
      type: 'UPDATE_VALUE',
      value: dates,
      valueText,
    });

    setTimeout(() => {
      this.updateClearButton();
      this.updateClearButtonClasses();
      this.updateApplyButton();
    }, 100);
  }

  _handleChangeMonthYear() {
    setTimeout(() => {
      this.updateClearButton();
      this.updateClearButtonClasses();
      this.updateApplyButton();
    }, 1);
  }
}

export default DatePicker;
