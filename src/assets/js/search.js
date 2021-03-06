$(function () {

  var $container1 = $('#container1'),
    $body = $('body'),
    itemwidth = null,
    columns = null;

  if ($(window).width() >= 360 && $(window).width() <= 400) {
    item = Math.floor($body.width());
    itemwidth = (item / 2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 401 && $(window).width() <= 411) {
    item = Math.floor($body.width());
    itemwidth = (item / 2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 412 && $(window).width() <= 413) {
    item = Math.floor($body.width());
    itemwidth = (item / 2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 414 && $(window).width() <= 480) {
    item = Math.floor($body.width());
    itemwidth = (item / 2) - 11;
    colW = itemwidth;
  } else if ($(window).width() >= 481 && $(window).width() <= 520) {
    item = Math.floor($body.width());
    itemwidth = (item / 2) - 11;
    colW = itemwidth;
  } else {
    colW = 248;
  }

});

function loadisotope() {
  
  var $container1 = $('#container1').imagesLoaded(function () { //loadimage first then relayout
    var $body = $('body'),
      columns = null;

    $container1.isotope({
      // disable window resizing
      itemSelector: '.item',
      resizable: false,
      masonry: {
        columnWidth: colW
      },

      getSortData: {
        rating: function($elem) {
          return parseInt($elem.find(".ratinglike").text());
        },
        date : function ($elem) {
          return Date.parse($($elem).find('#time').attr('class'));
        },
        best : function ($elem) {
          return parseInt($elem.find('#best').text());
        }
        },
    });

    var $container2 =  $('#container2'); //refine position
      $container2.isotope({
        itemSelector: '.item',
        resizable: false,
        masonry: {
          columnWidth: colW
        },
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


    $(window).smartresize(function () {
      var currentColumns = Math.floor(($body.width()) / colW);
      if (currentColumns !== columns) {
        if ($(window).width() >= 360 && $(window).width() <= 400) {
          columns = 2;
          $container2.width(columns * colW).isotope('reLayout');
        } else if ($(window).width() >= 401 && $(window).width() <= 440) {
          columns = 2;
          $container2.width(columns * colW).isotope('reLayout');
        } else if ($(window).width() >= 441 && $(window).width() <= 480) {
          columns = 2;
          $container2.width(columns * colW).isotope('reLayout');
        } else if ($(window).width() >= 481 && $(window).width() <= 520) {
          columns = 2;
          $container2.width(columns * colW).isotope('reLayout');
        } else {
          columns = currentColumns;
          // apply width to container manually, then trigger relayout
          $container2.width(columns * colW).isotope('reLayout');
        }
      }
    }).smartresize();

    hideSplash();

 //refine position
    var $whatever = $(".filter img");
    var rp = $whatever.offset().left
    $('.filter-search').css('left', rp); 
 //end refine position

  }); // end container image loaded 

  $('.test[data-toggle="popover"]').popover();

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

  $('img#img-item-search').error(function () {
    $(this).attr('src', 'http://www.wordoftravel.com/images/posts/missing.png');
    $(this).attr('style', 'padding: 30px; background-color:#fff;');
  });

  $('img#search-user-img').error(function () {
    $(this).attr('src', 'http://www.wordoftravel.com/images/posts/missing.png');
    $(this).attr('style', 'background-color: #fff;');
  });
  //modal img padding handling
  $('a img.img-search').click(function () {
    if ($(this, '.img-search').attr('src') == 'http://www.wordoftravel.com/images/posts/missing.png') {
      $('img.img-item-modal').attr('style', 'padding: 30px; background-color:#fff;');
    } else {
      $('img.img-item-modal').attr('style', 'padding: 0px; background-color:#fff;');
    }
  });

  $('img#search-user-img-item').error(function () {
    $(this).attr('src', 'http://www.wordoftravel.com/images/posts/missing.png');
  });

  //date icon status 
  $(".content-date").each(function (i, obj) {
    $this = $(this);
    var itemtime = $this.find('div.date-search div').attr('class');
    var today=new Date(); 
    today.setHours(0, 0, 0, 0);
    var dateitem = new Date(itemtime); 

    var itemdate = Date.parse(new Date(dateitem.getFullYear(), dateitem.getMonth(), dateitem.getDate() - 0));
    var current = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0));
    var sevendays = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
    var sixty = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 60));
    
    if (current > itemdate && itemdate > sevendays) {
      $this.find('a#calendar-blue').show();
      $this.find('a#calendar-purple').hide();
      $this.find('a#calendar-gray').hide();  
    }
    else if (current > itemdate && itemdate < sevendays && itemdate > sixty) {
      $this.find('a#calendar-blue').hide();
      $this.find('a#calendar-purple').show();
      $this.find('a#calendar-gray').hide();
    }
    else {
      $this.find('a#calendar-blue').hide();
      $this.find('a#calendar-purple').hide();
      $this.find('a#calendar-gray').show();
    }
  });

  //modal icon status
  $("a#modal-click").click(function(event) {
    event.preventDefault();

    var itemtime = $(".item-content-date .date-search #time").attr('class');
    var today=new Date(); 
    today.setHours(0, 0, 0, 0);
    var dateitem = new Date(itemtime); 

    var itemdate = Date.parse(new Date(dateitem.getFullYear(), dateitem.getMonth(), dateitem.getDate() - 0));
    var current = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 0));
    var sevendays = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
    var sixty = Date.parse(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 60));

    if (current > itemdate && itemdate > sevendays) {
      $('.item-content-date a#calendar-blue').show();
      $('.item-content-date a#calendar-purple').hide();
      $('.item-content-date a#calendar-gray').hide();  
    }
    else if (current > itemdate && itemdate < sevendays && itemdate > sixty) {
      $('.item-content-date a#calendar-blue').hide();
      $('.item-content-date a#calendar-purple').show();
      $('.item-content-date a#calendar-gray').hide();
    }
    else {
      $('.item-content-date a#calendar-blue').hide();
      $('.item-content-date a#calendar-purple').hide();
      $('.item-content-date a#calendar-gray').show();
    }
  });

  $(".user-ourfavorite-item[data-toggle=popover] img").each(function (i, obj) {

    $(this).popover({
        trigger: "manual",
        html: true,
        placement: 'bottom',
        content: function () {
          return $('#OurFavoritePopover').html();
        }
      })
      .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
          $(_this).popover('hide');
        });
      }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
          if (!$(".popover:hover").length) {
            $(_this).popover("hide");
          }
        }, 300);
      });

  });

 
  //filter items auto checked based on items result
   /*$('.filter-search img.pointer, #filter-search img.pointer').click(function()  {
   $('.item').each(function () {
    var $this = $(this);
    if ($this.hasClass('eatingcoffee')) {
      $(".eatingcoffee").attr( 'checked', true );
    }
    if ($this.hasClass('eatingnightlife')) {
      $(".eatingnightlife").attr( 'checked', true );
    }
    if ($this.hasClass('eatingvegetarian')) {
      $(".eatingvegetarian").attr( 'checked', true );
    }
    if ($this.hasClass('eatinglocal')) {
      $(".eatinglocal").attr( 'checked', true );
    }
    if ($this.hasClass('eatingcheapeats')) {
      $(".eatingcheapeats").attr( 'checked', true );
    }
    if ($this.hasClass('styleecotravel')) {
      $(".styleecotravel").attr( 'checked', true );
    }
    if ($this.hasClass('stylesights')) {
      $(".stylesights").attr( 'checked', true );
    }
    if ($this.hasClass('styleadventure')) {
      $(".styleadventure").attr( 'checked', true );
    }
    if ($this.hasClass('stylehiking')) {
      $(".stylehiking").attr( 'checked', true );
    }
    if ($this.hasClass('stylerelaxing')) {
      $(".stylerelaxing").attr( 'checked', true );
    }
    if ($this.hasClass('stylecity')) {
      $(".stylecity").attr( 'checked', true );
    }
    if ($this.hasClass('budgetsplurge')) {
      $(".budgetsplurge").attr( 'checked', true );
    }
    if ($this.hasClass('budgetflashback')) {
      $(".budgetflashback").attr( 'checked', true );
    }
    if ($this.hasClass('budgetshoestring')) {
      $(".budgetshoestring").attr( 'checked', true );
    }

  });
}); */
 

 //filter/sort when click
  $(".btn-popapply").click(function(event) {
    event.preventDefault();

  var $checkboxes = $('.content3-search input');
  var $radioboxes = $('.content4-search input');

  var inclusives = [];

  $checkboxes.each( function( i, elem ) {

    if ( elem.checked ) {
      inclusives.push( elem.value );
    }
  });


  var filterValue = inclusives.length ? inclusives.join(', ') : '*';
  var sortValue = $('input[name=radio]:checked', '#sortbyform').val(); //desktop
  var sortValue2 = $('input[class=container-filter]').val(); //mobile
  fsortValue2 = sortValue2.toLowerCase(); 
 console.log(sortValue )
  if ($(window).width() >= 520){
  if (sortValue == 'date') {
   
    $container1.isotope({
      filter: filterValue,
      sortBy : sortValue,
      sortAscending: false
     });

  }
  else if (sortValue == 'best') {
   
    $container1.isotope({
      filter: filterValue,
      sortBy : sortValue,
      sortAscending: true
     });
  }

  else if (sortValue == 'rating') {

    $container1.isotope({
      filter: filterValue,
      sortBy : sortValue,
      sortAscending: false
     });
  }
  }
 

  else {

    if (fsortValue2 == 'date published') {
      fsortValue2 = 'date';
  
      $container1.isotope({
        filter: filterValue,
        sortBy : fsortValue2,
        sortAscending: false
       });
  
    }
    else if (fsortValue2 == 'best match') {
      fsortValue2 = 'best';
  
      $container1.isotope({
        filter: filterValue,
        sortBy : fsortValue2,
        sortAscending: true
       });
    }
  
    else if (fsortValue2 == 'rating') {
      $container1.isotope({
        filter: filterValue,
        sortBy : fsortValue2,
        sortAscending: false
       });
    }

 
  }

}); 

}



