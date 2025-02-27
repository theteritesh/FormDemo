document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editForm");

    // Event listener for the Edit button
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get data attributes from the button
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const mobile = this.getAttribute('data-mobile');
            const email = this.getAttribute('data-email');
            const dob = this.getAttribute('data-dob');
            const degree = this.getAttribute('data-degree');
            const institution = this.getAttribute('data-institution');
            const year = this.getAttribute('data-year');
            const educationType = this.getAttribute('data-educationtype');
            const gender = this.getAttribute('data-gender');
            const description = this.getAttribute('data-description');

            // Populate the modal fields
            document.getElementById('edit-id').value = id;
            document.getElementById('edit-name').value = name;
            document.getElementById('edit-mobile').value = mobile;
            document.getElementById('edit-email').value = email;
            document.getElementById('edit-dob').value = dob;
            document.getElementById('edit-degree').value = degree;
            document.getElementById('edit-institution').value = institution;
            document.getElementById('edit-year').value = year;
            document.getElementById('edit-educationtype').value = educationType;
            document.getElementById('edit-description').value = description;

            // Set the gender radio button
            document.querySelector(`input[name="gender"][value="${gender}"]`).checked = true;
        });
    });

    // Validation for the edit form
    editForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Clear previous error messages
        const errorSpans = editForm.querySelectorAll(".text-danger");
        errorSpans.forEach(span => span.innerHTML = "");

        let hasError = false;

        // Name validation
        const namePattern = /^[A-Za-z\s]{2,}$/; // Only letters and spaces, min 2 characters
        const nameInput = document.getElementById('edit-name');
        if (!namePattern.test(nameInput.value.trim())) {
            document.getElementById("editNameError").innerHTML = "Name must be at least 2 characters long and contain only letters.";
            nameInput.focus();
            hasError = true;
        }

        // Mobile number validation
        const mobilePattern = /^[789]\d{9}$/; // Must start with 7, 8, or 9 and be 10 digits
        const mobileInput = document.getElementById('edit-mobile');
        if (!mobilePattern.test(mobileInput.value.trim())) {
            document.getElementById("editMobileError").innerHTML = "Mobile number must be 10 digits, starting with 7, 8, or 9.";
            if (!hasError) mobileInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailInput = document.getElementById('edit-email');
        if (!emailPattern.test(emailInput.value.trim())) {
            document.getElementById("editEmailError").innerHTML = "Please enter a valid email address (e.g., user@example.com).";
            if (!hasError) emailInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Date of Birth validation
        const dob = new Date(document.getElementById('edit-dob').value);
        const today = new Date();
        if (dob > today) {
            document.getElementById("editDobError").innerHTML = "Date of birth cannot be in the future.";
            if (!hasError) document.getElementById('edit-dob').focus(); // Focus only if no previous error
            hasError = true;
        }

        // Degree validation
        const degreePattern = /^[A-Za-z\s]{2,}$/; // Only letters and spaces, min 2 characters
        const degreeInput = document.getElementById('edit-degree');
        if (!degreePattern.test(degreeInput.value.trim())) {
            document.getElementById("editDegreeError").innerHTML = "Degree must be at least 2 characters long and contain only letters.";
            if (!hasError) degreeInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Institution validation
        const institutionInput = document.getElementById('edit-institution');
        if (!degreePattern.test(institutionInput.value.trim())) {
            document.getElementById("editInstitutionError").innerHTML = "Institution name must be at least 2 characters long and contain only letters.";
            if (!hasError) institutionInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Year of Graduation validation
        const year = parseInt(document.getElementById('edit-year').value);
        if (isNaN(year) || year < 1950 || year > today.getFullYear()) {
            document.getElementById("editYearError").innerHTML = "Please enter a valid year (between 1950 and the current year).";
            if (!hasError) document.getElementById('edit-year').focus(); // Focus only if no previous error
            hasError = true;
        }

        // Type of Education validation
        const educationTypeInput = document.getElementById('edit-educationtype');
        if (educationTypeInput.value === "") {
            document.getElementById("editEducationTypeError").innerHTML = "Please select your type of education.";
            if (!hasError) educationTypeInput.focus(); // Focus only if no previous error
            hasError = true;
        }

        // Gender validation
        const genderInput = document.querySelector('input[name="gender"]:checked');
        if (!genderInput) {
            document.getElementById("editGenderError").innerHTML = "Please select your gender.";
            if (!hasError) document.getElementById('edit-male').focus(); // Focus only if no previous error
            hasError = true;
        }

        // If no errors, submit the form
        if (!hasError) {
            editForm.submit();
        }
    });
	
	
	
});