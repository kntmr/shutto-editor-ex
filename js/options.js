function saveOptions() {
  localStorage["enabled"] = $('#chkEnabled').is(':checked');
  localStorage["width"] = $('#inputWidth').val();
  localStorage["height"] = $('#inputHeight').val();

  var status = $("#status");
  status.text('Options Saved.');
  setTimeout(function() {
    status.text('');
  }, 750);
}

function restoreOptions() {
  $('#chkEnabled').attr('checked', localStorage["enabled"] === 'true' ? true : false);
  $('#inputWidth').val(localStorage["width"] || "" );
  $('#inputHeight').val(localStorage["height"] || "" );
}

function changeEnabled() {
  if ($('#chkEnabled').is(':checked')) {
    $('#inputWidth').removeAttr('disabled');
    $('#inputHeight').removeAttr('disabled');
  } else {
    $('#inputWidth').attr('disabled', 'disabled');
    $('#inputHeight').attr('disabled', 'disabled');
  }
}

$(function() {
  restoreOptions();
  changeEnabled();

  $('#chkEnabled').change(function() {
    changeEnabled();
  });
});

$('#btnSave').on('click', function() {
  saveOptions();
});
