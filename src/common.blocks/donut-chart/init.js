/* eslint-disable no-unused-vars */

import DonutChart from '@/common.blocks/donut-chart/donut-chart';

$('.js-donut-chart').each(function init() {
  const donutChart = new DonutChart(this);
});
