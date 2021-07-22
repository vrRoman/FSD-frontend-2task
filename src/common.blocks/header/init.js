import Header from '@/common.blocks/header/Header';

$('.js-header').each(function init() {
  const header = new Header(this);
  header.init();
});
