'use strict';

//Initiation
function onInit() {
  gCanvas = document.querySelector('.canvas');
  gCtx = gCanvas.getContext('2d');
  // window.addEventListener('resize', resizeCanvas);
  addEventListeners();
  renderCanvas();
  renderMemes();
}

function lineClicked(isPicked) {
  const line = getLine();
  line.isPicked = isPicked;
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
