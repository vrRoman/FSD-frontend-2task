import { setDatepickerDate } from '@common.blocks/date-picker/date-picker';

setDatepickerDate(
  $('.js-booking-card-card__dates .js-date-picker_double'),
  [new Date(2019, 7, 19), new Date(2019, 7, 23)],
);
