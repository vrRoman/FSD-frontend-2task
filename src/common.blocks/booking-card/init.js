/* eslint-disable no-unused-vars */

import BookingCard from '@/common.blocks/booking-card/booking-card';

$('.booking-card').each(function init() {
  const bookingCard = new BookingCard(this);
});
