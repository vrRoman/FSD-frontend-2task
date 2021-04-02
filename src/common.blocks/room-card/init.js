/* eslint-disable no-unused-vars */

import RoomCard from '@/common.blocks/room-card/RoomCard';

$('.js-room-card').each(function init() {
  const roomCard = new RoomCard(this);
});
