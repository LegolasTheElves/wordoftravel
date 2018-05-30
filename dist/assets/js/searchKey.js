//$(function () {
  //$("#searchKey").autocomplete({
    //[>select: function (evt, suggestion) {
        //alert("ALERT FOR TESTING ONLY. REDIRECT TO " + suggestion.item.value + " [placeid: " + suggestion.item.id +
            //"]");
        //var strSelectedPlace = suggestion.item.value.toLowerCase() + "-" + suggestion.item.id;
        //window.location.href = "http://wordoftravel.com/destinations/" + strSelectedPlace;
    //},*/
    //source: function (request, response) {
      //$.ajax({
        //url: "https://places-api.wordoftravel.com/v1/cities/suggestions/" + request.term,
        //method: "GET",
        //crossDomain: true,
        //// dataType: "JSON",
        //// data: JSON.stringify(postData),
        //success: function (data) {
          //response($.map(data.suggest["asciiName-suggestion"][0].options, function (item) {
            //return {
              //label: item.text + '  (' + item._source.countryCode + ')',
              //id: item._id,
              //value: item.text
            //}
          //}));
        //},
      //});
    //},
    //appendTo: '#input-source',
    //open: function(){
      //left = 0 - parseInt($('.search-panel').width());
      //$('#ui-id-1').css({
        //left : 0
      //});
    //},
    //minLength: 2,
    //delay: 0
  //})
//});

$(document).ready(function(){
  //jQuery.ui.autocomplete.prototype._resizeMenu = function(){
    //var ul = this.menu.element;
    //ul.outerWidth($('#input-source').width());
  //}
});
