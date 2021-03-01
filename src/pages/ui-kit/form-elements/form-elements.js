/* eslint-disable no-unused-vars */

import '@/js/index';

import './form-elements.pug';

import '@/sass/main.sass';
import './form-elements.sass';

import './images/avatar_murad.png';

import '@/common.blocks/text-field/text-field';
import Dropdown from '@/common.blocks/dropdown/dropdown';
import ItemsCounter from '@/common.blocks/items-counter/items-counter';
import DatePicker from '@/common.blocks/date-picker/date-picker';
import LikeButton from '@/common.blocks/like-button/like-button';
import RangeSlider from '@/common.blocks/range-slider/range-slider';
import Pagination from '@/common.blocks/pagination/pagination';
import ExpandableCheckboxes from '@/common.blocks/expandable-checkboxes/expandable-checkboxes';
import Comment from '@/common.blocks/comment/comment';

// Dropdowns
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

// Like buttons
const $likeButtonElems = $('.form-elements__like-button .like-button');
$likeButtonElems.each(function init() {
  const likeButton = new LikeButton(this);
});

// Range slider
const rangeSlider = new RangeSlider(document.querySelector('.range-slider'));

// Pagination
const pagination = new Pagination(document.querySelector('.pagination'));

// Expandable checkbox list
const $expandableElems = $('.expandable-checkboxes');
$expandableElems.each(function init() {
  const expandable = new ExpandableCheckboxes(this);
});

// Comment
const comment = new Comment(document.querySelector('.comment'));
