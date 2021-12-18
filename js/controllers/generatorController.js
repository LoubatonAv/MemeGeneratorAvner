'use strict';

var gCanvas;
var gCtx;
var gDiff;
var gStartPos;
const gTouchEvents = ['touchstart', 'touchmove', 'touchend'];

//Render the canvas
function renderCanvas() {
  const meme = getMeme();
  const img = new Image();
  const currImage = getImg(meme);
  img.src = `imgs/${currImage.url}`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    typeText();
    highLightText();
    renderTextInput();
  };
}

//get the value of the existing input in the lines
function renderTextInput() {
  const line = getLine();
  if (!line) return;
  document.getElementById('text-input').value = line.txt;
}

// Event listeners
function addEventListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderCanvas();
  });
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', mouseMove);
  gCanvas.addEventListener('mousedown', mouseDown);
  gCanvas.addEventListener('mouseup', mouseUp);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', mouseMove);
  gCanvas.addEventListener('touchstart', mouseDown);
  gCanvas.addEventListener('touchend', mouseUp);
}

// Move text
function mouseDown(ev) {
  const pos = getEventPosition(ev);
  if (!clickedLine(pos)) return;
  gStartPos = pos;
  lineClicked(true);
  renderTextInput();
  renderCanvas();
  gCanvas.style.cursor = 'pointer';
}

function mouseUp() {
  lineClicked(false);
  gCanvas.style.cursor = 'pointer';
}

function mouseMove(ev) {
  const line = getLine();
  if (!line || !line.isPicked) return;
  const pos = getEventPosition(ev);
  const dx = pos.x - gStartPos.x;
  const dy = pos.y - gStartPos.y;
  moveLine(dx, 'x');
  moveLine(dy, 'y');
  gCanvas.style.cursor = 'pointer';
  gStartPos = pos;
  renderCanvas();
}

function getEventPosition(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvents.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    };
  }
  return pos;
}

//get the existing input of the lines array
//and set them on the canvas
function typeText() {
  const lines = getLines();
  lines.forEach((line) => {
    const txt = line.txt;
    gCtx.lineWidth = 3;
    gCtx.textAlign = `${line.align}`;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.stroke;
    gCtx.textBaseline = 'middle';
    gCtx.fillText(txt, line.pos.x, line.pos.y);
    gCtx.strokeText(txt, line.pos.x, line.pos.y);
  });
}

// highlighting the selected line
function highLightText() {
  const line = getLine();
  // console.log('line:', line);
  gCtx.beginPath();
  gCtx.rect(
    line.pos.x - gCtx.measureText(line.txt).width - 500,
    line.pos.y - 65,
    gCtx.measureText(line.txt).width + 1000,
    line.size + 50
  );
  gCtx.lineWidth = 2;
  gCtx.strokeStyle = '#ffff00';
  gCtx.stroke();
}

function onSetLineTxt(txt) {
  setLineTxt(txt);
  renderCanvas();
}

//FONTS Controller
function onChangeColor(value, color) {
  changeColor(value, color);
  renderCanvas();
}

function onChangeFontSize(diff) {
  changeFontSize(diff);
  renderCanvas();
}

function onChangeFont(font) {
  changeFont(font);
  renderCanvas();
}

//LINES
function onSwitchLine() {
  const line = switchLine();

  onSetLineTxt(line.txt);
  renderCanvas();
}

function onMoveLine(direction) {
  const diff = direction === 'down' ? 20 : -20;
  moveLine(diff, 'y');
  renderCanvas();
}

function onAddLine() {
  const font = document.querySelector('.select-font').value;
  addLine(font);
  renderCanvas();
}

function onRemoveLine() {
  removeLine();
  renderCanvas();
}

function onChangeAlign(direction) {
  changeAlign(direction);
  renderCanvas();
}
