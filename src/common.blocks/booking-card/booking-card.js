/* eslint-disable no-unused-vars */

import DatePicker from '@/common.blocks/date-picker/date-picker';
import Dropdown from '@/common.blocks/dropdown/dropdown';
import ItemsCounter from '@/common.blocks/items-counter/items-counter';

class BookingCard {
  constructor(elem) {
    this.elem = elem;
    this.init();
  }

  init() {
    const datePicker = new DatePicker({
      element: this.getDatePickerElem(),
      initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
      isTextDouble: true,
    });
    const dropdownWithDatePicker = new Dropdown(this.getDateDropdownElem(), datePicker, 'ДД.ММ.ГГГГ');

    const itemsCounter = new ItemsCounter(this.getItemsCounterElem(), 'гостя');
    const dropdownWithItemsCounter = new Dropdown(this.getGuestsDropdownElem(), itemsCounter, 'Сколько гостей');
  }

  getDatePickerElem() {
    const datePickerSelector = '.js-booking-card__dates .js-dropdown .js-dropdown__popup .js-date-picker';
    return this.elem.querySelector(datePickerSelector);
  }

  getDateDropdownElem() {
    const dateDropdownSelector = '.js-booking-card__dates .js-dropdown';
    return this.elem.querySelector(dateDropdownSelector);
  }

  getItemsCounterElem() {
    const itemsCounterElemSelector = '.js-booking-card__guests .js-dropdown .js-dropdown__popup .js-items-counter';
    return this.elem.querySelector(itemsCounterElemSelector);
  }

  getGuestsDropdownElem() {
    const guestsDropdownSelector = '.js-booking-card__guests .js-dropdown';
    return this.elem.querySelector(guestsDropdownSelector);
  }
}

export default BookingCard;
