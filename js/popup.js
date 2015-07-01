var extension;

$(function() {
  extension = chrome.extension.getBackgroundPage();

  $('#optionsLink').on('click', function() {
    openOptions();
  });
});

function closePopup() {
  window.close();
}

function openOptions() {
  closePopup();
  extension.openOrFocusOptionsPage();
}
