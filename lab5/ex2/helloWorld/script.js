const eval = (op, x, y) => {
  let result;
  switch (op) {
    case '+':
      result = x + y;
      break;
    case '-':
      result = x - y;
      break;
    case '*':
      result = x * y;
      break;
    case '/':
      // JavaScipt returns Infinity while dividing by zero => No exceptions thrown
      result = x / y;
      break;
    default:
      throw new TypeError(
        `Invalid argument: '${op}' is not a supported operation!`
      );
  }
  return result;
};

const getHtmlResponse = (json) => {
  let responseHtml = '<table>';
  responseHtml = responseHtml.concat(`
  <tr>
    <th>x</th>
    <th>Operation</th>
    <th>y</th>
    <th>Result</th>
  <tr>
  `);

  for (const dict of json) {
    const { x, y, operation } = dict;
    const result = eval(operation, x, y);
    responseHtml = responseHtml.concat(`
    <tr>
      <td>${x}</td>
      <td>${operation}</td>
      <td>${y}</td>
      <td>${result}</td>
    </tr>
    `);
  }
  
  responseHtml = responseHtml.concat('</table>');

  return responseHtml;
}

const calculated = (json) => {
  for (const dict of json) {
    const {x, y, operation} = dict;
    dict.result = eval(operation, x, y);
  }
  return json;
}

module.exports = {getHtmlResponse, calculated, eval};
