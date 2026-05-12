// Star Rating Logic
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-value');
        updateStars(selectedRating);
    });

    star.addEventListener('mouseover', function() {
        const hoverValue = this.getAttribute('data-value');
        updateStars(hoverValue);
    });

    star.addEventListener('mouseleave', function() {
        updateStars(selectedRating);
    });
});

function updateStars(value) {
    stars.forEach(star => {
        if (star.getAttribute('data-value') <= value) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Feedback Form Submission
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isAr = document.body.classList.contains('lang-ar');
        const msg = isAr ? 'شكراً لتقييمكم! نحن نقدر ملاحظاتكم.' : 'Thank you for your rating! We appreciate your feedback.';
        alert(msg);
        feedbackForm.reset();
        selectedRating = 0;
        updateStars(0);
    });
}

// WhatsApp Booking Submission
const bookingForm = document.getElementById('whatsapp-booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = document.getElementById('book-date').value;
        const nights = document.getElementById('book-nights').value;
        const persons = document.getElementById('book-persons').value;
        const time = document.getElementById('book-time').value;
        const isAr = document.body.classList.contains('lang-ar');
        
        let message = '';
        if (isAr) {
            message = `السلام عليكم، أريد حجز غرفة في شقق ناصر أبودهش:\n\n` +
                      `- تاريخ الوصول: ${date}\n` +
                      `- عدد الليالي: ${nights}\n` +
                      `- عدد الأشخاص: ${persons}\n` +
                      `- موعد الوصول المتوقع: ${time}`;
        } else {
            message = `Hello, I would like to book a room at Nasser Abudahash Apartments:\n\n` +
                      `- Check-in Date: ${date}\n` +
                      `- Number of Nights: ${nights}\n` +
                      `- Number of Persons: ${persons}\n` +
                      `- Expected Arrival Time: ${time}`;
        }
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/966566363977?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

// Full Survey Form Submission
const surveyForm = document.getElementById('full-survey-form');
if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isAr = document.body.classList.contains('lang-ar');
        const formData = new FormData(surveyForm);
        
        // In a real app, you'd send this to a server. 
        // For now, we'll show a success message.
        const successMsg = isAr ? 
            'شكراً لك! تم إرسال استبيانك بنجاح. نحن نقدر وقتك.' : 
            'Thank you! Your questionnaire has been submitted successfully. We appreciate your time.';
        
        alert(successMsg);
        surveyForm.reset();
    });
}

// Scroll Reveal Effect
function reveal() {
    var reveals = document.querySelectorAll(".info-flex, .service-card, .section-title, .rating-section, .survey-section");
    reveals.forEach(el => {
        var windowHeight = window.innerHeight;
        var elementTop = el.getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('reveal');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
}

// Apply initial styles for reveal
document.querySelectorAll(".info-flex, .service-card, .section-title, .rating-section, .survey-section").forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease-out';
});

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// Language Toggle
const langToggle = document.getElementById('lang-toggle');
const body = document.body;

langToggle.addEventListener('click', () => {
    if (body.classList.contains('lang-ar')) {
        body.classList.remove('lang-ar');
        body.classList.add('lang-en');
        langToggle.textContent = 'العربية';
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
    } else {
        body.classList.remove('lang-en');
        body.classList.add('lang-ar');
        langToggle.textContent = 'English';
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
    }
    reveal();
});

// Smooth navigation highlight
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').substring(1) === current) {
            a.classList.add('active');
        }
    });
});
