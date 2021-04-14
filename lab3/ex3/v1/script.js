const licznik = document.getElementById("licznik");
let currentValue = licznik.value;
let interval = -1;

function setValues(value) {
  for (const span of document.getElementsByTagName("span"))
    for (const node of span.childNodes)
      if (node.nodeType === node.TEXT_NODE) {
        const newValue = value;
        const newTextNode = document.createTextNode(newValue);
        node.replaceWith(newTextNode);
      }
}

function decrement() {
  if (currentValue > 0) {
    currentValue = currentValue - 1;
    setValues(currentValue);
  }
  if (currentValue === 0)
    licznik.value = 0;
}

document.getElementById("btn").addEventListener("click", (e) => {
  window.clearInterval(interval);
  currentValue = licznik.value;
  setValues(licznik.value);
  interval = window.setInterval(decrement, 1000);
});
