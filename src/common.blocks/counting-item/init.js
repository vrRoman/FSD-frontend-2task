/* eslint-disable no-unused-vars */

import CountingItem from '@/common.blocks/counting-item/counting-item';

$('.js-counting-item').each(function init() {
  const countingItem = new CountingItem(this);
});
