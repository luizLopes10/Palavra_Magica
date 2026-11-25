"use strict";

const levels = {
  easy: {
    name: "Fácil",
    extraLetters: 2,
    hintRow: 0,
    puzzles: [
      { word: "SOL", clue: "Ilumino e aqueço a Terra durante o dia.", picture: "Um círculo amarelo com pontas em volta.", hintTile: [0, 0] },
      { word: "UVA", clue: "Sou uma fruta pequena que cresce em cachos.", picture: "Várias bolinhas roxas agrupadas com uma folhinha verde no topo.", hintTile: [0, 1] },
      { word: "LUA", clue: "Brilho à noite e posso parecer cheia ou fininha.", picture: "Uma figura azul-clara curva, parecida com a letra C.", hintTile: [0, 2] },
      { word: "SAPO", clue: "Pulo perto da lagoa e faço croac, croac.", picture: "Um bichinho verde agachado, com dois olhos grandes.", hintTile: [0, 3] },
      { word: "GATO", clue: "Faço miau, tenho bigodes e gosto de tirar sonecas.", picture: "Um bichinho laranja sentado, com orelhas pontudas e cauda.", hintTile: [1, 0] },
      { word: "BOLA", clue: "Sou redonda. Você pode me chutar na direção do gol.", picture: "Um círculo branco com manchas pretas.", hintTile: [1, 1] },
      { word: "PÃO", clue: "Saio quentinho da padaria e fico gostoso com manteiga.", picture: "Uma forma dourada e oval com um corte no topo.", hintTile: [1, 2] },
      { word: "FLOR", clue: "Tenho pétalas coloridas e nasço no jardim.", picture: "Um miolo cercado por pétalas rosas, acima de um caule verde.", hintTile: [1, 3] },
    ],
  },
  medium: {
    name: "Médio",
    extraLetters: 3,
    hintRow: 1,
    puzzles: [
      { word: "NUVEM", clue: "Viajo pelo céu empurrada pelo vento e às vezes trago chuva.", picture: "Uma forma branca e fofa com bordas arredondadas.", hintTile: [0, 0] },
      { word: "COELHO", clue: "Tenho orelhas compridas, dou saltos e gosto de roer vegetais.", picture: "Um bichinho bege com duas pontas compridas acima da cabeça.", hintTile: [0, 1] },
      { word: "CONCHA", clue: "Sou a casinha dura de alguns animais do mar. Você pode me achar na areia.", picture: "Uma forma rosa parecida com um leque.", hintTile: [0, 2] },
      { word: "TRILHA", clue: "Sou um caminho estreito que você pode seguir pela floresta.", picture: "Uma faixa sinuosa de terra entre duas manchas verdes.", hintTile: [0, 3] },
      { word: "BANANA", clue: "Sou uma fruta comprida e curva. Minha casca costuma ficar amarela quando amadureço.", picture: "Uma figura comprida, amarela e curvada.", hintTile: [1, 0] },
      { word: "GIRAFA", clue: "Meu pescoço comprido me ajuda a comer as folhas mais altas das árvores.", picture: "Um animal amarelo com manchas marrons, pernas altas e pescoço comprido.", hintTile: [1, 1] },
      { word: "PINCEL", clue: "Levo tinta até o papel. Tenho um cabo numa ponta e cerdas na outra.", picture: "Um cabo azul com um pequeno tufo laranja na ponta.", hintTile: [1, 2] },
      { word: "TIGELA", clue: "Sou redonda e funda. Posso servir cereal com leite ou guardar massa de bolo.", picture: "Um recipiente roxo, redondo e aberto por cima.", hintTile: [1, 3] },
    ],
  },
  hard: {
    name: "Difícil",
    extraLetters: 4,
    hintRow: 2,
    puzzles: [
      { word: "TERMÔMETRO", clue: "Eu mostro o quanto algo está quente ou frio. Posso ajudar a descobrir se você está com febre.", picture: "Uma haste fina com uma linha vermelha que termina em uma bolinha.", hintTile: [0, 0] },
      { word: "HELICÓPTERO", clue: "Posso subir do chão em linha reta e ficar parado no ar enquanto minhas pás giram.", picture: "Uma figura vermelha com uma cauda comprida e uma faixa no topo.", hintTile: [0, 1] },
      { word: "MICROSCÓPIO", clue: "Com minhas lentes, você pode enxergar coisas pequenas demais para ver a olho nu.", picture: "Um objeto azul com um braço curvo e uma base larga.", hintTile: [0, 2] },
      { word: "ESCORREGADOR", clue: "No parquinho, você sobe os meus degraus e desce sentado por uma rampa.", picture: "Uma rampa amarela com uma escada vermelha de um lado.", hintTile: [0, 3] },
      { word: "DINOSSAURO", clue: "Vivi na Terra há milhões de anos. Hoje, cientistas encontram meus ossos em fósseis.", picture: "Um animal verde com cabeça grande, patas dianteiras curtas e cauda comprida.", hintTile: [1, 0] },
      { word: "VENTILADOR", clue: "Num dia quente, minhas pás giram atrás de uma grade para fazer o ar circular.", picture: "Um círculo azul com pás, apoiado sobre uma base.", hintTile: [1, 1] },
      { word: "MOTOCICLETA", clue: "Tenho duas rodas, guidão e motor. Quem me pilota usa capacete.", picture: "Um veículo vermelho de duas rodas, visto de lado.", hintTile: [1, 2] },
      { word: "GRAMPEADOR", clue: "Quando você me aperta contra uma pilha de folhas, coloco um pequeno grampo para mantê-las juntas.", picture: "Um objeto roxo comprido, com uma abertura entre o topo e a base.", hintTile: [1, 3] },
    ],
  },
};

