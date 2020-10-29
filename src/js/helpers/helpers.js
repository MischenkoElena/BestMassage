let helpers = {
  throttle: function(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      if ( !timeout ) timeout = setTimeout( later, wait );
      if (callNow) func.apply(context, args);
    };
  },
  debounce: function(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  scrollPage: function(top, duration) {
    $('html, body').animate({
      scrollTop: top
    }, duration);
  },
  scrollWidth: function() {
    let scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
};

export default helpers;