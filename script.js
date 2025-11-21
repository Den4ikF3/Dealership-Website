document.addEventListener("DOMContentLoaded", function() {

    const interestSelect = document.querySelector("#interest");
    const messageTextarea = document.querySelector("#message-textarea");
    const contactForm = document.querySelector(".contact-form");
    const modalOverlay = document.querySelector("#generic-modal-overlay");
    const modalContent = document.querySelector("#modal-dynamic-content");
    const modalCloseBtn = document.querySelector("#generic-modal-close");

    function openModal(contentHTML) {
        modalContent.innerHTML = contentHTML;
        modalOverlay.classList.add("active");
        document.body.classList.add("modal-open");
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    const header = document.querySelector('.main-header-sticky');
    const allSmoothLinks = document.querySelectorAll('a[href^="#"]');

    allSmoothLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = link.getAttribute('href');
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const discoverStoryBtn = document.querySelector("#discover-story-btn");
    discoverStoryBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const aboutContent = document.querySelector(".about-text-column").innerHTML;
        const modalHTML = aboutContent.replace('<a href="#" class="btn btn-primary btn-discover" id="discover-story-btn">Discover Our Story</a>', '');
        openModal(modalHTML);
    });

    const carDetails = {
        bmw: {
            title: "2024 BMW M5 Competition",
            specs: `<ul>
                        <li><strong>Engine:</strong> 4.4L V8 Twin-Turbo</li>
                        <li><strong>Horsepower:</strong> 617 HP</li>
                        <li><strong>0-60 mph:</strong> 3.1 seconds</li>
                        <li><strong>Transmission:</strong> 8-speed Automatic</li>
                        <li><strong>Color:</strong> Skyscraper Grey</li>
                    </ul>`
        },
        audi: {
            title: "2023 Audi RS6 Avant",
            specs: `<ul>
                        <li><strong>Engine:</strong> 4.0L V8 Twin-Turbo</li>
                        <li><strong>Horsepower:</strong> 591 HP</li>
                        <li><strong>0-60 mph:</strong> 3.5 seconds</li>
                        <li><strong>Transmission:</strong> 8-speed Tiptronic</li>
                        <li><strong>Color:</strong> Nardo Gray</li>
                    </ul>`
        },
        porsche: {
            title: "2024 Porsche 911 Turbo S",
            specs: `<ul>
                        <li><strong>Engine:</strong> 3.8L Twin-Turbo Flat-6</li>
                        <li><strong>Horsepower:</strong> 640 HP</li>
                        <li><strong>0-60 mph:</strong> 2.6 seconds</li>
                        <li><strong>Transmission:</strong> 8-speed PDK</li>
                        <li><strong>Color:</strong> Jet Black Metallic</li>
                    </ul>`
        }
    };

    document.querySelector("#view-details-bmw").addEventListener("click", (e) => {
        e.preventDefault();
        openModal(`<h2>${carDetails.bmw.title}</h2>${carDetails.bmw.specs}`);
    });
    document.querySelector("#view-details-audi").addEventListener("click", (e) => {
        e.preventDefault();
        openModal(`<h2>${carDetails.audi.title}</h2>${carDetails.audi.specs}`);
    });
    document.querySelector("#view-details-porsche").addEventListener("click", (e) => {
        e.preventDefault();
        openModal(`<h2>${carDetails.porsche.title}</h2>${carDetails.porsche.specs}`);
    });

    document.querySelector("#view-all-inventory").addEventListener("click", function(event) {
        event.preventDefault();
        const inventoryHTML = `
            <h2>Full Inventory (Demo)</h2>
            <p>More vehicles coming soon...</p>
            <div class="vehicle-card" style="margin-bottom: 15px;">
                <img src="images/bmwM5.jfif" alt="BMW" style="width: 100%;">
                <h3 style="padding: 10px;">2024 BMW M5 Competition</h3>
            </div>
            <div class="vehicle-card" style="margin-bottom: 15px;">
                <img src="images/audiRS6.jfif" alt="Audi" style="width: 100%;">
                <h3 style="padding: 10px;">2023 Audi RS6 Avant</h3>
            </div>
            <div class="vehicle-card">
                <img src="images/porsche911TurboS.jfif" alt="Porsche" style="width: 100%;">
                <h3 style="padding: 10px;">2024 Porsche 911 Turbo S</h3>
            </div>
        `;
        openModal(inventoryHTML);
    });

    const serviceButtons = document.querySelectorAll(".service-card .btn-link");
    const serviceDetails = {
        "Premium Financing": "Our financing experts work with multiple lenders to secure you the best possible rate. We offer flexible terms up to 84 months and fast, transparent pre-approval.",
        "Expert Service Center": "Our factory-trained technicians use only genuine OEM parts. From routine oil changes to complex engine diagnostics, your luxury vehicle is in the best hands.",
        "Trade-In Program": "Get a fair, real-time market value for your vehicle. We accept all makes and models, and our transparent appraisal process is quick and obligation-free.",
        "Extended Warranty": "Protect your investment beyond the factory warranty. Our comprehensive plans cover everything from the powertrain to advanced electronics, giving you peace of mind.",
        "Personal Concierge": "Your single point of contact for all your automotive needs. Your concierge can schedule service, arrange detailing, and even source hard-to-find vehicles.",
        "24/7 Support": "Our dedicated support line is always available for roadside assistance, emergency support, or any questions you may have about your vehicle, day or night."
    };

    serviceButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const serviceName = button.dataset.serviceName;
            const serviceText = serviceDetails[serviceName] || "More details coming soon.";
            
            const modalHTML = `
                <h2>${serviceName}</h2>
                <p>${serviceText}</p>
                <a href="#contact" class="btn btn-primary btn-modal-order" data-service-name="${serviceName}">Order Service</a>
            `;
            openModal(modalHTML);
        });
    });

    document.querySelector("#schedule-test-drive-header").addEventListener("click", () => {
        interestSelect.value = "Test Drive";
    });
    
    document.querySelector("#consult-hero").addEventListener("click", () => {
        interestSelect.value = "Consultation";
    });

    document.querySelectorAll(".test-drive").forEach(button => {
        button.addEventListener("click", function() {
            const carName = button.dataset.carName;
            interestSelect.value = "Test Drive";
            messageTextarea.value = `I am interested in a test drive for the ${carName}.`;
        });
    });

    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-modal-order")) {
            event.preventDefault();
            
            const serviceName = event.target.dataset.serviceName;
            interestSelect.value = "Service";
            messageTextarea.value = `I would like to order the following service: ${serviceName}.`;
            
            closeModal();
            
            const targetElement = document.querySelector("#contact");
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = targetPosition - headerHeight - 20;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const thankYouHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle" style="color: #5cb85c; font-size: 48px; margin-bottom: 15px;"></i>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We will contact you shortly.</p>
                <button class="btn btn-primary" id="modal-ok-button">OK</button>
            </div>
        `;
        openModal(thankYouHTML);
        contactForm.reset();
        
        document.querySelector("#modal-ok-button").addEventListener("click", closeModal);
    });

    console.log("Premium Motors JavaScript (v2) successfully loaded!");

});