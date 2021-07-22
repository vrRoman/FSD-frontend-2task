import Pagination from '@/common.blocks/pagination/Pagination';

$('.js-pagination').each(function init() {
  const pagination = new Pagination(this);
  pagination.init();
});
