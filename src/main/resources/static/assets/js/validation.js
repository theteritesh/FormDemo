document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Clear previous error messages
        const errorSpans = document.querySelectorAll(".text-danger");
        errorSpans.forEach(span => span.innerHTML = "");

        let hasError = false;

        // Name validation
        const namePattern = /^[A-Za-z\s]{2,}$/; // Only letters and spaces, min 2 characters
        const nameInput = form.name;
        if (!namePattern.test(nameInput.value.trim())) {
            document.getElementById("nameError").innerHTML = "Name must be at least 2 characters long and contain only letters.";
            nameInput.focus();
            hasError = true;
        }

        // Mobile number validation
        const mobilePattern = /^[789]\d{9}$/; // Must start with 7, 8, or 9 and be 10 digits
        const mobileInput = form.mobile;
        if (!mobilePattern.test(mobileInput.value.trim())) {
            document.getElementById("mobileError").innerHTML = "Mobile number must be 10 digits, starting with 7, 8, or 9.";
            if (!hasError) mobileInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailInput = form.email;
        if (!emailPattern.test(emailInput.value.trim())) {
            document.getElementById("emailError").innerHTML = "Please enter a valid email address (e.g., user@example.com).";
            if (!hasError) emailInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Date of Birth validation
        const dob = new Date(form.dob.value);
        const today = new Date();
        if (dob > today) {
            document.getElementById("dobError").innerHTML = "Date of birth cannot be in the future.";
            if (!hasError) form.dob.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Degree validation
        const degreePattern = /^[A-Za-z\s]{2,}$/; // Only letters and spaces, min 2 characters
        const degreeInput = form.degree;
        if (!degreePattern.test(degreeInput.value.trim())) {
            document.getElementById("degreeError").innerHTML = "Degree must be at least 2 characters long and contain only letters.";
            if (!hasError) degreeInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Institution validation
        const institutionInput = form.institution;
        if (!degreePattern.test(institutionInput.value.trim())) {
            document.getElementById("institutionError").innerHTML = "Institution name must be at least 2 characters long and contain only letters.";
            if (!hasError) institutionInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Year of Graduation validation
        const year = parseInt(form.year.value);
        if (isNaN(year) || year < 1950 || year > today.getFullYear()) {
            document.getElementById("yearError").innerHTML = "Please enter a valid year (between 1950 and the current year).";
            if (!hasError) form.year.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Type of Education validation
        if (form["education-type"].value === "") {
            document.getElementById("educationTypeError").innerHTML = "Please select your type of education.";
            if (!hasError) form["education-type"].focus(); // Focus only if no previous error
            hasError = true;
        }

        // Gender validation
        if (!form.gender.value) {
            document.getElementById("genderError").innerHTML = "Please select your gender.";
            if (!hasError) form.gender[0].focus(); // Focus only if no previous error
            hasError = true;
        }

        // If no errors, show success message
        if (!hasError) {
            form.submit();
        }
    });
	
	
});