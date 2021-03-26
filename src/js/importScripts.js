import importAll from './importAll';

// counting-item, items-counter, date-picker импортируются отдельно для
// соблюдения их последователдьности
importAll(
  require.context('../common.blocks/counting-item/', true, /\.js$/),
  require.context('../common.blocks/items-counter/', true, /\.js$/),
  require.context('../common.blocks/date-picker/', true, /\.js$/),
  require.context('../common.blocks/', true, /\.js$/),
  require.context('../pages/', true, /\.js$/),
);
