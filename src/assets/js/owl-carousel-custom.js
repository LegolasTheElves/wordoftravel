$(document).ready(function(){
      
  $('.owl-carousel').owlCarousel({
    nav:true,
    navText: ["<img src='./assets/img/img-home-arrow-left.png'>","<img src='./assets/img/img-home-arrow-right.png'>"],
    dots:false,
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:2,
        },
        600:{
            items:4,
        },
        1000:{
            items:6,
        }
    }
})

});




$(document).ready(function(){
    $('.owl-carousel-icons').owlCarousel({
      nav:true,
      navText: ["<img src='./assets/img/blue-arrow-left.png'>","<img src='./assets/img/blue-arrow-right.png'>"],
      dots:false,
      margin:10,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
          },
          650:{
              items: 2,
          },
          1000:{
              items:6,
          }
      }
  })
  });