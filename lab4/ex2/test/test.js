const expect = require('chai').expect;
const script = require('../script');

describe('fs classifier test', () => {
  it('Check if "." is a directory', () => {
    expect(script._test.f('.')).to.equal('It is a directory!');
  });
  it('Check if "file.txt" is a file', () => {
    expect(script._test.f('./test/file.txt')).to.equal('It is a file!');
  });
  it('Check if "not-existing.txt" is null', () => {
    expect(script._test.f('./test/not-existing.txt')).to.equal(null);
  });
});

describe('fs isFile test', () => {
  it('Check "."', () => {
    expect(script._test.g('.')).to.equal(false);
  });
  it('Check "file.txt"', () => {
    expect(script._test.g('./test/file.txt')).to.equal(true);
  });
  it('Check "not-existing.txt"', () => {
    expect(script._test.g('./test/not-existing.txt')).to.equal(false);
  });
});

// Jako że funkcja fs.readFileSync jest funkcją wbudowaną, nie ma sensu jej testować
// Przy uruchomieniu skryptu zawartość pliku się wypisuje.
