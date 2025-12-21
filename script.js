// Header Scroll Effect
const header = document.querySelector('.main-header');
const logo = document.querySelector('.logo');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Formspree AJAX Submission
const form = document.getElementById("quoteForm");

async function handleSubmit(event) {
    event.preventDefault();
    const status = document.getElementById("form-status");
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnText = submitBtn.innerHTML;

    // TODO: REPLACE WITH YOUR OWN FORMSPREE ID
    // Example: "https://formspree.io/f/YOUR_ID_HERE"
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkowzqbg";

    const data = new FormData(event.target);

    // changes button state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.innerHTML = '<i class="fas fa-check-circle"></i> Thanks! We will be in touch soon.';
            status.className = "form-status success";
            form.reset();
        } else {
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                status.innerHTML = result["errors"].map(error => error["message"]).join(", ");
            } else {
                status.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! There was a problem submitting your form.';
            }
            status.className = "form-status error";
        }
    } catch (error) {
        status.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! There was a problem submitting your form.';
        status.className = "form-status error";
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Hide status after 5 seconds if success
        if (status.classList.contains('success')) {
            setTimeout(() => {
                status.innerHTML = '';
                status.className = 'form-status';
            }, 5000);
        }
    }
}

if (form) {
    form.addEventListener("submit", handleSubmit);
}

// Back to Top functionality
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