function hideSplash() {
  $(".preload").fadeOut(1000, function () {});
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

  //start filter sort
  var sortbyfilter = [

    function () {
      //selected highlight
      var Selected = $("input.container-filter").val();
      if (Selected == 'Rating') {
        $('.sort-by-filter a.rating-popover').attr('style', 'color: #3098d4 !important; font-weight: 700');
        $('.sort-by-filter a.date-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.recommended-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
      } else if (Selected == 'Date Published') {
        $('.sort-by-filter a.rating-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.date-popover').attr('style', 'color: #3098d4 !important; font-weight: 700');
        $('.sort-by-filter a.recommended-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
      } else if (Selected == 'Best Match') {
        $('.sort-by-filter a.rating-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.date-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.recommended-popover').attr('style', 'color: #3098d4 !important; font-weight: 700');
      }
      //end selected hightlight

      var offset = $(".filter-mobile-click").offset();
      var fposY = offset.top - $(window).scrollTop();
      var fposX = offset.left - $(window).scrollLeft();
      var posY = 15 + fposY;
      var posY = Math.floor(posY * 100) / 100;
      var posX = fposX - 108;

      $('.sort-by-filter').css('left', posX);

      $(".sort-by-filter").animate({
        top: posY
      }, 200);

    },

    function () {

      //selected highlight
      var Selected = $("input.container-filter").val();
      if (Selected == 'Rating') {
        $('.sort-by-filter a.rating-popover').attr('style', 'color: #3098d4 !important; font-weight: 700');
        $('.sort-by-filter a.date-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.recommended-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
      } else if (Selected == 'Date Published') {
        $('.sort-by-filter a.rating-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.date-popover').attr('style', 'color: #3098d4 !important; font-weight: 700');
        $('.sort-by-filter a.recommended-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
      } else if (Selected == 'Best Match') {
        $('.sort-by-filter a.rating-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.date-popover').attr('style', 'color: #FFFFFF; font-weight: 400');
        $('.sort-by-filter a.recommended-popover').attr('style', 'color: #3098d4 !important; font-weight: 700');
      }
      //end selected hightlight

      var offset = $(".filter-mobile-click").offset();
      var fposY = offset.top - $(window).scrollTop();
      var fposX = offset.left - $(window).scrollLeft();
      var posY = 15 + fposY;
      var posY = Math.floor(posY * 100) / 100;
      var posX = fposX - 108;

      if ($('.sort-by-filter').css('top') == posY + 'px') {
        $(".sort-by-filter").animate({
          top: -245
        }, 200);
      } else {
        $(".sort-by-filter").animate({
          top: posY
        }, 200);
      }

    }

  ];

  var sortbyfiltercounter = 0;
  $(".filter-mobile-click").click(function () {
    sortbyfilter[sortbyfiltercounter++].apply(this, Array.prototype.slice.apply(arguments));
    sortbyfiltercounter %= sortbyfilter.length;
  });

  $(".sort-by-click").click(function () {
    sortbyfilter[sortbyfiltercounter++].apply(this, Array.prototype.slice.apply(arguments));
    sortbyfiltercounter %= sortbyfilter.length;
  });

  $(document).on('click', function (event) {
    if ($('.sort-by-filter').css('top') == '245px') {
      if (!$(event.target).closest('.sort-by-filter').length) {
        $(".sort-by-filter").animate({
          top: -245
        }, 200);
      }
    }
  });
  //end filter sort

  //this hide hamburger is working in other browser
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

  //this hide hamburer is working for vince pc
  $(document).ready(function () {
    if ($('#container1').length) {
      $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
          $(".hamburger-style").attr('style', 'display: none');
          $(".hamburger-footer").addClass('hamburger-footer-hidden');
          $(".container-fluid-footer").addClass('container-footer-hide');
        } else {
          $(".hamburger-style").attr('style', '');
          $(".hamburger-footer").removeClass('hamburger-footer-hidden');
          $(".container-fluid-footer").removeClass('container-footer-hide');
        }
      });
    }
  });


  $(document).on('click', function (event) {
    if ($('#search-item-modal').is(':visible')) {
      if ((!$(event.target).closest('.modal-dialog').length) && (!$(event.target).closest('.swal-overlay').length)) {
        $("#search-item-modal").modal('hide');

      }
    }


  });

});

