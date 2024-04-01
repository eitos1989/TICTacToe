let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertikal
  [0, 4, 8], [2, 4, 6] // diagonal
];

let currentPlayer = 'circle'; // Startspieler festlegen

function render() {
    let content = document.getElementById('content');
    let table = '<table>';
    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] ? (fields[index] === 'circle' ? generateCircleSVG() : generateCrossSVG()) : '';
            table += '<td onclick="handleClick(' + index + ')">' + symbol + '</td>';
        }
        table += '</tr>';
    }
    table += '</table>';
    content.innerHTML = table;
}

function handleClick(index) {
  let tdElement = document.getElementsByTagName('td')[index];
  if (!fields[index]) {
      fields[index] = currentPlayer; // Abwechselnd 'circle' oder 'cross' einfügen
      tdElement.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsle den Spieler
      tdElement.onclick = null; // onclick-Funktion entfernen
      if (isGameFinished()) {
          drawWinningLine(getWinningCombination());
      }
  }
}

function isGameFinished() {
    return fields.every((field) => field !== null ) || checkGameOver();
}
function checkGameOver() {

  for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          return true; // Gewinnkombination gefunden
      }
  }
  return false;
}

function drawWinningLine(combination) {
    console.log("Spiel ist vorbei")
    const lineColor = '#ffffff';
    const lineWidth = 5;
  
    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
      Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);
  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
  }

function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}

function generateCircleSVG() {
  const svgCode = `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="35" r="0" fill="#00b0EF">
              <animate attributeName="r" from="0" to="30" dur="0.125s" fill="freeze" />
          </circle>
      </svg>
  `;
  return svgCode;
}

function generateCrossSVG() {
  const svgCode = `
      <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
          <line x1="10" y1="10" x2="60" y2="60" stroke="#FFC000" stroke-width="5">
              <animate attributeName="x2" from="10" to="60" dur="1s" fill="freeze" />
              <animate attributeName="y2" from="10" to="60" dur="1s" fill="freeze" />
          </line>
          <line x1="60" y1="10" x2="10" y2="60" stroke="#FFC000" stroke-width="5">
              <animate attributeName="x2" from="60" to="10" dur="1s" fill="freeze" />
              <animate attributeName="y2" from="10" to="60" dur="1s" fill="freeze" />
          </line>
      </svg>
  `;
  return svgCode;
}

function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    render();
}

function init() {
    render();
}



