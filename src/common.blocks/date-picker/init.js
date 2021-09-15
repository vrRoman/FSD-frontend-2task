import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/ui/widgets/datepicker';

import '@/libs/jquery.datepicker.extension.range.min';
import DatePicker from '@/common.blocks/date-picker/DatePicker';

$('.js-date-picker').each(function init() {
  const datePicker = new DatePicker(this);
  datePicker.init();
});
