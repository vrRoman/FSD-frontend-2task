/* eslint-disable no-unused-vars */

import DatePicker from '@/common.blocks/date-picker/DatePicker';

$('.js-date-picker').each(function init() {
  const datePicker = new DatePicker(this);
});
