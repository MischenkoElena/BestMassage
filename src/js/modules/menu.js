import drawCanvas from './canvasScreen';
import helpers from '../helpers/helpers';

let menuActions = (function() {
  let menuSection = $('#menu'),
    menuList = menuSection.find('.menu-list'),
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
    let hoverTimer;
    menuItem.on('mouseenter', (e)=>{
      menuHoverImage.removeClass('shown');
      menuHoverImage.eq(menuItem.index(e.target.closest('li'))).addClass('shown');
      clearTimeout(hoverTimer);
    });
    menuItem.on('mouseleave', (e)=>{
      let index = menuItem.index(e.target.closest('li'));
      if (index) {
        menuHoverImage.eq(index).removeClass('shown');
      }
    });
    menuList.on('mouseleave', ()=>{
      menuHoverImage.eq(0).addClass('shown');
    });
  }

  function init() {
    menuBtn.on('click', ()=>{
      openMenu();
      menuHoverImage.eq(0).addClass('shown');
    });
    closeMenuBtn.on('click', ()=>{
      closeMenu();
    });
    menuItem.filter('.inner-link').on('click', (e)=>{
      e.preventDefault();
      closeMenu();
      helpers.scrollPage($('#contacts').offset().top, 1500);
    });
    menuItem.filter('.hash-link').on('click', (e)=>{
      let $aboutSection = $('#about');
      if ($aboutSection.length) {
        e.preventDefault();
        closeMenu();
        helpers.scrollPage($aboutSection.offset().top, 500);
      }
    });
    showHideHoverImage();
  }

  return {
    init: init
  };

}());

export default menuActions;