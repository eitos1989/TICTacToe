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

const winningCombinations = [
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
      if (checkGameOver()) {
          drawWinningLine();
      }
  }
}

function checkGameOver() {

  for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          return true; // Gewinnkombination gefunden
      }
  }
  return false;
}

function init() {
    render();
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

function drawWinningLine() {
  const svgContainer = document.getElementById('svg-container');
  const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

  // Koordinaten für die Linie basierend auf der Gewinnkombination
  const lineCoordinates = calculateLineCoordinates();

  svgLine.setAttribute("x1", lineCoordinates.x1);
  svgLine.setAttribute("y1", lineCoordinates.y1);
  svgLine.setAttribute("x2", lineCoordinates.x2);
  svgLine.setAttribute("y2", lineCoordinates.y2);
  svgLine.setAttribute("stroke", "#FF0000"); // Rote Linie
  svgLine.setAttribute("stroke-width", "5");

  svgContainer.appendChild(svgLine);
}

function calculateLineCoordinates() {

  for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
          // Mittelpunkte der beteiligten Zellen berechnen
          const cellSize = 70; // Größe einer Zelle
          const margin = cellSize / 2; // Rand
          const x1 = ((a % 3) * cellSize) + margin;
          const y1 = (Math.floor(a / 3) * cellSize) + margin;
          const x2 = ((c % 3) * cellSize) + margin;
          const y2 = (Math.floor(c / 3) * cellSize) + margin;
          return { x1, y1, x2, y2 };
      }
  }
}
