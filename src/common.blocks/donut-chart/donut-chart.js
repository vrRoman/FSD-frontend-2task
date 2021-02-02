import Chart from 'chart.js/dist/Chart.bundle.min';

function drawValue(listItems, valueItem, defaultItem = false) {
  const val = valueItem;

  let defaultValueHTML = '';
  if (defaultItem) {
    defaultValueHTML = `<h1 class="donut-chart__value-number" style="color: ${listItems[defaultItem].dataset.color}">${listItems[defaultItem].dataset.value}</h1>
                           <h3 class="donut-chart__value-measure" style="color: ${listItems[defaultItem].dataset.color}">голосов</h3>`;
  }
  val.innerHTML = defaultValueHTML;

  for (let i = 0; i < listItems.length; i += 1) {
    const item = listItems[i];
    item.onmouseover = () => {
      val.innerHTML = `<h1 class="donut-chart__value-number" style="color: ${item.dataset.color}">${item.dataset.value}</h1>
                               <h3 class="donut-chart__value-measure" style="color: ${item.dataset.color}">голосов</h3>`;
    };
    item.onmouseout = () => {
      val.innerHTML = defaultValueHTML;
    };
  }
}

const ctx = document.querySelector('.donut-chart__chart canvas').getContext('2d');
// eslint-disable-next-line no-unused-vars
const donutChart = new Chart(ctx, {
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

drawValue($('.js-donut-chart__list li'), document.querySelector('.js-donut-chart__value'), 2);
