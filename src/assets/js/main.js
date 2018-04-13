$(document).ready(function () {
    $('#myCarousel').carousel({
        interval: 10000
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

  

  // $('.navbar-nav>li>a').on('click', function(){
  //     $('.navbar-collapse').collapse('hide');
  // });






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

 //start try 1
 var $list = $('#list').masonry({
    itemSelector: '.grid-item',
    columnWidth: 20,
    gutter: 20,
    percentPosition: true
  });
        

  // bind event
  $list.masonry( 'on', 'layoutComplete', function() {
    console.log('layout is complete....');
  });
  // trigger initial layout
  $list.masonry();

  //start try 2

  $(function(){
  
    var $container1= $('#container1'),
        $body = $('body'),
        colW = 60,
        columns = null;
    
    $container1.isotope({
      // disable window resizing
      resizable: false,
      masonry: {
        columnWidth: colW
      }
    });
    
    $(window).smartresize(function(){
      // check if columns has changed
      var currentColumns = Math.floor( ( $body.width() -100 ) / colW );
      if ( currentColumns !== columns ) {
        // set new column count
        columns = currentColumns;
        // apply width to container manually, then trigger relayout
        $container1.width( columns * colW )
          .isotope('reLayout');
      }
      
    }).smartresize(); // trigger resize to set container width
    
  });