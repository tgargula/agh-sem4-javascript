const COLORS = [
  'rgb(255, 0, 0)',
  'rgb(255, 28, 0)',
  'rgb(255, 43, 0)',
  'rgb(254, 55, 0)',
  'rgb(254, 65, 0)',
  'rgb(253, 74, 0)',
  'rgb(252, 82, 0)',
  'rgb(250, 90, 0)',
  'rgb(249, 97, 0)',
  'rgb(247, 104, 0)',
  'rgb(245, 111, 0)',
  'rgb(243, 117, 0)',
  'rgb(240, 124, 0)',
  'rgb(238, 130, 0)',
  'rgb(235, 136, 0)',
  'rgb(232, 142, 0)',
  'rgb(228, 147, 0)',
  'rgb(225, 153, 0)',
  'rgb(221, 158, 0)',
  'rgb(217, 164, 0)',
  'rgb(213, 169, 0)',
  'rgb(208, 174, 0)',
  'rgb(203, 179, 0)',
  'rgb(199, 184, 0)',
  'rgb(193, 189, 0)',
  'rgb(188, 194, 0)',
  'rgb(182, 199, 0)',
  'rgb(176, 204, 0)',
  'rgb(170, 208, 0)',
  'rgb(163, 213, 0)',
  'rgb(155, 217, 0)',
  'rgb(148, 222, 0)',
  'rgb(139, 226, 0)',
  'rgb(130, 230, 0)',
  'rgb(120, 235, 0)',
  'rgb(108, 239, 0)',
  'rgb(95, 243, 0)',
  'rgb(79, 247, 0)',
  'rgb(57, 251, 0)',
  'rgb(11, 255, 0)',
];

COOLDOWN = 'rgb(127, 127, 127)';

class GameSquare extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.addEventListener('refresh', () =>
      this.dispatchEvent(new CustomEvent('render'))
    );
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  set x(value) {
    this.setAttribute('x', value);
  }

  set y(value) {
    this.setAttribute('y', value);
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  set cooldown(value) {
    this.setAttribute('cooldown', value);
  }

  set interval(value) {
    this.setAttribute('interval', value);
  }

  set speed(value) {
    this.setAttribute('speed', value);
  }

  set stopped(value) {
    this.setAttribute('stopped', value);
  }

  get size() {
    return this.getAttribute('size');
  }

  get x() {
    return this.getAttribute('x');
  }

  get y() {
    return this.getAttribute('y');
  }

  get value() {
    return this.getAttribute('value');
  }

  get cooldown() {
    return this.getAttribute('cooldown');
  }

  get interval() {
    return this.getAttribute('interval');
  }

  get speed() {
    return this.getAttribute('speed');
  }

  get stopped() {
    return this.getAttribute('stopped');
  }

  static get observedAttributes() {
    return [
      'size',
      'x',
      'y',
      'value',
      'cooldown',
      'interval',
      'speed',
      'stopped',
    ];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'value' || prop === 'cooldown') {
      this.dispatchEvent(new CustomEvent('render'));
    }
    if (prop === 'speed') {
      this.setInterval();
    }
  }

  setInterval() {
    window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      if (Number(this.stopped) === 0) {
        this.value = this.value - 1;
      }
      if (Number(this.value) === -20) {
        this.dispatchEvent(new CustomEvent('stop'));
      }
    }, 1000 / Number(this.speed));
  }

  connectedCallback() {
    this.cooldown = 0;
    window.setInterval(() => {
      this.cooldown = Number(this.cooldown) > 0 ? Number(this.cooldown) - 1 : 0;
    }, 1000);
  }

  collides(x, y) {
    const size = Number(this.size);
    const sx = Number(this.x);
    const sy = Number(this.y);
    return Math.abs(x - sx) < size && Math.abs(y - sy) < size;
  }

  start() {
    this.stopped = 0;
    this.setInterval();
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');
    const x = Number(this.x);
    const y = Number(this.y);
    const size = Number(this.size);
    const value = Number(this.value);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x, y);
    ctx.fillStyle = this.cooldown > 0 ? COOLDOWN : COLORS[value + 19];
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = `${size / 2}px Verdana`;
    ctx.textAlign = 'center';
    ctx.fillText(value, x + size / 2, y + (3 * size) / 4);
  }
}

