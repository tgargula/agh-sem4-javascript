const SetIntervalTime = [];
const SetTimeoutTime = [];
const N = 10;
let delay = document.getElementById("delay").value;
let intervalId = 0;
let timeoutId = 0;
let animationFrameId = 0;

function calculatePrimes(iterations, multiplier) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

function doTimeConsumingCallculationsWith(GlobalArray) {
  GlobalArray.push(performance.now());
  if (GlobalArray.length > N) {
    GlobalArray.shift();
  }
  calculatePrimes(1000, 1000000);
}

function doTimeConsumingCallculationsWithSetInterval() {
  doTimeConsumingCallculationsWith(SetIntervalTime);
}

function doTimeConsumingCallculationsWithSetTimeout() {
  doTimeConsumingCallculationsWith(SetTimeoutTime);
  timeoutId = window.setTimeout(
    doTimeConsumingCallculationsWithSetTimeout,
    delay
  );
}

function getAverageExecutionTime(array) {
  const sum = array.reduce((currentSum, value, index, array) => {
    return index === 0 ? 0 : currentSum + (value - array[index - 1]);
  }, 0);
  return sum / (array.length - 1);
}

function drawChart() {
  const averageIntervalTime = getAverageExecutionTime(SetIntervalTime);
  const averageTimeoutTime = getAverageExecutionTime(SetTimeoutTime);
  const canvas = document.getElementById("plot");
  requirejs(["scripts/plots/plots"], (plot) => {
    plot.bar(
      canvas,
      [averageIntervalTime, averageTimeoutTime],
      ["Interval", "Timeout"]
    );
  });
  animationFrameId = window.requestAnimationFrame(drawChart);
}

function start() {
  delay = document.getElementById("delay").value;
  intervalId = window.setInterval(
    doTimeConsumingCallculationsWithSetInterval,
    delay
  );
  timeoutId = window.setTimeout(
    doTimeConsumingCallculationsWithSetTimeout,
    delay
  );
  animationFrameId = window.requestAnimationFrame(drawChart);
}

function stop() {
  window.clearInterval(intervalId);
  window.clearTimeout(timeoutId);
  window.cancelAnimationFrame(animationFrameId);
  SetIntervalTime.length = 0;
  SetTimeoutTime.length = 0;
}

// Zaobserwuj:

// Czy obydwie średnie mają zbliżoną, czy znacząco różniącą się wartość?
// Początkowo setInterval zwraca średnio wartość bliską wprowadzonej wartości delay, jednak po czasie zwiększa się ona i dorównuje wartości otrzymywanej przez setTimeout.

// Czy w przypadku użycia setInterval(funkcjaObciążająca, opóźnienie) bądź setTimeout(funkcjaObciążająca, opóźnienie), czas pomiędzy kolejnymi wykonywaniami kodu funkcjaObciążająca jest zawsze taki, jak określono w parametrze opóźnienie (w polu delay formularza)? Spróbuj wywnioskować, czy kod funkcjaObciążająca jest wykonywany w osobnym, czy w głównym wątku — swoje obserwacje porównaj z informacjami zawartymi w artykule.
// Początkowo w setInterval jest taki sam. Jednak, gdy czas wykonywania operacji przekracza wartość delay, blok jest wstawiany do kolejki i następuje opóźnienie. Można z tego wywnioskować, że kod funkcji obciążającej jest wykonywany w głównym wątku.