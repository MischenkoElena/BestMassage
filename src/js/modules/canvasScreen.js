let canvas = (function() {
  let sepiaCanvas = document.getElementById('canvas'),
    $sepiaCanvas = $(sepiaCanvas),
    sepiaWrapper = $('.main-screen');
  let ctx = sepiaCanvas.getContext('2d');
  sepiaCanvas.width = sepiaWrapper.width();
  sepiaCanvas.height = sepiaWrapper.height();
  ctx.filter = 'sepia(100%)';
  let imageW, imageH, imageProportion, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight,
    kScale = 1.5, deltaScale = 0, deltaTranslateX = 0, deltaTranslateY = 0, deltaImageW, deltaImageH, direction = 1;
  let requestId,
    baseImage = new Image(),
    baseImageNew = new Image(),
    newBaseImageNum = 1, baseImageCount = $sepiaCanvas.data('images-count') - 1;
  baseImage.src = $sepiaCanvas.data('image-src0');
  let animationInterval, fadePct = 0;

  if (baseImageCount > 0) {
    baseImageNew.src = $sepiaCanvas.data('image-src' + newBaseImageNum);
    console.log('animateFade stop', newBaseImageNum, baseImage.src, baseImageNew.src);
  }

  function addImage() {
    baseImage.onload = function () {
      imageW = baseImage.width;
      imageH = baseImage.height;
      imageProportion = imageW / imageH;
      deltaImageW = imageW / 10000;
      deltaImageH = imageH / 10000;
      sx = 0;
      sy = 0;
      sWidth = imageW;
      sHeight = imageH;
      dWidth = sepiaCanvas.width*kScale;
      dHeight = sepiaCanvas.width*kScale/imageProportion;
      dx = sepiaCanvas.width / 2 - dWidth / 2;
      dy = sepiaCanvas.height / 2 - dHeight / 2;
      // ctx.drawImage(image, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
      // clearInterval(animationInterval);
      animate();
    };
  }

  function animate() {
    animationInterval = setInterval(function () {
      requestAnimationFrame(draw);
      // console.log('draw');
    }, 1000 / 40);
  }

  function animateFade() {
    if (fadePct > 100) {
      setTimeout(() => {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
      }, 0);
      baseImage = baseImageNew;
      animate();
      if (newBaseImageNum < baseImageCount) {
        baseImageNew.src = $sepiaCanvas.data('image-src' + newBaseImageNum);
        newBaseImageNum++;
      } else {
        newBaseImageNum = 0;
      }
      console.log('animateFade stop', newBaseImageNum, baseImage.src, baseImageNew.src);
      return;
    }
    requestId = window.requestAnimationFrame(animateFade);
    //            ctx.clearRect(0,0,canvas.width,canvas.height);
    // fadeDraw(baseImage, fadePct / 100);
    // fadeDraw(baseImageNew, (1 - fadePct / 100));
    fadePct += 20;
  }

  function fadeDraw(img, opacity) {
    console.log(opacity);
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    // ctx.drawImage(img, 0, 0);
    ctx.restore();
  }


  function draw() {
    ctx.clearRect(0, 0,sepiaCanvas.width, sepiaCanvas.height);
    ctx.save();
    let scale = Math.abs(Math.sin(deltaScale)) / 5 + 1;
    // let scale = 1;
    let trltX = deltaTranslateX;
    let trltY = 0;
    ctx.translate(trltX, trltY);
    ctx.scale(scale, scale);
    ctx.drawImage(baseImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    deltaScale += 0.002;
    if (deltaTranslateX <= Math.abs(dx) && direction) {
      deltaTranslateX += deltaImageW;
    }
    if (deltaTranslateX >= dx && !direction) {
      deltaTranslateX -= deltaImageW;
    }
    if (Math.abs(deltaTranslateX - Math.abs(dx / scale)) < 5) {
      direction = 0;
    }
    if (Math.abs(deltaTranslateX - dx / scale) < 5) {
      direction = 1;
      clearInterval(animationInterval);
      fadePct = 0;
      animateFade();
      // setTimeout(() => {
      //   window.cancelAnimationFrame(requestId);
      //   requestId = undefined;
      // }, 0);
    }
    deltaTranslateY += deltaImageH;
    ctx.restore();
    // requestId = window.requestAnimationFrame(draw);
  }

  function redrawImage() {
    sepiaCanvas.width = sepiaWrapper.width();
    sepiaCanvas.height = sepiaWrapper.height();
    ctx.clearRect(0, 0, sepiaCanvas.width, sepiaCanvas.height);
    dWidth = sepiaCanvas.width*kScale;
    dHeight = sepiaCanvas.width*kScale/imageProportion;
    dx = sepiaCanvas.width / 2 - dWidth / 2;
    dy = sepiaCanvas.height / 2 - dHeight / 2;
    ctx.filter = 'sepia(100%)';
    ctx.drawImage(baseImage, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  function init() {
    addImage();
    $(window).on('resize', ()=>{
      redrawImage();
    });
  }

  return {
    init: init
  };
}());

export default canvas;