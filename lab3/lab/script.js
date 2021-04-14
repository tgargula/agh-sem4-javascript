const table = document.getElementById("table");
const points = document.getElementById("points");
let columns_no;
let rows_no;
let stopped = false;

FIELDS = [
  { color: "green3", points: 3 },
  { color: "green2", points: 2 },
  { color: "green1", points: 1 },
  { color: "red1", points: -1 },
  { color: "red2", points: -2 },
  { color: "red3", points: -3 },
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function addPoints(addedPoints) {
  const newPoints = Number(points.childNodes[0].nodeValue) + addedPoints;
  const element = document.createTextNode(newPoints);
  points.replaceChild(element, points.childNodes[0]);
}

function createCell() {
  const cell = document.createElement("td");
  const i = getRandomInt(0, FIELDS.length);
  const field = FIELDS[i];
  cell.classList.add(field.color);
  cell.classList.add("cell");
  cell.addEventListener("click", (e) => {
    addPoints(field.points);
    changeColor([cell]);
  });
  return cell;
}

function createTable(rows, columns) {
  rows_no = rows;
  columns_no = columns;
  for (const child of table.childNodes) {
    table.removeChild(child);
  }
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const cell = createCell();
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function getRandomTwoCells() {
  const cells = document.getElementsByTagName("td");
  const cell1 = cells[getRandomInt(0, cells.length)];
  let cell2;
  do {
    cell2 = cells[getRandomInt(0, cells.length)];
  } while (cell1 === cell2);
  return [cell1, cell2];
}

function changeColor(cells) {
  for (const cell of cells) {
    cell.parentNode.replaceChild(createCell(), cell);
  }
}

function addColumn() {
  const index = getRandomInt(0, columns_no + 1);
  for (const row of table.childNodes) {
    const cell = createCell();
    if (index === columns_no)
      row.appendChild(cell);
    else
      row.insertBefore(cell, row.childNodes[index]);
  }
  columns_no++;
}

function removeColumn() {
  const index = getRandomInt(0, columns_no);
  for (const row of table.childNodes) {
    row.removeChild(...row.childNodes);
  }
  columns_no--;
}

function addRow() {
  const index = getRandomInt(0, rows_no + 1);
  const row = document.createElement("tr");
  for (let i = 0; i < columns_no; i++) {
    const cell = createCell();
    row.appendChild(cell);
  }
  if (index === rows_no) table.appendChild(row);
  else table.insertBefore(row, table.childNodes[index]);
  rows_no++;
}

function removeRow() {
  const index = getRandomInt(0, rows_no);
  table.removeChild(table.childNodes[index]);
  rows_no--;
}

createTable(15, 15);

window.setInterval(() => {
  if (!stopped) {
    changeColor(getRandomTwoCells());
  }
}, 1000);

window.setInterval(() => {
  const choice = Math.random();
  if (choice < 0.25) addRow();
  else if (choice < 0.5) removeRow();
  else if (choice < 0.75) addColumn();
  else removeColumn();
}, 2000);

window.setTimeout(() => {
  stopped = true;
  table.remove(); // Just for now
}, 30000);
