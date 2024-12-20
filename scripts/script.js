let fields = Array(9).fill(null);
let currentPlayer = 'X'; // Startspieler

function handleClick(cellIndex) {
    const cell = document.getElementById(`cell-${cellIndex}`);
    
    if (fields[cellIndex] === null) {
        fields[cellIndex] = currentPlayer;

        // Setze die entsprechende Klasse für das Symbol
        if (currentPlayer === 'X') {
            cell.classList.add('cross');
            cell.textContent = 'X'; // Füge X ein
        } else {
            cell.classList.add('circle');
            cell.textContent = 'O'; // Füge O ein
        }

        if (checkWinner()) {
            document.getElementById('status').textContent = `Spieler ${currentPlayer} hat gewonnen!`;
            disableBoard();
            return;
        }

        if (fields.every(field => field !== null)) {
            document.getElementById('status').textContent = 'Unentschieden!';
            return;
        }

        // Wechsel zum nächsten Spieler
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = `Spieler ${currentPlayer} ist dran.`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonalen
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return fields[a] === currentPlayer && fields[b] === currentPlayer && fields[c] === currentPlayer;
    });
}

function disableBoard() {
    for (let i = 0; i < fields.length; i++) {
        document.getElementById(`cell-${i}`).classList.add('taken');
    }
}

function resetGame() {
    fields = Array(9).fill(null);
    currentPlayer = 'X';
    document.getElementById('status').textContent = `Spieler ${currentPlayer} ist dran.`;

    for (let i = 0; i < fields.length; i++) {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = '';
        cell.className = 'cell'; // Entferne alle Klassen
    }
}
