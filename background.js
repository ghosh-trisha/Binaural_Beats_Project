// function for opening a new medetation tab at 1st means at 0th  index means tabs[0]
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "openNewTab") {
      chrome.tabs.create({ url: message.url , index: 0});
    }
    // sending message for play
    // chrome.tabs.query({}, function (tabs) {
    //   console.log(tabs.length);
    //   chrome.tabs.sendMessage(tabs[0].id, {
    //     text: "play",
    //     parameter1: message.data.baseFreq,
    //     parameter2: message.data.beatFreq,
    //     parameter3: message.data.vol
    //   });
    // })
});
