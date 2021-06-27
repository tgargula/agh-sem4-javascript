const div = document.getElementById('takenusernames');
const usernameTextField = document.getElementById('username');
console.log(usernameTextField);

usernameTextField.addEventListener('input', async (e) => {
  const value = usernameTextField.value;
  console.log(value);
  const url = `/users/add?username=${value}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const json = await response.json();
    console.log(json);

    // Remove all children
    while (div.lastChild) {
      div.removeChild(div.lastChild);
    }

    // Add label if there are taken logins
    if (json.length > 0) {
      const span = document.createElement('span');
      const spanText = document.createTextNode('Zajęte loginy:');
      span.appendChild(spanText);
      div.appendChild(span);
    }

    // Add children
    for (const username of json) {
      const span = document.createElement('span');
      const usernameNode = document.createTextNode(username);
      span.appendChild(usernameNode);
      div.appendChild(span);
    }
  } catch (e) {
    throw e;
  }
});
