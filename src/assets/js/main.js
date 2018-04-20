$(document).ready(function () {
  $('#recent-button').on('click',function(){
    $('#autocorrect-menu').attr('style','display:inline-table !important');
  });

  $('#recent-button').on('focusout',function(){
    $('#autocorrect-menu').attr('style','');
  });

  $('.dropdown-item').each(function(){
    $(this).on('click', function(){
      $('#autocorrect-menu').attr('style','');
    });
  });

  $('#signup').on('click',function(e){
    e.preventDefault();
    $('#profile').attr('style','display:inline !important');
    $(this).attr('style','display:none !important');
  });

  $('.pop-close').on('click',function(){
    $('#modal-container').attr('style','');
    $( ".divpop" ).animate( {right:-330} );
  });
  
  $('.pop-close').on('click',function(){
    $('#modal-container').attr('style','');
    $( ".divpop" ).animate( {right:-330} );
  });

  $('#profile').on('click',function(e){
    e.preventDefault();
    $('#modal-container').attr('style','display:block !important');
    $( ".divpop" ).animate( {right:0} );
  });

});


$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 5000
    })
    $('.fdi-Carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });


    $("#destination-rot-container").on("slide.bs.carousel", function(e) {
      var $e = $(e.relatedTarget);
      var idx = $e.index();
      var itemsPerSlide = 10;
      var totalItems = $(".carousel-item").length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
          var it = itemsPerSlide - (totalItems - idx);
          for (var i = 0; i < it; i++) {
          // append slides to end
          console.log(totalItems);
          if (e.direction == "left") {
              $(".carousel-item")
              .eq(i)
              .appendTo(".carousel-inner");
          } else {
              $(".carousel-item")
              .eq(0)
              .appendTo(".carousel-inner");
          }
          }
      }
      });
        
});


$(document).ready(function(){
	"use strict";

	var window_width 	 = $(window).width(),
	window_height 		 = window.innerHeight,
	header_height 		 = $(".default-header").height(),
	header_height_static = $(".site-header.static").outerHeight(),
	fitscreen 			 = window_height - header_height;

	$(".fullscreen").css("height", window_height)
	$(".fitscreen").css("height", fitscreen);

  //-------- Active Sticky Js ----------//
  $(".default-header").sticky({topSpacing:0});

     if(document.getElementById("default-select")){
          $('select').niceSelect();
    };







    // Select all links with hashes
    $('.navbar-nav a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click',function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
    });       

 });
