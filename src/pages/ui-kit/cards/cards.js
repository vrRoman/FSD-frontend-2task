import '@/styles/main.sass';
import '@/js/main';
import '@/common.blocks/search-card/init';
import '@/common.blocks/signup-card/init';
import '@/common.blocks/signin-card/init';
import '@/common.blocks/booking-card/init';
import '@/common.blocks/room-card/init';
import '@/common.blocks/date-picker/init';
import importAll from '@/js/helpers/importAll';

import './cards.sass';

importAll(require.context('./images', true, /\.jpg$/i));
