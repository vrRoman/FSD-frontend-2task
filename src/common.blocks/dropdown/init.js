import '@/common.blocks/text-field/init';
import Dropdown from '@/common.blocks/dropdown/Dropdown';

$('.js-dropdown').each(function init() {
  const dropdown = new Dropdown(this);
  dropdown.init();
});
