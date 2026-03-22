document.addEventListener("DOMContentLoaded", () => {
  const EMAILJS_CONFIG = {
    publicKey: "YOUR_PUBLIC_KEY",
    serviceId: "YOUR_SERVICE_ID",
    enrollTemplateId: "YOUR_ENROLL_TEMPLATE_ID",
    contactTemplateId: "YOUR_CONTACT_TEMPLATE_ID",
  };

  function configMissing() {
    return Object.values(EMAILJS_CONFIG).some(
      (value) => !value || value.includes("YOUR_")
    );
  }

  function setStatus(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = `form-status ${type}`;
  }

  function setButtonState(button, loadingText, isLoading) {
    if (!button) return;
    if (!button.dataset.originalText) {
      button.dataset.originalText = button.textContent;
    }

    button.disabled = isLoading;
    button.textContent = isLoading ? loadingText : button.dataset.originalText;
  }

  if (window.emailjs && !configMissing()) {
    emailjs.init({
      publicKey: EMAILJS_CONFIG.publicKey,
    });
  }

  const enrollForm = document.getElementById("enroll-form");
  if (enrollForm) {
    enrollForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const status = document.getElementById("enroll-status");
      const submitButton = enrollForm.querySelector('button[type="submit"]');

      if (!window.emailjs) {
        setStatus(status, "Email service failed to load. Please try again later.", "error");
        return;
      }

      if (configMissing()) {
        setStatus(status, "Please add your EmailJS credentials in assets/js/forms.js", "error");
        return;
      }

      setStatus(status, "", "");
      setButtonState(submitButton, "Submitting...", true);

      const formData = new FormData(enrollForm);

      const templateParams = {
        child_name: formData.get("childName"),
        child_age: formData.get("childAge"),
        parent_email: formData.get("parentEmail"),
        desired_course: formData.get("desiredCourse"),
        additional_notes: formData.get("additionalNotes") || "N/A",
      };

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.enrollTemplateId,
          templateParams
        );

        enrollForm.reset();
        window.location.href = "thank-you.html?source=enroll";
      } catch (error) {
        console.error("Enrollment form error:", error);
        setStatus(
          status,
          "Something went wrong. Please try again or contact us directly.",
          "error"
        );
      } finally {
        setButtonState(submitButton, "Submitting...", false);
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const status = document.getElementById("contact-status");
      const submitButton = contactForm.querySelector('button[type="submit"]');

      if (!window.emailjs) {
        setStatus(status, "Email service failed to load. Please try again later.", "error");
        return;
      }

      if (configMissing()) {
        setStatus(status, "Please add your EmailJS credentials in assets/js/forms.js", "error");
        return;
      }

      setStatus(status, "", "");
      setButtonState(submitButton, "Sending...", true);

      const formData = new FormData(contactForm);

      const templateParams = {
        your_name: formData.get("yourName"),
        your_email: formData.get("yourEmail"),
        your_message: formData.get("yourMessage"),
      };

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.contactTemplateId,
          templateParams
        );

        contactForm.reset();
        window.location.href = "thank-you.html?source=contact";
      } catch (error) {
        console.error("Contact form error:", error);
        setStatus(
          status,
          "Something went wrong. Please try again later.",
          "error"
        );
      } finally {
        setButtonState(submitButton, "Sending...", false);
      }
    });
  }
});