import Chart from 'chart.js/dist/Chart.bundle.min';

class DonutChart {
  constructor(element) {
    this.element = element;
    this.chartRadius = 60;
    this.chartElement = null;
    this.chartContext = null;
  }

  init() {
    this.chartElement = this.getChartElement();
    this.chartContext = this.chartElement.getContext('2d');

    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(this.chartContext, {
      type: 'doughnut',
      data: {
        labels: ['Удовлетворительно', 'Хорошо', 'Великолепно', 'Разочарован'],
        datasets: [{
          data: [260, 260, 520, 0],
          backgroundColor: [
            this.createCtxGradient('#BC9CFF', '#8BA4F9'),
            this.createCtxGradient('#6FCF97', '#66D2EA'),
            this.createCtxGradient('#FFE39C', '#FFBA9C'),
            'black',
          ],
          borderColor: '#fff',
          borderWidth: 3,
        }],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: false,
        maintainAspectRatio: false,
        cutoutPercentage: 87,
      },
    });
  }

  getChartElement() {
    const chartSelector = '.js-donut-chart__canvas';
    return this.element.querySelector(chartSelector);
  }

  createCtxGradient(firstColor, secondColor) {
    const firstPoint = [this.chartRadius, 0];
    const secondPoint = [this.chartRadius, this.chartRadius * 2];

    const gradient = this.chartContext.createLinearGradient(...firstPoint, ...secondPoint);
    gradient.addColorStop(0, firstColor);
    gradient.addColorStop(1, secondColor);
    return gradient;
  }
}

export default DonutChart;
