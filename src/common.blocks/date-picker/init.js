/* eslint-disable no-unused-vars */

import DatePicker from '@/common.blocks/date-picker/date-picker';

$('.js-date-picker').each(function init() {
  const datePicker = new DatePicker(this);
});
