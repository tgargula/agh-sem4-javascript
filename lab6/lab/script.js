const CANVAS_HEIGHT = 300;
const CANVAS_WIDTH = 400;
const COLORS = [
  'rgb(255, 0, 0)',
  'rgb(255, 64, 0)',
  'rgb(255, 128, 0)',
  'rgb(255, 191, 0)',
  'rgb(255, 255, 0)',
  'rgb(191, 255, 0)',
  'rgb(128, 255, 0)',
  'rgb(64, 255, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 255, 64)',
  'rgb(0, 255, 128)',
  'rgb(0, 255, 191)',
  'rgb(0, 255, 255)',
  'rgb(0, 191, 255)',
  'rgb(0, 128, 255)',
  'rgb(0, 64, 255)',
  'rgb(0, 0, 255)',
  'rgb(64, 0, 255)',
  'rgb(128, 0, 255)',
  'rgb(191, 0, 255)',
  'rgb(255, 0, 255)',
  'rgb(255, 0, 191)',
  'rgb(255, 0, 128)',
  'rgb(255, 0, 64)',
  'rgb(255, 0, 0)',
];

const randomColor = () => {
  return COLORS[parseInt(Math.random() * COLORS.length)];
};

const random = (low, high) => {
  return Math.random() * (high - low) + low;
};

const circleParams = (x, y) => {
  return {
    center: [x, y],
    radius: random(0, 100),
    color: randomColor(),
  };
};

const rectangleParams = (x, y) => {
  const height = random(0, CANVAS_WIDTH - x);
  const width = random(0, CANVAS_HEIGHT - y);
  return {
    x: x,
    y: y,
    height: height,
    width: width,
    color: randomColor(),
  };
};

const triangleParams = (x, y) => {
  const x2 = random(0, CANVAS_WIDTH);
  const x3 = random(0, CANVAS_WIDTH);
  const y2 = random(0, CANVAS_HEIGHT);
  const y3 = random(0, CANVAS_HEIGHT);
  return {
    points: [
      [x, y],
      [x2, y2],
      [x3, y3],
    ],
    color: randomColor(),
  };
};

module.exports = {
  circleParams,
  rectangleParams,
  triangleParams,
};
