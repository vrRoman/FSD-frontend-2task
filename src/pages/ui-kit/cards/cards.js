import '@/js/index';

import './cards.pug';

import '@/sass/main.sass';
import '@/sass/ui-kit.sass';
import './cards.sass';

import { setDatepickerDate, onSelect } from '@blocks/date-picker/date-picker';
import '@blocks/dropdown/dropdown';
import '@blocks/rate-button/rate-button';

import '@blocks/cards/booking-card/booking-card';
import '@blocks/cards/room-card/room-card';
import '@blocks/cards/signup-card/signup-card';

import './images/room-img_1.jpg';
import './images/room-img_2.jpg';
import './images/room-img_3.jpg';
import './images/room-img_4.jpg';
import './images/room-img_5.jpg';

const clearBtn = '<button class="ui-datepicker-current '
  + 'ui-state-default ui-corner-all '
  + 'ui-datepicker-custom-button ui-datepicker-clear-button js-ui-datepicker-clear-button" '
  + 'type="button">Очистить</button> ';

const applyBtn = '<button class="ui-datepicker-current '
  + 'ui-state-default ui-corner-all '
  + 'ui-datepicker-custom-button ui-datepicker-apply-button js-ui-datepicker-apply-button" '
  + 'type="button">Применить</button> ';

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const monthNamesShort = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const dayNamesShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const dayNamesMin = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

$('.js-date-picker-example').datepicker({
  range: 'period',
  showButtonPanel: true,
  currentText: clearBtn + applyBtn,
  firstDay: 1,
  showOtherMonths: true,
  selectOtherMonths: true,
  dateFormat: 'd M',
  monthNames,
  monthNamesShort,
  dayNames,
  dayNamesShort,
  dayNamesMin,
  onSelect,
});

setDatepickerDate($('.js-date-picker-example'), [new Date(2019, 7, 19), new Date(2019, 7, 23)]);
