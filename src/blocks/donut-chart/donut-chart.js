import 'chart.js/dist/Chart.bundle.min'

let ctx = document.querySelector('.donut-chart__chart canvas').getContext('2d')

let donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Удовлетворительно', 'Хорошо', 'Великолепно', 'Разочарован'],
        datasets: [{
            data: [260, 260, 520, 0],
            backgroundColor: [
                (function() {
                    let gradient = ctx.createLinearGradient(60, 0, 60, 120)
                    gradient.addColorStop(0, '#BC9CFF')
                    gradient.addColorStop(1, '#8BA4F9')
                    return gradient
                })(),
                (function() {
                    let gradient = ctx.createLinearGradient(60, 0, 60, 120)
                    gradient.addColorStop(0, '#6FCF97')
                    gradient.addColorStop(1, '#66D2EA')
                    return gradient
                })(),
                (function() {
                    let gradient = ctx.createLinearGradient(60, 0, 60, 120)
                    gradient.addColorStop(0, '#FFE39C')
                    gradient.addColorStop(1, '#FFBA9C')
                    return gradient
                })(),
                'black'
            ],
            borderColor: '#fff',
            borderWidth: 3
        }]
    },
    options: {
        legend: {
            display: false
        },
        responsive: false,
        maintainAspectRatio: false,
        cutoutPercentage: 87
    }
})


drawValue($('.donut-chart__list li'), document.querySelector('.donut-chart__value'), 2)

function drawValue(listItems, valueItem, defaultItem = false) {
    let defaultValueHTML = ''
    if (defaultItem) {
        defaultValueHTML = `<h1 style="color: ${listItems[defaultItem].dataset.color}">${listItems[defaultItem].dataset.value}</h1>
                               <h3 style="color: ${listItems[defaultItem].dataset.color}">голосов</h3>`
    }
    valueItem.innerHTML = defaultValueHTML

    for (let item of listItems) {
        item.onmouseover = () => {
            valueItem.innerHTML = `<h1 style="color: ${item.dataset.color}">${item.dataset.value}</h1>
                                   <h3 style="color: ${item.dataset.color}">голосов</h3>`
        }
        item.onmouseout = () => {
            valueItem.innerHTML = defaultValueHTML
        }
    }
}
