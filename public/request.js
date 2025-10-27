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


// Requests Display
const pendingUpdate = () => {   /* Display pending requests */
    let requestsDisplay = document.getElementById("requests-display"); /* Refresh HTML Element */
    requestsDisplay.innerHTML = "" /* Clear display */

    for (let i = 0; i < pendingRequests.length; i++) {
        requestsDisplay = document.getElementById("requests-display"); /* Refresh HTML Element */

        requestsDisplay.innerHTML += `<div id="pending${i}" class="request-card">
                                <p><b>Food Type: </b>${pendingRequests[i].succesfulDonation.type}</p>
                                <p><b>Unit Type: </b>${pendingRequests[i].succesfulDonation.unit}</p>
                                <p><b>Amount: </b>${pendingRequests[i].succesfulDonation.amount}</p>
                                <p><b>Pick-up Location: </b>${pendingRequests[i].succesfulDonation.location}</p>
                                <p><b>Additional Information: </b>${pendingRequests[i].succesfulDonation.addInfo}</p>
                                <button onclick="removePending(${i})">Delete</button>
                            </div>`;
    }

    let pendingRequestsBtn = document.getElementById("pending-requests-btn"); /* Refresh HTML Element */
    pendingRequestsBtn.classList.add("requests-active-btn");   /* Make button "active"*/

    let succesfulRequestsBtn = document.getElementById("succesful-requests-btn");   /* Refresh HTML Element */
    succesfulRequestsBtn.classList.remove("requests-active-btn");    /* "Deactivate" opposing button */
}