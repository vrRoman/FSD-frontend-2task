/* eslint-disable no-unused-vars */

import DatePicker from '@/common.blocks/date-picker/date-picker';
import Dropdown from '@/common.blocks/dropdown/dropdown';
import ItemsCounter from '@/common.blocks/items-counter/items-counter';

class SearchCard {
  constructor(elem) {
    this.elem = elem;

    this.init();
  }

  init() {
    const datePicker = new DatePicker({
      element: this.getDateDropdown().querySelector('.js-date-picker'),
      isTextDouble: true,
    });
    const dateDropdown = new Dropdown(this.getDateDropdown(), datePicker, 'ДД.ММ.ГГГГ');

    const itemsCounter = new ItemsCounter(this.getGuestsDropdown().querySelector('.js-items-counter'), 'гостя');
    const guestsDropdown = new Dropdown(this.getGuestsDropdown(), itemsCounter, 'Сколько гостей');
  }

  getDateDropdown() {
    const selector = '.js-search-card__dates .js-dropdown';
    return this.elem.querySelector(selector);
  }

  getGuestsDropdown() {
    const selector = ' .js-search-card__guests .js-dropdown';
    return this.elem.querySelector(selector);
  }
}

export default SearchCard;
