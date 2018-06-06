function loadpopovers(){
    $("#btn-share-icon[data-toggle=popover]").each(function(i, obj) {
        $(this).popover({
            html: true,
            placement:'bottom',
            content: function() {
            return $('#socialSharePopover').html();
            }
        });
    });

    $("#btn-report-icon-modal[data-toggle=popover]").each(function(i, obj) {

        $(this).popover({ 
          trigger: "manual",
          html: true,
          placement:'bottom',
          content: function() {
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

      $("#user-ourfavorite[data-toggle=popover] img").each(function(i, obj) {

        $(this).popover({ 
          trigger: "manual",
          html: true,
          placement:'bottom',
          content: function() {
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

    $("#test-button[data-toggle=popover]").each(function(i, obj) {

        $(this).popover({ 
          trigger: "manual",
          html: true,
          placement:'bottom',
          content: function() {
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

 
      
}




$('html').on('click', function(e) {
    if (typeof $(e.target).data('original-title') == 'undefined' &&
       !$(e.target).parents().is('.popover.in')) {
      $('[data-original-title]').popover('hide');
    }
});
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(position) {
    // Success, can use position.
    //console.log("Your position is: " + position.coords.latitude);
  }
  function positionError(error) {
    var x = document.getElementById("location");
    if (error.PERMISSION_DENIED) {
       
      console.log("Error: permission denied");
      // Your custom modal here.
      x.innerHTML = "We are unable to show locations near you as you have disabled location sharing. Please re-enable and reload the page to use this feature.";
      showError('Geolocation is not enabled. Please enable to use this feature.')
    } else {
      // Handle other kinds of errors.
      console.log("Other kind of error: " + error);
    }
  }
  function showError(message) {
    // TODO
  }
  getLocation();