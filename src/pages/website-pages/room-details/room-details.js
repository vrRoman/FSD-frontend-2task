/* eslint-disable no-unused-vars */

import '@/js/index';

import '@/sass/main.sass';

import './room-details.pug';
import './room-details.sass';

import './images/room_1.jpg';
import './images/room_2.jpg';
import './images/room_3.jpg';
import './images/avatar_murad.png';
import './images/avatar_patricia.png';

import DonutChart from '@/common.blocks/donut-chart/donut-chart';
import Header from '@/common.blocks/header/header';
import Comment from '@/common.blocks/comment/comment';
import BookingCard from '@/common.blocks/booking-card/booking-card';

const chart = new DonutChart(document.querySelector('.donut-chart'));

const header = new Header(document.querySelector('.header'));

const $comments = $('.comment');
$comments.each(function init() {
  const comment = new Comment(this);
});

const bookingCard = new BookingCard(document.querySelector('.booking-card'));
