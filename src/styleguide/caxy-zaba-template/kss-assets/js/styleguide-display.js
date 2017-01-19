
(function($) {

  var $kssSection = $('.kss-section');
  var $kssExample = $('.kss-modifier__example');
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

    $(window)
      .load(function(){
        for (var i = 0; i < renderedFullbleedElements.length; i++) {
          console.log(renderedFullbleedElements[i]);
          adjustFullbleedWidth(renderedFullbleedElements[i]);
        }
      })
      .resize(function(){
        for (var i = 0; i < renderedFullbleedElements.length; i++) {
          adjustFullbleedWidth(renderedFullbleedElements[i]);
        }
      });
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
    
    $fullbleedElement
      .width(sectionWidth)
      .css({
        'left': 0,
        'margin-left': -(padding - 1) + 'px' // 1 = kss-section border
      });
  }

  // Toggle view of sections based on status
  $('.status-toggle').on('click', function(){

    // Define the current status based on what's in the button's data attribute
    var activeStatus = $(this).data('status');

    // Clear out any current active classes and apply to the just-clicked button
    $('.status-toggle').removeClass('active');
    $(this).addClass('active');

    if(activeStatus === 'all') {
      $kssSection.fadeIn();
    } else {

      // Hide/Show sections based on selection
      $kssSection.fadeOut();

      // Sort through all sections and show ones that match our toggle.
      $kssSection.each(function(){

        // If no status is found, default to development
        var sectionStatus = ($(this).data('status') === '') ? 'development' : $(this).data('status');

        console.log(sectionStatus);
        
        if(sectionStatus === activeStatus) {
          $(this).fadeIn();
        }
      });
    }

  });
  



})(jQuery);