const roundsPerGame = 4;
const unusedPuzzles = new Map();
const hintSheets = ["assets/dicas.png", "assets/dicas-extra.png"];
const hintStages = [
  { label: "Dica", blur: null },
  { label: "Mais dica", blur: "6px" },
  { label: "Mais dica", blur: "3px" },
  { label: "Dica final", blur: "0px" },
];

const screens = [...document.querySelectorAll(".screen")];
const byId = (id) => document.getElementById(id);
const challenge = byId("challenge");
const answer = byId("answer");
const bank = byId("bank");
const feedback = byId("feedback");
const hintPicture = byId("hint-picture");
const hint = byId("hint");
const erase = byId("erase");
const clear = byId("clear");
const verify = byId("verify");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let level;
let gamePuzzles;
let round;
let puzzle;
let solution;
let letters;
let selection;
let solved;
let hintStage;
let shakeAnimation;

function normalize(text) {
  return text.toUpperCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function shuffle(tiles) {
  for (let index = tiles.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [tiles[index], tiles[other]] = [tiles[other], tiles[index]];
  }
  return tiles;
}

function shuffledLetters(word, extraCount) {
  const candidates = [..."ABCDEFGHIJKLMNOPQRSTUVXZ"].filter((letter) => !word.includes(letter));
  const extras = shuffle(candidates).slice(0, extraCount);
  const tiles = shuffle([...word, ...extras]);
  if (tiles.slice(0, word.length).join("") === word) {
    tiles.push(tiles.shift());
  }
  return tiles;
}

function sizeLetterRow(row, count) {
  row.style.setProperty("--columns", count <= 12 ? count : Math.ceil(count / 2));
  row.style.setProperty("--compact-columns", count <= 8 ? count : Math.ceil(count / 2));
}

function showScreen(id) {
  for (const screen of screens) {
    screen.hidden = screen.id !== id;
  }
  byId(byId(id).getAttribute("aria-labelledby")).focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function makeLetter(className, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "letter " + className;
  button.addEventListener("click", onClick);
  return button;
}

function startLevel(selectedLevel) {
  level = levels[selectedLevel];
  startGame();
}

function startGame() {
  const queue = unusedPuzzles.get(level) ?? [];
  if (queue.length < roundsPerGame) {
    const carryover = [...queue];
    queue.push(...shuffle(level.puzzles.filter((item) => !carryover.includes(item))), ...carryover);
  }
  gamePuzzles = queue.splice(0, roundsPerGame);
  unusedPuzzles.set(level, queue);
  round = 0;
  startRound();
  showScreen("challenge");
}

function startRound() {
  puzzle = gamePuzzles[round];
  solution = normalize(puzzle.word);
  letters = shuffledLetters(solution, level.extraLetters);
  selection = [];
  solved = false;
  hintStage = 0;

  byId("challenge-title").textContent = level.name;
  byId("round-number").textContent = "Palavra " + (round + 1) + " de " + gamePuzzles.length;
  byId("progress").max = gamePuzzles.length;
  byId("progress").value = round;
  byId("clue").textContent = puzzle.clue;

  sizeLetterRow(answer, solution.length);
  sizeLetterRow(bank, letters.length);
  answer.replaceChildren(...Array.from(solution, (_, index) =>
    makeLetter("slot", () => removeLetter(index)),
  ));
  bank.replaceChildren(...letters.map((letter, index) => {
    const button = makeLetter("tile", () => selectLetter(index));
    button.textContent = letter;
    return button;
  }));

  const [sheet, column] = puzzle.hintTile;
  hintPicture.style.setProperty("--hint-image", 'url("' + hintSheets[sheet] + '")');
  hintPicture.style.setProperty("--hint-column", column);
  hintPicture.style.setProperty("--hint-row", level.hintRow);
  hintPicture.setAttribute("aria-label", puzzle.picture);
  updateHint();
  verify.textContent = "Verificar";
  updateLetters();
}

function updateHint() {
  const stage = hintStages[hintStage];
  const visible = stage.blur !== null;
  hintPicture.hidden = !visible;
  hintPicture.style.setProperty("--hint-blur", stage.blur ?? "");
  hint.textContent = stage.label;
  hint.setAttribute("aria-expanded", String(visible));
  hint.disabled = solved || hintStage === hintStages.length - 1;
}

function updateLetters() {
  const used = new Set(selection);
  const full = selection.length === solution.length;
  shakeAnimation?.cancel();
  answer.classList.remove("incorrect");
  answer.classList.toggle("solved", solved);

  for (const [index, slot] of [...answer.children].entries()) {
    const tile = selection[index];
    const letter = solved ? puzzle.word[index] : letters[tile];
    slot.textContent = letter ?? "";
    slot.classList.toggle("filled", letter !== undefined);
    slot.disabled = solved || letter === undefined;
    slot.setAttribute("aria-label", letter === undefined
      ? "Posição " + (index + 1) + ", vazia"
      : "Posição " + (index + 1) + ", letra " + letter);
  }

  for (const [index, tile] of [...bank.children].entries()) {
    const taken = used.has(index);
    const unavailable = taken || full;
    tile.classList.toggle("used", taken);
    tile.setAttribute("aria-disabled", String(unavailable));
    tile.setAttribute("aria-label", "Letra " + letters[index] + (taken ? ", usada" : ""));
    tile.tabIndex = unavailable ? -1 : 0;
  }

  const canEdit = !solved && selection.length > 0;
  erase.disabled = !canEdit;
  clear.disabled = !canEdit;
  feedback.textContent = "";
  feedback.classList.remove("success");
}

function selectLetter(index) {
  if (index < 0 || selection.length === solution.length || selection.includes(index)) return;
  selection.push(index);
  updateLetters();
}

function removeLetter(index) {
  if (solved || index < 0 || index >= selection.length) return;
  selection.splice(index, 1);
  updateLetters();
}

function removeLastLetter() {
  removeLetter(selection.length - 1);
}

function showIncorrectAnswer() {
  feedback.textContent = "Quase! Revise as letras e tente de novo.";
  answer.classList.add("incorrect");
  shakeAnimation?.cancel();
  if (!reducedMotion.matches) {
    const keyframes = [0, -7, 7, -5, 5, -2, 0].map((offset) => ({
      transform: "translateX(" + offset + "px)",
    }));
    shakeAnimation = answer.animate(keyframes, { duration: 340, easing: "ease-out" });
  }
}

function verifyAnswer() {
  if (solved) {
    round += 1;

    if (round === gamePuzzles.length) {
      byId("complete-message").textContent =
        "Você descobriu as " + round + " palavras do nível " + level.name + ".";
      showScreen("complete");
    } else {
      startRound();
      showScreen("challenge");
    }
    return;
  }

  if (selection.length < solution.length) {
    feedback.textContent = "Preencha todos os espaços.";
    return;
  }

  const attempt = selection.map((index) => letters[index]).join("");
  if (attempt !== solution) {
    showIncorrectAnswer();
    return;
  }

  solved = true;
  updateLetters();
  updateHint();
  byId("progress").value = round + 1;
  feedback.classList.add("success");
  feedback.textContent = "Você acertou! A palavra é " + puzzle.word + ".";
  verify.textContent = round + 1 === gamePuzzles.length ? "Ver resultado" : "Próxima palavra";
}

byId("play").addEventListener("click", () => showScreen("levels"));

for (const button of document.querySelectorAll("[data-back]")) {
  button.addEventListener("click", () => showScreen(button.dataset.back));
}

for (const button of document.querySelectorAll("[data-level]")) {
  button.addEventListener("click", () => startLevel(button.dataset.level));
}

byId("replay").addEventListener("click", startGame);

hint.addEventListener("click", () => {
  if (hint.disabled) return;
  hintStage += 1;
  updateHint();
  if (hintStage === 1) {
    hint.scrollIntoView({ block: "nearest" });
  }
});

erase.addEventListener("click", removeLastLetter);

clear.addEventListener("click", () => {
  selection = [];
  updateLetters();
});

verify.addEventListener("click", verifyAnswer);

document.addEventListener("keydown", (event) => {
  if (challenge.hidden || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return;

  if (event.key === "Enter") {
    if (event.repeat) {
      event.preventDefault();
    } else if (!event.target.closest?.("button")) {
      event.preventDefault();
      verifyAnswer();
    }
    return;
  }

  if (solved) return;

  if (event.key === "Backspace") {
    event.preventDefault();
    removeLastLetter();
    return;
  }

  const key = normalize(event.key);
  if (/^[A-Z]$/.test(key) && !event.repeat) {
    const index = letters.findIndex((letter, position) => letter === key && !selection.includes(position));
    selectLetter(index);
  }
});
