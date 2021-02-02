import '@/js/index';

import './form-elements.pug';

import '@/sass/main.sass';
import '@/sass/ui-kit.sass';
import './form-elements.sass';

import '@common.blocks/dropdown/dropdown';
import { setDatepickerDate } from '@common.blocks/date-picker/date-picker';
import '@common.blocks/text-field/text-field';
import '@common.blocks/like-button/like-button';
import '@common.blocks/rate-button/rate-button';
import '@common.blocks/range-slider/range-slider';
import '@common.blocks/pagination/pagination';
import '@common.blocks/list/list';

import './images/avatar_murad.png';

setDatepickerDate($('.js-date-picker_single'), [new Date(2019, 7, 19), new Date(2019, 7, 23)]);
