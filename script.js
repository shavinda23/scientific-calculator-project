const result = document.getElementById('result');
const historyList = document.getElementById('history-list');

function insert(value) {
  result.value += value;
}

function clearScreen() {
  result.value = '';
}

function backspace() {
  result.value = result.value.slice(0, -1);
}

function calculate() {
  try {
    let open = (result.value.match(/\(/g) || []).length;
    let close = (result.value.match(/\)/g) || []).length;
    result.value += ')'.repeat(open - close);
    const expression = result.value;
    const evaluated = eval(expression);
    result.value = evaluated;
    addToHistory(expression + ' = ' + evaluated);
  } catch {
    result.value = 'Error';
  }
}

function addToHistory(entry) {
  const li = document.createElement('li');
  li.textContent = entry;
  historyList.prepend(li);
}

function clearHistory() {
  historyList.innerHTML = '';
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ((/\d/).test(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    insert(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Delete') {
    clearScreen();
  }
});
