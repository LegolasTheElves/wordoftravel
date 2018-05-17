$(function () {

  var $container1 = $('#container1'),
    $body = $('body'),
    itemwidth = null,
    columns = null;

  if ($(window).width() >= 360 && $(window).width() <= 400) {
    item = Math.floor($body.width());
    itemwidth = (item/2) - 11;
    colW = itemwidth;
    console.log(colW);
  } else if ($(window).width() >= 401 && $(window).width() <= 411) {
    item = Math.floor($body.width());
    itemwidth = (item/2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 412 && $(window).width() <= 413) {
    item = Math.floor($body.width());
    itemwidth = (item/2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 414 && $(window).width() <= 480) {
    item = Math.floor($body.width());
    itemwidth = (item/2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 481 && $(window).width() <= 520) {
    item = Math.floor($body.width());
    itemwidth = (item/2) - 11;
    colW = itemwidth;
  } else {
    colW = 248;
  }
 
});

function loadisotope() {
  var $container1 = $('#container1').imagesLoaded(function () { //loadimage first then relayout
    var $body = $('body'), columns = null;

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
          $container1.width(columns * colW).isotope('reLayout');
        } else if ($(window).width() >= 401 && $(window).width() <= 440) {
          columns = 2;
          $container1.width(columns * colW).isotope('reLayout');
        } else if ($(window).width() >= 441 && $(window).width() <= 480) {
          columns = 2;
          $container1.width(columns * colW).isotope('reLayout');
        } else if ($(window).width() >= 481 && $(window).width() <= 520) {
          columns = 2;
          $container1.width(columns * colW).isotope('reLayout');
        } else {
          columns = currentColumns;
          // apply width to container manually, then trigger relayout
          $container1.width(columns * colW).isotope('reLayout');
        }
      }
    }).smartresize(); // trigger resize to set container width
      
    hideSplash();
  }); // end container image loaded 

  $('[data-toggle="popover"]').popover();

  $("img.icon-unlike-search").hover(function () {
    $(this).attr('src', './assets/svg/icon-like-liked.svg');
  }, function () {
    $(this).attr('src', './assets/svg/icon-like-unliked.svg');
  })

  $("img.icon-like-search").hover(function () {
    $(this).attr('src', './assets/svg/icon-like-unliked.svg');
  }, function () {
    $(this).attr('src', './assets/svg/icon-like-liked.svg');
  })

  $('img').error(function(){
    $(this).attr('src', './assets/img/missing.jpg');
  });

  $('.img-search').error(function(){
    $(this).attr('style','padding:40px;background-color:#fff');
  });

}


function hideSplash(){
  $(".preload").fadeOut(1000, function () {
  });
}

$(document).ready(function () {
  $('[data-toggle="popover"]').popover()
  $('#menu-popover img.pointer').on('click', function (e) {
    e.preventDefault();
    $('.popover-style').css('top', '-300px !important');
    $('.popover-style').animate({
      top: 0
    });
  });



  $('#menu-popover').popover({
    template: '<div class="popover popover-style"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body popover-body-style"><p></p></div></div>'
  })
});

$(document).ready(function () {
  if ($(window).width() <= 991) {
    $(".navbar-toggler").click(function () {
      $("#menu-popover").popover('toggle');
    });
  }

});


//start jquery
$(document).ready(function () {
  $('body').on('click', function (e) {
    //did not click a popover toggle, or icon in popover toggle, or popover
    if ($(e.target).data('toggle') !== 'popover' &&
      $(e.target).parents('[data-toggle="popover"]').length === 0 &&
      $(e.target).parents('.popover.in').length === 0) {
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

  //hamburger popover
  var hamburgerhandler = [

    function () {
      $(".hamburger-footer").animate({
        top: 44
      }, 200);
    },

    function () {
      if ($('.hamburger-footer').css('top') == '44px') {
        $(".hamburger-footer").animate({
          top: -245
        }, 200);
      } else {
        $(".hamburger-footer").animate({
          top: 44
        }, 200);
      }
    }

  ];

  var hamburgerhandlercounter = 0;
  $(".hamburger-style").click(function () {
    hamburgerhandler[hamburgerhandlercounter++].apply(this, Array.prototype.slice.apply(arguments));
    hamburgerhandlercounter %= hamburgerhandler.length;
  });

  $(document).on('click', function (event) {
    if ($('.hamburger-footer').css('top') == '44px') {
      if (!$(event.target).closest('.hamburger-footer').length) {
        $(".hamburger-footer").animate({
          top: -245
        }, 200);
      }
    }
  });
  //end hamburger popover

  $(document).ready(function () {
    if ($('#container1').length) {
      $(window).scroll(function () {
        if ($('body').height() <= ($(window).height() + $(window).scrollTop())) {
          $(".hamburger-style").attr('style', 'display: none');
          $(".hamburger-footer").addClass('hamburger-footer-hidden');
        } else {
          $(".hamburger-style").attr('style', '');
          $(".hamburger-footer").removeClass('hamburger-footer-hidden');
        }
      });
    }
  });


  $(document).on('click', function (event) {
    if ($('#search-item-modal').is(':visible')) {
      if (!$(event.target).closest('.modal-dialog').length) {
        $("#search-item-modal").modal('hide');

      }
    }


  });

});

