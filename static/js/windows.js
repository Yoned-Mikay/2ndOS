let dock = document.querySelector("#dock");
class xor {
    static encode(str) {
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    };
    static decode(str) {
        return decodeURIComponent(str.slice(0, -1)).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    };
};

function checkOverflow() {
    if (dock.scrollWidth > dock.clientWidth) {
        dock.classList.add("overflow");
    } else {
        dock.classList.remove("overflow");
    }
}

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
             return pair[1];
            }
       }
       return(false);
}

let id = getQueryVariable("app");
let date = getQueryVariable("date");

var keys = {}

if(localStorage.getItem("browser") === null) {
    localStorage.setItem("browser", 0)
}

let browsersRunning = 0;
let appsMini = 0;

const appShell = document.createElement("div");
appShell.classList.add("appShell");
const appsShellName = document.createElement("p");
appsShellName.classList.add("name");

let params;

function windows(link, icn, title, browser = Boolean, os = Boolean, fullscreen = Boolean, appName) {
    document.querySelector(".shell").appendChild(appShell);
    appShell.appendChild(appsShellName);
    appsShellName.innerText = title;
    const appID = document.querySelector(".name").getAttribute("data-id");
    let chromeJS = document.createElement("script");
    chromeJS.src = "./js/chrome-tabs.js";
    let maxState;
    const newwin = document.createElement("div");
    let windowID;
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return windowID = result;
    }
    makeid(18);
    appsShellName.setAttribute("data-id", windowID);
    newwin.id = windowID;
    newwin.classList.add("win");
    newwin.classList.add("maxiN");
    newwin.setAttribute("data-title", title);
    const windows = document.querySelectorAll(".win");
    for (let i = 0; i < windows.length; i++) {
        windows[i].classList.add("winNotFocus");
        windows[i].classList.remove("winFocus");
    }

    newwin.classList.add("winFocus");
    newwin.classList.remove("winNotFocus");
    if(appName != null && appName != undefined) {
        newwin.setAttribute("data-app", appName);
    }

    if(localStorage.getItem("shadow") === "yes") {
        if(localStorage.getItem("winshadow") == "default") {
            newwin.style.boxShadow = `0 0 13px 4px rgba(0, 0, 0, 0.32)`;
            newwin.classList.add("shadow");
        } else {
            newwin.style.boxShadow = `0 0 13px 4px ${localStorage.getItem("winshadow")}`;
            newwin.classList.add("shadow");
        }
    }
    switch(localStorage.getItem("fullscreen")) {
        case null:
            break;
        case "yes":
            newwin.classList.remove("maxiN");
            newwin.classList.add("maxiY");
            newwin.classList.add("maxiR");
            newwin.classList.add("noShadow");
            newwin.classList.remove("shadow");
            maxState = true;
            break;
        case "no":
            break;
        default:
            break;
    }

    if(fullscreen === true) {
        newwin.classList.remove("maxiN");
        newwin.classList.add("maxiY");
    }

    if(localStorage.getItem('radius') === "yes") {
        newwin.classList.add("radius");
    } else if(localStorage.getItem('radius') === "custom") {
        newwin.classList.add("custom");
        newwin.style.borderRadius = localStorage.getItem('roundness') + "px";
    } else if(localStorage.getItem('radius') === "no") {
        newwin.classList.remove("radius");
        newwin.classList.add("custom");
        newwin.classList.add("noRad");
    } else if(localStorage.getItem('radius') === null) {
        newwin.classList.add("radius");
    }

    if(localStorage.getItem('shadow') === "yes") {
        newwin.classList.add("shadow");
    } else if(localStorage.getItem('shadow') === "no") {
        newwin.classList.remove("shadow");
    } else if(localStorage.getItem('shadow') === null) {}
    const winconts = document.createElement("div");
    winconts.classList.add("winconts");
    winconts.setAttribute("id", "drag");
    const controls = document.createElement("div");
    const controlsHTML = `
        <a class='winc mini' id="mini">
            <svg class="winic" id="maxi" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="7" width="15" height="1" fill="#D9D9D9"/>
            </svg>
        </a>
        <a id='maxi' class='winc maxi'>
            <svg id="maxi" class="winic" viewBox="0 0 15 15" fill="none">
                <rect x="0.75" y="0.75" width="13.5" height="13.5" stroke="white" stroke-width="1.5" />
            </svg>
        </a>
        <a class='close winc' id='close'>
            <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' id='closei' class="winic">
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
        </a>
    `
    controls.classList.add("controls");
    controls.innerHTML = controlsHTML;
    const titleElement = document.createElement("div");
    let titleHTML = title;
    titleElement.classList.add("title");
    titleElement.innerHTML = titleHTML;
    const favicon = document.createElement("div");
    favicon.classList.add("icon");
    favicon.classList.add("iconL");
    if(localStorage.getItem("winBtnPos") === null) {
        favicon.classList.add("iconL");
        favicon.classList.remove("iconR");
        controls.classList.add("controlsR");
        controls.classList.remove("controlsL");
    }
    switch(localStorage.getItem("winBtnPos")) {
        case null:
            favicon.classList.add("iconL");
            favicon.classList.remove("iconR");
            controls.classList.add("controlsR");
            controls.classList.remove("controlsL");
            break;
        case "left":
            favicon.classList.add("iconR");
            favicon.classList.remove("iconL");
            controls.classList.remove("controlsR");
            controls.classList.add("controlsL");
            break;
        case "right":
            favicon.classList.add("iconL");
            favicon.classList.remove("iconR");
            controls.classList.remove("controlsL");
            controls.classList.add("controlsR");
            break;
        default:
            break;
    }
    let newdock = document.createElement("div");
    newdock.setAttribute("data-appId", newwin.id);
    newdock.classList.add("appItem");
    newdock.classList.add("active");
    newdock.setAttribute("title", title);
    newdock.classList.add("dockbtn");
    const appItem = document.querySelectorAll(".appItem");
    // blink the background of newdock for 5 seconds
    newdock.classList.add("alert");
    setTimeout(() => {
        newdock.classList.remove("alert");
    }, 4000);
    for (let i = 0; i < appItem.length; i++) {
        appItem[i].classList.remove("active");
    }
    newdock.classList.add("active");
    if(os === false) {
        newdock.innerHTML = `<img class="dockicon" src="${icn}" alt="${title}">`;
    }
    newdock.onclick = (e) => {
        if(newwin.classList.contains("winmini")) {
            newwin.classList.remove("winmini");
        }
        const appItem = document.querySelectorAll(".appItem");
        for (let i = 0; i < appItem.length; i++) {
            appItem[i].classList.remove("active");
        }
        newdock.classList.add("active");
        appsShellName.innerText = title;
        appsShellName.setAttribute("data-id", windowID);
        newwin.classList.remove("winmini");
        const windows = document.querySelectorAll(".win");
        for (let i = 0; i < windows.length; i++) {
            windows[i].classList.add("winNotFocus");
            windows[i].classList.remove("winFocus");
        }
    
        newwin.classList.add("winFocus");
        newwin.classList.remove("winNotFocus");
        if(appsMini == 1) {
            appsMini--;
        } else if(appsMini >= 1) {
            appsMini--;
        }
        if(maxState === true) {
            newwin.classList.add("maxiY");
        }
    }
    let faviconHTML;
    switch(os) {
        case false:
            faviconHTML = `
                <img draggable='false' src='${icn}' class='favicon' id='favicon'>
            `;
            break;
    }
    switch(appName) {
        case "player":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M74.1229 43.182C76.7895 41.6424 76.7895 37.7934 74.1229 36.2538L14 1.54187C11.3333 0.00226495 8 1.92677 8 5.00597V74.4299C8 77.5091 11.3333 79.4336 14 77.894L74.1229 43.182ZM32.2193 26.851V33.3136H25.0733V53.8039H18.1934V33.3136H11.0474V26.851H32.2193ZM45.6736 26.889C50.805 26.889 54.568 29.9682 54.416 35.1003C54.378 36.3168 53.5798 38.4837 51.6412 39.4721C55.3283 41.3349 55.7844 44.7943 55.4423 46.8471C54.7581 51.1809 51.8313 53.8039 45.8637 53.8039H34.8786V26.889H45.6736ZM41.7205 32.6293V37.4193H45.6736C48.9805 37.4193 49.0945 32.6293 45.6736 32.6293H41.7205ZM41.7205 42.3233V47.8355H45.6736C49.7787 47.8355 49.7027 42.3233 45.6736 42.3233H41.7205Z"/>
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M74.1229 43.182C76.7895 41.6424 76.7895 37.7934 74.1229 36.2538L14 1.54187C11.3333 0.00226495 8 1.92677 8 5.00597V74.4299C8 77.5091 11.3333 79.4336 14 77.894L74.1229 43.182ZM32.2193 26.851V33.3136H25.0733V53.8039H18.1934V33.3136H11.0474V26.851H32.2193ZM45.6736 26.889C50.805 26.889 54.568 29.9682 54.416 35.1003C54.378 36.3168 53.5798 38.4837 51.6412 39.4721C55.3283 41.3349 55.7844 44.7943 55.4423 46.8471C54.7581 51.1809 51.8313 53.8039 45.8637 53.8039H34.8786V26.889H45.6736ZM41.7205 32.6293V37.4193H45.6736C48.9805 37.4193 49.0945 32.6293 45.6736 32.6293H41.7205ZM41.7205 42.3233V47.8355H45.6736C49.7787 47.8355 49.7027 42.3233 45.6736 42.3233H41.7205Z"/>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "help":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill" d="M2.23295 6.54545V6.49432C2.23864 5.9517 2.29545 5.51989 2.40341 5.19886C2.51136 4.87784 2.66477 4.6179 2.86364 4.41903C3.0625 4.22017 3.30114 4.03693 3.57955 3.86932C3.74716 3.76705 3.89773 3.64631 4.03125 3.5071C4.16477 3.36506 4.26989 3.2017 4.34659 3.01705C4.42614 2.83239 4.46591 2.62784 4.46591 2.40341C4.46591 2.125 4.40057 1.88352 4.26989 1.67898C4.1392 1.47443 3.96449 1.31676 3.74574 1.20597C3.52699 1.09517 3.28409 1.03977 3.01705 1.03977C2.78409 1.03977 2.55966 1.08807 2.34375 1.18466C2.12784 1.28125 1.94744 1.43324 1.80256 1.64062C1.65767 1.84801 1.57386 2.11932 1.55114 2.45455H0.477273C0.5 1.97159 0.625 1.55824 0.852273 1.21449C1.08239 0.870739 1.38494 0.607954 1.75994 0.426136C2.13778 0.244318 2.55682 0.153409 3.01705 0.153409C3.51705 0.153409 3.9517 0.252841 4.32102 0.451704C4.69318 0.650568 4.98011 0.923295 5.18182 1.26989C5.38636 1.61648 5.48864 2.01136 5.48864 2.45455C5.48864 2.76705 5.44034 3.04972 5.34375 3.30256C5.25 3.5554 5.11364 3.78125 4.93466 3.98011C4.75852 4.17898 4.54545 4.35511 4.29545 4.50852C4.04545 4.66477 3.84517 4.82955 3.6946 5.00284C3.54403 5.1733 3.43466 5.37642 3.36648 5.61222C3.2983 5.84801 3.26136 6.14205 3.25568 6.49432V6.54545H2.23295ZM2.77841 9.06818C2.56818 9.06818 2.38778 8.9929 2.23722 8.84233C2.08665 8.69176 2.01136 8.51136 2.01136 8.30114C2.01136 8.09091 2.08665 7.91051 2.23722 7.75994C2.38778 7.60937 2.56818 7.53409 2.77841 7.53409C2.98864 7.53409 3.16903 7.60937 3.3196 7.75994C3.47017 7.91051 3.54545 8.09091 3.54545 8.30114C3.54545 8.44034 3.50994 8.56818 3.43892 8.68466C3.37074 8.80114 3.27841 8.89489 3.16193 8.96591C3.0483 9.03409 2.92045 9.06818 2.77841 9.06818Z"/>
                </svg>
            `;
            newdock.innerHTML = `
                <svg title="Terbium Help" class="dockicon" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill" d="M2.23295 6.54545V6.49432C2.23864 5.9517 2.29545 5.51989 2.40341 5.19886C2.51136 4.87784 2.66477 4.6179 2.86364 4.41903C3.0625 4.22017 3.30114 4.03693 3.57955 3.86932C3.74716 3.76705 3.89773 3.64631 4.03125 3.5071C4.16477 3.36506 4.26989 3.2017 4.34659 3.01705C4.42614 2.83239 4.46591 2.62784 4.46591 2.40341C4.46591 2.125 4.40057 1.88352 4.26989 1.67898C4.1392 1.47443 3.96449 1.31676 3.74574 1.20597C3.52699 1.09517 3.28409 1.03977 3.01705 1.03977C2.78409 1.03977 2.55966 1.08807 2.34375 1.18466C2.12784 1.28125 1.94744 1.43324 1.80256 1.64062C1.65767 1.84801 1.57386 2.11932 1.55114 2.45455H0.477273C0.5 1.97159 0.625 1.55824 0.852273 1.21449C1.08239 0.870739 1.38494 0.607954 1.75994 0.426136C2.13778 0.244318 2.55682 0.153409 3.01705 0.153409C3.51705 0.153409 3.9517 0.252841 4.32102 0.451704C4.69318 0.650568 4.98011 0.923295 5.18182 1.26989C5.38636 1.61648 5.48864 2.01136 5.48864 2.45455C5.48864 2.76705 5.44034 3.04972 5.34375 3.30256C5.25 3.5554 5.11364 3.78125 4.93466 3.98011C4.75852 4.17898 4.54545 4.35511 4.29545 4.50852C4.04545 4.66477 3.84517 4.82955 3.6946 5.00284C3.54403 5.1733 3.43466 5.37642 3.36648 5.61222C3.2983 5.84801 3.26136 6.14205 3.25568 6.49432V6.54545H2.23295ZM2.77841 9.06818C2.56818 9.06818 2.38778 8.9929 2.23722 8.84233C2.08665 8.69176 2.01136 8.51136 2.01136 8.30114C2.01136 8.09091 2.08665 7.91051 2.23722 7.75994C2.38778 7.60937 2.56818 7.53409 2.77841 7.53409C2.98864 7.53409 3.16903 7.60937 3.3196 7.75994C3.47017 7.91051 3.54545 8.09091 3.54545 8.30114C3.54545 8.44034 3.50994 8.56818 3.43892 8.68466C3.37074 8.80114 3.27841 8.89489 3.16193 8.96591C3.0483 9.03409 2.92045 9.06818 2.77841 9.06818Z"/>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "settings":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M37.5 70.5C36.6716 70.5 36 69.8284 36 69V65.1042C32.7614 64.5276 29.7344 63.3396 27.0425 61.6639L22.6212 66.1768C22.0425 66.7696 21.0928 66.7811 20.5 66.2024L16.2064 62.0113C15.6136 61.4327 15.6021 60.483 16.1808 59.8902L20.3521 55.6325C17.889 52.4624 16.1575 48.6955 15.4112 44.5854H11C10.1716 44.5854 9.5 43.9138 9.5 43.0854V37.0854C9.5 36.2569 10.1716 35.5854 11 35.5854H15.3808C15.962 32.255 17.1894 29.1467 18.929 26.3944L15.195 22.6069C14.6038 22.0266 14.5951 21.0769 15.1754 20.4857L19.3788 16.2041C19.9591 15.613 20.9088 15.6042 21.5 16.1846L25.0086 19.7433C28.1712 17.3211 31.9175 15.6227 36 14.8958V11C36 10.1716 36.6716 9.5 37.5 9.5H43.5C44.3284 9.5 45 10.1716 45 11V14.8958C48.9649 15.6018 52.6128 17.224 55.7167 19.5358L59 16.1846C59.5787 15.5917 60.5283 15.5803 61.1212 16.1589L65.4148 20.35C66.0076 20.9287 66.0191 21.8784 65.4404 22.4712L61.8833 26.1019C63.7224 28.9257 65.0173 32.1365 65.6193 35.5854H70C70.8284 35.5854 71.5 36.2569 71.5 37.0854V43.0854C71.5 43.9138 70.8284 44.5854 70 44.5854H65.5889C64.8312 48.7583 63.0579 52.5774 60.5345 55.7773L64.5 59.7996C65.0912 60.38 65.0999 61.3297 64.5196 61.9208L60.3162 66.2024C59.7359 66.7936 58.7862 66.8023 58.195 66.222L53.7982 61.7622C51.1464 63.3861 48.1748 64.5389 45 65.1042V69C45 69.8284 44.3284 70.5 43.5 70.5H37.5ZM41 56C49.8366 56 57 48.8366 57 40C57 31.1634 49.8366 24 41 24C32.1634 24 25 31.1634 25 40C25 48.8366 32.1634 56 41 56Z"/>
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" title="Terbium Settings" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M37.5 70.5C36.6716 70.5 36 69.8284 36 69V65.1042C32.7614 64.5276 29.7344 63.3396 27.0425 61.6639L22.6212 66.1768C22.0425 66.7696 21.0928 66.7811 20.5 66.2024L16.2064 62.0113C15.6136 61.4327 15.6021 60.483 16.1808 59.8902L20.3521 55.6325C17.889 52.4624 16.1575 48.6955 15.4112 44.5854H11C10.1716 44.5854 9.5 43.9138 9.5 43.0854V37.0854C9.5 36.2569 10.1716 35.5854 11 35.5854H15.3808C15.962 32.255 17.1894 29.1467 18.929 26.3944L15.195 22.6069C14.6038 22.0266 14.5951 21.0769 15.1754 20.4857L19.3788 16.2041C19.9591 15.613 20.9088 15.6042 21.5 16.1846L25.0086 19.7433C28.1712 17.3211 31.9175 15.6227 36 14.8958V11C36 10.1716 36.6716 9.5 37.5 9.5H43.5C44.3284 9.5 45 10.1716 45 11V14.8958C48.9649 15.6018 52.6128 17.224 55.7167 19.5358L59 16.1846C59.5787 15.5917 60.5283 15.5803 61.1212 16.1589L65.4148 20.35C66.0076 20.9287 66.0191 21.8784 65.4404 22.4712L61.8833 26.1019C63.7224 28.9257 65.0173 32.1365 65.6193 35.5854H70C70.8284 35.5854 71.5 36.2569 71.5 37.0854V43.0854C71.5 43.9138 70.8284 44.5854 70 44.5854H65.5889C64.8312 48.7583 63.0579 52.5774 60.5345 55.7773L64.5 59.7996C65.0912 60.38 65.0999 61.3297 64.5196 61.9208L60.3162 66.2024C59.7359 66.7936 58.7862 66.8023 58.195 66.222L53.7982 61.7622C51.1464 63.3861 48.1748 64.5389 45 65.1042V69C45 69.8284 44.3284 70.5 43.5 70.5H37.5ZM41 56C49.8366 56 57 48.8366 57 40C57 31.1634 49.8366 24 41 24C32.1634 24 25 31.1634 25 40C25 48.8366 32.1634 56 41 56Z"/>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "color":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                    <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                    <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "canvas":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                    <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                    <path class="stroke" d="M13.3333 53.3333L52.3333 14.3333C52.9564 13.7226 53.7942 13.3805 54.6667 13.3805C55.5392 13.3805 56.3769 13.7226 57 14.3333L65.6667 23C66.2774 23.6231 66.6195 24.4608 66.6195 25.3333C66.6195 26.2058 66.2774 27.0436 65.6667 27.6667L26.6667 66.6667H13.3333V53.3333Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="stroke" d="M36.6667 23.3333L56.6667 43.3333" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "browser":
            faviconHTML = `
                <svg class="favicon stroke" id="favicon" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
                    <circle cx="12" cy="12" r="7" />
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockIcon stroke" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805" />
                    <circle cx="12" cy="12" r="7" />
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "text":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                    <path class="fill" d="M25.84 33.44H18.32V55H11.08V33.44H3.56V26.64H25.84V33.44ZM39.4784 36.36L44.4384 26.68H52.7584L44.8384 40.88L52.7584 55H44.4384L39.4784 45.36L34.6384 55H26.2784L34.2384 40.88L26.2784 26.68H34.6384L39.4784 36.36ZM75.4884 33.44H67.9684V55H60.7284V33.44H53.2084V26.64H75.4884V33.44Z"/>
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                    <path class="fill" d="M25.84 33.44H18.32V55H11.08V33.44H3.56V26.64H25.84V33.44ZM39.4784 36.36L44.4384 26.68H52.7584L44.8384 40.88L52.7584 55H44.4384L39.4784 45.36L34.6384 55H26.2784L34.2384 40.88L26.2784 26.68H34.6384L39.4784 36.36ZM75.4884 33.44H67.9684V55H60.7284V33.44H53.2084V26.64H75.4884V33.44Z"/>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "terminal":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 80 80" fill="none">
                    <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M9 23C9 19.6863 11.6863 17 15 17H65.6111C68.9248 17 71.6111 19.6863 71.6111 23V57C71.6111 60.3137 68.9248 63 65.6111 63H15C11.6863 63 9 60.3137 9 57V23ZM38.3889 46.4945C38.3889 45.9422 38.8366 45.4945 39.3889 45.4945H56.5555C57.1078 45.4945 57.5555 45.9422 57.5555 46.4945V49.6056C57.5555 50.1579 57.1078 50.6056 56.5555 50.6056H39.3889C38.8366 50.6056 38.3889 50.1579 38.3889 49.6056V46.4945ZM21.2652 45.9362C20.8421 46.2912 20.787 46.9219 21.142 47.345L23.6893 50.3808C24.0443 50.8039 24.6751 50.8591 25.0981 50.5041L34.2339 42.8382L37.2697 40.2909C37.6928 39.9359 37.748 39.3051 37.393 38.8821L34.8456 35.8463L34.8452 35.8457L27.1798 26.7105C26.8248 26.2874 26.194 26.2322 25.771 26.5872L22.7352 29.1346C22.3121 29.4896 22.2569 30.1203 22.6119 30.5434L28.1976 37.2002L28.8344 38.2495C29.0609 38.6227 29.0192 39.0996 28.7314 39.4277L27.9221 40.3504L27.922 40.3505L21.2652 45.9362ZM29.635 38.9132L28.1976 37.2002L29.635 38.9131L29.635 38.9132Z"/>
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 80 80" fill="none">
                    <path class="fill" fill-rule="evenodd" clip-rule="evenodd" d="M9 23C9 19.6863 11.6863 17 15 17H65.6111C68.9248 17 71.6111 19.6863 71.6111 23V57C71.6111 60.3137 68.9248 63 65.6111 63H15C11.6863 63 9 60.3137 9 57V23ZM38.3889 46.4945C38.3889 45.9422 38.8366 45.4945 39.3889 45.4945H56.5555C57.1078 45.4945 57.5555 45.9422 57.5555 46.4945V49.6056C57.5555 50.1579 57.1078 50.6056 56.5555 50.6056H39.3889C38.8366 50.6056 38.3889 50.1579 38.3889 49.6056V46.4945ZM21.2652 45.9362C20.8421 46.2912 20.787 46.9219 21.142 47.345L23.6893 50.3808C24.0443 50.8039 24.6751 50.8591 25.0981 50.5041L34.2339 42.8382L37.2697 40.2909C37.6928 39.9359 37.748 39.3051 37.393 38.8821L34.8456 35.8463L34.8452 35.8457L27.1798 26.7105C26.8248 26.2874 26.194 26.2322 25.771 26.5872L22.7352 29.1346C22.3121 29.4896 22.2569 30.1203 22.6119 30.5434L28.1976 37.2002L28.8344 38.2495C29.0609 38.6227 29.0192 39.0996 28.7314 39.4277L27.9221 40.3504L27.922 40.3505L21.2652 45.9362ZM29.635 38.9132L28.1976 37.2002L29.635 38.9131L29.635 38.9132Z"/>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "canvas":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_357_6)">
                        <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_357_6">
                        <rect width="84.44" height="84.44" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_357_6)">
                        <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_357_6">
                        <rect width="84.44" height="84.44" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        case "changelog":
            faviconHTML = `
                <svg class="favicon" id="favicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_357_6)">
                        <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_357_6">
                        <rect width="84.44" height="84.44" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            `;
            newdock.innerHTML = `
                <svg class="dockicon" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_357_6)">
                        <path class="fill" d="M38.185 28.3046C39.2895 28.3046 40.185 27.4092 40.185 26.3046V17.8946C40.185 16.79 39.2895 15.8946 38.185 15.8946H2C0.895431 15.8946 0 16.79 0 17.8946V26.3046C0 27.4092 0.895431 28.3046 2 28.3046H11.5633C12.6679 28.3046 13.5633 29.2 13.5633 30.3046V65.6516C13.5633 66.7562 14.4588 67.6516 15.5633 67.6516H24.6216C25.7262 67.6516 26.6216 66.7562 26.6216 65.6516V30.3046C26.6216 29.2 27.5171 28.3046 28.6216 28.3046H38.185ZM82.3151 31.7356C82.6035 21.8806 75.4613 15.9676 65.7215 15.9676H47.2323C46.1277 15.9676 45.2323 16.863 45.2323 17.9676V65.6516C45.2323 66.7562 46.1277 67.6516 47.2323 67.6516H66.0824C77.4092 67.6516 82.9644 62.6146 84.2629 54.2926C84.8847 50.5173 84.1171 44.2648 77.9039 40.6006C77.5532 40.3938 77.5487 39.8621 77.8871 39.6358C80.9601 37.581 82.2486 33.8854 82.3151 31.7356ZM60.2184 36.1886C59.1139 36.1886 58.2184 35.2932 58.2184 34.1886V28.9906C58.2184 27.886 59.1139 26.9906 60.2184 26.9906H65.7215C72.2146 26.9906 71.9982 36.1886 65.7215 36.1886H60.2184ZM60.2184 56.1906C59.1139 56.1906 58.2184 55.2952 58.2184 54.1906V47.6056C58.2184 46.501 59.1139 45.6056 60.2184 45.6056H65.7215C73.3689 45.6056 73.5132 56.1906 65.7215 56.1906H60.2184Z"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_357_6">
                        <rect width="84.44" height="84.44" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <span class="activeSpan"></span>
            `;
            break;
        default:
            break;
    }
    favicon.innerHTML = faviconHTML;
    let framew = document.createElement("iframe");
    window.addEventListener("beforeunload", () => {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).includes("instances")) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
    });
    if(appName === "browser") {
        const loadingStateUrl = document.createElement("div");
        loadingStateUrl.classList.add("loadingStateUrl");
        loadingStateUrl.innerText = "Loading...";
        // if(browsersRunning === 0) {
        //     document.body.appendChild(chromeJS);
        // }
        browsersRunning++;
        localStorage.setItem("browser", browsersRunning);
        const searchbar = document.createElement("input");
        searchbar.classList.add("searchbar");
        searchbar.spellcheck = false;
        searchbar.setAttribute("placeholder", "Type a url or search with with SearXNG");
        searchbar.id = "searchbar";
        searchbar.setAttribute("type", "url");
        let browserC = document.createElement("div");
        let browserCHTML = `
            <div class="top">
                <div class="chrome-tabs" style="--tab-content-margin: 9px">
                    <div class="chrome-tabs-content">
                        <div class="chrome-tab" active="">
                            <div class="chrome-tab-content">
                                <div class="chrome-tab-title">New Tab</div>
                                <div class="chrome-tab-drag-handle"></div>
                                <div class="chrome-tab-close"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button data-add-tab style="margin-top: 7px;" class="bBtn">
                    <svg class="bBtnIcon" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ebebeb" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>
        `;
        newwin.appendChild(winconts);
        newwin.classList.add("browser");
        winconts.appendChild(favicon);
        winconts.appendChild(titleElement);
        winconts.appendChild(controls);
        titleElement.innerHTML = `
            <svg class="bIcon backFrame" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="15 6 9 12 15 18" />
            </svg>
            <svg class="bIcon forwardFrame" width="80" height="80" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="9 6 15 12 9 18" />
            </svg>
            <svg class="bIcon ref" viewBox="0 0 80 80" fill="none">
                <g clip-path="url(#clip0_207_19)">
                    <path d="M66.5 43.3333C65.6571 49.7642 62.4993 55.6674 57.6177 59.9379C52.7362 64.2085 46.4656 66.5535 39.9798 66.5341C33.4939 66.5147 27.2375 64.1322 22.3816 59.8326C17.5257 55.5329 14.4032 49.6109 13.5988 43.1752C12.7943 36.7394 14.3629 30.231 18.011 24.8684C21.6592 19.5057 27.1366 15.6565 33.4182 14.0412C39.6997 12.4258 46.3546 13.1552 52.1371 16.0927C57.9196 19.0302 62.4333 23.9745 64.8333 30M66.5 13.3333V30H49.8333" stroke="#FF2825" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_207_19">
                        <rect width="80" height="80" fill="white" transform="translate(80 80) rotate(-180)"/>
                    </clipPath>
                </defs>
            </svg>
        `;
        titleElement.appendChild(searchbar);
        browserC.innerHTML = browserCHTML;
        newwin.appendChild(browserC);
        
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
        const backFrame = newwin.querySelector(".backFrame");
        const forwardFrame = newwin.querySelector(".forwardFrame");
        const refFrame = newwin.querySelector(".ref");
        
        backFrame.onclick = () => {
            if(framew.contentWindow.history.length > 2) {
                newwin.appendChild(loadingStateUrl);
                framew.contentWindow.history.back();
                framew.onload = () => {
                    newwin.removeChild(loadingStateUrl);
                }
            }
        }
        forwardFrame.onclick = () => {
            if(framew.contentWindow.history.length >= 3) {
                newwin.appendChild(loadingStateUrl);
                framew.contentWindow.history.forward();
                framew.onload = () => {
                    newwin.removeChild(loadingStateUrl);
                }
            }
        }
        refFrame.onclick = () => {
            newwin.appendChild(loadingStateUrl);
            framew.contentWindow.location.reload();
            framew.onload = () => {
                newwin.removeChild(loadingStateUrl);
            }
        }
        let search = newwin.querySelector(".searchbar");
        let text = searchbar.innerHTML;
        function selectText(id){
            var sel, range;
            var el = search; //get element id
            if (window.getSelection && document.createRange) {
                sel = window.getSelection();
                if(sel.toString() == ''){
                    window.setTimeout(function(){
                        range = document.createRange();
                        range.selectNodeContents(el);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    },1);
                }
            }else if (document.selection) { //older ie
                sel = document.selection.createRange();
                if(sel.text == ''){ //no text selection
                    range = document.body.createTextRange();
                    range.moveToElementText(el);
                    range.select();
                }
            }
        }
        searchbar.addEventListener("keydown", (e) => {
            let safeSearch = localStorage.getItem("ss");
            let framew = newwin.querySelector("#frame");
            function ser() {
                newwin.appendChild(loadingStateUrl);
                framew.onload = () => {
                    loadingStateUrl.remove();
                }
                event.preventDefault();
                let url = search.value.trim();
                let URLSLICE = url.slice(".");
                if(safeSearch === null) {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=0`;
                } else if(safeSearch === "ss_0") {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=0`;
                } else if(safeSearch === "ss_1") {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=1`;
                } else if(safeSearch === "ss_2") {
                    if (!isUrl(url)) url = `https://searx.priv.pw/search?q=${url}&safesearch=2`;
                }
                search.value = url;
                framew.src = "sw" + "/" + xor.encode(url);
            }
            if (e.keyCode == "9") {
                e.preventDefault();
                return;
            }
            if (e.keyCode == "13") {
                e.preventDefault();
                ser()
            }
        });
    } 
    if(appName === "player") {
        winconts.appendChild(favicon);
        winconts.appendChild(controls);
        newwin.appendChild(winconts);
        titleElement.innerHTML = `<button class="openF m"><span></span>Open</button>`;
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
    }
    if(appName === "terminal") {
        winconts.appendChild(favicon);
        winconts.appendChild(controls);
        newwin.appendChild(winconts);
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        framew.onload = () => {
            framew.contentWindow.postMessage("*", id);
        }
        newwin.appendChild(framew);
    }
    if(appName === "text") {
        winconts.appendChild(favicon);
        winconts.appendChild(controls);
        newwin.appendChild(winconts);
        titleElement.innerHTML = `<button class="saveF m"><span></span>Save</button>`;
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        framew.onload = () => {
            framew.contentWindow.postMessage("*", id);
        }
        newwin.appendChild(framew);
    }
    if(browser === false && os === false) {
        faviconHTML = `${icn}`
        titleHTML = `${title}`
        newwin.appendChild(winconts);
        winconts.appendChild(favicon);
        winconts.appendChild(titleElement);
        winconts.appendChild(controls);
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
    } else if(browser === false && os === true) {
        newwin.appendChild(winconts);
        winconts.appendChild(favicon);
        winconts.appendChild(titleElement);
        winconts.appendChild(controls);
        framew.setAttribute("src", link);
        framew.setAttribute("id", "frame");
        framew.setAttribute("class", "frame");
        framew.setAttribute("frameborder", "0");
        newwin.appendChild(framew);
    }
    framew.onload = () => {
        framew.contentWindow.postMessage(windowID, "*");
        const frameScript = document.createElement("script");
        frameScript.innerHTML = `
            let id;
            
            window.onmessage = (e) => {
                id = e.data;
            }
            
            window.onclick = function() {
                const windows = window.parent.document.querySelectorAll(".win");
                for (let i = 0; i < windows.length; i++) {
                    windows[i].classList.add("winNotFocus");
                    windows[i].classList.remove("winFocus");
                }

                const appItem = window.parent.document.querySelectorAll(".appItem");
                for (let i = 0; i < appItem.length; i++) {
                    appItem[i].classList.remove("active");
                }
                // grab by data-appId
                window.parent.document.querySelector("[data-appid='" + id + "']").classList.add("active");
            
                window.parent.document.getElementById(id).classList.add("winFocus");
                window.parent.document.getElementById(id).classList.remove("winNotFocus");
                const title = window.parent.document.getElementById(id).getAttribute("data-title");
                const focus = JSON.stringify({
                    infoTitle: title,
                    type: "focus"
                });
                window.parent.postMessage(focus, '*');
            }
        `;
        framew.contentDocument.body.appendChild(frameScript);
    }
    window.addEventListener("message", (e) => {
        const data = JSON.parse(e.data);
        if(data.type === "focus") {
            appsShellName.innerText = data.infoTitle;
        }
    })

    let winc = newwin.querySelectorAll(".winc");
    if(localStorage.getItem('btnr') === "yes") {
        for (let i = 0; i < winc.length; i++) {
            winc[i].classList.add("btnround");
        }
        newwin.querySelector('.winc').classList.add("btnround");
    } else if(localStorage.getItem('btnr') === "no") {
        for (let i = 0; i < winc.length; i++) {
            winc[i].classList.remove("btnround");
        }
    } else if(localStorage.getItem('btnr') === null) {
        for (let i = 0; i < winc.length; i++) {
            winc[i].classList.add("btnround");
        }
    }
    let isRez = false;

    function winfocus() {
        const windows = document.querySelectorAll(".win");
        for (let i = 0; i < windows.length; i++) {
            windows[i].classList.add("winNotFocus");
            windows[i].classList.remove("winFocus");
        }
        const appItem = document.querySelectorAll(".appItem");
        for (let i = 0; i < appItem.length; i++) {
            appItem[i].classList.remove("active");
        }
        newdock.classList.add("active");
    
        newwin.classList.add("winFocus");
        newwin.classList.remove("winNotFocus");
        appsShellName.innerText = title;
        appsShellName.setAttribute("data-id", windowID);
    }
    dock.appendChild(newdock);
    let max;
    let dragger = newwin.querySelector("#drag");
    let a = 0;
    localStorage.setItem(appName, a++);
    newwin.querySelector('.mini').onclick = () => {
        newwin.classList.add("winmini");
        if(maxState === true) {
            newwin.classList.remove("maxiY");
        }
        appsShellName.innerText = ""
        appsMini++;
        checkOverflow();
    }
    newwin.querySelector(".close").addEventListener("click", () => {
        newwin.remove();
        if(appName === "browser") {
            browsersRunning--;
        }
        appsShellName.innerText = "";
        appsShellName.setAttribute("data-id", "");
        appShell.remove();
        if(browsersRunning === 1) {
            chromeJS.remove();
        }
        localStorage.setItem("browser", browsersRunning);
        newdock.remove();
    });
    newwin.querySelector('.maxi').onclick = () => {
        var newwinHEIGHT = document.querySelector('.win').clientHeight;
        var newwinWIDTH = document.querySelector('.win').clientWidth;
        if(newwin.classList.contains('maxiN')) {
            maxState = true;
            newwin.classList.add('maxiY');
            newwin.classList.remove('maxiN');
            document.getElementById("dock").classList.remove("dockY");
            if(localStorage.getItem("shadow") === "yes") {
                newwin.classList.add("noShadow");
                newwin.classList.remove("shadow");
            }
            newwin.classList.add("maxiR");
            max = false;
        } else if(newwin.classList.contains('maxiY')) {
            maxState = false;
            newwin.classList.add('maxiN');
            newwin.classList.remove('maxiY');
            document.getElementById("dock").classList.add("dockY");
            if(localStorage.getItem("shadow") === "yes") {
                newwin.classList.remove("noShadow");
                newwin.classList.add("shadow");
            }
            newwin.classList.remove("maxiR");
            max = true;
            newwin.style.width = newwinWIDTH;
            newwin.style.height = newwinHEIGHT;
        }
    }
    newwin.addEventListener("mousedown", winfocus);
    switch(os) {
        case false: 
            framew.src = "sw" + "/" + xor.encode(link);
            break;
        case true:
            framew.src = link;
            break;
        default:
            break;
    }

    dragger.addEventListener("dblclick", (e) => {
        if(e.target.classList.contains('winc') || e.target.classList.contains('winic') || e.target.classList.contains("searchbar") || e.target.classList.contains("openF") || e.target.classList.contains("bIcon")) {
            e.target.click();
        } else {
            newwin.querySelector('.maxi').click();
        }
    });

    dragger.addEventListener("mousedown", mousedown);
    function mousedown(e) {
        const appItem = document.querySelectorAll(".appItem");
        for (let i = 0; i < appItem.length; i++) {
            appItem[i].classList.remove("active");
        }
        newdock.classList.add("active");
        if(appsShellName) {
            appsShellName.innerText = title;
            appsShellName.setAttribute("data-id", windowID);
        }
        if(!document.querySelector(".appShell")) {
            document.querySelector(".shell").appendChild(appShell);
            appShell.appendChild(appsShellName);
            appsShellName.innerText = title;
            appsShellName.setAttribute("data-id", windowID);
        }

        if(e.target.classList.contains('winc') || e.target.classList.contains('winic') || e.target.classList.contains('searchbar') || e.target.classList.contains('openF') || e.target.classList.contains('bIcon')) {
            return
        } else {
            var startX = e.clientX;
            var startY = e.clientY;
    
            function mousemove(e) {
                var newX = e.clientX;
                var newY = e.clientY;
                var deltaX = newX - startX;
                var deltaY = newY - startY;
                var newLeft = newwin.offsetLeft + deltaX;
                var newTop = newwin.offsetTop + deltaY;
                if (newTop < 37) {
                    newTop = 37;
                }
                if (newLeft < 0) {
                    newLeft = 0;
                }
                if (newLeft + newwin.offsetWidth > window.innerWidth) {
                    newLeft = window.innerWidth - newwin.offsetWidth;
                }
                if (newTop + newwin.offsetHeight > window.innerHeight) {
                    newTop = window.innerHeight - newwin.offsetHeight;
                }
                newwin.style.left = newLeft + "px";
                newwin.style.top = newTop + "px";
                startX = newX;
                startY = newY;
                if(newwin.classList.contains("maxiY")) {
                    newwin.classList.remove("maxiY");
                    newwin.classList.add("maxiN");
                    var X = startX - e.clientX;
                    var Y = startY - e.clientY;
                    const bounds = newwin.getBoundingClientRect();
                    
                    newwin.style.left = bounds.left - X + "px";
                    newwin.style.top = bounds.top - Y + "px";
                    newwin.classList.remove("maxiR");
                    newwin.classList.remove("noShadow");
                    newwin.classList.add("shadow");
                    
                    startX = e.clientX;
                    startY = e.clientY;
                } else if(newwin.classList.contains("maxiN")) {
                    var X = startX - e.clientX;
                    var Y = startY - e.clientY;
                    const bounds = newwin.getBoundingClientRect();
                    
                    newwin.style.left = bounds.left - X + "px";
                    newwin.style.top = bounds.top - Y + "px";
                    
                    startX = e.clientX;
                    startY = e.clientY;
                }
            }

            window.addEventListener("mousemove", mousemove);
        }
        window.addEventListener("mouseup", (mu) => {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mu);
        });
    }
    document.body.appendChild(newwin);
}

