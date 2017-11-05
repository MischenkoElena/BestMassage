let helpers = {
   throttle : function(func, limit) {
     let inThrottle,
       lastFunc,
       lastRan;
     return function() {
       let context = this,
         args = arguments;
       if (!inThrottle) {
         func.apply(context, args);
         lastRan = Date.now();
         inThrottle = true;
       } else {
         clearTimeout(lastFunc);
         lastFunc = setTimeout(function() {
           if ((Date.now() - lastRan) >= limit) {
             func.apply(context, args);
             lastRan = Date.now();
           }
         }, limit - (Date.now() - lastRan));
       }
     };
   }
};

export default helpers;