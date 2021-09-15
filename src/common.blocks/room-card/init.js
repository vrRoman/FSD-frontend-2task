import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.scss';

import RoomCard from '@/common.blocks/room-card/RoomCard';

$('.js-room-card').each(function init() {
  const roomCard = new RoomCard(this);
  roomCard.init();
});