class GameCircle extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.addEventListener('start', () => this.start());
    window.addEventListener('keydown', (ev) => {
      console.log(`Pressed ${ev.code}`);
      switch (ev.code) {
        case 'ArrowDown':
        case 'KeyS':
          this.direction = 'S';
          break;
        case 'ArrowUp':
        case 'KeyW':
          this.direction = 'N';
          break;
        case 'ArrowLeft':
        case 'KeyA':
          this.direction = 'W';
          break;
        case 'ArrowRight':
        case 'KeyD':
          this.direction = 'E';
          break;
      }
    });
  }

  set radius(value) {
    this.setAttribute('radius', value);
  }

  set x(value) {
    this.setAttribute('x', value);
  }

  set y(value) {
    this.setAttribute('y', value);
  }

  set speed(value) {
    this.setAttribute('speed', value);
  }

  set direction(value) {
    this.setAttribute('direction', value);
  }

  set stopped(value) {
    this.setAttribute('stopped', value);
  }

  get radius() {
    return this.getAttribute('radius');
  }

  get x() {
    return this.getAttribute('x');
  }

  get y() {
    return this.getAttribute('y');
  }

  get speed() {
    return this.getAttribute('speed');
  }

  get direction() {
    return this.getAttribute('direction');
  }

  get stopped() {
    return this.getAttribute('stopped');
  }

  static get observedAttributes() {
    return ['radius', 'x', 'y', 'speed', 'direction', 'stopped'];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'x' || prop === 'y') {
      this.dispatchEvent(new CustomEvent('render'));
      this.dispatchEvent(new CustomEvent('checkCollisions'));
    }
  }

  connectedCallback() {
    // pass
  }

  collides(x, y) {
    // Simplified collisions
    const size = Number(this.radius * 2);
    const sx = Number(this.x) - size / 2;
    const sy = Number(this.y) - size / 2;
    return Math.abs(x - sx) < size && Math.abs(y - sy) < size;
  }

  nextFrame() {
    const y = Number(this.y);
    const x = Number(this.x);
    const speed = Number(this.speed);
    switch (this.direction) {
      case 'N':
        this.y = y - speed;
        break;
      case 'S':
        this.y = y + speed;
        break;
      case 'E':
        this.x = x + speed;
        break;
      case 'W':
        this.x = x - speed;
    }
    if (Number(this.stopped) === 0)
      window.requestAnimationFrame(() => {
        this.nextFrame();
      });
  }

  start() {
    this.stopped = 0;
    window.requestAnimationFrame(() => {
      this.nextFrame();
    });
  }

  correctPosition(width, height) {
    if (this.x > width || this.x < 0) {
      this.x = (Number(this.x) + width) % width;
    }
    if (this.y > height || this.y < 0) {
      this.y = (Number(this.y) + height) % height;
    }
  }

  draw(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.dispatchEvent(new CustomEvent('refresh'));
    this.correctPosition(canvas.width, canvas.height);

    // Base
    this.draw(ctx, this.x, this.y);

    // Corners
    const outRight = Number(this.x) + Number(this.radius) > canvas.width;
    const outLeft = this.x - this.radius < 0;
    const outDown = Number(this.y) + Number(this.radius) > canvas.height;
    const outUp = this.y - this.radius < 0;

    const outLeftX = Number(this.x) + canvas.width;
    const outRightX =
      ((Number(this.x) + Number(this.radius)) % canvas.width) - this.radius;
    const outDownY =
      ((Number(this.y) + Number(this.radius)) % canvas.height) - this.radius;
    const outUpY = Number(this.y) + canvas.height;

    if (outRight && outUp) this.draw(ctx, outRightX, outUpY);
    if (outRight && outDown) this.draw(ctx, outRightX, outDownY);
    if (outLeft && outUp) this.draw(ctx, outLeftX, outUpY);
    if (outLeft && outDown) this.draw(ctx, outLeftX, outDownY);

    if (outRight) this.draw(ctx, outRightX, this.y);
    if (outLeft) this.draw(ctx, outLeftX, this.y);
    if (outDown) this.draw(ctx, this.x, outDownY);
    if (outUp) this.draw(ctx, this.x, outUpY);
  }
}

