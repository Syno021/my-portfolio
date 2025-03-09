/**
 * Contact form submission handler using EmailJS
 * Sends form data to specified email address without PHP
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Disable submit button while processing
            const submitButton = document.querySelector('.submit-btn');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // EmailJS parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                to_email: 'nkomonkululeko021@gmail.com', // Using the email from your HTML
                subject: subject,
                message: message
            };
            
            // Send email using EmailJS
            emailjs.send('service_fnoa0ap', 'template_e7pq4gi', templateParams, 'MspB473zx5j99iqt9')
                .then(function() {
                    // Show success message
                    alert('Your message has been sent successfully!');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                }, function(error) {
                    // Show error message
                    alert('Failed to send message. Please try again later.');
                    console.error('EmailJS Error:', error);
                    
                    // Re-enable submit button
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
        });
    }
}

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    
    // Remove other function calls that aren't defined in your code
    // The following functions from your window.addEventListener were removed:
    // navmenuScrollspy(), aosInit(), initSwiper()
});