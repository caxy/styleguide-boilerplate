
(function($) {

  var $fullbleedElement = $('.panel-fullbleed');

  if($fullbleedElement.length > 0) {
    $(window)
      .load(function(){
        adjustFullbleedForStyleguide($fullbleedElement)
      })
      .resize(function(){
        adjustFullbleedForStyleguide($fullbleedElement)
      });
  }

  function adjustFullbleedForStyleguide($fullbleedElement) {
    
    var $main = $('.kss-main');
    var padding = parseInt($main.css('padding-left').replace('px',''), 10);
    var mainWidth = $main.innerWidth() - (padding * 2);

    $fullbleedElement
      .width(mainWidth)
      .css({
        'left': 0,
        'margin-left': (-(padding * 2)) + 'px'
      });
  }

})(jQuery);