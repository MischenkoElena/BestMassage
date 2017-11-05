import drawCanvas from './canvasScreen';

let menuActions = (function() {
  let menuSection = $('#menu'),
  menuItem = menuSection.find('.menu-list li'),
  menuHoverImage = menuSection.find('.hover-image li'),
  menuBtn = $('.menu-btn'),
  closeMenuBtn = menuSection.find('.close-menu-btn');

  function openMenu() {
    menuSection.addClass('opened');
    drawCanvas.pause();
  }
  
  function closeMenu() {
    drawCanvas.play();
    menuSection.removeClass('opened');
  }

  function showHideHoverImage() {
    menuItem.on('mouseenter', (e)=>{
      menuHoverImage.eq(menuItem.index(e.target.closest('li'))).addClass('shown');
    });
    menuItem.on('mouseleave', (e)=>{
      menuHoverImage.eq(menuItem.index(e.target.closest('li'))).removeClass('shown');
    });
  }
  
  function init() {
    menuBtn.on('click', ()=>{
      openMenu();
    });
    closeMenuBtn.on('click', ()=>{
      closeMenu();
    });
    showHideHoverImage();
  }
  
  return {
    init: init
  };
   
}());

export default menuActions;