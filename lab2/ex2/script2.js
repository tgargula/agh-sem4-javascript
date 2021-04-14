"use strict";

let sum = 0;

function cyfry(napis) {
    let digitSum = 0;

    for (let element of napis) {
        if (!isNaN(element))
            digitSum += Number(element);
    };
    return digitSum;
}

function litery(napis) {
    let ctr = 0;
    for (let element of napis) {
        if (isNaN(element))
            ctr++;
    }
    return ctr;
}

function suma(napis) {
    if (!isNaN(parseInt(napis)))
        sum += cyfry(napis);
    return sum;
}

let result = window.prompt("Podaj napis:");

do {
    console.log(`\t${cyfry(result)}\t${litery(result)}\t${suma(result)}`);
    result = window.prompt("Podaj napis:");
} while (result !== null);

const expect = chai.expect;

describe('The cyfry(napis) function', () => {
    it('Returns 6 for "123"', () => {
        expect(cyfry('123')).to.equal(6);
    });
    it('Returns 0 for "abc"', () => {
        expect(cyfry("abc")).to.equal(0);
    });
    it('Returns 10 for "145adg"', () => {
        expect(cyfry("145adg")).to.equal(10);
    });
    it('Returns 5 for "HTML5"', () => {
        expect(cyfry("HTML5")).to.equal(5);
    });
    it('Returns 0 for ""', () => {
        expect(cyfry("")).to.equal(0);
    });
});

describe('The litery(napis) function', () => {
    it('Returns 0 for "123"', () => {
        expect(litery('123')).to.equal(0);
    });
    it('Returns 3 for "abc"', () => {
        expect(litery("abc")).to.equal(3);
    });
    it('Returns 3 for "145adg"', () => {
        expect(litery("145adg")).to.equal(3);
    });
    it('Returns 4 for "HTML5"', () => {
        expect(litery("HTML5")).to.equal(4);
    });
    it('Returns 0 for ""', () => {
        expect(litery("")).to.equal(0);
    });
});

describe('The suma(napis) function', () => {
    before(() => { sum = 0; })
    it('Returns 6 for "123"', () => {
        expect(suma('123')).to.equal(6);
    });
    it('Returns 6 for "abc"', () => {
        expect(suma("abc")).to.equal(6);
    });
    it('Returns 16 for "145adg"', () => {
        expect(suma("145adg")).to.equal(16);
    });
    it('Returns 16 for "HTML5"', () => {
        expect(suma("HTML5")).to.equal(16);
    });
    it('Returns 16 for ""', () => {
        expect(suma("")).to.equal(16);
    });
});