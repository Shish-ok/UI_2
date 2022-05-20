document.querySelector('.equal').onclick = inputCheck;
document.querySelector('.reset').onclick = clearInput;

function clearInput() {
  document.querySelector('.err').value = '';
  document.querySelector('.a').value = '';
  document.querySelector('.b').value = '';
  document.querySelector('.c').value = '';
  document.querySelector('.d').value = '';
  document.querySelector('.x1').value = '';
  document.querySelector('.x2').value = '';
}

function inputCheck() {

  document.querySelector('.d').value = '';
  document.querySelector('.x1').value = '';
  document.querySelector('.x2').value = '';

  var a, b, c;

  a = document.querySelector('.a').value;
  b = document.querySelector('.b').value;
  c = document.querySelector('.c').value;

  if (a == '') { a = '1'; }
  if (a == '-') { a = '-1'; }

  if (b == '') { b = '1'; }
  if (b == '-') { b = '-1'; }

  if (c == '') { c = '1'; }
  if (c == '-') { c = '-1'; }

  if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
    document.querySelector('.err').value = '';
    var res = solution(a, b, c);
    var toTable = "D = " + res.d;
    document.querySelector('.d').value = "D = " + b + "² - 4 * " + a + " * " + c + " = " + res.d;
    if ("x2" in res) {
      toTable += " x1 = " + res.x1 + " x2 = " + res.x2;
      document.querySelector('.d').value += " — есть 2 решения";
      document.querySelector('.x1').value = "x1 = (-(" + b + ") + √" + res.d + ") / (" + a + " + 2) = " + res.x1;
      document.querySelector('.x2').value = "x2 = (-(" + b + ") - √" + res.d + ") / (" + a + " + 2) = " + res.x2;
    }
    else if ("x1" in res) {
      toTable += " x = " + res.x1;
      document.querySelector('.d').value += " — есть 1 решение"
      document.querySelector('.x1').value = "x = (-(" + b + ") + √" + res.d + ") / (" + a + " + 2) = " + res.x1;
    }
    else {
      toTable += " — решений нет";
      document.querySelector('.d').value += " — решений нет";
    }

    table = document.querySelector('table');
    td = document.createElement("td");
    td.innerHTML = toTable;
    tr = document.createElement("tr");
    tr.appendChild(td);
    table.appendChild(tr);

    tr.addEventListener("click", c => {tr.remove()});
  }
  else {
    document.querySelector('.err').value = 'Ошибка ввода: неопознанные символы ';
    a = a.replace(/[\d.-]/g, '');
    b = b.replace(/[\d.-]/g, '');
    c = c.replace(/[\d.-]/g, '');
    const set = [...new Set(a + b + c)];
    var invalidСharacters = '';
    for (let i = 0; i < set.length - 1; ++i) { invalidСharacters += "\'" + set[i] + "\'" + ", "; }
    invalidСharacters += "\'" + set[set.length - 1] + "\'!";
    document.querySelector('.err').value += invalidСharacters;
  }
}


function solution(a, b, c) {
  var d, x, x1, x2;

  answer = {};

  d = Math.pow(b,2) - 4*a*c;
  answer.d = d;

  if (d > 0) {
    x1 = (-b + Math.sqrt(d)) / (a * 2);
    answer.x1 = x1;
    x2 = (-b - Math.sqrt(d)) / (a * 2);
    if (x2 != x1) { answer.x2 = x2; }
  }
  else if (d == 0) {
    x1 = (-b + Math.sqrt(d)) / (a * 2);
    answer.x1 = d;
  }

  return answer;
}
