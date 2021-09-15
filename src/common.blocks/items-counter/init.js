import '@/common.blocks/counting-item/init';
import ItemsCounter from '@/common.blocks/items-counter/ItemsCounter';

$('.js-items-counter').each(function init() {
  const itemsCounter = new ItemsCounter(this);
  itemsCounter.init();
});
