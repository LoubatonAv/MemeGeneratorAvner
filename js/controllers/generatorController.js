'use strict';

var gCanvas;
var gCtx;
var gDiff;
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

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

function addMouseListeners() {
  gCanvas.addEventListener('mousedown', onMouseClick);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchstart', onMouseClick);
}

function onMouseClick(ev) {
  gCanvas.style.cursor = 'pointer';
  const pos = getEventPosition(ev);
  gStartPos = pos;
  if (!clickedLine(pos)) return;
  lineClicked(true);
  renderTextInput();
  renderCanvas();
}

function clickedLine(clickedPos) {
  const lines = getLines();
  const clickedLineIdx = lines.findIndex((line) => {
    const lineWidth = gCtx.measureText(line.txt).width;
    const lineHeight = line.size;
    return (
      clickedPos.x >= line.pos.x - lineWidth / 2 - 10 &&
      clickedPos.x <= line.pos.x + lineWidth + 20 &&
      clickedPos.y >= line.pos.y - 10 &&
      clickedPos.y <= line.pos.y + lineHeight + 20
    );
  });
  if (clickedLineIdx !== -1) {
    updateLineId(clickedLineIdx);
    return lines[clickedLineIdx];
  }
}

function getEventPosition(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    };
  }
  return pos;
}

function lineClicked(isDrag) {
  const line = getLine();
  line.isDrag = isDrag;
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
    gCtx.fillText(txt, line.pos.x, line.pos.y);

    gCtx.strokeText(txt, line.pos.x, line.pos.y);
  });
}

function onChangeFontSize(diff) {
  changeFontSize(diff);
  renderCanvas();
}

function highLightText() {
  const line = getLine();
  gCtx.beginPath();
  gCtx.rect(
    line.pos.x - gCtx.measureText(line.txt).width - 90,
    line.pos.y - 45,
    gCtx.measureText(line.txt).width + 1000,
    line.size + 50
  );
  gCtx.lineWidth = 3;
  gCtx.strokeStyle = '#ffff00';
  gCtx.stroke();
  gCtx.closePath();
}

function onSetLineTxt(txt) {
  setLineTxt(txt);
  highLightText();
  renderCanvas();
}

//FONTS Controller
function onChangeColor(value, color) {
  console.log('value:', value);
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
