const MARGIN2 = 50;
const LABEL_MARGIN = 25;
const COLORS = [
  "rgb(80, 101, 230)",
  "rgb(230, 165, 80)",
  "rgb(151, 227, 136)",
  "rgb(227, 116, 116)",
  "rgb(227, 219, 134)",
  "rgb(230, 158, 230)",
];

function drawPieSlice(ctx, x0, y0, radius, phi0, phi, color) {
  ctx.beginPath();
  ctx.arc(x0, y0, radius, phi0, phi, false);
  ctx.lineTo(x0, y0);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLabel(ctx, x0, y0, radius, phi, value) {
  const x = x0 + (radius + LABEL_MARGIN) * Math.cos(phi) - ctx.measureText(value).width / 2;
  const y = y0 + (radius + LABEL_MARGIN) * Math.sin(phi);
  ctx.font = "15pt Arial";
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
}

function drawPieChart(canvas, Y) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const canvasWidth = parseInt(window.getComputedStyle(canvas).width);
  const canvasHeight = parseInt(window.getComputedStyle(canvas).height);
  console.log(canvasWidth);
  const x0 = canvasWidth / 2;
  const y0 = canvasHeight / 2;
  const radius = Math.min(x0, y0) - MARGIN2;
  const sum = Y.reduce((acc, val) => {
    return acc + val;
  }, 0);
  let phi0 = -Math.PI / 2;
  let phi = phi0;
  for (const i in Y) {
    phi = phi0 + (Y[i] / sum) * 2 * Math.PI;

    // Choose color so that the are no slices with the same color next to each other
    const color =
      i === Y.length - 1 && i % COLORS.length === 0
        ? COLORS[1]
        : COLORS[i % COLORS.length];

    drawPieSlice(ctx, x0, y0, radius, phi0, phi, color);
    drawLabel(ctx, x0, y0, radius, (phi + phi0) / 2, Y[i].toFixed(2));
    phi0 = phi;
  }
}

define([], () => {
  return drawPieChart;
});
