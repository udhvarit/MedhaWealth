document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Disclaimer popup
    document.getElementById('disclaimer-close').addEventListener('click', () => {
        document.getElementById('disclaimer').classList.add('hidden');
    });

    document.getElementById('disclaimer-link').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('disclaimer').classList.remove('hidden');
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = mobileMenuBtn.querySelector('i');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset states
        let isValid = true;

        nameInput.classList.remove('border-red-500');
        nameError.classList.add('hidden');

        emailInput.classList.remove('border-red-500');
        emailError.classList.add('hidden');

        messageInput.classList.remove('border-red-500');
        messageError.classList.add('hidden');

        formSuccess.classList.add('hidden');

        // Validate Name
        if (!nameInput.value.trim()) {
            nameInput.classList.add('border-red-500');
            nameError.classList.remove('hidden');
            isValid = false;
        }

        // Validate Email
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('border-red-500');
            emailError.classList.remove('hidden');
            isValid = false;
        }

        // Validate Message
        if (!messageInput.value.trim()) {
            messageInput.classList.add('border-red-500');
            messageError.classList.remove('hidden');
            isValid = false;
        }

        // Submission Mock Process
        if (isValid) {
            // Visual feedback during 'sending'
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate API Call delay
            setTimeout(() => {
                formSuccess.classList.remove('hidden');
                contactForm.reset();

                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }, 1200);
        }
    });

    // Remove error styling on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('border-red-500');
            const errorEl = document.getElementById(`${this.id}-error`);
            if (errorEl) errorEl.classList.add('hidden');
        });
    });
});
