import '@/sass/main.sass';
import '@/sass/ui-kit.sass';

import './search-room.pug';
import './search-room.sass';

import { setDatepickerDate } from '@blocks/date-picker/date-picker';
import '@blocks/dropdown/dropdown';
import '@blocks/range-slider/range-slider';
import '@blocks/list/list';
import '@blocks/cards/room-card/room-card';
import '@blocks/pagination/pagination';
import '@blocks/header/header';

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

setDatepickerDate($('.js-date-picker'), [new Date(2019, 7, 19), new Date(2019, 7, 23)]);
