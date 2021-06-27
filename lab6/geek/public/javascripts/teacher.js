const studentSpans = document.getElementsByClassName('student');
const textField = document.getElementById('students-search');
const div = document.getElementById('students');

for (const studentSpan of studentSpans) {
    studentSpan.addEventListener('click', () => {
        textField.value = studentSpan.firstChild.nodeValue;
    });
}

textField.addEventListener('input', async () => {
    const value = textField.value;
    const url = `/teacher/student?name=${value}`;
    try {
      const response = await fetch(url, { method: 'GET' });
      const json = await response.json();
  
      // Remove all children
      while (div.lastChild) {
        div.removeChild(div.lastChild);
      }
  
      // Add label if there are taken logins
      if (json.length > 0) {
        const span = document.createElement('span');
        const spanText = document.createTextNode('Studenci');
        span.appendChild(spanText);
        div.appendChild(span);
      }
  
      // Add children
      for (const student of json) {
        const span = document.createElement('span');
        const studentNode = document.createTextNode(`${student.name} ${student.surname}`);
        span.addEventListener('click', () => {
            textField.value = studentNode.nodeValue;
        });
        span.appendChild(studentNode);
        div.appendChild(span);
      }
    } catch (e) {
      throw e;
    }
});