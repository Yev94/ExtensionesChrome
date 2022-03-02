(async () => {
    const src = chrome.runtime.getURL("/modules/changeYTSpeed.js");
    const changeYTSpeed = await import(src);

    chrome.storage.sync.get('velocidad', (async ({ velocidad }) => {
        let changeSpeed = new changeYTSpeed.ChangeYTSpeed();
        changeSpeed.activate(velocidad);
    }));
})();