
const WORD_LIST_URL = 'https://raw.githubusercontent.com/tabatkins/wordle-list/refs/heads/main/words';

const KB_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫']
];

const WIN_LINES = [
  "Well Done!",
  "👏",
  "🎬👏",
  "🎥👏",
  "👏📽️"
];

let gameState = {
  answer: '',
  guesses: [],
  currentGuess: '',
  gameOver: false,
  letterStates: {}
};
function getTodayKey() {
  const today = new Date();

  return `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
}
function saveGame() {
  localStorage.setItem(
    'cinematle-' + getTodayKey(),
    JSON.stringify({
      gameState,
      hintUsed,
      savedHint
    })
  );
}
function loadGame() {
  const data = localStorage.getItem(
    'cinematle-' + getTodayKey()
  );

  if (!data) return false;

  const save = JSON.parse(data);

  gameState = save.gameState;

  hintUsed = save.hintUsed || false;

  savedHint = save.savedHint || '';

  return true;
}


async function loadCommonWords() {
  try {
    const response = await fetch(WORD_LIST_URL);
    const text = await response.text();
    const words = text
      .split('\n')
      .map(w => w.trim().toUpperCase())
      .filter(w => /^[A-Z]{5}$/.test(w));
    ALL_VALID = new Set([...FILM_WORDS, ...words]);
  } catch (err) {
    console.warn('Could not load common word list, using film words only.', err);
    ALL_VALID = new Set(FILM_WORDS);
  }
}


function getDailyAnswer() {
  const START = new Date('2024-01-01').getTime();
  const dayIndex = Math.floor((Date.now() - START) / 86400000);
  return FILM_WORDS[dayIndex % FILM_WORDS.length];
}



function buildBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let r = 0; r < 6; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    row.id = 'row-' + r;
    for (let c = 0; c < 5; c++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
tile.id = `tile-${r}-${c}`;      row.appendChild(tile);
    }
    board.appendChild(row);
  }
}

function buildKeyboard() {
  const kb = document.getElementById('keyboard');
  kb.innerHTML = '';
  KB_ROWS.forEach(row => {
    const div = document.createElement('div');
    div.className = 'kb-row';
    row.forEach(k => {
      const btn = document.createElement('button');
      btn.className = 'key' + (k.length > 1 ? ' wide' : '');
      btn.textContent = k;
      btn.id = 'key-' + k;
      btn.addEventListener('click', () => handleKey(k));
      div.appendChild(btn);
    });
    kb.appendChild(div);
  });
}


function renderBoard() {
  for (let r = 0; r < 6; r++) {
    const guess = gameState.guesses[r] || null;
    for (let c = 0; c < 5; c++) {
const tile = document.getElementById(`tile-${r}-${c}`);      if (guess) {
        tile.textContent = guess.word[c] || '';
        tile.className = 'tile ' + (guess.result[c] || '');
      } else if (r === gameState.guesses.length) {
        tile.textContent = gameState.currentGuess[c] || '';
        tile.className = 'tile' + (gameState.currentGuess[c] ? ' filled' : '');
      } else {
        tile.textContent = '';
        tile.className = 'tile';
      }
    }
  }
}

function updateKeyboard() {
  Object.entries(gameState.letterStates).forEach(([letter, state]) => {
    const btn = document.getElementById('key-' + letter);
    if (btn) btn.className = 'key' + (letter.length > 1 ? ' wide' : '') + ' ' + state;
  });
}


function evaluateGuess(guess, answer) {
  const result    = Array(5).fill('absent');
  const answerArr = answer.split('');
  const guessArr  = guess.split('');
  const used      = Array(5).fill(false);

  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === answerArr[i]) {
      result[i] = 'correct';
      used[i]   = true;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    for (let j = 0; j < 5; j++) {
      if (!used[j] && guessArr[i] === answerArr[j]) {
        result[i] = 'present';
        used[j]   = true;
        break;
      }
    }
  }

  return result;
}

function submitGuess() {
  if (gameState.gameOver) return;

  const guess = gameState.currentGuess;

  if (guess.length < 5) {
    shakeRow(gameState.guesses.length);
    showMessage('Not enough letters');
    return;
  }

  if (!ALL_VALID.has(guess)) {
    shakeRow(gameState.guesses.length);
    showMessage('Not in word list');
    return;
  }

  const result = evaluateGuess(guess, gameState.answer);
  const rowIdx = gameState.guesses.length;

  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${rowIdx}-${c}`);
    tile.textContent = guess[c];
  }

  animateRow(rowIdx, result, () => {
    gameState.guesses.push({ word: guess, result });
    gameState.currentGuess = '';

    result.forEach((r, i) => {
      const letter  = guess[i];
      const current = gameState.letterStates[letter];
      if (r === 'correct') {
        gameState.letterStates[letter] = 'correct';
      } else if (r === 'present' && current !== 'correct') {
        gameState.letterStates[letter] = 'present';
      } else if (!current) {
        gameState.letterStates[letter] = 'absent';
      }
    });

    updateKeyboard();
    renderBoard();
    saveGame();

const won = result.every(r => r === 'correct');

if (won) {
  launchConfetti();

  gameState.gameOver = true;

  document.querySelectorAll('.tile.correct')
    .forEach(tile => tile.classList.add('winner'));

  setTimeout(() => showEndModal(true), 400);

} else if (gameState.guesses.length === 6) {

  gameState.gameOver = true;

  setTimeout(() => showEndModal(false), 400);
}

  });
}



