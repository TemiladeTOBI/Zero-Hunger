forceCurrentUser(); /* Force-check User */

// Local storage Succesful donations & requests
const succesfulDonations = fetchSuccesfulDonations(); /* Array intialization */

const fetchSuccesfulRequests = () => {
    let fecthedRequests = [];

    if (localStorage.succesfulRequests) {  /* localStorage check/refresh */
        fecthedRequests = JSON.parse(localStorage.succesfulRequests);
        console.log("fecthedRequests:",fecthedRequests);
    }
    else {
        localStorage.setItem("succesfulRequests", JSON.stringify([])) /* localStorage initializtion */
        console.log("fecthedRequests:",fecthedRequests);
    }

    return fecthedRequests;
}
let succesfulRequests = fetchSuccesfulRequests();   /* Array initialization */


// Pending Requests Badge
let pendingRequests = []    /* List of pending requests */


// Navbar Requests Review visibility
const viewRequests = () => {
    let requestsReview = document.getElementById("requests-review");
    requestsReview.classList.add("requests-review-visible");
}

const closeRequests = () => {
    let requestsReview = document.getElementById("requests-review");
    setTimeout(() => { requestsReview.classList.remove("requests-review-visible"); }, 1);
}



// Request Query Object creation
const typeSelect = document.getElementById("type-select");
const unitSelect = document.getElementById("unit-select");
const amountInput = document.getElementById("amount-input");
const pickupTextarea = document.getElementById("pickup-textarea");
const searchBtn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");

let queryResults = [];

class requestQuery {  /* Class declaration */
    constructor() {
        this.type = typeSelect.value;
        this.unit = unitSelect.value;
        this.amount = amountInput.value;
        this.location = pickupTextarea.value;
    }
}

const createQuery = () => {   /* Class object creation */
    const requestQueryObj = new requestQuery;
    return requestQueryObj;
}

const donationSearch = () => {  /* Array filter algorithm */
    const requestQueryObj = createQuery();
    queryResults = [];

    switch (true) {
        case (requestQueryObj.type != ""):  /* Filter array by type */
            queryResults = succesfulDonations.filter((value) => { return value.type == requestQueryObj.type });

        case ((requestQueryObj.unit != "") && (queryResults != [])):  /* Filter array by unit */
            if ((requestQueryObj.unit != "") && (queryResults != [])) {
                queryResults = queryResults.filter((value) => { return value.unit == requestQueryObj.unit });
            };

        case ((requestQueryObj.amount != "") && (queryResults != [])):  /* Filter array by amount */
            if ((requestQueryObj.amount != "") && (queryResults != [])) {
                queryResults = queryResults.filter((value) => { return parseInt(value.amount) >= parseInt(requestQueryObj.amount) });
            };

        case ((requestQueryObj.location.trim() != "") && (queryResults != [])):  /* Filter array by location */
            if ((requestQueryObj.location.trim() != "") && (queryResults != [])) {
                queryResults = queryResults.filter((value) => { return value.location.search(requestQueryObj.location) != -1 });
            };
            break;

        default:
            queryResults = fetchSuccesfulDonations();
            break;
    }

    return queryResults;
}

const queryResultsDisplay = (queryArray = queryResults) => {    /* Display argument as Search Results*/
    document.getElementById("request-results-wrapper").innerHTML = "";  /* Clear display */

    for (let i = 0; i < queryArray.length; i++) {
        document.getElementById("request-results-wrapper").innerHTML += `<div id="result${i}" class="request-card">
                    <p><b>Food Type: </b>${queryArray[i].type}</p>
                    <p><b>Unit Type: </b>${queryArray[i].unit}</p>
                    <p><b>Amount: </b>${queryArray[i].amount}</p>
                    <p><b>Pick-up Location: </b>${queryArray[i].location}</p>
                    <p><b>Additional Information: </b>${queryArray[i].addInfo}</p>
                    <button onclick="addPendingRequest(${i})">Request</button>
                </div>`
    }

    window.location.href = "#request-results"   /* Navigate to results */
}

const queryResultsUpdate = () => { /* Display filter results */
    queryResults = donationSearch();  /* Generate results */

    queryResultsDisplay(queryResults);  /* Display results */
}

const verifyPendingRequest = (pendingRequest) => {   /* Check for duplicate requests */
    const verifyStatus = pendingRequests.findIndex((request) => {
        return (request.type == pendingRequest.type
            && request.unit == pendingRequest.unit
            && request.amount == pendingRequest.amount
            && request.location == pendingRequest.location
            && request.addInfo == pendingRequest.addInfo
        );
    })

    return verifyStatus;
}

