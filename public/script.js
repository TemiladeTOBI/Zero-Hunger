// Navbar Hover Styling
const imgSwitch = (imgID, imgPath) => {
    const img = document.getElementById(`${imgID}`);
    img.src = `${imgPath}`;
}

// Theme Switching
const switchTheme = () => {
    const elements = document.getElementsByClassName("element");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("light");
    }

    const body = document.getElementById("body");   /* Enable Theme persistence per session */
    if (body.classList.contains("light")) {
        sessionStorage.theme = "light";
    } else {
        sessionStorage.removeItem("theme");
    }
}

const checkTheme = () => {  /* Enforce Theme persistence */
    if (sessionStorage.theme) {
        const elements = document.getElementsByClassName("element");
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.toggle("light");
        }
    }
}
checkTheme();


// Navigation via Navbar
const donateWrapper = document.getElementById("donate-wrapper");
const requestWrapper = document.getElementById("request-wrapper");

const navDonate = () => {
    window.location.href = "donate.html#navbar"
}
const navRequest = () => {
    window.location.href = "request.html#navbar"
}


// Collapsible Navbar
const toggleCollapsible = () => {
    const collapsible = document.getElementById("collapsible-wrapper");

    if (collapsible.style.display == "flex") {
        collapsible.style.display = "none";
    } else {
        collapsible.style.display = "flex";
    }
}


// Popup/Modal Display & Animation
let popupID;    /* Initialize global popID */
const showPopup = (modalID, modalMessage) => {    /* Animate Popups */
    clearTimeout(popupID);  /* Clear pre-existing popup lifespan */

    const modalHTML = `<div id="${modalID}" class="popup">
    ${modalMessage}
    </div>`;
    let modals = document.getElementById("modals");

    modals.innerHTML += modalHTML;   /* Spawn popup */
    const popup = document.getElementById(`${modalID}`);

    popupID = setTimeout(() => { popup.remove() }, 2000);   /* "Delete" popup */
}

const showPopunder = (popunderID) => {  /* Display Popunders */
    const popunder = document.getElementById(`${popunderID}`);
    popunder.style.display = "flex";

    setTimeout(() => { popunder.classList.add("popunder-full") }, 1);
}

const hidePopunder = (popunderID) => {  /* Close Popunders */
    const popunder = document.getElementById(`${popunderID}`);

    popunder.classList.remove("popunder-full");
    setTimeout(() => { popunder.style.display = "none" }, 250);
}

const showDialog = (dialogID, close) => {  /* Display Modals */
    const dialog = document.getElementById(`${dialogID}`);
    const oppDialog = document.getElementById(`${close}`);

    if ((oppDialog != null) && (oppDialog.classList.contains("popover-full"))) {
        hideDialog(`${close}`);  /* Close the opposing Dialog */
    };

    dialog.showModal();
    dialog.classList.toggle("popover-full");
    dialog.focus();
}

const hideDialog = (dialogID) => {  /* Close Modals */
    const dialog = document.getElementById(`${dialogID}`);
    
    dialog.classList.toggle("popover-full");
    
    setTimeout(() => { dialog.close(); }, 125);
}

const escClose = (event, closeFunc, modalID) => { /* Close Modals with Esc key */
    if (event.key == "Escape") {
        closeFunc(`${modalID}`);    /* Execute corresponding closing function */
    }

    console.log(event.key, closeFunc, modalID);
}

const crossHover = (crossID) => {   /* Change Cross img src */
    const crossIMG = document.getElementById(`${crossID}`);
    crossIMG.src = "./icon/cross[red].svg";
}

const crossReset = (crossID) => {   /* Reset Cross img src */
    const crossIMG = document.getElementById(`${crossID}`);
    crossIMG.src = "./icon/cross.svg";
}

const togglePassword = (passwordID) => {
    const password = document.getElementById(`${passwordID}`);
    const passwordIcon = document.getElementById(`${passwordID + "-icon"}`)

    if (password.type == "password") {
        password.type = "text";
        passwordIcon.src = "./icon/mdi--eye.svg";

    } else {
        password.type = "password";
        passwordIcon.src = "./icon/mdi--eye-closed.svg";
    }
}

// Navbar Badge Display & Update
const triggerBadgeUpdate = () => {   /* Create the navbar badge */
    const triggerBadge = document.getElementById("trigger-badge");
    if (triggerBadge == null) {
        document.getElementById("trigger-div").innerHTML += `<span id="trigger-badge">!</span>`
    }
}


const badgeUpdate = (badgeID, wrapperID) => { /* Update the pending donations/requests badge as necessary */
    const badge = document.getElementById(`${badgeID}`);
    const badgeWrapper = document.getElementById(`${wrapperID}`);
    let pendingArray;

    if (badgeID.indexOf("donations") > -1) {    /* Check if donations/requests badge */
        pendingArray = pendingDonations;
    } else { pendingArray = pendingRequests }

    switch (true) {
        case (pendingArray.length == 0):
            break;

        case (badge == null):
            badgeWrapper.innerHTML += `<span id="${badgeID}">${pendingArray.length}</span>`
            triggerBadgeUpdate();
            break;

        default:
            badge.innerHTML = `${pendingArray.length}`
            triggerBadgeUpdate();
            break;
    }

    window.location.href = "#navbar"    /* Navigate to Navbar */
}

const triggerBadgeClear = () => {    /* Delete the navbar badge */
    document.getElementById("trigger-badge").remove();
}

const badgeClear = (badgeID) => { /* Clear the pending donations/requests badge */
    const badge = document.getElementById(`${badgeID}`);
    badge.remove();

    triggerBadgeClear();
}


// Enter button submits form
let enterTrigger = (event, callback) => {
    if (event.key == "Enter") {
        callback(); /* Execute corresponding submission script */
    }
};