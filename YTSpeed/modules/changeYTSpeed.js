//Si lleva clases hay que poner todo entre {}

export class ChangeYTSpeed {

    constructor() {
        this.velocidadReproduccion = {
            '2': 8,
            '1.75': 7,
            '1.5': 6,
            '1.25': 5,
            'Normal': 4,
        }
    }


    checkIfMusic() {
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
    }

    checkMyListMusic() {
        let url = window.location.href;
        let reg = /list=PLuw5co6keDB7d-RA2R4nE9P5Hz8u8-OsJ/gi
        return reg.test(url);
    }

    findPlaybackSpeed() {
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

    clickOnPlaybackSpeedElement(velocidad) {
        return new Promise(async (resolve) => {
            let velocidadYT = this.velocidadReproduccion[velocidad];
            let playbackSpeedElement = await this.findPlaybackSpeed();
            playbackSpeedElement?.click();
            resolve(velocidadYT);
        })
    }

    getHeaderMenu() {
        //Ponemos un tiempo de espera para que de tiempo al DOM a cargar bien los nuevos elementos (sino chocan con los anteriores(ya que tienen los mismos nombres de clase))
        return new Promise((resolve) => {
            setTimeout(() => {
                //Resolvemos esperando al encabezado del menú donde aparecen las velocidades 
                resolve(document.querySelectorAll('.ytp-panel-header')[0]);
            }, 450);
        })
    }

    async activate(velocidad) {

        let isMyList = this.checkMyListMusic();
        let isMusic = await this.checkIfMusic();
        if (isMusic || isMyList) velocidad = 'Normal';

        let velocidadYT = await this.clickOnPlaybackSpeedElement(velocidad);
        if (velocidad == 'Normal') await this.getHeaderMenu();

        document.querySelectorAll(`.ytp-panel-menu > div:nth-child(${velocidadYT}) > div`)[0]?.click();
        document.querySelectorAll(".ytp-settings-button")[0]?.click();
    }
}