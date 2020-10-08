const cells = 100;
const cellSize = 8;

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

let canvas = document.createElement('canvas');
document.body.appendChild(canvas);
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  game.next();

  setTimeout(() => {
    requestAnimationFrame(draw);
  }, 50);
}

draw();
