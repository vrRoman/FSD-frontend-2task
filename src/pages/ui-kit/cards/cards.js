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
import SearchCard from '@/common.blocks/search-card/search-card';
import BookingCard from '@/common.blocks/booking-card/booking-card';
import DatePicker from '@/common.blocks/date-picker/date-picker';
import RoomCard from '@/common.blocks/room-card/room-card';

const searchCardElem = document.querySelector('.search-card');
const bookingCardElem = document.querySelector('.booking-card');
const datepickerElem = document.querySelector('.date-picker-demo .js-date-picker');
const $roomCards = $('.room-card');

const searchCard = new SearchCard(searchCardElem);
const bookingCard = new BookingCard(bookingCardElem);
const datepickerCard = new DatePicker({
  element: datepickerElem,
  initialDate: [new Date(2019, 7, 19), new Date(2019, 7, 23)],
});
$roomCards.each(function initRoomCards() {
  const roomCard = new RoomCard(this);
});
