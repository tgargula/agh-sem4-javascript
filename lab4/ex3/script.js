const fs = require('fs');

const f = (name, callback) =>
  fs.lstat(name, (err, data) =>
    err
      ? callback(err)
      : data.isFile()
      ? g(name, (err, data) =>
          err ? callback(err) : callback(false, 'It is a file!\n' + data)
        )
      : data.isDirectory()
      ? callback(false, 'It is a directory!')
      : callback(true)
  );

const g = (name, callback) => {
  fs.readFile(name, 'utf-8', (err, data) =>
    err ? callback(err) : callback(err, data)
  );
};

exports.params = {
  f: f,
  g: g,
};