function handleKey(key) {
  if (gameState.gameOver) return;

  if (key === '⌫' || key === 'BACKSPACE') {
    gameState.currentGuess = gameState.currentGuess.slice(0, -1);
    renderBoard();
    return;
  }

  if (key === 'ENTER') {
    submitGuess();
    return;
  }

  if (/^[A-Z]$/.test(key) && gameState.currentGuess.length < 5) {
    gameState.currentGuess += key;
    const rowIdx = gameState.guesses.length;
    const tile   = document.getElementById(`tile-${rowIdx}-${gameState.currentGuess.length - 1}`);
    if (tile) {
      tile.classList.add('pop');
      setTimeout(() => tile.classList.remove('pop'), 100);
    }
    renderBoard();
  }
}

document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const key = e.key.toUpperCase();
  if (key === 'BACKSPACE') handleKey('BACKSPACE');
  else if (key === 'ENTER') handleKey('ENTER');
  else if (/^[A-Z]$/.test(key)) handleKey(key);
});


function animateRow(rowIdx, results, callback) {
  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${rowIdx}-${c}`);

    setTimeout(() => {
      tile.classList.add('flip');

      setTimeout(() => {
        tile.className = `tile ${results[c]} flip`;
      }, 300);

      tile.addEventListener(
        'animationend',
        () => tile.classList.remove('flip'),
        { once: true }
      );
    }, c * 250);
  }

  setTimeout(callback, 1600);
}
function shakeRow(rowIdx) {
  const row = document.getElementById('row-' + rowIdx);
  row.querySelectorAll('.tile').forEach(tile => {
    tile.classList.remove('shake');
    void tile.offsetWidth;
    tile.classList.add('shake');
  });
}


function showMessage(msg, duration = 1800) {
  const bar = document.getElementById('message-bar');
  bar.textContent = msg;
  if (duration > 0) {
    setTimeout(() => {
      if (bar.textContent === msg) bar.textContent = '';
    }, duration);
  }
}
document.getElementById('header').addEventListener('click', () => {
  document.getElementById('title-screen').style.display = 'flex';
});



  function showEndModal(won) {
    startCountdown();
  const randomWinLine =
    WIN_LINES[Math.floor(Math.random() * WIN_LINES.length)];

  const info = WORD_INFO[gameState.answer];

  document.getElementById('modal-title').textContent = won
    ? randomWinLine
    : 'The reel ends here.';

  document.getElementById('modal-word').textContent =
    info ? info.display : gameState.answer;

  document.getElementById('modal-desc').textContent =
  info
    ? info.description
    : `The answer was ${gameState.answer}.`;
  document.getElementById('modal-overlay').classList.add('show');
}


const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

let confettiPieces = [];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

function launchConfetti() {
  confettiPieces = [];

  const colors = [
    "#a8d4a8",  
    "#d4b870", 
    "#e8b7a0", 
    "#cdb9d7"  
  ];

  for (let i = 0; i < 180; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    });
  }

  animateConfetti();
}

function animateConfetti() {
  let frame = 0;

  function render() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach(piece => {
      piece.x += piece.speedX;
      piece.y += piece.speedY;
      piece.rotation += piece.rotationSpeed;

      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation * Math.PI / 180);

      ctx.fillStyle = piece.color;
      ctx.fillRect(
        -piece.size / 2,
        -piece.size / 2,
        piece.size,
        piece.size
      );

      ctx.restore();
    });

    frame++;

    if (frame < 240) {
      requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  render();
}

async function init() {

  showMessage('Loading...', 0);

  await loadCommonWords();

  gameState.answer = getDailyAnswer();

  buildBoard();
  buildKeyboard();

  const loaded = loadGame();

  renderBoard();
  updateKeyboard();

  if (loaded && savedHint) {
    showMessage(savedHint, 0);
  }

  document.getElementById('message-bar').textContent =
    savedHint || '';
}

init();
setTimeout(() => {
  document.getElementById('intro-overlay').remove();
}, 2500);
let hintUsed = false;
let savedHint = '';
document.getElementById('category-hint-btn')
.addEventListener('click', () => {

  const info = WORD_INFO[gameState.answer];

  if (!info || !info.category) {
    showMessage('No category available');
    return;
  }

savedHint = `Category: ${info.category}`;

showMessage(savedHint, 0);

hintUsed = true;
  document
    .getElementById('hint-modal-overlay')
    .classList.remove('show');
});
document.getElementById('letter-hint-btn')
.addEventListener('click', () => {

  const answer = gameState.answer;

  const index =
    Math.floor(Math.random() * answer.length);

  const letter = answer[index];

  savedHint = `Letter ${index + 1}: ${letter}`;

showMessage(savedHint, 0);

hintUsed = true;
saveGame();

  document
    .getElementById('hint-modal-overlay')
    .classList.remove('show');
});
document.getElementById('hint-btn').addEventListener('click', () => {

  if (hintUsed) {
    showMessage('Hint already used');
    return;
  }

  document
    .getElementById('hint-modal-overlay')
    .classList.add('show');
});
function startCountdown() {

  const timer =
    document.getElementById('next-puzzle-timer');

  function update() {

    const now = new Date();

    const tomorrow = new Date();

    tomorrow.setHours(24, 0, 0, 0);

    const diff = tomorrow - now;

    const hours =
      Math.floor(diff / 3600000);

    const mins =
      Math.floor(diff % 3600000 / 60000);

    const secs =
      Math.floor(diff % 60000 / 1000);

    timer.textContent =
      `Next puzzle in ${hours}h ${mins}m ${secs}s`;
  }

  update();

  setInterval(update, 1000);
}