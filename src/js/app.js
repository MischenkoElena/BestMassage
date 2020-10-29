import helpers from './helpers/helpers';
import menuActions from './modules/menu';
import sepia from './modules/canvasScreen';
import scrolls from './modules/pageScrolls';
import showTypes from './modules/types';

( ($) => {
  'use strict';

  // When DOM is ready
  $(() => {
    $('body').data('scroll-width', helpers.scrollWidth());
    console.log($('body').data('scroll-width'));
    menuActions.init();
    sepia.init();
    scrolls.init();
    showTypes.init();
  });

})(jQuery);