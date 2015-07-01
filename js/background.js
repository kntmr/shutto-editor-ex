var command = {
  setValue: setValue,
  getValue: getValue,
  getValues: getValues
};

$(function() {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var retVal = (command[request.action] || function(){}).apply(command, request.args);
    sendResponse({values: retVal});
  });
});

function getValues(list){
  for(var i in list) {
    list[i] = getValue(i, list[i]);
  }
  return list ;
}

function getValue(name, def) {
  if(!localStorage[name]) {
    localStorage[name] = def;
  }
  return localStorage[name];
}

function setValue(name, value) {
  localStorage[name, value];
}

function openOrFocusOptionsPage() {
  var optionsUrl = chrome.extension.getURL('../html/options.html');
  chrome.tabs.query({}, function(extensionTabs) {
    var found = false;
    for (var i=0; i < extensionTabs.length; i++) {
      if (optionsUrl == extensionTabs[i].url) {
        found = true;
        console.log("tab id: " + extensionTabs[i].id);
        chrome.tabs.update(extensionTabs[i].id, {"selected": true});
      }
    }
    if (found == false) {
      chrome.tabs.create({url: "../html/options.html"});
    }
  });
}

chrome.extension.onConnect.addListener(function(port) {
  var tab = port.sender.tab;
  // This will get called by the content script we execute in
  // the tab as a result of the user pressing the browser action.
  port.onMessage.addListener(function(info) {
    var max_length = 1024;
    if (info.selection.length > max_length)
      info.selection = info.selection.substring(0, max_length);
      openOrFocusOptionsPage();
  });
});

// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  openOrFocusOptionsPage();
});
