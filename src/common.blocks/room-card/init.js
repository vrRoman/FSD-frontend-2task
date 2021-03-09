/* eslint-disable no-unused-vars */

import RoomCard from '@/common.blocks/room-card/room-card';

$('.room-card').each(function init() {
  const roomCard = new RoomCard(this);
});