function hideStart() {
    if (document.querySelector(".apps").classList.contains("op")) {
        document.querySelector(".apps").classList.add("hidden");
        document.querySelector("#appsL").classList.remove("appsIF");
        document.querySelector(".apps").classList.remove("op");
    }
}

// make a list of available apps
var availableApps = ["browser", "code", "youtube", "apple music", "spotify", "tidal", "youtube music", "settings", "help", "color picker", "terminal", "video"];

// check for key combos
window.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key == "q") {
        e.preventDefault();
        document.querySelector(".winFocus").querySelector(".frame").contentWindow.location.reload();
    }
    if(e.key == "d" && e.ctrlKey) {
        e.preventDefault();
        document.querySelector(".apps").classList.toggle("hidden");
        document.querySelector("#appsL").classList.toggle("appsIF");
        document.querySelector(".apps").classList.toggle("op");
    }
    if(e.key == "b" && e.altKey && e.ctrlKey) {
        e.preventDefault();
        windows("../newwin.html", "../resources/terbium.svg", "Terbium Browser", true, true, false, 'browser');
    }
    if(e.key == "s" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        windows("../settings.html", "../resources/terbium.svg", "Terbium Settings", false, true, false, "settings");
    }
    if(e.key == "h" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        windows("../help.html", "../resources/terbium.svg", "Terbium Help", false, true, false, 'help')
    }
    if(e.key == "p" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        windows("../color.html", "../resources/terbium.svg", "Terbium Picker", false, true, false, 'color')
    }
    if(e.key == "t" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        windows("../terminal/terminal.html", "../resources/terbium.svg", "Terbium Terminal", false, true, false, 'terminal')
    }
    if(e.key == "x" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        if(document.querySelector(".winFocus")) {
            document.querySelector(".winFocus").querySelector(".close").click();
        }
    }
    if(e.key == "n" && e.ctrlKey && e.altKey) {
        e.preventDefault();
        const win = document.querySelectorAll(".win");
        for (let i = 0; i < win.length; i++) {
            const element = win[i];
            element.querySelector(".mini").click();
        }
    }
    if(e.key == "c" && e.ctrlKey && e.altKey) {
        const win = document.querySelectorAll(".win");
        e.preventDefault();
        for (let i = 0; i < win.length; i++) {
            const element = win[i];
            element.querySelector(".close").click();
        }
    }
    if(e.altKey && e.shiftKey) {
        var windowsAvailable = document.querySelectorAll(".win");
        var windowsAvailableArray = Array.from(windowsAvailable);
        var windowsAvailableArrayLength = windowsAvailableArray.length;
        var currentWindow = document.querySelector(".winFocus");
        var currentWindowIndex = windowsAvailableArray.indexOf(currentWindow);
        var nextWindowIndex = currentWindowIndex + 1;
        if(nextWindowIndex == windowsAvailableArrayLength) {
            nextWindowIndex = 0;
        }
        var nextWindow = windowsAvailableArray[nextWindowIndex];
        currentWindow.classList.remove("winFocus");
        currentWindow.classList.add("winNotFocus");
        nextWindow.classList.remove("winNotFocus");
        nextWindow.classList.add("winFocus");
        const appItem = document.querySelectorAll(".appItem");
        for (let i = 0; i < appItem.length; i++) {
            const element = appItem[i];
            element.classList.remove("active");
        }
        document.querySelector("[data-appId='" + nextWindow.id + "']").classList.add("active");
    }
})

