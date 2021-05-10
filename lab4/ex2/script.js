const fs = require('fs');

const f = (name) => {
  return fs.existsSync(name) && fs.lstatSync(name).isFile()
    ? 'It is a file!'
    : fs.existsSync(name) && fs.lstatSync(name).isDirectory()
    ? 'It is a directory!'
    : null;
};

const g = (name) => {
  return fs.existsSync(name) && fs.lstatSync(name).isFile();
};

const h = (name) => {
  console.log(f(name));
  if (g(name)) {
    console.log(fs.readFileSync('./' + name, 'utf-8'));
  }
};

const main = () => {
  const argv = process.argv.slice(2);
  const name = argv[0];
  h(name);
};

if (require.main === module) {
  main();
}

exports._test = {
  f: f,
  g: g,
};
