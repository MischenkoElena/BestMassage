import templates from '../helpers/types-templates';
import helpers from '../helpers/helpers';

let showTypes = (function() {
  let typesJson = [],
    $typesWrapper = $('.categories-screen .categories-list'),
    $offersWrapper = $('.categories-screen .offers-list'),
    $moreBtn, $lessBtn;

  function getJSON() {
    $.ajax({
      url: 'assets/helpers/massage-descriptions.json',
      dataType: 'json',
      success: function(data){
        typesJson = data;
        createHtml();
        $moreBtn = $typesWrapper.find('.more');
        $lessBtn = $typesWrapper.find('.less');
        openCloseDescription();
        setTimeout(()=> {
          animateGrid();
          scrollToHash();
        }, 0);
      }
    });
  }

  function createHtml() {
    typesJson.forEach((obj, index)=>{
      let name = obj.type,
        shortDesc = obj.shortDescription,
        description = obj.description,
        title = obj.title,
        price= obj.price,
        price1= obj.price1,
        duration = obj.duration,
        duration1 = obj.duration1,
        hash = obj.urlHash;
      $typesWrapper.append(templates.typesTemplateLeft(index, name, shortDesc, description, title, price, price1, duration, duration1, hash));
    });
  }

  function openCloseDescription() {
    $moreBtn.on('click', (e)=> {
      let $clickedBtn = $(e.target).closest('.more'),
        $expanded = $clickedBtn.closest('li').find('.expand-description');
      $clickedBtn.addClass('hidden');
      $expanded.addClass('shown');
      helpers.scrollPage($expanded.offset().top - 300, 500);
      window.location.hash = $clickedBtn.data('hash');
    });
    $lessBtn.on('click', (e)=> {
      let $clickedBtn = $(e.target);
      $clickedBtn.closest('li').find('.expand-description').removeClass('shown');
      $clickedBtn.closest('li').find('.more').removeClass('hidden');
    });
  }

  function animateGrid() {
    let wow = new WOW(
      {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 200,
        mobile: false,
        live: false,
        scrollContainer: null,
      }
    );
    wow.init();
  }

  function scrollToHash() {
    let hash = window.location.hash.slice(1);
    if (hash) {
      let $btn = $typesWrapper.find('.more[data-hash="' + hash + '"]');
      helpers.scrollPage($btn.closest('li').find('.expand-description').offset().top - 300, 500);
      $btn.trigger('click');
    }
  }

  function init() {
    if ($typesWrapper.length) {
      getJSON();
    }
    if ($offersWrapper.length) {
      animateGrid();
    }
  }

  return {
    init: init
  };

}());

export default showTypes;