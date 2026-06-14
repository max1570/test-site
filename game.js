/* ─────────────────────────────────────────
   Cinematle — game logic
   Depends on: words.js loaded before this
───────────────────────────────────────── */

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

/* ── Word list loading ───────────────────── */

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
    // If fetch fails, fall back to just film words being valid
    console.warn('Could not load common word list, using film words only.', err);
    ALL_VALID = new Set(FILM_WORDS);
  }
}

/* ── Word selection ──────────────────────
   getDailyAnswer: same word for everyone
   on the same calendar day.
   getRandomAnswer: for the test play-again
   button — remove that button when live.
─────────────────────────────────────────── */

function getDailyAnswer() {
  const START = new Date('2024-01-01').getTime();
  const dayIndex = Math.floor((Date.now() - START) / 86400000);
  return FILM_WORDS[dayIndex % FILM_WORDS.length];
}

function getRandomAnswer() {
  return FILM_WORDS[Math.floor(Math.random() * FILM_WORDS.length)];
}

/* ── Build DOM ───────────────────────────── */

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
      tile.id = `tile-${r}-${c}`;
      row.appendChild(tile);
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

/* ── Render ──────────────────────────────── */

function renderBoard() {
  for (let r = 0; r < 6; r++) {
    const guess = gameState.guesses[r] || null;
    for (let c = 0; c < 5; c++) {
      const tile = document.getElementById(`tile-${r}-${c}`);
      if (guess) {
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

/* ── Game logic ──────────────────────────── */

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

    const won = result.every(r => r === 'correct');
    if (won) {
      gameState.gameOver = true; 
      document.querySelectorAll('.tile.correct')
  .forEach(tile => {
    tile.classList.add('winner');
  });
      setTimeout(() => showEndModal(true), 400);
    } else if (gameState.guesses.length === 6) {
      gameState.gameOver = true;
      setTimeout(() => showEndModal(false), 400);
    }
  });
}

/* ── Input handling ──────────────────────── */

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

/* ── Animations ──────────────────────────── */

function animateRow(rowIdx, results, callback) {
  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${rowIdx}-${c}`);
    setTimeout(() => {
      tile.classList.add('flip');
      setTimeout(() => {
        tile.className = 'tile ' + results[c];
      }, 250);
    }, c * 80);
  }
  setTimeout(callback, 5 * 80 + 300);
}

function shakeRow(rowIdx) {
  const row = document.getElementById('row-' + rowIdx);
  row.querySelectorAll('.tile').forEach(tile => {
    tile.classList.remove('shake');
    void tile.offsetWidth;
    tile.classList.add('shake');
  });
}

/* ── UI helpers ──────────────────────────── */

function showMessage(msg, duration = 1800) {
  const bar = document.getElementById('message-bar');
  bar.textContent = msg;
  if (duration > 0) {
    setTimeout(() => {
      if (bar.textContent === msg) bar.textContent = '';
    }, duration);
  }
}



  function showEndModal(won) {
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

document.getElementById('play-again-btn').addEventListener('click', () => {
  gameState = {
    answer: getRandomAnswer(),
    guesses: [],
    currentGuess: '',
    gameOver: false,
    letterStates: {}
  };
  document.getElementById('message-bar').textContent = '';
  document.getElementById('modal-overlay').classList.remove('show');
  buildBoard();
  buildKeyboard();
  renderBoard();
});

/* ── Init ────────────────────────────────── */
setTimeout(() => {
  document
    .querySelector('.curtain.left')
    .classList.add('open-left');

  document
    .querySelector('.curtain.right')
    .classList.add('open-right');
}, 300);
async function init() {
  showMessage('Loading...', 0);
  await loadCommonWords();
  document.getElementById('message-bar').textContent = '';
  gameState.answer = getDailyAnswer();
  buildBoard();
  buildKeyboard();
  renderBoard();
}

init();