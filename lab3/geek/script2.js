const gameCanvas = document.getElementsByTagName('game-canvas')[0];
const gameTable = document.getElementsByTagName('game-table')[0];

document.getElementById('start').addEventListener('click', (e) => {
  const level1 = [
    document.getElementById('squares1').value,
    document.getElementById('speed1').value,
    document.getElementById('ctrspeed1').value,
  ];

  const level2 = [
    document.getElementById('squares2').value,
    document.getElementById('speed2').value,
    document.getElementById('ctrspeed2').value,
  ];

  const level3 = [
    document.getElementById('squares3').value,
    document.getElementById('speed3').value,
    document.getElementById('ctrspeed3').value,
  ];

  gameCanvas.addEventListener(
    'score',
    (e) => (gameTable.score = Number(gameTable.score) + Number(e.detail.points))
  );
  gameTable.addEventListener('stop', (e) => {
    gameCanvas.dispatchEvent(new CustomEvent('stop'));
    gameCanvas.stopped = 1;
  });
  gameCanvas.start([level1, level2, level3]);
  gameTable.start();
});

document.getElementById('stop').addEventListener('click', (e) => {
  gameTable.dispatchEvent(new CustomEvent('stop'));
});
