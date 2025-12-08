/* ================================
   GLOBAL LOCALSTORAGE FUNCTIONS
================================ */

/* Save user signup */
function saveSignup(e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    let user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful! Please login.");
    window.location.href = "login.html";
}

/* Login */
function loginUser(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No user found. Please signup first.");
        return;
    }

    if (email === user.email && password === user.password) {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect email or password!");
    }
}

/* Save Profile */
function saveProfile() {
    const name = document.getElementById("profileName").value;
    const email = document.getElementById("profileEmail").value;

    let user = JSON.parse(localStorage.getItem("user"));
    user.name = name;
    user.email = email;

    localStorage.setItem("user", JSON.stringify(user));
    
    alert("Profile updated!");
    window.location.href = "dashboard.html";
}

/* ================================
   OPERATOR & PLANS
================================ */

function selectOperator(e) {
    e.preventDefault();

    let mobile = document.getElementById("mobileNumber").value;
    let operator = document.getElementById("operator").value;

    if (mobile.length !== 10) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }

    localStorage.setItem("selectedMobile", mobile);
    localStorage.setItem("selectedOperator", operator);

    window.location.href = "plans.html";
}

/* Save Plan Selection */
function choosePlan(amount, description) {
    localStorage.setItem("selectedPlan", JSON.stringify({ amount, description }));

    window.location.href = "payment.html";
}

/* Payment */
function processPayment(e) {
    e.preventDefault();

    const card = document.getElementById("cardNumber").value;
    const cvv = document.getElementById("cvv").value;

    if (card.length !== 16 || cvv.length !== 3) {
        alert("Enter valid card details!");
        return;
    }

    let history = JSON.parse(localStorage.getItem("history")) || [];

    let newRecharge = {
        mobile: localStorage.getItem("selectedMobile"),
        operator: localStorage.getItem("selectedOperator"),
        plan: JSON.parse(localStorage.getItem("selectedPlan")),
        date: new Date().toLocaleString()
    };

    history.push(newRecharge);
    localStorage.setItem("history", JSON.stringify(history));

    window.location.href = "success.html";
}
