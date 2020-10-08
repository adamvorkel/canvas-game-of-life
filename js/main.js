const cells = 100;
const cellSize = 5;
let speed = 0;
let running = false;

// standard game of life
const fate = (cell, count) => {
  if (cell) {
    if (count < 2 || count > 3) {
      return 0;
    }
    return cell;
  } else {
    if (count === 3) {
      return 1;
    }
  }
};

let game = ca(cells, fate);
game.randomize();

const canvasWidth = (canvasHeight = cells * cellSize);

let canvas = document.getElementById('cells');
let ctx = canvas.getContext('2d');
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;

function drawBoard() {
  for (let x = 0; x < cells; x++) {
    for (let y = 0; y < cells; y++) {
      ctx.beginPath();
      ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      if (game.getCell(x, y)) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}

function draw() {
  if (running) {
    game.next();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();

    setTimeout(() => {
      requestAnimationFrame(draw);
    }, speed);
  }
}

function init() {
  // draw initial state
  drawBoard();

  // ui controls
  let UISpeedInput = document.getElementById('ui-speed');
  let UIRunBtn = document.getElementById('ui-run');
  let UIRunPause = document.getElementById('ui-pause');

  UIRunBtn.addEventListener('click', (e) => {
    running = true;
    draw();
  });

  UIRunPause.addEventListener('click', (e) => {
    running = false;
  });

  UISpeedInput.addEventListener('change', (e) => {
    speed = parseInt(e.target.value);
  });
}

init();
