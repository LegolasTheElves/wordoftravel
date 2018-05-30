function owlRotator() {
  $(document).ready(function () {


      if ($(window).width() >= 992) {
        $('.owl-carousel').owlCarousel({
          nav: true,
          navText: ["<img src='./assets/img/img-home-arrow-left.png'>", "<img src='./assets/img/img-home-arrow-right.png'>"],
          dots: false,
          loop: true,
          margin: 10,
          responsiveClass: true,
          responsive: {
            0: {
              items: 2,
            },
            600: {
              items: 4,
            },
            1000: {
              items: 6,
            }
          }
        })
        $('.owl-item .btn-destreadmore').on('click', function (event) {
          var $this = $(this);

          $(".showRegion").addClass('c-showRegion');
          $('.defaulRegion').addClass('c-defaulRegion');
          $('.btn-destreadmore').removeClass('defaultReadmore');
          
          $('.owl-item .owl-list').each(function () {
            var $new = $(this);
            if ($new.hasClass('clicked')) {
              $new.removeClass('clicked');
            } else {
              $this.parents('.owl-list').addClass('clicked');
            }
          });
        });

        
        $('.owl-item .cardregion').on('click', function (event) {
          var $this = $(this);

          $(".showRegion").addClass('c-showRegion');
          $('.defaulRegion').addClass('c-defaulRegion');
          $('.btn-destreadmore').removeClass('defaultReadmore');
          
          $('.owl-item .owl-list').each(function () {
            var $new = $(this);
            if ($new.hasClass('clicked')) {
              $new.removeClass('clicked');
            } else {
              $this.parents('.owl-list').addClass('clicked');
            }
          });
         
      });


      } else {
        $('.owl-carousel').owlCarousel({
          nav: false,
          loop: false,
          dots: false,
          margin: 15,
          responsiveClass: true,
          responsive: {
            0: {
              items: 2,
            },
            600: {
              items: 4,
            },
            1000: {
              items: 6,
            }
          }
        });
        $('.owl-item .btn-destreadmore').on('click', function (event) {
          var $this = $(this);

          $(".showRegion").addClass('c-showRegion');
          $('.defaulRegion').addClass('c-defaulRegion');

          $('.btn-destreadmore').removeClass('defaultReadmore');

          $('.owl-item .owl-list').each(function () {
            var $new = $(this);
            if ($new.hasClass('clicked')) {
              $new.removeClass('clicked');

            } else {
              $this.parents('.owl-list').addClass('clicked');
            }
          });
        });

        
        $('.owl-item .cardregion').on('click', function (event) {
          var $this = $(this);

          $(".showRegion").addClass('c-showRegion');
          $('.defaulRegion').addClass('c-defaulRegion');
          $('.btn-destreadmore').removeClass('defaultReadmore');
          
          $('.owl-item .owl-list').each(function () {
            var $new = $(this);
            if ($new.hasClass('clicked')) {
              $new.removeClass('clicked');
            } else {
              $this.parents('.owl-list').addClass('clicked');
            }
          });
         
      });
      
      }
  

    //banner search homepage on click link

    $('.carousel-item').on('click', function () {
      window.location = $(this).find('a').attr('href');
    });

    $('.textmedium.text-white.mb-10').on('click', function () {
      window.location = $('.carousel-item.active').find('a').attr('href');
    });

    $('.textbold.text-uppercase.text-white.mb-30').on('click', function () {
      window.location = $('.carousel-item.active').find('a').attr('href');
    });


}

)

};




$(document).ready(function () {
  $('.owl-carousel-icons').owlCarousel({
    nav: true,
    navText: ["<img src='./assets/img/blue-arrow-left.png'>", "<img src='./assets/img/blue-arrow-right.png'>"],
    dots: false,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      650: {
        items: 2,
      },
      1000: {
        items: 6,
      }
    }
  })
});
