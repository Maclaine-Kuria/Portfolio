/*================== Dynamic Greeting ========= */
function getTimeGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good afternoon";
    } else if (hour >= 17 && hour < 21) {
        return "Good evening";
    } else {
        return "Hello";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const helloElement = document.querySelector(".hello");
    if (helloElement) {
        const nameSpan = helloElement.querySelector(".name");
        const greeting = getTimeGreeting();
        helloElement.innerHTML = `${greeting}, my name is <span class="name">${nameSpan.textContent}</span>`;
    }
});

/*================== Form Real-time Validation ========= */
document.addEventListener("DOMContentLoaded", function () {
    const formControls = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message"),
    };

    const errorMessages = {
        name: document.getElementById("name-error"),
        email: document.getElementById("email-error"),
        subject: document.getElementById("subject-error"),
        message: document.getElementById("message-error"),
    };

    function showError(field, message) {
        errorMessages[field].textContent = message;
        errorMessages[field].style.color = "red";
    }

    function clearError(field) {
        errorMessages[field].textContent = "";
    }

    function validateField(field) {
        const value = formControls[field].value.trim();
        if (field === "email") {
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            valid ? clearError(field) : showError(field, "Enter a valid email.");
            return valid;
        } else {
            if (value === "") {
                showError(field, `Please enter your ${field}.`);
                return false;
            } else {
                clearError(field);
                return true;
            }
        }
    }

    // Real-time validation
    Object.keys(formControls).forEach(field => {
        formControls[field].addEventListener("input", () => validateField(field));
    });

    // On submit
    document.getElementById("submit-btn").addEventListener("click", function (e) {
        e.preventDefault();
        const allValid = Object.keys(formControls).every(validateField);

        if (allValid) {
            alert(" Your message has been sent successfully!");
            Object.values(formControls).forEach(input => input.value = "");
        } else {
            alert(" Please correct the highlighted errors before submitting.");
        }
    });
});



