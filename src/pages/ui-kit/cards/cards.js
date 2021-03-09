/* eslint-disable no-unused-vars */

import '@/js/index';

import './cards.pug';

import '@/sass/main.sass';
import './cards.sass';

import './images/room-img_1.jpg';
import './images/room-img_2.jpg';
import './images/room-img_3.jpg';
import './images/room-img_4.jpg';
import './images/room-img_5.jpg';

import '@/common.blocks/signup-card/signup-card';
import '@/common.blocks/booking-card/init';
import '@/common.blocks/search-card/init';
import '@/common.blocks/room-card/init';
import DatePicker from '@/common.blocks/date-picker/date-picker';

const datepickerElem = document.querySelector('.js-date-picker-demo .js-date-picker');
const datepicker = new DatePicker({
  element: datepickerElem,
  initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
});
