var option = null;

$(function() {
  chrome.runtime.sendMessage({
    action: "getValues",
    args: [{
      "enabled": "",
      "width": "",
      "height": ""
    }]
  }, function(response) {
    option = response.values;
    init();
  });
});

function init() {
  if (option["enabled"] === 'true') {
    var width = option["width"];
    var height = option["height"];
    $('#shutto-property').css('width', width + 'px');
    // edit area height
    //$('#shutto-property-css').css('height', height + 'px');
    //$('#shutto-property-js').css('height', height + 'px');
    //$('#shutto-property-jsbefore').css('height', height + 'px');
    $('.ace_editor').css('height', height + 'px');
  }
}
