'use strict';

var gCanvas;
var gCtx;
var gDiff;

//Render the canvas
function renderCanvas() {
  const meme = getMeme();
  const img = new Image();
  const currImage = getImg(meme);
  img.src = `imgs/${currImage.url}`;
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
    drawBorder();
    renderTextInput();
  };
}

//get the value of the existing input in the lines
function renderTextInput() {
  const line = getLine();
  if (!line) return;
  document.getElementById('text-input').value = line.txt;
}

//get the existing input of the lines array
//and set them on the canvas
function drawText() {
  const lines = getLines();
  lines.forEach((line) => {
    const txt = line.txt;
    gCtx.lineWidth = 3;
    gCtx.textAlign = `${line.align}`;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.stroke;
    gCtx.fillText(txt, line.pos.x, line.pos.y);
    gCtx.strokeText(txt, line.pos.x, line.pos.y);
  });
}

function onChangeFontSize(diff) {
  changeFontSize(diff);

  renderCanvas();
}
function drawBorder() {
  const line = getLine();
  gCtx.beginPath();
  gCtx.rect(
    line.pos.x - gCtx.measureText(line.txt).width + 50,
    line.pos.y - 45,
    gCtx.measureText(line.txt).width + 70,
    line.size + 25
  );
  // gCtx.moveTo(pos.x) - gCtx.measureText(line.txt).width;

  gCtx.lineWidth = 1;
  gCtx.strokeStyle = '#2FB974';
  gCtx.stroke();
  gCtx.closePath();
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

function downloadImg(elLink) {
  var imgContent = gCanvas.toDataURL('image/jpeg');
  elLink.href = imgContent;
}

function onShareMeme() {}
