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

    $(".user-ourfavorite[data-toggle=popover]").each(function(i, obj) {

        $(this).popover({ 
          trigger: "manual",
          html: true,
          placement:'bottom',
          content: function() {
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