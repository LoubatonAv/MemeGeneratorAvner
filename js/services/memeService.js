'use strict';

var gCurrLineIdx = 0;

//Memes gallery
var gImgs = [
  { id: 1, url: '1.jpg' },
  { id: 2, url: '2.jpg' },
  { id: 3, url: '3.jpg' },
  { id: 4, url: '4.jpg' },
  { id: 5, url: '5.jpg' },
  { id: 6, url: '6.jpg' },
  { id: 7, url: '7.jpg' },
  { id: 8, url: '8.jpg' },
  { id: 9, url: '9.jpg' },
  { id: 10, url: '10.jpg' },
  { id: 11, url: '11.jpg' },
  { id: 12, url: '12.jpg' },
  { id: 13, url: '13.jpg' },
  { id: 14, url: '14.jpg' },
  { id: 15, url: '15.jpg' },
  { id: 16, url: '16.jpg' },
  { id: 17, url: '17.jpg' },
  { id: 18, url: '18.jpg' },
];

//MEME OBJECT
var gMeme = {
  selectedImgId: 0,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Fun fun fun',
      size: 45,
      align: 'center',
      color: 'white',
      stroke: 'black',
      font: 'impact',
      pos: { x: 250, y: 70 },
    },

    {
      txt: 'Fun fun fun',
      size: 45,
      align: 'center',
      color: 'white',
      stroke: 'black',
      font: 'impact',
      pos: { x: 250, y: 400 },
    },
  ],
};

function getMeme() {
  return gMeme;
}

//Images
function getImg(meme) {
  return gImgs[meme.selectedImgId];
}

function getImgs() {
  return gImgs;
}

function setImg(id) {
  gMeme.selectedImgId = id - 1;
}

//Lines
function getLine() {
  return gMeme.lines[gCurrLineIdx];
}

function getLines() {
  return gMeme.lines;
}

function setLineTxt(txt) {
  gMeme.lines[gCurrLineIdx].txt = txt;
}
function moveLine(diff, direction) {
  const line = getLine();
  line.pos[direction] += diff;
}

//add new line to the array
function addLine(font) {
  const newLine = createLine(font);
  gMeme.lines.push(newLine);
  updateLineId(gMeme.lines.length - 1);
}

//updating the id of the line
function updateLineId(idx) {
  gCurrLineIdx = idx;
  gMeme.selectedLineIdx = gCurrLineIdx;
}

function switchLine() {
  const lines = getLines();
  if (!lines.length) return;
  if (gMeme.selectedLineIdx + 1 === lines.length) gMeme.selectedLineIdx = 0;
  else gMeme.selectedLineIdx++;
  gCurrLineIdx = gMeme.selectedLineIdx;
  return lines[gCurrLineIdx];
}

//creating new line at the center
function createLine(font) {
  const newPos = { x: gCanvas.width / 2, y: gCanvas.height / 2 };
  return {
    txt: 'mega fun',
    size: 45,
    align: 'center',
    color: 'white',
    stroke: 'black',
    font: `${font}`,
    pos: { x: newPos.x, y: newPos.y },
  };
}

//align text handlers
function changeAlign(alignDirection) {
  const line = getLine();
  line.align = alignDirection;

  switch (alignDirection) {
    case 'left':
      line.pos.x = 0;
      break;
    case 'center':
      line.pos.x = gCanvas.width / 2;
      break;
    case 'right':
      line.pos.x = gCanvas.width;
      break;
  }
}

function removeLine() {
  const lines = getLines();
  if (!lines.length) return;
  lines.splice(gCurrLineIdx, 1);
  updateLineId(0);
}

//handling the font
function changeColor(value, color) {
  if (value === 'font') gMeme.lines[gCurrLineIdx].color = color;
  else gMeme.lines[gCurrLineIdx].stroke = color;
}

function changeFontSize(diff) {
  const line = getLine();
  line.size += diff;
}

function changeFont(font) {
  const line = getLine();
  line.font = font;
}
