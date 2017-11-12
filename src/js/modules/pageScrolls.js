import drawCanvas from './canvasScreen';
import helpers from '../helpers/helpers';

let pageScrolls = (function() {
  let $doc = $(document),
    $body = $('body'),
    $scrollSections = $('.full-screen'),
    scrollSectionsPositions = [],
    scrollPos = $doc.scrollTop(),
    lastY,
    activeSection = 0, scrollToSection = 0;

  function scrollSections(delta) {
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
    $('html, body').animate({
      scrollTop: $scrollSections.eq(scrollToSection).offset().top
    }, 500, function () {
      activeSection = scrollToSection;
      scrollPos = $scrollSections.eq(scrollToSection).offset().top;
    });
  }

  function setStartPositions() {
    setTimeout(()=> {
      scrollPos = $doc.scrollTop();
      $scrollSections.each((index, obj) => {
        scrollSectionsPositions.push($(obj).offset().top);
      });
      scrollSectionsPositions.find((element, index, array) => {
        if (element === scrollPos || (element > scrollPos && element < scrollPos + 10)) {
          activeSection = index;
          return true;
        }
      });
    }, 0);
  }

  function init() {
    if (!$scrollSections.length) return false;
    if (window.location.hash === "about") {

    }
    $body.addClass('overflow');
    setStartPositions();
    $doc.on('wheel', helpers.throttle((e)=> {
      scrollSections(e.originalEvent.deltaY);
    }, 1000, true));

    $body.bind('touchstart', function (e){
      lastY = e.originalEvent.touches[0].clientY;
    });

    $body.bind('touchmove', helpers.throttle((e)=> {
      let currentY = e.originalEvent.touches[0].clientY;
      let delta = lastY - currentY;
      scrollSections(delta);
    }, 1000, true));
  }

  return {
    init: init
  };

}());

export default pageScrolls;