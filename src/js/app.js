// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import menuActions from './modules/menu';
import sepia from './modules/canvasScreen';
import scrolls from './modules/pageScrolls';

( ($) => {
  'use strict';

  // When DOM is ready
  $(() => {
    menuActions.init();
    sepia.init();
    scrolls.init();
  });

})(jQuery);