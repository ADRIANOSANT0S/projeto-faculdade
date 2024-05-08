class OpenDisclaimerBrochure {
    constructor(newClass) {
        this.brochure = document.querySelectorAll('.brochure');
        this.textAndBrochure = document.querySelectorAll(".block-brochure-wrapper");
        this.tableStudy = document.querySelectorAll(".page.table-ricerche-wrapper");
        this.tablePagination = document.querySelectorAll(".page.table-pagination-wrapper");
        if(!this.brochure&&!this.textAndBrochure&&!this.tableStudy){
            return;
        }
        if (newClass) {
            this.createDisclaimer();
            this.addListeners();
            if (this.tableStudy.length !== 0){
                this.addListenerToStudi();
            }
        } else {
            this.addListenerToStudi();
        }
    }

    createDisclaimer() {
        if (this.brochure.length !== 0 || this.textAndBrochure.length !== 0 ||
                        this.tableStudy.length !== 0 || this.tablePagination.length !== 0) {
            var basePage = document.querySelector('.base-page');
            var div = document.createElement('div');
            div.classList.add('hide-disclaimer', 'disclaimer-overlay', 'brochure-disclaimer');
            var divs = document.createElement('div');
            divs.classList.add('disclaimer', 'brochure-modal');
            var divOne = document.createElement('div');
            divOne.classList.add('brochure-modal-top');
            var divTwo = document.createElement('div');
            divTwo.classList.add('btn', 'btn-wrapper');
            divs.appendChild(divOne);
            divs.appendChild(divTwo);
            div.appendChild(divs);
            basePage.appendChild(div);
        }
    }

    addListeners() {
        let component;
        if (this.brochure.length!==0 || this.textAndBrochure.length!==0) {
            if(this.brochure.length!==0){
                component = "Tile download"
            }
            if(this.textAndBrochure.length!==0){
                component = "Blocco Immagini";
            }
            document.querySelectorAll('.info-title').forEach( item => {
                this.typeListener(item, component);
            });
            document.querySelectorAll('.brochure-title').forEach(item => {
                this.typeListener(item, component);
            });
            this.brochure.forEach(item => {
                this.typeListener(item, component);
           });
        }
        if (this.tablePagination && this.tablePagination.length!==0) {
            component = "Tabella con Paginazione";            document.querySelectorAll('.dl-type').forEach(item => {
                if (!document.querySelectorAll('.dl-type')[0].parentElement.parentElement.classList.contains('item-download-link-studi')) {
                    this.typeListener(item, component);
                }
            });
            document.querySelectorAll('.dl-size').forEach(item => {
                if (!document.querySelectorAll('.dl-type')[0].parentElement.parentElement.classList.contains('item-download-link-studi')) {
                    this.typeListener(item, component);
                }
            });
            document.querySelectorAll('.icon-download').forEach(item => {
                if (!document.querySelectorAll('.dl-type')[0].parentElement.classList.contains('item-download-link-studi')) {
                    this.typeListener(item, component);
                }
            });
        }
    }

    addListenerToStudi() {
        var tableSt = document.querySelector(".page.table-ricerche-wrapper");
        let area = tableSt.querySelector(".table-pagination-area");
        let component;
        if(area){
            component = "Tabella studi - Studi e Ricerche";
        }else{
            component = "Tabella studi - Market Strategy";
        }
        if (document.querySelectorAll(".page.table-ricerche-wrapper").length !== 0) {
            tableSt.querySelectorAll('.dl-type').forEach(item => {
                this.typeListener(item, component);
            });
            tableSt.querySelectorAll('.dl-size').forEach(item => {
                this.typeListener(item, component);
            });
            tableSt.querySelectorAll('.icon-download').forEach(item => {
                this.typeListener(item, component);
            });
        }
    }

    typeListener(item, component){
        if (item.dataset.text1) {
            this.listenerForDisclaimer(item, component);
        } else {
            const path = item.dataset.documentPath;
            const tealium = item.dataset.tealium;
            const contextDescription = item.dataset.tealiumDescription;
            this.openDisclaimer(item, path, tealium, contextDescription, component);
        }
    }

    listenerForDisclaimer(item, component) {
        item.addEventListener('click', () => {
            const text1 = item.dataset.text1;
            const path = item.dataset.documentPath;
            const tealium = item.dataset.tealium;
            const contextDescription = item.dataset.tealiumDescription;
            const rightLogo = item.dataset.rightLogo;
            const leftLogo = item.dataset.leftLogo;
            const showButton = item.dataset.showButton;
            const rightButton = item.dataset.rightButton;
            const leftButton = item.dataset.leftButton;
            const leftRedirect = item.dataset.leftRedirect;
            let redir;
            if (leftRedirect === undefined) {
                redir = '#';
            } else {
                redir = leftRedirect;
            }
            document.querySelector('.brochure-modal-top').innerHTML =` <div class="loghi">
                                <div class="logo-left">
                                    <img class="img-change img-banner" border="0" alt="alt" src="${leftLogo}">
                                    </div>
                                    <div class="logo-right">
                                        <img class="img-change img-banner" border="0" alt="alt" src="${rightLogo}">
                                    </div>
                                </div>
                                <div class="title">Disclaimer</div>
                                <div class="content">${text1}
                                </div>
                                `
            var brochureModal = document.querySelector('.brochure-modal');
            var btnWrapper = brochureModal.querySelector('.btn-wrapper');
            var hideorNot;
            if (showButton === '2') {
                hideorNot = '';
            } else {
                hideorNot = 'hide';
            }
            if (['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod']
                    .includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
                btnWrapper.innerHTML = `
                                    <a href="${redir}" class="box-cta box-cta--secondary-pos close-disc-bro left-button ${hideorNot}" title="${leftButton}">${leftButton}</a>
                                    <a href="${path}" class="box-cta box-cta--primary close-disc-bro download-pdf right-button" title="${rightButton}">${rightButton}</a>
                                    `
                document.querySelector('.brochure-disclaimer').classList.remove('hide-disclaimer');

            } else {
                btnWrapper.innerHTML = `
                                    <a href="${redir}" class="box-cta box-cta--secondary-pos close-disc-bro left-button ${hideorNot}" title="${leftButton}">${leftButton}</a>
                                    <a href="#" class="box-cta box-cta--primary close-disc-bro download-pdf right-button" title="${rightButton}">${rightButton}</a>
                                    `
                document.querySelector('.brochure-disclaimer').classList.remove('hide-disclaimer');
                document.querySelector('.brochure-disclaimer').querySelector('.close-disc-bro.left-button').addEventListener('click', () => {
                    document.querySelector('.brochure-disclaimer').classList.add('hide-disclaimer');
                });
                this.openDisclaimer(btnWrapper.querySelector('.download-pdf'), path, tealium, contextDescription, component);
            }
        });
    }

    openDisclaimer(button, path, tealium, tealiumDescription, component) {
        button.addEventListener("click", function () {
            if ([
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
                // iPad on iOS 13 detection
                let element = document.createElement('a');
                element.setAttribute('href', path);
                let splitPath = path.split("/");
                let docName = splitPath[splitPath.length - 1];
                element.setAttribute('download', docName);
                element.style.display = 'none';
                document.body.appendChild(element);
                //tracciatura analitycs
                if (tealium) {
                    writeTrace(path, component, tealiumDescription);
                }
                element.click();
                document.body.removeChild(element);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', path, true);
                xhr.responseType = 'blob';
                xhr.onload = function (_e) {
                    if (this['status'] === 200) {
                        if(this['response'].type==='application/pdf') {
                            let blob = new Blob([this['response']], {type: 'application/pdf'});
                            let url = URL.createObjectURL(blob);
                            let pdfWindow = window.open("", '_blank');
                            //tracciatura analitycs
                            if (tealium) {
                                writeTrace(path, component, tealiumDescription);
                            }
                            if (pdfWindow.location !== null) {
                                pdfWindow.location = url;
                            }
                        } else {
                            const link = document.createElement('a');
                            link.href = path;
                            let splitPath = path.split("/");
                            let docName = splitPath[splitPath.length-1];
                            link.setAttribute('download', docName);
                            document.body.appendChild(link);
                            //tracciatura analitycs
                            if (tealium) {
                                writeTrace(path, component, tealiumDescription);
                            }
                            link.click();
                            document.body.removeChild(link);
                        }
                    }
                };
                xhr.send();
                document.querySelector('.brochure-disclaimer').classList.add('hide-disclaimer');
            }
        });
    }
}

var openBrochure = new OpenDisclaimerBrochure(true);

function writeTrace(ctaId, component, contextDescription) {
    var obj = {};
    if (!ctaId || !contextDescription)
        return;
    obj.ctaID = ctaId;
    obj.contextID = window.location.href;
    obj.componentStep = component;
    obj.contextDescription = contextDescription;
    obj.ctaType = "PDF";
    try {
        utag.link(obj);
    } catch (error) {
        console.info('Errore tracciatura: ', error);
    }
}
(function (document, $) {
    $(document).on('newStudi', function() {
        openBrochure = new OpenDisclaimerBrochure(false);
    });
})(document, jQuery);
class VideoOpener {
    constructor() {
        this.allVideoBtn = document.querySelectorAll('.show-video-btn');
        this.allPodcastBtn = document.querySelectorAll('.listen-podcast');
        this.heroVideoBtn = document.querySelectorAll('.hero-banner__play-video-btn');
        this.mgmtBtn = document.querySelectorAll('.video-btn-container');
        if (this.allVideoBtn.length !== 0 || this.allPodcastBtn.length !== 0 ||
                this.heroVideoBtn.length !== 0 || this.mgmtBtn.length !== 0) {
            this.createIframe();
            this.loadVideo();
        }
    }

    createIframe() {
        if (this.allVideoBtn.length !== 0 || this.heroVideoBtn.length !== 0 || this.mgmtBtn.length !== 0) {
            var basePage = document.querySelector('.base-page');
            var div = document.createElement('div');
            div.classList.add('hero-banner__video-overlay', 'hide-hero-video-modal');
            var childDiv = document.createElement('div');
            childDiv.classList.add('close-video-btn', 'close-video-btn--mobile');
            var modalDiv = document.createElement('div');
            modalDiv.classList.add('hero-banner__video-modal');
            var childDiv2 = document.createElement('div');
            childDiv2.classList.add('close-video-btn', 'close-video-btn--desktop');
            var span = document.createElement('span');
            span.classList.add('icon-close');
            var span2 = document.createElement('span');
            span2.classList.add('icon-close');

            childDiv.appendChild(span);
            childDiv2.appendChild(span2);
            modalDiv.appendChild(childDiv2);
            div.appendChild(childDiv);
            div.appendChild(modalDiv);
            basePage.appendChild(div);
        }
        if (this.allPodcastBtn.length !== 0) {
            var basePage = document.querySelector('.base-page');
            var div = document.createElement('div');
            div.classList.add('podcast-container', 'hide');

            basePage.appendChild(div);
        }
    }

    loadVideo() {
        const targetIframeSelector = 'div.player-video iframe';

        function sendMsg2Iframe(msg) {
            try {
                var frameToPost = document.querySelector(targetIframeSelector);
                if (frameToPost !== null && frameToPost !== undefined) {
                    var pm = JSON.stringify({ method: msg });
                    console.log('inviando [' + pm + '] a [' + frameToPost.src + ']');
                    //creo  un oggetto URL per poter inviare la postmessage solo al dominio di interesse
                    let url = new URL(frameToPost.src);
                    frameToPost.contentWindow.postMessage(pm, url.origin);
                }
            }
            catch (e) { console.log(e); }
            if (msg === 'close') {
                closeIframes();
            }
        }

        var globalOriginExpected;
        var environment = document.querySelector('.base-page').getAttribute("data-environment");

        if (this.allVideoBtn.length !== 0 || this.allPodcastBtn.length !== 0 ||
                        this.heroVideoBtn.length !== 0 || this.mgmtBtn.length !== 0) {

                        const btn = document.querySelectorAll('.show-video-btn');
                                btn.forEach(item => {
                                    item.addEventListener('click', (e) => {
                                        closeIframes();
                                        const videoId = e.target.parentNode.dataset.videoId;
                                        const iframeUrl = e.target.parentNode.dataset.iframeUrl;
                                        globalOriginExpected = environment==="prod" ? new URL("https:"+iframeUrl).origin : new URL("http:"+iframeUrl).origin;
                                        var divPlayer = document.createElement("div");
                                        divPlayer.setAttribute('class', 'player-video');
                                        var iframePlayer = document.createElement("iframe");
                                        var iframeSrc = iframeUrl
                                                    + "?resourceId=" + videoId + "&analytics=taelium-post-message&analyticsEvents=play-start%2Cplayed-1%25%2Cplayed-25%25%2Cplayed-50%25%2Cplayed-75%25%2Cplayed-100%25";

                                        iframePlayer.setAttribute('id', 'ds-' + videoId);
                                        iframePlayer.setAttribute('src', iframeSrc);
                                        iframePlayer.setAttribute('allowfullscreen', '');
                                        iframePlayer.setAttribute('webkitallowfullscreen', '');
                                        iframePlayer.setAttribute('mozallowfullscreen', '');
                                        iframePlayer.setAttribute('allow', "autoplay; fullscreen");
                                        iframePlayer.setAttribute('frameborder', '0');
                                        iframePlayer.style.width = "100%";
                                        iframePlayer.style.height = "100%";
                                        iframePlayer.setAttribute('class', 'bootstrap responsive-item');

                                        divPlayer.appendChild(iframePlayer);
                                        document.querySelector(".hero-banner__video-modal").appendChild(divPlayer);

                                        document.querySelector('.hero-banner__video-overlay').classList.add('show-hero-video-modal');
                                        document.querySelector('.hero-banner__video-overlay').classList.remove('hide-hero-video-modal');
                                        document.body.classList.add('modal-open');
                                    });
                                });

        const heroBtn = document.querySelectorAll('.hero-banner__play-video-btn');
        heroBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                closeIframes();
                const videoId = e.target.parentNode.dataset.videoId;
                const iframeUrl = e.target.parentNode.dataset.iframeUrl;
                globalOriginExpected = environment==="prod" ? new URL("https:"+iframeUrl).origin : new URL("http:"+iframeUrl).origin;
                var divPlayer = document.createElement("div");
                divPlayer.setAttribute('class', 'player-video');
                var iframePlayer = document.createElement("iframe");
                var iframeSrc = iframeUrl
                                + "?resourceId=" + videoId + "&analytics=taelium-post-message&analyticsEvents=play-start%2Cplayed-1%25%2Cplayed-25%25%2Cplayed-50%25%2Cplayed-75%25%2Cplayed-100%25";

                iframePlayer.setAttribute('id', 'ds-' + videoId);
                iframePlayer.setAttribute('src', iframeSrc);
                iframePlayer.setAttribute('allowfullscreen', '');
                iframePlayer.setAttribute('webkitallowfullscreen', '');
                iframePlayer.setAttribute('mozallowfullscreen', '');
                iframePlayer.setAttribute('allow', "autoplay; fullscreen");
                iframePlayer.setAttribute('frameborder', '0');
                iframePlayer.style.width = "100%";
                iframePlayer.style.height = "100%";
                iframePlayer.setAttribute('class', 'bootstrap responsive-item');

                divPlayer.appendChild(iframePlayer);
                document.querySelector(".hero-banner__video-modal").appendChild(divPlayer);

                document.querySelector('.hero-banner__video-overlay').classList.add('show-hero-video-modal');
                document.querySelector('.hero-banner__video-overlay').classList.remove('hide-hero-video-modal');
                document.body.classList.add('modal-open');
            });
        });

        const topMgmtBtn = document.querySelectorAll('.video-btn-container');
        topMgmtBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                closeIframes();
                const videoId = e.target.parentNode.dataset.videoId;
                const iframeUrl = e.target.parentNode.dataset.iframeUrl;
                globalOriginExpected = environment==="prod" ? new URL("https:"+iframeUrl).origin : new URL("http:"+iframeUrl).origin;
                var divPlayer = document.createElement("div");
                divPlayer.setAttribute('class', 'player-video');
                var iframePlayer = document.createElement("iframe");
                var iframeSrc = iframeUrl
                                + "?resourceId=" + videoId + "&analytics=taelium-post-message&analyticsEvents=play-start%2Cplayed-1%25%2Cplayed-25%25%2Cplayed-50%25%2Cplayed-75%25%2Cplayed-100%25";

                iframePlayer.setAttribute('id', 'ds-' + videoId);
                iframePlayer.setAttribute('src', iframeSrc);
                iframePlayer.setAttribute('allowfullscreen', '');
                iframePlayer.setAttribute('webkitallowfullscreen', '');
                iframePlayer.setAttribute('mozallowfullscreen', '');
                iframePlayer.setAttribute('allow', "autoplay; fullscreen");
                iframePlayer.setAttribute('frameborder', '0');
                iframePlayer.style.width = "100%";
                iframePlayer.style.height = "100%";
                iframePlayer.setAttribute('class', 'bootstrap responsive-item');

                divPlayer.appendChild(iframePlayer);
                document.querySelector(".hero-banner__video-modal").appendChild(divPlayer);

                document.querySelector('.hero-banner__video-overlay').classList.add('show-hero-video-modal');
                document.querySelector('.hero-banner__video-overlay').classList.remove('hide-hero-video-modal');
                document.body.classList.add('modal-open');
            });
        });

        const podcastBtn = document.querySelectorAll('.listen-podcast');
        podcastBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                closeIframes();
                const podcastId = e.target.dataset.podcast;
                const iframeUrl = e.target.dataset.iframeUrl;
                globalOriginExpected = environment==="prod" ? new URL("https:"+iframeUrl).origin : new URL("http:"+iframeUrl).origin;
                var divPlayer = document.createElement("div");
                divPlayer.setAttribute('class', 'podcast-wrapper');
                var iframePlayer = document.createElement("iframe");
                var iframeSrc = iframeUrl
                            + "?resourceId=" + podcastId
                            + "&theme=IMI-CIB"
                            + "&playerIframeId=ds-" + podcastId
                            + "&referrerPage=" + encodeURIComponent(window.location.href);

                iframePlayer.setAttribute('id', 'ds-' + podcastId);
                iframePlayer.setAttribute('src', iframeSrc);
                iframePlayer.setAttribute('allowfullscreen', '');
                iframePlayer.setAttribute('webkitallowfullscreen', '');
                iframePlayer.setAttribute('mozallowfullscreen', '');
                iframePlayer.setAttribute('allow', "autoplay; fullscreen");
                iframePlayer.setAttribute('frameborder', '0');
                iframePlayer.style.width = "100%";
                iframePlayer.style.height = "100%";
                iframePlayer.setAttribute('class', 'bootstrap responsive-item');

                divPlayer.appendChild(iframePlayer);
                document.querySelector(".podcast-container").appendChild(divPlayer);

                document.querySelector('.podcast-container').classList.add('show');
                document.querySelector('.podcast-container').classList.remove('hide');
            });
        });

        const closeVideoBtn = document.querySelectorAll('.close-video-btn');
        closeVideoBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                document.body.classList.remove('modal-open');
                document.querySelector('.hero-banner__video-overlay').classList.remove('show-hero-video-modal');
                document.querySelector('.hero-banner__video-overlay').classList.add('hide-hero-video-modal');
                sendMsg2Iframe('close');
            });
        });

        const allReserchVideoModal = document.querySelector('.hero-banner__video-overlay');
            if (allReserchVideoModal !== null) {
            allReserchVideoModal.addEventListener('click', (e) => {
                if (!e.target.classList.contains('hero-banner__video-modal')) {
                    document.body.classList.remove('modal-open');
                    document.querySelector('.hero-banner__video-overlay').classList.remove('show-hero-video-modal');
                    document.querySelector('.hero-banner__video-overlay').classList.add('hide-hero-video-modal');
                    sendMsg2Iframe('close');
                }
            });
            }
        }

        // integrazione Discovery
        // al caricamento della pagina istalla listener per scambio messaggi con widget discovery
        // appena collegato l'iframe al widget, viene ricevuto messaggio 'player-ready'
        // se verificato il ready, il messaggio 'play' puo essere spedito all'iframe una volta chiamato il modal
        //

        window.addEventListener("message", function (event) {
            // if received message is not come from expected only exit ...
            if (!globalOriginExpected) {
                return;
            }
            if (event.origin !== globalOriginExpected) {
                return;
            }

            try {
                var eventData;
                try { eventData = JSON.parse(event.data); }
                catch (e) {
                    console.log('video - message with format not expected: ');
                    return;
                }

                if (eventData['video-global-id']) {
                    console.log(eventData['action']);
                    if (eventData['action'] == 'ds-player-ready') {
                        sendMsg2Iframe('play');
                    }
                }

                if (eventData['podcast-global-id']) {
                    console.log(eventData['action']);
                    if (eventData['action'] == 'ds-player-ready') {
                        sendMsg2Iframe('play');
                    }
                }

                if (eventData['action'] && eventData['action'] == 'close') {
                    console.log(eventData['action']);
                    document.querySelector('.podcast-container').classList.remove('show');
                    document.querySelector('.podcast-container').classList.add('hide');
                    sendMsg2Iframe('close');
                }

                if (eventData['analytics-event']) {
                    console.log('arrivato evento analytics');
                    console.log(eventData);
                    try {
                        utag.view(eventData);
                    }
                    catch (error) { console.log('Errore tracciatura', error); }
                }
            } catch (error) { console.error("Errore leggendo l'evento video", error); }
        });

        function closeIframes() {
            var videoPlayers = document.querySelector(".player-video");
            if (videoPlayers) {
                videoPlayers.remove();
            }
            var audioPlayers = document.querySelector(".podcast-wrapper");
            if (audioPlayers) {
                audioPlayers.remove();
            }
        }
    }
}

const videoOpener = new VideoOpener();
