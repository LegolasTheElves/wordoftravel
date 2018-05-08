

$("[data-toggle=popover]").each(function(i, obj) {

    $(this).popover({
        html: true,
        placement:'bottom',
        content: function() {
        return $('#socialSharePopover').html();
        }
    });

});


$('html').on('click', function(e) {
    if (typeof $(e.target).data('original-title') == 'undefined' &&
       !$(e.target).parents().is('.popover.in')) {
      $('[data-original-title]').popover('hide');
    }
  });