class GameCanvas extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  set height(value) {
    this.setAttribute('height', value);
  }

  set width(value) {
    this.setAttribute('width', value);
  }

  set elementSize(value) {
    this.setAttribute('elementSize', value);
  }

  set maxSquares(value) {
    this.setAttribute('maxSquares', value);
  }

  set squares(value) {
    this.setAttribute('squares', value);
  }

  set squareSpeed(value) {
    this.setAttribute('squareSpeed', value);
  }

  set stopped(value) {
    this.setAttribute('stopped', value);
  }

  get height() {
    return this.getAttribute('height');
  }

  get width() {
    return this.getAttribute('width');
  }

  get elementSize() {
    return this.getAttribute('elementSize');
  }

  get squares() {
    return this.getAttribute('squares');
  }

  get maxSquares() {
    return this.getAttribute('maxSquares');
  }

  get squareSpeed() {
    return this.getAttribute('squareSpeed');
  }

  get stopped() {
    return this.getAttribute('stopped');
  }

  static get observedAttributes() {
    return [
      'height',
      'width',
      'elementSize',
      'squares',
      'maxSquares',
      'squareSpeed',
    ];
  }

  connectedCallback() {
    this.squares = 0;
    this.render();
  }

  start(levelProps) {
    this.stopped = 0;
    for (let i = 0; i < levelProps.length; i++) {
      window.setTimeout(() => {
        this.dispatchEvent(
          new CustomEvent('propschange', {
            detail: {
              square: levelProps[i][0],
              speed: levelProps[i][1],
              ctrspeed: levelProps[i][2],
            },
          })
        );
        this.maxSquares = levelProps[i][0];
        this.squareSpeed = levelProps[i][2];
      }, 60000 * i);
    }

    window.setInterval(() => {
      if (
        Number(this.stopped) === 0 &&
        Number(this.squares) < Number(this.maxSquares)
      )
        this.dispatchEvent(new CustomEvent('renderSquare'));
    }, 1000);
    this.dispatchEvent(new CustomEvent('start'));
  }

  createCanvas() {
    const canvas = document.createElement('canvas');

    canvas.classList.add('canvas');
    canvas.setAttribute('height', this.height);
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('style', 'border: 1px solid black;');

    canvas.addEventListener('remove', (e) => canvas.removeChild(e.object));
    canvas.addEventListener('refresh', () => {
      const ctx = canvas.getContext('2d');
      const elements = canvas.childNodes;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      elements.forEach((element) =>
        element.dispatchEvent(new CustomEvent('refresh'))
      );
    });
    return canvas;
  }

  createSquare(canvas, x, y) {
    const square = document.createElement('game-square');

    square.addEventListener('render', () => {
      if (Number(square.stopped) === 0) square.render(canvas);
    });
    square.addEventListener('collision', () => {
      square.cooldown = 3;
      this.dispatchEvent(
        new CustomEvent('score', { detail: { points: square.value } })
      );
    });
    this.addEventListener('stop', (e) => (square.stopped = 1));
    this.addEventListener(
      'propschange',
      (e) => (square.speed = e.detail.ctrspeed)
    );
    square.addEventListener('stop', () => {
      square.stopped = 1;
      if (square.parentNode !== null) canvas.removeChild(square);
      this.squares = this.squares - 1;
    });
    square.value = 20;
    square.size = this.elementSize;
    square.x = x;
    square.y = y;
    square.cooldown = 0;
    square.stopped = 0;
    square.speed = this.squareSpeed;
    return square;
  }

  createCircle(canvas, x, y, speed) {
    const circle = document.createElement('game-circle');

    this.addEventListener('start', () => circle.start());
    this.addEventListener('stop', () => (circle.stopped = 1));
    circle.addEventListener('checkCollisions', () => {
      for (const node of canvas.childNodes) {
        if (!node.isSameNode(circle) && circle.collides(node.x, node.y)) {
          if (node.cooldown === '0')
            node.dispatchEvent(new CustomEvent('collision'));
        }
      }
    });
    circle.addEventListener('score', (e) => this.dispatchEvent(e));
    circle.addEventListener('render', () => circle.render(canvas));
    this.addEventListener(
      'propschange',
      (e) => (circle.speed = e.detail.speed)
    );

    circle.radius = this.elementSize / 2;
    circle.x = x;
    circle.y = y;
    circle.speed = speed;
    circle.direction = 'E';
    circle.stopped = 0;

    return circle;
  }

  isFree(x, y) {
    for (const element of this.shadowRoot.firstChild.childNodes) {
      if (element.collides(x, y)) return false;
    }
    return true;
  }

  renderSquare(canvas) {
    const x = Math.random() * (this.width - this.elementSize);
    const y = Math.random() * (this.height - this.elementSize);
    if (this.isFree(x, y)) {
      const square = this.createSquare(canvas, x, y);
      canvas.appendChild(square);
      this.squares = Number(this.squares) + 1;
      square.start();
      square.dispatchEvent(new CustomEvent('render'));
    }
  }

  render() {
    const canvas = this.createCanvas();
    canvas.appendChild(this.createCircle(canvas, 25, 25, 10));
    this.addEventListener('renderSquare', () => this.renderSquare(canvas));

    this.dispatchEvent(new CustomEvent('refresh'));
    this.shadowRoot.appendChild(canvas);
  }
}