switch(id) {
    case "color":
        windows("../color.html", "../resources/terbium.svg", "Terbium Color Picker", false, true, false, "color");
        break;
    case "video":
        windows("../player/player.html", "../resources/player.svg", "Terbium Video", false, true, false, "player");
        break;
    case "settings":
        windows('../settings.html', '../resources/terbium.svg', 'Terbium Settings', false, true, false, "settings");
        break;
    case "help":
        windows('../help.html', '../resources/terbium.svg', 'Terbium Help', false, true, false, "help");
        break;
    case "canvas":
        windows('../canvas.html', '../resources/terbium.svg', 'Terbium Canvas', false, true, false, "canvas");
        break;
    case "changelog":
        if (date) {
            windows(`../changes/${date}.html`, './resources/terbium.svg', 'Terbium Changelog', false, true, false, "changelog");
        } else {
            windows('../changes/index.html', './resources/terbium.svg', 'Terbium Changelog', false, true, false, "changelog");
        }
        break;
    case "yt":
        windows('https://youtube.com', '../resources/yt.png', 'YouTube', false, false, false, "youtube");
        break;
    case "code":
        windows('https://vscode.dev', '../resources/vsc.ico', 'Visual Studio Code', false, false, false, "code");
        break;
    case "text":
        windows('../textEditor/editor.html', '../resources/txt.svg', 'Terbium Text Editor', false, true, false, "text");
        break;
    case "terminal":
        windows("../terminal/terminal.html", "../resources/terminal.svg", "Terbium Terminal", false, true, false, "terminal");
        break;
    case "cmd":
        windows("../terminal/terminal.html", "../resources/terminal.svg", "Terbium Terminal", false, true, false, "terminal");
        break;
    default: 
        break;
}