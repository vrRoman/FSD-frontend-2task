/* eslint-disable no-unused-vars */

import ItemsCounter from '@/common.blocks/items-counter/items-counter';

$('.js-items-counter').each(function init() {
  const itemsCounter = new ItemsCounter(this);
});
