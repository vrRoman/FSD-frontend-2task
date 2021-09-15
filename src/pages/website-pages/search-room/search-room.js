import '@/styles/main.sass';
import '@/js/main';
import '@/common.blocks/header/init';
import '@/common.blocks/footer/init';
import '@/common.blocks/items-counter/init';
import '@/common.blocks/date-picker/init';
import '@/common.blocks/dropdown/init';
import '@/common.blocks/range-slider/init';
import '@/common.blocks/expandable-checkboxes/init';
import '@/common.blocks/room-card/init';
import '@/common.blocks/pagination/init';
import importAll from '@/js/helpers/importAll';

import './search-room.sass';

importAll(require.context('./images', true, /\.(jpg)$/i));