const addPendingRequest = (i) => {   /* Add selected donation to pending requests*/
    if (verifyPendingRequest(queryResults[i]) <= -1) {
        pendingRequests.push(queryResults[i]);
        queryResults.splice(i, 1);   /* Splice donation to avoid redundant selection */
        queryResultsDisplay();  /* Then update display */
    } else {
        showPopup("duplicate-warning","Duplicate Request!")
    }


    badgeUpdate("requests-badge", "requests-wrapper");  /* Update badge */

    console.log("pendingRequests:", pendingRequests, "queryResults:", queryResults);
}


// Requests Display
const pendingUpdate = () => {   /* Display pending requests */
    let requestsDisplay = document.getElementById("requests-display"); /* Refresh HTML Element */
    requestsDisplay.innerHTML = "" /* Clear display */

    for (let i = 0; i < pendingRequests.length; i++) {
        requestsDisplay = document.getElementById("requests-display"); /* Refresh HTML Element */

        requestsDisplay.innerHTML += `<div id="pending${i}" class="request-card">
                                <p><b>Food Type: </b>${pendingRequests[i].type}</p>
                                <p><b>Unit Type: </b>${pendingRequests[i].unit}</p>
                                <p><b>Amount: </b>${pendingRequests[i].amount}</p>
                                <p><b>Pick-up Location: </b>${pendingRequests[i].location}</p>
                                <p><b>Additional Information: </b>${pendingRequests[i].addInfo}</p>
                                <button onclick="removePending(${i})">Delete</button>
                            </div>`;
    }

    let pendingRequestsBtn = document.getElementById("pending-requests-btn"); /* Refresh HTML Element */
    pendingRequestsBtn.classList.add("requests-active-btn");   /* Make button "active"*/

    let succesfulRequestsBtn = document.getElementById("succesful-requests-btn");   /* Refresh HTML Element */
    succesfulRequestsBtn.classList.remove("requests-active-btn");    /* "Deactivate" opposing button */
}

const succesfulUpdate = () => {   /* Display succesful requests */
    let requestsDisplay = document.getElementById("requests-display"); /* Refresh HTML Element */
    requestsDisplay.innerHTML = "" /* Clear display */

    for (let i = 0; i < succesfulRequests.length; i++) {
        requestsDisplay = document.getElementById("requests-display"); /* Refresh HTML Element */

        requestsDisplay.innerHTML += `<div id="succesful${i}" class="request-card">
                                <p><b>Food Type: </b>${succesfulRequests[i].type}</p>
                                <p><b>Unit Type: </b>${succesfulRequests[i].unit}</p>
                                <p><b>Amount: </b>${succesfulRequests[i].amount}</p>
                                <p><b>Pick-up Location: </b>${succesfulRequests[i].location}</p>
                                <p><b>Additional Information: </b>${succesfulRequests[i].addInfo}</p>
                            </div>`;
    }

    let succesfulRequestsBtn = document.getElementById("succesful-requests-btn"); /* Refresh HTML Element */
    succesfulRequestsBtn.classList.add("requests-active-btn");   /* Make button "active"*/
    
    let pendingRequestsBtn = document.getElementById("pending-requests-btn"); /* Refresh HTML Element */
    pendingRequestsBtn.classList.remove("requests-active-btn");    /* "Deactivate" opposing button */
}


class succesfulRequest {   /* Succesful request class declaration */
    constructor(type, unit, amount, location, addInfo) {
        this.type = type;
        this.unit = unit;
        this.amount = amount;
        this.location = location;
        this.addInfo = addInfo;
    }
}

const submitPending = () => {   /* Submit pending requests */
    if (pendingRequests.length != 0) {
        for (let i = 0; i < pendingRequests.length; i++) {
            const pendingRequest = pendingRequests[i];

            const succesfulRequestObj = new succesfulRequest(pendingRequest.type, pendingRequest.unit, pendingRequest.amount, pendingRequest.location, pendingRequest.addInfo);
            succesfulRequests.push(succesfulRequestObj);
            localStorage.succesfulRequests = JSON.stringify(succesfulRequests);
        }

        succesfulUpdate();

        pendingRequests = [];  /* Empty pending array */
        badgeClear("requests-badge");
    } else {
        console.log("No pending!");
    }
}



// Reset Form Values
const formReset = (destination = "#navbar") => {
    typeSelect.value = "";
    unitSelect.value = "";
    amountInput.value = "";
    pickupTextarea.value = "";

    window.location.href = destination; /* Navigate to destination */
}
formReset();