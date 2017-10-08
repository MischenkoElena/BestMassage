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
  let baseImage = new Image(),
    baseImageNew = baseImage,
    baseImageNum = 0, baseImageCount = $sepiaCanvas.data('images-count') - 1;
  baseImage.src = $sepiaCanvas.data('image-src0');
  let animationInterval;

  function addImage(image) {
    image.onload = function () {
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
      ctx.drawImage(image, 0, 0, sWidth, sHeight, dx, dy, dWidth, dHeight);
      clearInterval(animationInterval);
      baseImage = baseImageNew;
      // animate();
    };
  }

  function changeImage() {
    setInterval(()=>{
      baseImageNum = (baseImageNum < baseImageCount) ? baseImageNum + 1 : 0;
      ctx.globalCompositeOperation = 'destination-over';
      baseImageNew.src = $sepiaCanvas.data('image-src' + baseImageNum);
      addImage(baseImageNew);
    }, 5000);
  }

  function animate() {
    animationInterval = setInterval(function () {
      requestAnimationFrame(draw);
    }, 1000 / 40);
  }

  function draw() {
    ctx.clearRect(0, 0,sepiaCanvas.width, sepiaCanvas.height);
    ctx.save();
    let scale = Math.abs(Math.sin(deltaScale)) / 5 + 1;
    // let scale = 1;
    let trltX = deltaTranslateX;
    let trltY = 0;
    ctx.translate(trltX, trltY);
    // ctx.scale(scale, scale);
    ctx.drawImage(baseImage, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    deltaScale += 0.003;
    if (deltaTranslateX <= Math.abs(dx) && direction) {
      deltaTranslateX += deltaImageW;
    }
    if (deltaTranslateX >= dx && !direction) {
      deltaTranslateX -= deltaImageW;
    }
    if (Math.abs(deltaTranslateX - Math.abs(dx / scale)) < 5) { direction = 0; }
    if (Math.abs(deltaTranslateX - dx / scale) < 5) { direction = 1; }
    deltaTranslateY += deltaImageH;
    ctx.restore();
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
    addImage(baseImage);
    changeImage();
    $(window).on('resize', ()=>{
      redrawImage();
    });
  }

  return {
    init: init
  };
}());

export default canvas;