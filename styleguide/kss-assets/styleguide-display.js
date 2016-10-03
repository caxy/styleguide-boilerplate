
(function($) {

  var $kssSection = $('.kss-section');
  var $kssExample = $('.kss-modifier__example');

  // Add any additional fullbleed elements here.
  var fullbleedElements = [
    $('.panel--fullbleed'),
    $('.header--site'),
    $('.footer--site')
  ];

  applyWidthEvents(fullbleedElements);

  // For all elements that are fullbleed, add load/resize listener
  // and width adjustment function.
  function applyWidthEvents(fullbleedElements) {

    // Only apply events for elements that are actually rendered
    // on the current page.
    var renderedFullbleedElements = findElements(fullbleedElements);
    
    for (var i = 0; i < renderedFullbleedElements.length; i++) {
      
      var $fullbleedElement = renderedFullbleedElements[i];
      
      $(window)
        .load(function(){
          adjustFullbleedWidth($fullbleedElement)
        })
        .resize(function(){
          adjustFullbleedWidth($fullbleedElement)
        });
    }
  }

  // Create/return an array of elements rendered
  // to the current page.
  function findElements(fullbleedElements) {
    
    var renderedFullbleedElements = [];
    
    for (var i = 0; i < fullbleedElements.length; i++) {

      var $fullbleedElement = fullbleedElements[i];

      if ($fullbleedElement.length > 0) {
        renderedFullbleedElements.push($fullbleedElement);
      }
    }
    return renderedFullbleedElements;
  }
  
  // This calculates the width of the example area so
  // that an accurate display of 'fullwidth' behavior
  // can happen.
  function adjustFullbleedWidth($fullbleedElement) {
    
    var padding = parseInt($kssExample.css('padding-left').replace('px',''), 10);
    var sectionWidth = $kssSection.outerWidth();
    var mobileWidth = 799;

    if (sectionWidth > mobileWidth) {
      $fullbleedElement
        .width(sectionWidth)
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