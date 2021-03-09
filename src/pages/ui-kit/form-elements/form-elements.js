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

const $guestsDropdowns = $('.form-elements__guests-dropdown .dropdown');
$guestsDropdowns.each(function init() {
  const popupElem = this.querySelector('.items-counter');
  const itemsCounter = new ItemsCounter(popupElem, 'гостя');
  const dropdown = new Dropdown(this, itemsCounter, 'Сколько гостей');
});

const dateDropdownElem = document.querySelector('.form-elements__date-dropdown .dropdown');
const datePicker = new DatePicker({
  element: dateDropdownElem.querySelector('.date-picker'),
  isTextDouble: true,
});
const dateDropdown = new Dropdown(dateDropdownElem, datePicker, 'ДД.ММ.ГГГГ');

const filterDateDropdownElem = document.querySelector('.form-elements__filter-date-dropdown'
  + ' .dropdown');
const filterDatePicker = new DatePicker({
  element: filterDateDropdownElem.querySelector('.date-picker'),
  options: {
    dateFormat: 'd M',
  },
});
const filterDateDropdown = new Dropdown(filterDateDropdownElem, filterDatePicker, 'Дата');

const $facilitiesDropdowns = $('.form-elements__facilities-dropdown .dropdown');
$facilitiesDropdowns.each(function init() {
  const popupElem = this.querySelector('.items-counter');
  const itemsCounter = new ItemsCounter(popupElem);
  const dropdown = new Dropdown(this, itemsCounter, 'Удобства');
});
