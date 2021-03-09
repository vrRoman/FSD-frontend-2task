/* eslint-disable no-unused-vars */

import '@/sass/main.sass';
import '@/js/index';

import './search-room.pug';
import './search-room.sass';

import './images/room-img_1.jpg';
import './images/room-img_2.jpg';
import './images/room-img_3.jpg';
import './images/room-img_4.jpg';
import './images/room-img_5.jpg';
import './images/room-img_6.jpg';
import './images/room-img_7.jpg';
import './images/room-img_8.jpg';
import './images/room-img_9.jpg';
import './images/room-img_10.jpg';
import './images/room-img_11.jpg';
import './images/room-img_12.jpg';

import '@/common.blocks/range-slider/init';
import '@/common.blocks/room-card/init';
import '@/common.blocks/pagination/init';
import '@/common.blocks/header/init';
import '@/common.blocks/expandable-checkboxes/init';
import ItemsCounter from '@/common.blocks/items-counter/items-counter';
import Dropdown from '@/common.blocks/dropdown/dropdown';
import DatePicker from '@/common.blocks/date-picker/date-picker';

const dateDropdownElem = document.querySelector('.js-search-room__params-date .js-dropdown');
const datePicker = new DatePicker({
  element: dateDropdownElem.querySelector('.js-date-picker'),
  options: {
    dateFormat: 'd M',
  },
});
const dateDropdown = new Dropdown(dateDropdownElem, datePicker, 'Даты пребывания в отеле');

const guestsDropdownElem = document.querySelector('.js-search-room__params-guests .js-dropdown');
const guestsCounterElem = guestsDropdownElem.querySelector('.js-items-counter');
const guestsCounter = new ItemsCounter(guestsCounterElem, 'гостя');
const guestsDropdown = new Dropdown(guestsDropdownElem, guestsCounter, 'Сколько гостей');

const facilitiesDropdownElem = document.querySelector('.js-search-room__params-facilities .js-dropdown');
const facilitiesCounterElem = facilitiesDropdownElem.querySelector('.js-items-counter');
const facilitiesCounter = new ItemsCounter(facilitiesCounterElem);
const facilitiesDropdown = new Dropdown(facilitiesDropdownElem, facilitiesCounter, 'Удобства');
