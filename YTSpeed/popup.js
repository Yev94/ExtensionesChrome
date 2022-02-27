let buttons = document.getElementsByClassName('container')[0];

buttons.addEventListener('click', ((e) => {
    chrome.storage.sync.set({velocidad: e.target.innerHTML});
    setVelocidad();
}))

let setVelocidad = () => {
    chrome.storage.sync.get('velocidad', ((velocidad) => {
        chrome.tabs.query({}, ((tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target : {tabId: tab.id},
                    files : ['content.js']
                })
            })
        }));
    }))
}