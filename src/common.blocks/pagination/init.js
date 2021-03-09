/* eslint-disable no-unused-vars */

import Pagination from '@/common.blocks/pagination/pagination';

$('.js-pagination').each(function init() {
  const pagination = new Pagination(this);
});
