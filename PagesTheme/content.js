//TODO: Crear un botón para habilitar y deshabilitar la extensión
//TODO: Crear una forma de lista para excluir las páginas que quiera, posiblemente con chrome.storage.sync.get/set para guardar la lista (con un objeto al que se le vaya appendeando cada URL deseada)
//TODO: Crear una forma para excluir zonas de una página

(async () => {
    const src = chrome.runtime.getURL("/modules/changePageTheme.js");
    const changePageTheme = await import(src);

    let changeTheme = new changePageTheme.changePageTheme();
    changeTheme.activate();

})();