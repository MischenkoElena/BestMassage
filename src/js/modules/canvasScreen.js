let canvas = (function() {
  let sepiaCanvas,
    $sepiaCanvas,
    sepiaWrapper;
  let ctx;
  let imageW, imageH, imageProportion, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight,
    kScale = 1.4, deltaScale = 0, deltaTranslateX = 0, deltaTranslateY = 0, deltaImageW, deltaImageH, direction = 1;
  let requestIdDraw, requestIdFade,
    imagesArr = [],
    baseImagesArr = [],
    newBaseImageNum = 0, baseImageCount;
  let animationInterval, fadePct = 0, scale;

  function initCanvas() {
    sepiaCanvas = document.getElementById('canvas');

    if (!sepiaCanvas) return false;

    $sepiaCanvas = $(sepiaCanvas);
    sepiaWrapper = $('.main-screen');
    ctx = sepiaCanvas.getContext('2d');
    sepiaCanvas.width = sepiaWrapper.width();
    sepiaCanvas.height = sepiaWrapper.height();
    ctx.filter = 'sepia(100%)';
    baseImageCount = $sepiaCanvas.data('images-count') - 1;

    for (let i = 0; i <= baseImageCount; i++) {
      let image = new Image();
      image.src = $sepiaCanvas.data('image-src' + i);
      baseImagesArr.push(image);
      addImage(image);
    }
  }

  function setInitialValuesForDrawing(image) {
    imageW = image.width;
    imageH = image.height;
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
  }

  function addImage(image) {
    image.onload = function () {
      imagesArr.push(image);
      setInitialValuesForDrawing(image);
      if (imagesArr.length === baseImagesArr.length) {
        newBaseImageNum = imagesArr.length - 1;
        animate();
      }
    };
  }

  function animate() {
    animationInterval = setInterval(function () {
      requestAnimationFrame(draw);
    }, 1000 / 60);
  }

  function animateFade() {
    ctx.globalAlpha = fadePct;
    ctx.drawImage(imagesArr[newBaseImageNum], 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
    if (fadePct < 1) {
      fadePct += 0.02;
      requestIdFade = requestAnimationFrame(animateFade);
    } else {
      // setTimeout(() => {
      window.cancelAnimationFrame(requestIdFade);
      requestIdFade = undefined;
      // }, 0);
      animate();
    }
  }

  function draw() {
    ctx.clearRect(0, 0,sepiaCanvas.width, sepiaCanvas.height);
    ctx.save();
    scale = Math.abs(Math.sin(deltaScale)) / 5 + 1;
    // let scale = 1;
    let trltX = deltaTranslateX;
    let trltY = 0;
    ctx.translate(trltX, trltY);
    ctx.scale(scale, scale);
    ctx.drawImage(imagesArr[newBaseImageNum], sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
      setTimeout(() => {
        window.cancelAnimationFrame(requestIdDraw);
        requestIdDraw = undefined;
      }, 0);
      newBaseImageNum = (newBaseImageNum) ? newBaseImageNum - 1 : imagesArr.length - 1;
      deltaScale = 0;
      deltaTranslateX = 0;
      deltaTranslateY = 0;
      deltaImageW = 0;
      deltaImageH = 0;
      setInitialValuesForDrawing(imagesArr[newBaseImageNum]);
      fadePct = 0;
      console.log(newBaseImageNum);
      animateFade();
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
    ctx.drawImage(imagesArr[newBaseImageNum], 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  function init() {
    initCanvas();
    $(window).on('resize', ()=>{
      redrawImage();
    });
  }

  function play() {
    if (!sepiaCanvas) return false;
    animate();
    console.log('play');
  }

  function pause() {
    if (!sepiaCanvas) return false;
    clearInterval(animationInterval);
    window.cancelAnimationFrame(requestIdDraw);
    requestIdDraw = undefined;
    console.log('pause');
  }

  return {
    init: init,
    pause: pause,
    play: play
  };
}());

export default canvas;