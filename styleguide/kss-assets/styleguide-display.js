
(function($) {

  var $fullbleedElement = $('.panel-fullbleed');

  if ($fullbleedElement.length > 0) {
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
    var padding = parseInt($main.css('padding-left').replace('px',''), 10) * 2;
    var mainWidth = $main.innerWidth() - padding;
    var mobileWidth = 799;
    
    if ($(window).innerWidth() > mobileWidth) {
      $fullbleedElement
        .width(mainWidth)
        .css({
          'left': 0,
          'margin-left': -(padding - 1) + 'px' // 1 = kss-section border
        });
    } else {
      if ($fullbleedElement.attr('style') && $fullbleedElement.attr('style').length > 0) {
        $fullbleedElement.attr('style', '');
      }
    }
  }

})(jQuery);