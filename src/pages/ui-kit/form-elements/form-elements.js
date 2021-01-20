import '@/js/index';

import './form-elements.pug';

import '@/sass/main.sass';
import '@/sass/ui-kit.sass';
import './form-elements.sass';

import '@blocks/dropdown/dropdown';
import { setDatepickerDate } from '@blocks/date-picker/datepicker';
import '@blocks/text-field/text-field';
import '@blocks/like-button/like-button';
import '@blocks/rate-button/rate-button';
import '@blocks/range-slider/range-slider';
import '@blocks/pagination/pagination';
import '@blocks/list/list';

import './images/avatar_murad.png';

setDatepickerDate($('.js-date-picker_single'), [new Date(2019, 7, 19), new Date(2019, 7, 23)]);
