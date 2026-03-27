document.addEventListener("DOMContentLoaded", () => {
  // Web3Forms API Keys for all 3 recipients
  const WEB3FORMS_KEYS = [
    "88867f7e-89a0-416b-b4cf-8a2662858277", // rayhankhan138@gmail.com
    "d633504c-b5b9-4d26-97d0-e62504ee6cca", // fatihalearn786@gmail.com
    "13b23392-b7ca-46a8-af7e-a01be6d61e1c"  // rafiz.raj007@gmail.com
  ];

  // Web3Forms handler for enrollment form - sends to all 3 emails
  const enrollForm = document.getElementById("enroll-form");
  if (enrollForm) {
    enrollForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const status = document.getElementById("enroll-status");
      const submitButton = enrollForm.querySelector('button[type="submit"]');

      // Set loading state
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }
      
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }

      const formData = new FormData(enrollForm);

      try {
        // Submit to all 3 Web3Forms accounts simultaneously
        const submissions = WEB3FORMS_KEYS.map(async (accessKey) => {
          const data = new FormData();
          
          // Add access key
          data.append("access_key", accessKey);
          
          // Add subject
          data.append("subject", "New Enrollment Request - Learn Fatiha");
          
          // Copy all form fields
          for (let [key, value] of formData.entries()) {
            data.append(key, value);
          }

          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: data
          });

          return response.json();
        });

        // Wait for all submissions to complete
        const results = await Promise.all(submissions);

        // Check if all submissions were successful
        const allSuccessful = results.every(result => result.success);

        if (allSuccessful) {
          enrollForm.reset();
          // Redirect to thank you page
          window.location.href = "thank-you.html?source=enroll";
        } else {
          throw new Error("Some submissions failed");
        }
      } catch (error) {
        console.error("Enrollment form error:", error);
        if (status) {
          status.textContent = "Something went wrong. Please try again or contact us directly.";
          status.className = "form-status error";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Submit Enrollment";
        }
      }
    });
  }

  // Contact form handler (if you have one)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const status = document.getElementById("contact-status");
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }
      
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          contactForm.reset();
          window.location.href = "thank-you.html?source=contact";
        } else {
          throw new Error(data.message || "Submission failed");
        }
      } catch (error) {
        console.error("Contact form error:", error);
        if (status) {
          status.textContent = "Something went wrong. Please try again later.";
          status.className = "form-status error";
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      }
    });
  }
});