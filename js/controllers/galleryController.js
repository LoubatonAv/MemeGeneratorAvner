'use strict';

//Initiation
function onInit() {
  gCanvas = document.querySelector('.canvas');
  gCtx = gCanvas.getContext('2d');
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
  addListeners();
  renderCanvas();
  renderMemes();
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    resizeCanvas();
    renderCanvas();
  });
}

//Handle resize canvas
function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container');
  gCanvas.innerWidth = elContainer.offsetWidth;
  gCanvas.innerHeight = elContainer.offsetHeight;
}

//Renders the meme to the gallery
function renderMemes() {
  const imgs = getImgs();
  const strHtmls = imgs.map((meme) => {
    return `
    <img onclick="onImgSelect('${meme.id}')" class="img" src="./imgs/${meme.id}.jpg" />`;
  });

  const elGallery = document.querySelector('.gallery');
  elGallery.innerHTML = strHtmls.join('');
}

//Loads gallery and hides the generator
function onLoadGallery() {
  document.querySelector('.gallery-container').classList.remove('none');
  document.querySelector('.main-content').style.display = 'none';
}

//Image selection to the editor
function onImgSelect(id) {
  setImg(id);
  document.querySelector('.gallery-container').classList.add('none');
  document.querySelector('.main-content').style.display = 'flex';
  renderCanvas();
}
