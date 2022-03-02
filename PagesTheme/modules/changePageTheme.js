export class changePageTheme {

    constructor() {
        this.excludedHTML = /^(button|img|h\d)$/gi;
    }

    checkURL() {
        let url = window.location.href;
        let reg = /\.*google.com\.*|\.*youtube.com\.*|\.*github.com\.*|\.*notion.so\.*/gi
        return reg.test(url)
    }

    reviewEachDOMElement(elements) {
        for (let i = 0; i < elements.length; i++) {
            let testHTML = this.excludedHTML.test(elements[i].nodeName);
            if (!testHTML && elements[i].style.background !== 'rgb(24, 24, 24)') {
                elements[i].style.background = 'rgb(24, 24, 24)';
            }
            this.reviewEachDOMElement(elements[i].children);
        }
        return;
    }

    reviewAgainWaitingTime(time) {
        return new Promise((resolve) => {
            let body = document.getElementsByTagName('body');
            setTimeout(() => resolve(this.reviewEachDOMElement(body)), time);
        })

    }

    addStyleSheet() {
        let head = document.getElementsByTagName('head')[0];
        let url = chrome.runtime.getURL('style.css');
        let link = document.createElement('link');

        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', url);

        head.appendChild(link);
    }

    activate() {
        let isInList = this.checkURL();
        if (isInList) return

        this.addStyleSheet();

        let body = document.getElementsByTagName('body');
        this.reviewEachDOMElement(body);

        (async () => {
            while (true) {
                await this.reviewAgainWaitingTime(500);
            }
        })();
    }
}