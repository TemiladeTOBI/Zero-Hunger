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
        console.log(sessionStorage.theme);
    } else {
        sessionStorage.removeItem("theme");
        console.log(sessionStorage.theme);
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
    }   else {
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
}

const hideDialog = (dialogID) => {  /* Close Modals */
    const dialog = document.getElementById(`${dialogID}`);

    dialog.classList.toggle("popover-full");
    setTimeout(() => { dialog.close(); }, 125);
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
        passwordIcon.src = "./icon/eye_open.svg";

    } else {
        password.type = "password";
        passwordIcon.src = "./icon/eye_closed.svg";
    }
}



// Sign-In
class user {    /* Declare user object class */
    constructor(username, usermail, userpassword) {
        this.userName = username;
        this.userMail = usermail;
        this.userPassword = userpassword;
    }
}

const signUserUp = () => {
    const signUpUsername = document.getElementById('sign-up-username');
    const signUpEmail = document.getElementById('sign-up-email');
    const signUpPassword = document.getElementById('sign-up-password');
    const signUpConfirm = document.getElementById('sign-up-confirm');

    if ((signUpPassword.value == signUpConfirm.value) &&
        ((signUpUsername.value != "") && (signUpEmail.value != "") && (signUpPassword.value != ""))
    ) {
        const userObj = new user(signUpUsername.value, signUpEmail.value, signUpPassword.value);

        if (localStorage.users) {
            let users = JSON.parse(localStorage.users); /* Fetch list of Users */
            users.push(userObj);    /* Sign new user up */
            localStorage.users = JSON.stringify(users); /* Update Users DB */


            hideDialog("sign-up-dialog");
            showDialog("sign-in-dialog", "sign-up-dialog"); /* Redirect to Log-In */
            setTimeout(() => { document.getElementById("sign-up-success").style.display = "flex" }, 250)
        } else {
            let users = [];
            users.push(userObj);
            localStorage.users = JSON.stringify(users); /* Create Users DB */

            hideDialog("sign-up-dialog");
            showDialog("sign-in-dialog", "sign-up-dialog"); /* Redirect to Log-In */
            setTimeout(() => { document.getElementById("sign-up-success").style.display = "flex" }, 250)
        }
    } else {
        document.getElementById("invalid-sign-up-details").style.display = "flex";
    }
}

const LogUserIn = () => {
    const signInUsername = document.getElementById('sign-in-username');
    const signInEmail = document.getElementById('sign-in-email');
    const signInPassword = document.getElementById('sign-in-password');
    const signInConfirm = document.getElementById('sign-in-confirm');

    if ((signInPassword.value == signInConfirm.value) &&
        ((signInUsername.value != "") && (signInEmail.value != "") && (signInPassword.value != ""))
    ) {
        const userObj = new user(signInUsername.value, signInEmail.value, signInPassword.value);

        let users = JSON.parse(localStorage.users); /* Fetch list of Users */
        if (users.findIndex((value) => { return ((value.userName == userObj.userName) && (value.userPassword == userObj.userPassword) && (value.userMail == userObj.userMail)) }) > -1) {
            localStorage.currentUser = JSON.stringify(users.find((value) => { return ((value.userName == userObj.userName) && (value.userPassword == userObj.userPassword) && (value.userMail == userObj.userMail)) }));
            window.location.href = "index.html";
            console.log("logged in");

        } else {
            document.getElementById("invalid-sign-in-details").style.display = "flex";
        }

    } else {
        document.getElementById("invalid-sign-in-details").style.display = "flex";
    }
}

const signUserOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

const checkCurrentUser = () => {
    if (localStorage.currentUser) {
        return true;
    } else {
        return false;
    }
}

const forceCurrentUser = () => {    /* Force-check User */
    if (!checkCurrentUser()) {
        window.location.href = "index.html";
        sessionStorage.redirectStatus = "true";
    }
}

const redirectSignIn = () => {  /* Display log-in modal after force-checking User */
    if (sessionStorage.redirectStatus) {
        showDialog("sign-in-dialog");
        sessionStorage.removeItem("redirectStatus");
    }
}
redirectSignIn();

const loadUserNav = () => { /* Check current user, to load navbar details */
    const navLinkWrapper = document.getElementById("nav-link-wrapper");

    if (checkCurrentUser()) {
        const currentUser = JSON.parse(localStorage.currentUser);   /* Fetch Current User */
        console.log(currentUser);

        let avatarSrc;  /* User Avatar Image Source */
        if ((currentUser.avatarSrc == "") || (currentUser.avatarSrc == undefined)) {
            avatarSrc = "./icon/heart.svg";
        } else {
            avatarSrc = currentUser.avatarSrc;
        }

        // Load User Details
        navLinkWrapper.innerHTML += `<div id="user-div" onmouseover="showPopunder('user-details-popunder')" onclick="showPopunder('user-details-popunder')">
                <div id="user-details-popunder" class="popunder" onfocus="showPopunder('user-details-popunder')">
                    <p class="popunder-mail"><b>Email: </b>${currentUser.userMail}</p>
                    <p class="popunder-out"><a href="#" onclick="hidePopunder('user-details-popunder')"">Close</a>
                    <a href="#" onclick="signUserOut()">Sign Out</a></p>
                </div>
                <div id="user-avatar-wrapper">
                    <img src="./icon/heart.svg" alt="User Avatar">
                </div>
                <div id="user-details">
                    <p id="user-name">${currentUser.userName}</p>
                    <p id="user-status"><span id="user-staus-icon"></span> Status</p>
                </div>
            </div>`
    } else {
        console.log("No CurrentUser!");

        // Load Sign-In/Log-In instead
        navLinkWrapper.innerHTML += `<div id="sign-in-wrapper">
                <button id="sign-in-button" onclick="showDialog('sign-up-dialog')">Sign In</button>
            </div>`
    }
}
loadUserNav();



// Navbar Badge Display & Update
const triggerBadgeUpdate = () =>{   /* Create the navbar badge */
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

const triggerBadgeClear = () =>{    /* Delete the navbar badge */
    document.getElementById("trigger-badge").remove();
}

const badgeClear = (badgeID) => { /* Clear the pending donations/requests badge */
    const badge = document.getElementById(`${badgeID}`);
    badge.remove();

    triggerBadgeClear();
}


// Local storage Succesful donations
const fetchSuccesfulDonations = () => {
    let fecthedDonations = [];

    if (localStorage.succesfulDonations) {  /* localStorage check/refresh */
        fecthedDonations = JSON.parse(localStorage.succesfulDonations);
        console.log("fecthedDonations:", fecthedDonations);
    }
    else {
        localStorage.setItem("succesfulDonations", JSON.stringify([])) /* localStorage initializtion */
        console.log("fecthedDonations:", fecthedDonations);
    }

    return fecthedDonations;
}