/* eslint-disable no-unused-vars */

import '@/js/index';

import './form-elements.pug';

import '@/sass/main.sass';
import './form-elements.sass';

import './images/avatar_murad.png';

import '@/common.blocks/text-field/text-field';
import '@/common.blocks/comment/comment';
import '@/common.blocks/like-button/init';
import '@/common.blocks/range-slider/init';
import '@/common.blocks/pagination/init';
import '@/common.blocks/expandable-checkboxes/init';
import Dropdown from '@/common.blocks/dropdown/dropdown';
import ItemsCounter from '@/common.blocks/items-counter/items-counter';
import DatePicker from '@/common.blocks/date-picker/date-picker';

const $guestsDropdowns = $('.js-form-elements__guests-dropdown .js-dropdown');
$guestsDropdowns.each(function init() {
  const popupElem = this.querySelector('.js-items-counter');
  const itemsCounter = new ItemsCounter(popupElem, 'гостя');
  const dropdown = new Dropdown(this, itemsCounter, 'Сколько гостей');
});

const dateDropdownElem = document.querySelector('.js-form-elements__date-dropdown .js-dropdown');
const datePicker = new DatePicker({
  element: dateDropdownElem.querySelector('.js-date-picker'),
  isTextDouble: true,
});
const dateDropdown = new Dropdown(dateDropdownElem, datePicker, 'ДД.ММ.ГГГГ');

const filterDateDropdownElem = document.querySelector('.js-form-elements__filter-date-dropdown .js-dropdown');
const filterDatePicker = new DatePicker({
  element: filterDateDropdownElem.querySelector('.js-date-picker'),
  options: {
    dateFormat: 'd M',
  },
});
const filterDateDropdown = new Dropdown(filterDateDropdownElem, filterDatePicker, 'Дата');

const $facilitiesDropdowns = $('.js-form-elements__facilities-dropdown .js-dropdown');
$facilitiesDropdowns.each(function init() {
  const popupElem = this.querySelector('.js-items-counter');
  const itemsCounter = new ItemsCounter(popupElem);
  const dropdown = new Dropdown(this, itemsCounter, 'Удобства');
});
