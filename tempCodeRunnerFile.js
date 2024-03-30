 if(!tabs[0].url.includes("https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html")){
        chrome.runtime.sendMessage({ action: "openNewTab", url: "https://ghosh-trisha.github.io/Binaural_Beats_Project/page/index.html" });
      }