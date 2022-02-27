//TODO: Crear un botón para habilitar y deshabilitar la extensión
//TODO: Crear una forma de lista para excluir las páginas que quiera, posiblemente con chrome.storage.sync.get/set para guardar la lista (con un objeto al que se le vaya appendeando cada URL deseada)
//TODO: Crear una forma para excluir zonas de una página

let excludedHTML = /^(button|img|h\d)$/gi;

function checkURL() {
        let url = window.location.href;
        let reg = /\.*google.com\.*|\.*youtube.com\.*|\.*github.com\.*|\.*notion.so\.*/gi
        return reg.test(url)
}

function reviewEachDOMElement(elements) {
    for (let i = 0; i < elements.length; i++) {
        let testHTML = excludedHTML.test(elements[i].nodeName);
        if (!testHTML && elements[i].style.background !== 'rgb(24, 24, 24)') {
            elements[i].style.background = 'rgb(24, 24, 24)';
        }
        reviewEachDOMElement(elements[i].children);
    }
    return;
}

function reviewAgainWaitingTime(time) {
    return new Promise((resolve) => {
        let body = document.getElementsByTagName('body');
        setTimeout(() => resolve(reviewEachDOMElement(body)), time);
    })
    
}

function addStyleSheet(){
    let head = document.getElementsByTagName('head')[0];
    let url = chrome.runtime.getURL('style.css');
    let link = document.createElement('link');
    
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', url);
    
    head.appendChild(link);
}

window.onload = () => {
    let isInList = checkURL();
    if (isInList) return
    
    addStyleSheet();
    
    let body = document.getElementsByTagName('body');
    reviewEachDOMElement(body);

    (async () => {
        while (true) {
            await reviewAgainWaitingTime(500);
        }
    })();

}


