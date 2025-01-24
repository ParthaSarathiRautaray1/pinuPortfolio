document.querySelectorAll('.card').forEach(card => {
    // Ripple effect
    card.addEventListener('mouseenter', function(e) {
        this.classList.add('ripple');
    });
    
    card.addEventListener('mouseleave', function(e) {
        this.classList.remove('ripple');
    });
    
    // 3D tilt effect
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            // Show success toast
            showToast('Message sent successfully!', 'success');
            // Reset form
            contactForm.reset();
        }
    } catch (error) {
        showToast('Failed to send message. Please try again.', 'error');
    }
});

// Toast component
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const navLinks = document.querySelectorAll('.bottom-nav a');

// Add this throttle function at the top
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Replace the existing scroll listener with this optimized version
window.addEventListener('scroll', throttle(() => {
    let current = '';
    const scrollY = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}, 100));
