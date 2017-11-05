import drawCanvas from './canvasScreen';
import helpers from '../helpers/helpers';

let pageScrolls = (function() {
  let $doc = $(document),
    $scrollSections = $('.full-screen'),
    scrollPos = 0,
    activeSection = 0, scrollToSection = 0;

  function scrollSections(e) {
    let delta = e.originalEvent.deltaY;
    scrollToSection = (delta > 0) ? activeSection + 1 : activeSection - 1;
    if (scrollToSection > $scrollSections.length - 1) {
      scrollToSection = $scrollSections.length - 1;
      return false;
    }
    if (scrollToSection < 0) {
      scrollToSection = 0;
      return false;
    }
    if (scrollToSection) {
      drawCanvas.pause();
    } else {
      drawCanvas.play();
    }
    console.log('before animation', scrollToSection);
    $('html, body').animate({
      scrollTop: $scrollSections.eq(scrollToSection).offset().top
    }, 500, function () {
      console.log(scrollToSection);
      activeSection = scrollToSection;
      scrollPos = $scrollSections.eq(scrollToSection).offset().top;
    });
  }

  function init() {
    if (!$scrollSections.length) return false;
    $('body').addClass('overflow');
    $doc.unbind('scroll');
    $doc.on('wheel', helpers.throttle((e)=> {
      scrollSections(e);
    }, 2000));
  }

  return {
    init: init
  };

}());

export default pageScrolls;