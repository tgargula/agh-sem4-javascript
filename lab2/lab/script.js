"use strict";

const words = {};
const howManyByN = {};

function validate(N) {
  const [dict, number] = validateUnwrapped(
    N,
    document.getElementById("textarea").value,
    document.getElementById("cbox")
  );
  console.log(dict);
  console.log(number);
}

function validateUnwrapped(N, text, checked) {
  const localWords = {};
  const localHowManyByN = {};

  for (let word of text.split(" ")) {
    if (word in words) words[word]++;
    else words[word] = 1;
    if (word.length in howManyByN) howManyByN[word.length]++;
    else howManyByN[word.length] = 1;
    if (word in localWords) localWords[word]++;
    else localWords[word] = 1;
    if (word.length in localHowManyByN) localHowManyByN[word.length]++;
    else localHowManyByN[word.length] = 1;
  }

  if (checked) {
    return [words, howManyByN.hasOwnProperty(N) ? howManyByN[N] : 0];
  } else {
    return [
      localWords,
      localHowManyByN.hasOwnProperty(N) ? localHowManyByN[N] : 0,
    ];
  }
}

const expect = chai.expect;

describe("The validate(N) function – number test", () => {
  it('Returns 2 for N=5, textarea="Hello there", checked=true', () => {
    const [_, number] = validateUnwrapped(5, "Hello there", true);
    expect(number).to.equal(2);
  });
  it('Returns 4 for N=5, textarea="Hello there General Kenobi!", checked=true', () => {
    const [_, number] = validateUnwrapped(
      5,
      "Hello there General Kenobi!",
      true
    );
    expect(number).to.equal(4);
  });
  it('Returns 2 for N=7, textarea="Hello there General Kenobi! You are a bold one!", checked=false', () => {
    const [_, number] = validateUnwrapped(
      7,
      "Hello there General Kenobi! You are a bold one!",
      false
    );
    expect(number).to.equal(2);
  });
});

describe("The validate(N) function – dictionary test", () => {
  before(() => {
    for (let key in words) if (words.hasOwnProperty(key)) delete words[key];
    for (let key in howManyByN)
      if (howManyByN.hasOwnProperty(key)) delete howManyByN[key];
  });
  after(() => {
    for (let key in words) if (words.hasOwnProperty(key)) delete words[key];
    for (let key in howManyByN)
      if (howManyByN.hasOwnProperty(key)) delete howManyByN[key];
  });
  it('Returns {Hello: 1, there: 1} for N=5, textarea="Hello there", checked=true', () => {
    const [dict, _] = validateUnwrapped(5, "Hello there", true);
    const expectedDict = { Hello: 1, there: 1 };
    expect(dict).to.deep.equal(expectedDict);
  });
  it('Returns {Hello: 2, there: 2, General: 1, "Kenobi!": 1} for N=5, textarea="Hello there General Kenobi!", checked=true', () => {
    const [dict, _] = validateUnwrapped(5, "Hello there General Kenobi!", true);
    const expectedDict = { Hello: 2, there: 2, General: 1, "Kenobi!": 1 };
    expect(dict).to.deep.equal(expectedDict);
  });
  it('Returns {Hello: 1, there: 1, General: 1, "Kenobi!": 1, You: 1, are: 1, a: 1, bold: 1, "one!": 1} for N=7, textarea="Hello there General Kenobi! You are a bold one!", checked=false', () => {
    const [dict, _] = validateUnwrapped(
      7,
      "Hello there General Kenobi! You are a bold one!",
      false
    );
    const expectedDict = {
      Hello: 1,
      there: 1,
      General: 1,
      "Kenobi!": 1,
      You: 1,
      are: 1,
      a: 1,
      bold: 1,
      "one!": 1,
    };
    expect(dict).to.deep.equal(expectedDict);
  });
});
