// window.prompt();         – bez argumentów działa, pokazuje się tylko puste pole tekstowe
// window.prompt("Title");  – pokazuje tytuł i puste pole tekstowe
const result = window.prompt("Tekst1", "Tekst2");
console.log(`Value: ${result}`);
console.log(`Type: ${typeof (result)}`);
// 1. Wprowadzeniu wartości będącej liczbą – liczba zapisana jako typ string
// 2. Wprowadzeniu wartości będącej napisem – typ string
// 3. Niewprowadzeniu wartości – napis pusty "" (string)
// 4. Wprowadzeniu wartości i naciśnięciu przycisku 'Anuluj' – null, object
