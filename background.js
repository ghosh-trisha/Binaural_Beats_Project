// function for opening a new medetation tab at 1st means at 0th  index means tabs[0]
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "openNewTab") {
      chrome.tabs.create({ url: message.url , index: 0});
    }
  });