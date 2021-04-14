const MARGIN = 50;
const BAR_PADDING = 20;

function drawAxis(ctx, canvasHeight, canvasWidth) {
  ctx.beginPath();
  ctx.moveTo(MARGIN, MARGIN);
  ctx.lineTo(MARGIN, canvasHeight - MARGIN);
  ctx.lineTo(canvasWidth - MARGIN, canvasHeight - MARGIN);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.stroke();
}

function drawXLabels(ctx, canvasHeight, canvasWidth, barWidth, Y, labels) {
  ctx.font = "15pt Arial";
  ctx.fillStyle = "black";
  for (const i in Y) {
    const x =
      MARGIN +
      BAR_PADDING +
      i * (barWidth + BAR_PADDING) +
      barWidth / 2 -
      ctx.measureText(labels[i]).width / 2;
    const y = canvasHeight - MARGIN + 10;
    ctx.textBaseline = "top";
    ctx.fillText(labels[i], x, y);
  }
}

function drawYLabels(ctx, canvasHeight, canvasWidth, Y) {
  const maximum = Math.max(...Y);
  const minimum = 0;

  const orderOfMagintude = Math.floor(Math.log10(maximum));
  const axisMaximum = Math.pow(10, orderOfMagintude + 1);
}

function drawUnderlay(ctx, canvasHeight, canvasWidth, barWidth, Y, labels) {
  drawAxis(ctx, canvasHeight, canvasWidth);
  drawXLabels(ctx, canvasHeight, canvasWidth, barWidth, Y, labels);
  drawYLabels(ctx, canvasHeight, canvasWidth, Y);
}

function drawBar(ctx, x0, y0, width, height) {
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y0 - height);
  ctx.lineTo(x0 + width, y0 - height);
  ctx.lineTo(x0 + width, y0);
  ctx.lineTo(x0, y0);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function drawValueLabel(ctx, x0, y0, barWidth, barHeight, value) {
  const x = x0 + barWidth / 2 - ctx.measureText(value).width / 2;
  const y = y0 - barHeight - 10;
  ctx.textBaseline = "bottom";
  ctx.fillStyle = "black";
  ctx.fillText(value, x, y);
}

function drawBarGraph(canvas, Y, labels) {
  const xLabels =
    labels !== undefined && labels.length === Y.length
      ? labels
      : Array(Y.length).fill().map((_, index) => index + 1);
  const style = window.getComputedStyle(canvas);
  const canvasWidth = parseInt(style.width);
  const canvasHeight = parseInt(style.height);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const maximum = Math.max(...Y);
  const barWidth =
    (canvasWidth - 2 * MARGIN - (Y.length + 1) * BAR_PADDING) / Y.length;
  const y0 = canvasHeight - MARGIN;

  drawUnderlay(ctx, canvasHeight, canvasWidth, barWidth, Y, xLabels);

  for (const i in Y) {
    const x0 = MARGIN + BAR_PADDING + i * (barWidth + BAR_PADDING);
    const barHeight = (Y[i] / maximum) * (canvasHeight - 2 * MARGIN);
    drawBar(ctx, x0, y0, barWidth, barHeight);
    drawValueLabel(ctx, x0, y0, barWidth, barHeight, Y[i].toFixed(2));
  }
}

define([], () => {
  return drawBarGraph;
});
