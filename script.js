document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation & Back to Top
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('show');
        }
    });

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all children with animation classes
                const animateElements = entry.target.querySelectorAll('.fade-in, .slide-up, .zoom-in');
                animateElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate');
                    }, index * 150); // Staggered animation effect
                });

                // Ensure the container itself gets the animate class
                entry.target.classList.add('animate');

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // 3. Enquiry Modal Logic (guarded for missing trigger button)
    const modal = document.getElementById('enquiry-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.querySelector('.close-modal');

    if (modal && closeModalBtn) {
        const openModal = () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        if (openModalBtn) {
            openModalBtn.addEventListener('click', openModal);
        }

        closeModalBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // 4. Form Validation & Submission
        const enquiryForm = document.getElementById('enquiry-form');
        if (enquiryForm) {
            enquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(enquiryForm);
                const name = formData.get('name');
                const phone = formData.get('phone');

                if (name.length < 3) {
                    alert('Please enter a valid name.');
                    return;
                }

                if (!/^\d{10}$/.test(phone)) {
                    alert('Please enter a valid 10-digit phone number.');
                    return;
                }

                alert(`Thank you, ${name}! Your enquiry has been submitted. Our team will contact you shortly.`);
                enquiryForm.reset();
                closeModal();
            });
        }
    }

    // 5. Testimonial Carousel (Simple Logic, guarded for missing DOM)
    const testimonials = [
        {
            text: "The one-on-one attention helped me improve my Physics score from 60 to 95 in just 4 months! The mentor is amazing.",
            author: "Rahul Sharma",
            achievement: "NEET 2024 Scorer (AIR 234)",
            photo: "assets/student_placeholder.webp"
        },
        {
            text: "I was struggling with mechanics, but the way concepts are simplified here is mind-blowing. Truly professional coaching.",
            author: "Sneha Kapur",
            achievement: "JEE Main 99.5 Percentile",
            photo: "assets/student_placeholder_2.webp"
        },
        {
            text: "Small batch size makes a huge difference. I never felt hesitant to ask my doubts. Best results guaranteed!",
            author: "Manish Iyer",
            achievement: "AIIMS Aspirant",
            photo: "assets/student_placeholder.webp"
        }
    ];

    let currentSlide = 0;
    const sliderContainer = document.getElementById('testimonial-slider');
    const dots = document.querySelectorAll('.dot');

    if (sliderContainer && dots.length) {
        const updateTestimonial = (index) => {
            const t = testimonials[index];
            sliderContainer.innerHTML = `
                <div class="testimonial-card slide-up animate">
                    <div class="stars">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                    <p class="testimonial-text">"${t.text}"</p>
                    <div class="testimonial-author">
                        <div class="author-photo"><img src="${t.photo}" alt="${t.author}"></div>
                        <div class="author-info">
                            <strong>${t.author}</strong>
                            <span>${t.achievement}</span>
                        </div>
                    </div>
                </div>
            `;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateTestimonial(currentSlide);
            });
        });

        // Auto-advance carousel
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            updateTestimonial(currentSlide);
        }, 5000);
    }

    // 6. Mobile Menu (Enhanced logic)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '40px 20px';
                navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                navLinks.style.animation = 'slideDown 0.3s ease forwards';
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
                navLinks.style.display = 'none';
            }
        });
    }

    // 7. Results Section Tabs
    window.showTab = (tabId) => {
        // Toggle Buttons
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            if (btn.innerText.toLowerCase().includes(tabId)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Toggle Content
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(content => {
            if (content.id === `${tabId}-tab`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    };

    // 8. Stats Counter Animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(num => {
                    const target = parseInt(num.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 100;
                    const updateCount = () => {
                        if (current < target) {
                            current += increment;
                            if (target === 95) {
                                num.innerText = Math.ceil(current) + '%';
                            } else {
                                num.innerText = Math.ceil(current) + '+';
                            }
                            setTimeout(updateCount, 20);
                        } else {
                            if (target === 95) {
                                num.innerText = target + '%';
                            } else {
                                num.innerText = target + '+';
                            }
                        }
                    };
                    updateCount();
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-counter');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
