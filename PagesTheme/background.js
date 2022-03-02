chrome.tabs.query({}, ((tabs) => {
    tabs.forEach((tab) => {
        chrome.scripting.executeScript({
            target : {tabId: tab.id},
            files : ['content.js']
        })
    })
}));