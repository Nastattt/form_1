let depositInput = document.getElementById('deposit');
let srockInput = document.getElementById('srock');
let rateInput = document.getElementById('rate');
let initialDepositEl = document.getElementById('initial-deposit');
let finalDepositEl = document.getElementById('final-deposit');
let chartCanvas = document.getElementById('chart');

let chart = null;

let updateChart = () => {
let deposit = parseFloat(depositInput.value);
let srock = parseFloat(srockInput.value);
let rate = parseFloat(rateInput.value);

let simpleInterest = (deposit * srock * rate) / 100;
let finalDeposit = deposit + simpleInterest;

initialDepositEl.textContent = deposit.toFixed(2);
finalDepositEl.textContent = finalDeposit.toFixed(2);

let chartData = {
    labels: ['Начальная сумма', 'Конечная сумма'],
    datasets: [{
      label: 'Депозит',
      data: [deposit, finalDeposit],
      backgroundColor: ['#777', '#333'],
    }],
};

if (chart) {
    chart.data = chartData;
    chart.update();
} else {
    chart = new Chart(chartCanvas, {
    type: 'bar',
    data: chartData,
    options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
        beginAtZero: true,
        ticks: {
            callback: (value) => value.toFixed(2),
        },
        },
    },
    plugins: {
        legend: {
        display: false,
        },
        tooltip: {
        callbacks: {
            label: (context) => {
            let label = context.dataset.label || '';
            let value = context.parsed.y;
            return `${label}: ${value.toFixed(2)}`;
            },
        },
        },
    },
    },
});
}

chart.canvas.parentNode.style.height = '300px';
};

document.getElementById('calculator').addEventListener('submit', (e) => {
  e.preventDefault();
  updateChart();
});

updateChart();