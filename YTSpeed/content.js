//TODO: Crear una zona para excluir zonas de reproducción

class YTSpeed {

    constructor() {
        this.velocidadReproduccion = {
            '2': 8,
            '1.75': 7,
            '1.5': 6,
            '1.25': 5,
            'Normal': 4,
        }
    }
}

function checkIfMusic() {
    return new Promise((resolve) => {
        let i = 0;
        let match = false;
        let metas = document.getElementsByTagName('meta');
        while (!match && i < metas.length) {
            let contentAttribute = metas[i].content;
            if (contentAttribute === 'Music') {
                match = true;
            }
            i++;
        }
        resolve(match);
    })

function checkMyListMusic() {
    let url = window.location.href;
    let reg = /list=PLuw5co6keDB7d-RA2R4nE9P5Hz8u8-OsJ/gi
    return reg.test(url);
}

function findPlaybackSpeed() {
    return new Promise((resolve) => {
        document.querySelectorAll(".ytp-settings-button")[0]?.click();
        let match = false;
        let i = 0;
        let labelsMenuItem = document.querySelectorAll(".ytp-menuitem-label");
        let playbackSpeedElement;
        while (!match && i < labelsMenuItem.length) {
            let contentLabelMenuItem = labelsMenuItem[i].innerHTML;
            if (contentLabelMenuItem === 'Velocidad de reproducción') {
                match = true;
                playbackSpeedElement = labelsMenuItem[i].nextElementSibling;
            }
            i++;
        }
        resolve(playbackSpeedElement);
    })
}

function clickOnPlaybackSpeedElement(velocidad) {
    return new Promise(async (resolve) => {
        let velocidadYT = velocidadReproduccion[velocidad];
        let playbackSpeedElement = await findPlaybackSpeed();
        playbackSpeedElement?.click();
        resolve(velocidadYT);
    })
}

function getHeaderMenu() {
    //Ponemos un tiempo de espera para que de tiempo al DOM a cargar bien los nuevos elementos (sino chocan con los anteriores(ya que tienen los mismos nombres de clase))
    return new Promise((resolve) => {
        setTimeout(() => {
            //Resolvemos esperando al encabezado del menú donde aparecen las velocidades 
            resolve(document.querySelectorAll('.ytp-panel-header')[0]);
        }, 450);
    })
}

function activate(velocidad){
    
    let isMyList = checkMyListMusic();
    let isMusic = await checkIfMusic();
    if (isMusic || isMyList) velocidad = 'Normal';
    
    let velocidadYT = await clickOnPlaybackSpeedElement(velocidad);
    if (velocidad == 'Normal') await getHeaderMenu();
    
    document.querySelectorAll(`.ytp-panel-menu > div:nth-child(${velocidadYT}) > div`)[0]?.click();
    document.querySelectorAll(".ytp-settings-button")[0]?.click();
}
}


chrome.storage.sync.get('velocidad', (async ({ velocidad }) => {
    let changeYTSpeed = new YTSpeed;
    changeYTSpeed.activate(velocidad);
}));
