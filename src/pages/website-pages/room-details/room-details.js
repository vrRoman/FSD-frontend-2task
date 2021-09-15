import '@/styles/main.sass';
import '@/js/main';
import '@/common.blocks/header/init';
import '@/common.blocks/footer/init';
import '@/common.blocks/comment/init';
import '@/common.blocks/booking-card/init';
import '@/common.blocks/donut-chart/init';
import importAll from '@/js/helpers/importAll';

import './room-details.sass';

importAll(require.context('./images', true, /\.(png|jpe?g)$/i));
