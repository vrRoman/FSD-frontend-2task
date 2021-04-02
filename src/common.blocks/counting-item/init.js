/* eslint-disable no-unused-vars */

import CountingItem from '@/common.blocks/counting-item/CountingItem';

$('.js-counting-item').each(function init() {
  const countingItem = new CountingItem(this);
});
