import DonutChart from '@/common.blocks/donut-chart/DonutChart';

$('.js-donut-chart').each(function init() {
  const donutChart = new DonutChart(this);
  donutChart.init();
});