$(document).ready(function () {


  $('.text-sub').text(function (index, text) {
    return text.replace(" .", '.');
  });

  $('.rating-popover').click(function () {
    $('input.container-filter').val('Rating');
    $('input.container-filter').text('Rating');
    $(".sort-by-filter").animate({
      top: -245
    }, 200);
  });

  $('.date-popover').click(function () {
    $('input.container-filter').val('Date Published');
    $('input.container-filter').text('Date Published');
    $(".sort-by-filter").animate({
      top: -245
    }, 200);
  });

  $('.recommended-popover').click(function () {
    $('input.container-filter').val('Best Match');
    $('input.container-filter').text('Best Match');
    $(".sort-by-filter").animate({
      top: -245
    }, 200);
  });
});

//places modal 

function loadmodal() {

  //for places tag modal 
  $('a#confirm').click(function (e) {
    e.preventDefault();
    var link = $(this).attr('href');
    var ftag = $(this).clone().children().remove().end().text();
    var tag = $.trim(ftag);
    console.log('do you want ', tag);
    swal({
      text: "Do you want to update your search to show results for " + tag + "?",
      buttons: ["Cancel", "OK"],
      className: "modal-places",
      icon: "./assets/img/logo-colored.png"
    }).then((willDelete) => {
      if (willDelete) {
        window.location.href = link;
      } else {

      }
    });
    $('.swal-button').blur();
  });

  //hover on ourfavourite
  $(".user-ourfavorite[data-toggle=popover] img").each(function (i, obj) {

    $(this).popover({
        trigger: "manual",
        html: true,
        placement: 'bottom',
        content: function () {
          return $('#OurFavoritePopoverModal').html();
        }
      })
      .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
          $(_this).popover('hide');
        });
      }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
          if (!$(".popover:hover").length) {
            $(_this).popover("hide");
          }
        }, 300);
      });

  });

  $("#btn-report-icon-modal[data-toggle=popover]").each(function (i, obj) {

    $(this).popover({
        trigger: "manual",
        html: true,
        placement: 'bottom',
        content: function () {
          return $('#modalreportPopover').html();
        }
      })
      .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
          $(_this).popover('hide');
        });
      }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
          if (!$(".popover:hover").length) {
            $(_this).popover("hide");
          }
        }, 300);
      });

  });

}