class GameTable extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.addEventListener('stop', () => window.clearInterval(this.interval));
  }

  set score(value) {
    this.setAttribute('score', value);
  }

  set time(value) {
    this.setAttribute('time', value);
  }

  set interval(value) {
    this.setAttribute('interval', value);
  }

  get score() {
    return this.getAttribute('score');
  }

  get time() {
    return this.getAttribute('time');
  }

  get interval() {
    return this.getAttribute('interval');
  }

  static get observedAttributes() {
    return ['score', 'time', 'interval'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === 'score') this.dispatchEvent(new CustomEvent('score'));
    if (prop === 'time') this.dispatchEvent(new CustomEvent('time'));
  }

  start() {
    this.interval = window.setInterval(() => {
      this.time = this.time > 0 ? this.time - 1 : 0;
      if (this.time === '0') this.dispatchEvent(new CustomEvent('stop'));
    }, 1000);
  }

  render() {
    const table = document.createElement('table');
    table.classList.add('table');

    const tr_header = document.createElement('tr');
    const th_score = document.createElement('th');
    const th_time = document.createElement('th');
    th_score.appendChild(document.createTextNode('Score'));
    th_time.appendChild(document.createTextNode('Time'));
    tr_header.appendChild(th_score);
    tr_header.appendChild(th_time);

    const tr_body = document.createElement('tr');
    const scoreCell = document.createElement('th');
    const timeCell = document.createElement('th');
    let score = document.createTextNode(this.score);
    let time = document.createTextNode(this.time);
    this.addEventListener('time', () => {
      const newTime = document.createTextNode(this.time);
      time.replaceWith(newTime);
      time = newTime;
    });
    this.addEventListener('score', () => {
      const newScore = document.createTextNode(this.score);
      score.replaceWith(newScore);
      score = newScore;
    });
    scoreCell.appendChild(score);
    timeCell.appendChild(time);
    tr_body.appendChild(scoreCell);
    tr_body.appendChild(timeCell);

    table.appendChild(tr_header);
    table.appendChild(tr_body);

    this.shadowRoot.appendChild(table);
  }
}

class LeaderboardsTable extends HTMLTableElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }
}

customElements.define('game-canvas', GameCanvas);
customElements.define('game-circle', GameCircle);
customElements.define('game-square', GameSquare);
customElements.define('game-table', GameTable);
