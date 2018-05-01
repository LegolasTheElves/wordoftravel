$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
    nav:true,
    navText: ["<img src='wordoftravel/assets/img/img-home-arrow-left.png'>","<img src='wordoftravel/assets/img/img-home-arrow-right.png'>"],
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