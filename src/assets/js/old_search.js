

$(function () {

  var $container1 = $('#container1'),
    $body = $('body'),

    columns = null;

  if ($(window).width() >= 360 && $(window).width() <= 400) {
    colW = 150;
  }
  else if($(window).width() >= 401 && $(window).width() <= 440) {
    colW = 188;
  }
  else if($(window).width() >= 441 && $(window).width() <= 480) {
    colW = 200;
  }
  else if($(window).width() >= 481 && $(window).width() <= 520) {
    colW = 240;
  }
  else {
    colW = 252;
  }

  $container1.isotope({
    // disable window resizing
    resizable: false,
    masonry: {
      columnWidth: colW
    }
  });

  $(window).smartresize(function () {

    var currentColumns = Math.floor(($body.width()) / colW);
    if (currentColumns !== columns) {

      if ($(window).width() >= 360 && $(window).width() <= 400) {
        columns = 2;
        $container1.width(columns * 150).isotope('reLayout');
      }

      else if ($(window).width() >= 401 && $(window).width() <= 440) {
        columns = 2;
        $container1.width(columns * 188).isotope('reLayout');
      }
      else if ($(window).width() >= 441 && $(window).width() <= 480) {
        columns = 2;
        $container1.width(columns * 210).isotope('reLayout');
      }
      else if ($(window).width() >= 481 && $(window).width() <= 520) {
        columns = 2;
        $container1.width(columns * 240).isotope('reLayout');
      }
      else {

        columns = currentColumns;
        // apply width to container manually, then trigger relayout
        $container1.width(columns * colW).isotope('reLayout');
      }

    }

  }).smartresize(); // trigger resize to set container width

  //for mobile devices item search

});


$(function () {
  $('[data-toggle="popover"]').popover()
})



$('#menu-popover').popover({
  template: '<div class="popover popover-style"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body popover-body-style"><p></p></div></div>'
})

$(document).ready(function(){
if ($(window).width() <= 991) {
  $(".navbar-toggler").click(function(){
    $("#menu-popover").popover('toggle');
});
}

});


//start jquery

$('body').on('click', function (e) {
  //did not click a popover toggle, or icon in popover toggle, or popover
  if ($(e.target).data('toggle') !== 'popover'
    && $(e.target).parents('[data-toggle="popover"]').length === 0
    && $(e.target).parents('.popover.in').length === 0) {
    $('[data-toggle="popover"]').popover('hide');
  }
});

$('body').on('click', function (e) {
  $('[data-toggle="popover"]').each(function () {
    //the 'is' for buttons that trigger popups
    //the 'has' for icons within a button that triggers a popup
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide');
    }
  });
});


var menuhandlerssearch = [

  function() {
    $("html").css("overflow-y","hidden");
  },

  function() {
    $("html").css("overflow-y","auto");
  }

];

var menucountersearch = 0;
$(".navbar-toggler").click(function() {
  menuhandlerssearch[menucountersearch++].apply(this, Array.prototype.slice.apply(arguments));
  menucountersearch %= menuhandlerssearch.length;
});

$(document).ready(function(){
  $(window).scroll(function() {
      if ($('body').height() <= ($(window).height() + $(window).scrollTop())) {
          $('#menu-popover').hide();
          
      }

      else {
        $('#menu-popover').show();
      }
   });
});

$(document).on('click', function(event) {
  if ($('#search-item-modal').is(':visible')) {
  if (!$(event.target).closest('.modal-dialog').length) {
  $("#search-item-modal").modal('hide');

  }
}


});

