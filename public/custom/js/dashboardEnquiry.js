"use strict";

$(document).ready(function () {
    $("#rider-enquiry-form").submit(function (e) {
        e.preventDefault();

        // Basic validation (as discussed before)
        var isValid = true;
        var errorMessage = "";

        // Validate Full Name
        var name = $("#contact-form-fullname").val().trim();
        if (name === "") {
            isValid = false;
            errorMessage += "Full Name is required.\n";
        }

        // Validate Select Car
        var car = $("#select2Basic").val();
        if (car === null || car === "") {
            isValid = false;
            errorMessage += "Please select a car.\n";
        }

        // Validate Phone Number
        var phone = $("#contact-form-phone").val().trim();
        var phonePattern = /^\+?[0-9\s\-]+$/;
        if (phone === "" || !phonePattern.test(phone)) {
            isValid = false;
            errorMessage += "Please enter a valid phone number.\n";
        }

        // Validate Email
        var email = $("#contact-form-email").val().trim();
        var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email === "" || !emailPattern.test(email)) {
            isValid = false;
            errorMessage += "Please enter a valid email address.\n";
        }

        // Validate Message
        var message = $("#contact-form-message").val().trim();
        if (message === "") {
            isValid = false;
            errorMessage += "Message is required.\n";
        }

        // If form is not valid, display errors
        if (!isValid) {
            alert(errorMessage);  // For simplicity, using alert. You can enhance this with custom error display.
            return;
        }

        // Serialize form data
        var formData = $(this).serialize();

        // Submit the form via AJAX if all fields are valid
        $.ajax({
            type: "POST",
            url: "/api/rider-enquiry",
            data: formData,
            success: function (data) {
                // Clear the form fields
                $("#rider-enquiry-form")[0].reset();

                // Show a success message
                $("#rider-enquiry-form").append("<p class='success-message'>Your inquiry has been sent successfully!</p>");

                // Optionally, remove the success message after a few seconds
                setTimeout(function () {
                    $(".success-message").fadeOut("slow", function () {
                        $(this).remove();
                    });
                }, 3000); // 3 seconds
            },
            error: function (xhr, status, error) {
                console.error(xhr, status, error);
                // Optionally, show an error message
                $("#rider-enquiry-form").append("<p class='error-message'>There was an error submitting the form. Please try again.</p>");

                // Optionally, remove the error message after a few seconds
                setTimeout(function () {
                    $(".error-message").fadeOut("slow", function () {
                        $(this).remove();
                    });
                }, 3000); // 3 seconds
            }
        });
    });
});

 

