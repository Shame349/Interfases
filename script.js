const ref = database.ref("/Proyecto_IntGraficas/coordenadas");

ref.on("value", (snapshot) => {
  const data = snapshot.val();
  const labels = [];
  const xValues = [];
  const yValues = [];

  Object.keys(data).forEach((key) => {
    const coord = data[key];
    const [x, y] = coord.split("_").map(Number);
    labels.push(`Punto ${key}`);
    xValues.push(x);
    yValues.push(y);
  });

  drawChart(xValues, yValues, labels);
});

let chartInstance;

function drawChart(xValues, yValues, labels) {
  const ctx = document.getElementById('coordenadasChart').getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'scatter',
    data: {
      labels: labels,
      datasets: [{
        label: 'Coordenadas',
        data: xValues.map((x, i) => ({ x: x, y: yValues[i] })),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'X' } },
        y: { title: { display: true, text: 'Y' } }
      }
    }
  });
}
