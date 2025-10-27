let pendingDonations = []   /* List of pending donations */


// Navbar Donations Review visibility 
const viewDonations = () => {
    let donationsReview = document.getElementById("donations-review");

    donationsReview.classList.add("donations-review-visible");
}

const closeDonations = () => {
    let donationsReview = document.getElementById("donations-review");

    setTimeout(() => { donationsReview.classList.remove("donations-review-visible"); }, 1);
}


// Pending Donation Object Creation
const typeSelect = document.getElementById("type-select");
const unitSelect = document.getElementById("unit-select");
const amountInput = document.getElementById("amount-input");
const pickupTextarea = document.getElementById("pickup-textarea");
const additionalTextarea = document.getElementById("additional-textarea");
const continueBtn = document.getElementById("continue-btn");
const resetBtn = document.getElementById("reset-btn");

class pendingDonation { /* Class declaration */
    constructor() {
        this.type = typeSelect.value;
        this.unit = unitSelect.value;
        this.amount = amountInput.value;
        this.location = pickupTextarea.value;
        this.addInfo = additionalTextarea.value;
    }
}

const createPending = () => {   /* Class object creation */
    const pendingDonationObj = new pendingDonation;
    pendingDonations.push(pendingDonationObj);
}

const removePending = (i) => {  /* Pending donation deletion */
    console.log("Deleted:", pendingDonations.splice(i, 1));
    pendingUpdate();
}

const createPendingSwitch = () => { /* Form validation switch */
    switch (true) {
        case (typeSelect.value == "select"):
            console.log("Select Type!");
            break;

        case (unitSelect.value == "select"):
            console.log("Select Unit!");
            break;

        case (amountInput.value == ""):
            console.log("Select Amount!");
            break

        case (pickupTextarea.value == ""):
            console.log("Enter Pickup Location!");
            break

        default:
            createPending();
            badgeUpdate("donations-badge", "donate-wrapper");
            viewDonations();
            pendingUpdate();
            window.location.href = `#navbar`  /* Navigate for latest entry */
            break;
    }
}

// Donations Display
let donationsDisplay = document.getElementById("donation-display");
let pendingDonationsBtn = document.getElementById("pending-donation-btn");
let succesfulDonationsBtn = document.getElementById("succesful-donation-btn");

const pendingUpdate = () => {   /* Display pending donations */
    donationsDisplay = document.getElementById("donation-display"); /* Refresh HTML Element */
    donationsDisplay.innerHTML = "" /* Clear display */

    for (let i = 0; i < pendingDonations.length; i++) {
        donationsDisplay = document.getElementById("donation-display"); /* Refresh HTML Element */

        donationsDisplay.innerHTML += `<div id="pending${i}" class="donation-card">
                                <p><b>Food Type: </b>${pendingDonations[i].type}</p>
                                <p><b>Unit Type: </b>${pendingDonations[i].unit}</p>
                                <p><b>Amount: </b>${pendingDonations[i].amount}</p>
                                <p><b>Pick-up Location: </b>${pendingDonations[i].location}</p>
                                <p><b>Additional Information: </b>${pendingDonations[i].addInfo}</p>
                                <button onclick="removePending(${i})">Delete</button>
                            </div>`;
    }

    pendingDonationsBtn = document.getElementById("pending-donation-btn"); /* Refresh HTML Element */
    pendingDonationsBtn.classList.add("donation-active-btn");   /* Make button "active"*/
    succesfulDonationsBtn.classList.remove("donation-active-btn");    /* "Deactivate" opposing button */
}

// const succesfulUpdate = () => {   /* Display succesful donations */
//     donationsDisplay.innerHTML = "" /* Clear display */

//     for (let i = 0; i < succesfulDonations.length; i++) {
//         donationsDisplay = document.getElementById("donation-display"); /* Refresh HTML Element */

//         donationsDisplay.innerHTML += `<div id="succesful${i}" class="donation-card">
//                                 <p><b>Food Type: </b>${succesfulDonations[i].type}</p>
//                                 <p><b>Unit Type: </b>${succesfulDonations[i].unit}</p>
//                                 <p><b>Amount: </b>${succesfulDonations[i].amount}</p>
//                                 <p><b>Pick-up Location: </b>${succesfulDonations[i].location}</p>
//                                 <p><b>Additional Information: </b>${succesfulDonations[i].addInfo}</p>
//                             </div>`;
//     }

//     succesfulDonationsBtn = document.getElementById("succesful-donation-btn"); /* Refresh HTML Element */
//     succesfulDonationsBtn.classList.add("donation-active-btn");   /* Make button "active"*/
//     pendingDonationsBtn.classList.remove("donation-active-btn");    /* "Deactivate" opposing button */
// }



// Reset Form Values
const formReset = () => {
    typeSelect.value = "";
    unitSelect.value = "";
    amountInput.value = "";
    pickupTextarea.value = "";
    additionalTextarea.value = "";
}
formReset();

// Succesful donation class declaration
class succesfulDonation {
    constructor(type, unit, amount, location, addInfo) {
        this.type = type;
        this.unit = unit;
        this.amount = amount;
        this.location = location;
        this.addInfo = addInfo;
    }
}