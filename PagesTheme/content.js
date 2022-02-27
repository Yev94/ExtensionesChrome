//TODO: Crear un botón para habilitar y deshabilitar la extensión
//TODO: Crear una forma de lista para excluir las páginas que quiera, posiblemente con chrome.storage.sync.get/set para guardar la lista (con un objeto al que se le vaya appendeando cada URL deseada)
let excludedHTML = /^(button|img|h\d)$/gi;

function checkURL() {
        let url = window.location.href;
        let reg = /\.*google.com\.*|\.*youtube.com\.*|\.*github.com\.*|\.*notion.so\.*/gi
        return reg.test(url)
}

function dameTusHijos(elements) {
    for (let i = 0; i < elements.length; i++) {
        let testHTML = excludedHTML.test(elements[i].nodeName);
        if (!testHTML && elements[i].style.background !== 'rgb(24, 24, 24)') {
            elements[i].style.background = 'rgb(24, 24, 24)';
        }
        dameTusHijos(elements[i].children);
    }
    return;
}

function revisaHijos() {
    return new Promise((resolve) => {
        let body = document.getElementsByTagName('body');
        setTimeout(() => resolve(dameTusHijos(body)), 500)
    })
    
}

function addStyleSheet(){
    let head = document.getElementsByTagName('head')[0];
    let url = chrome.runtime.getURL('style.css');
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    console.log(link);
    head.appendChild(link);

}

window.onload = () => {
    let isNotInList = checkURL();
    if (isNotInList) return
    addStyleSheet();
    let body = document.getElementsByTagName('body');
    dameTusHijos(body);

    (async () => {
        while (true) {
            await revisaHijos();
        }
    })();

}


