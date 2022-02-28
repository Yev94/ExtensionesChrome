
//TODO: Crear una zona para excluir zonas de reproducción
//!Super importante
// (async () => {
//     const src = chrome.runtime.getURL("your/content_main.js");
//     const contentMain = await import(src);
//     contentMain.main();
//   })();
//!En el módulo a exportar ponemos export como siempre
(async () => {
    const src = chrome.runtime.getURL("/modules/changeYTSpeed.js");
    const changeYTSpeed = await import(src);

    chrome.storage.sync.get('velocidad', (async ({ velocidad }) => {
        let changeSpeed = new changeYTSpeed.ChangeYTSpeed();
        changeSpeed.activate(velocidad);
    }));
})();