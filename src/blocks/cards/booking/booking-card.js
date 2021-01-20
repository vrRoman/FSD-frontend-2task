import { setDatepickerDate } from '@blocks/date-picker/datepicker';

setDatepickerDate(
  $('.js-booking-card__dates .js-date-picker_double'),
  [new Date(2019, 7, 19), new Date(2019, 7, 23)],
);
