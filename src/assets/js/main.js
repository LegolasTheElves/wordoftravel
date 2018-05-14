$(document).ready(function () {

  $("#buttondownhome").click(function(event){
    event.preventDefault();
    $('html, body').animate({
      scrollTop: $("#article").offset().top
  }, 500);
  });
  $(".buttondownhome").click(function(event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $(".carousel-indicators").offset().top
    }, 500);
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
  
  $('#profile').on('click',function(e){
    e.preventDefault();
    $('#modal-container').attr('style','display:block !important');
    $( ".divpop" ).animate( {right:0} );
  });

  //#3
  $('#filter-search img.pointer').on('click',function(e){
    e.preventDefault();
    $('#modal-container-search').attr('style','display:block !important');
    $( ".divpop-search" ).animate( {left:0} );
  });
  
  $('.floating-refine-img').on('click',function(e){
    e.preventDefault();
    $('#modal-container-search').attr('style','display:block !important');
    $( ".divpop-search" ).attr('style', 'top: 35% !important');
    $( ".divpop-search" ).animate( {left:0} );
    $('html, body').animate({
      scrollTop: $(".divpop-search").offset().top
  }, 300);
  });

  $('.pop-close-search').on('click',function(){
    $( ".divpop-search" ).animate({left:-430}, function(){
      $( ".divpop-search" ).attr('style', 'top: 20vh !important');
      $('#modal-container-search').attr('style','');
    });
  });

  $('.btn-popapply').on('click',function(){
    $( ".divpop-search" ).animate({left:-430}, function(){
      $('#modal-container-search').attr('style','');
    });
  });
  

  $('.btn-popreset').on('click',function(e){
    $(':checkbox').each(function(i,item){ 
      this.checked = item.defaultChecked; 
    }); 
  });



  $(".content1-search img").hover(function(){
    $(this).attr('src', './assets/img/button-refine-hover.png');
  },function(){
    $(this).attr('src', './assets/img/button-refine.png');
  })

  $(document).mouseup(function(e) {
    var container = $(".div-content");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      $('#modal-container-search').attr('style','');
      $( ".divpop-search" ).animate( {left:-430} );
    }
  });

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

  var searchhandlers = [
    function() {
      $('#autocorrect-menu').attr('style','display:inline-table !important;');
    },
    function() {
      $('#autocorrect-menu').attr('style','');
    }
  ];

  var counter = 0;
  $("#recent-button").click(function() {
    searchhandlers[counter++].apply(this, Array.prototype.slice.apply(arguments));
    counter %= searchhandlers.length;
  });


  // clicked outside, hide search dropdown 
  //$('#recent-button').on('focusout',function(){
  //  $('#autocorrect-menu').attr('style','');
  //});

  var searchhandlers2 = [
    function() {
      $('#autocorrect-menu').attr('style','display:inline-table !important;');
    },
    function() {
      $('#autocorrect-menu').attr('style','');
    }
  ];

  var countern = 0;
  $("#nearme-button").click(function() {
    searchhandlers2[countern++].apply(this, Array.prototype.slice.apply(arguments));
    countern %= searchhandlers2.length;
  });



  $(document).scroll(function() {
      var y = $(this).scrollTop();
      if (y < 350) {
          $('#floating-refine').attr('style','');
          $(".floating-refine-search" ).removeClass('floating-refine-search-visible');
      } else {
        $('#floating-refine').attr('style','display:block !important');
        $(".floating-refine-search" ).addClass('floating-refine-search-visible');
    }
  });



  $(document).on('click', function(event) {
  if (!$(event.target).closest('#recent-button').length) {
    $('#autocorrect-menu').attr('style','');
    }
  });

});

//activate menu link
$(function(){
  var current = location.pathname;
  $('.nav li a').each(function(){
      var $this = $(this);
      if($this.attr('href').indexOf(current) !== -1){
        $this.parents('.nav-item').addClass('active');
      }
  })
})