import ExpandableCheckboxes from '@/common.blocks/expandable-checkboxes/ExpandableCheckboxes';

$('.js-expandable-checkboxes').each(function init() {
  const expandableCheckboxes = new ExpandableCheckboxes(this);
  expandableCheckboxes.init();
});
