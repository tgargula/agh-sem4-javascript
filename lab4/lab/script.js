const { readFileSync } = require('fs');

const parse = (textfield) => {
  const commands = textfield.split(' ');
  const result = [];
  for (const i in commands) {
    const command = commands[i].split(':');
    const file = command[0];
    const operation = command[1];
    const content = readFileSync(file, 'utf-8');
    result.push(`<h1>Zawartość pliku ${i}</h1>\n`);
    if (operation[0] === 'R') {
      result.push(remove(content, operation.slice(1)));
    } else if (operation[0] === 'J') {
      result.push(justify(content, operation.slice(1)));
    }
    result.push('\n');
  }
  return result.join('');
};

const remove = (content, line) => {
  const lines = content.split('\n');
  lines.splice(line, 1);
  return lines.join('\n');
};

const justify = (content, N) => {
  const lines = content.split('\n');
  const lists = [];
  for (const line of lines) {
    const w = line.split(' ');
    lists.push(w.filter((value, _, array) => value !== ''));
  }
  const words = lists.reduce(
    (flattened, newList) => [...flattened, ...newList],
    []
  );
  result = [[]];
  i = 0;
  console.log(words);
  for (const word of words) {
    const newWord = word;
    const length = result[i].reduce((sum, x) => sum + x.length + 1, 0) - 1;
    if (length + newWord.length < N) {
      result[i].push(newWord);
    } else {
      const line = result[i];
      let j = 0;
      if (line.length === 1) {
        for (let i = length; i < Number(N); i++) {
          line[0] = line[0].concat(' ');
        }
      } else {
        for (let i = 0; j < Number(N) - length; i++) {
          if (line.length === 1) break;
          if (i % line.length > 0) {
            line[i % line.length] = ' ' + line[i % line.length];
            j++;
          }
        }
      }
      result.push([newWord]);
      i++;
    }
  }
  console.log(result);

  for (const i in result) {
    result[i] = result[i].join(' ');
  }

  return result.join('\n');
};

exports.parse = parse;
