let fields = [
    null,
    'circle',
    'circle',
    null,
    null,
    'cross',
    'cross',
    null,
    null
];

function render() {
    let content = document.getElementById('content');
    let table = '<table>';
    for (let i = 0; i < 3; i++) {
      table += '<tr>';
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        let symbol = fields[index] ? (fields[index] === 'circle' ? 'O' : 'X') : '';
        table += '<td>' + symbol + '</td>';
      }
      table += '</tr>';
    }
    table += '</table>';
    content.innerHTML = table;
  }

  function init(){
    render();
  }