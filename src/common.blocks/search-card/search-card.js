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
      element: this.getDateDropdown().querySelector('.date-picker'),
      isTextDouble: true,
    });
    const dateDropdown = new Dropdown(this.getDateDropdown(), datePicker, 'ДД.ММ.ГГГГ');

    const itemsCounter = new ItemsCounter(this.getGuestsDropdown().querySelector('.items-counter'), 'гостя');
    const guestsDropdown = new Dropdown(this.getGuestsDropdown(), itemsCounter, 'Сколько гостей');
  }

  getDateDropdown() {
    const selector = '.search-card__dates .dropdown';
    return this.elem.querySelector(selector);
  }

  getGuestsDropdown() {
    const selector = ' .search-card__guests .dropdown';
    return this.elem.querySelector(selector);
  }
}

export default SearchCard;
