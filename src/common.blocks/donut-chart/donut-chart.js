import Chart from 'chart.js/dist/Chart.bundle.min';

class DonutChart {
  constructor(elem) {
    this.elem = elem;

    this.init();
  }

  init() {
    const ctx = this.getChartElem().getContext('2d');
    // eslint-disable-next-line no-unused-vars
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Удовлетворительно', 'Хорошо', 'Великолепно', 'Разочарован'],
        datasets: [{
          data: [260, 260, 520, 0],
          backgroundColor: [
            (function getGradient() {
              const gradient = ctx.createLinearGradient(60, 0, 60, 120);
              gradient.addColorStop(0, '#BC9CFF');
              gradient.addColorStop(1, '#8BA4F9');
              return gradient;
            }()),
            (function getGradient() {
              const gradient = ctx.createLinearGradient(60, 0, 60, 120);
              gradient.addColorStop(0, '#6FCF97');
              gradient.addColorStop(1, '#66D2EA');
              return gradient;
            }()),
            (function getGradient() {
              const gradient = ctx.createLinearGradient(60, 0, 60, 120);
              gradient.addColorStop(0, '#FFE39C');
              gradient.addColorStop(1, '#FFBA9C');
              return gradient;
            }()),
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

  getChartElem() {
    const chartSelector = '.js-donut-chart__canvas';
    return this.elem.querySelector(chartSelector);
  }
}

export default DonutChart;
