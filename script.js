// script.js

// Чекаємо, поки вся сторінка завантажиться
document.addEventListener("DOMContentLoaded", function() {

    // --- НАЛАШТУВАННЯ ДЛЯ ЗАВДАНЬ 8, 9 ---
    // Знаходимо елементи форми, якими будемо керувати
    const interestSelect = document.querySelector("#interest");
    const messageTextarea = document.querySelector("#message-textarea");
    const contactForm = document.querySelector(".contact-form");


    // --- НАЛАШТУВАННЯ ДЛЯ ЗАВДАНЬ 6, 7, 8, 10 ---
    // Знаходимо елементи універсального модального вікна
    const modalOverlay = document.querySelector("#generic-modal-overlay");
    const modalContent = document.querySelector("#modal-dynamic-content");
    const modalCloseBtn = document.querySelector("#generic-modal-close");

    // Функція: ВІДКРИТИ модальне вікно
    function openModal(contentHTML) {
        modalContent.innerHTML = contentHTML; // Вставляємо наш контент
        modalOverlay.classList.add("active");
        document.body.classList.add("modal-open"); // Блокуємо прокрутку фону
    }

    // Функція: ЗАКРИТИ модальне вікно
    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.classList.remove("modal-open");
    }

    // Обробники для закриття модального вікна
    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // --- ЗАВДАННЯ 1, 2, 3, 4, 5: Плавна прокрутка ---
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

    // --- ЗАВДАННЯ 6: Модальне вікно "Discover Our Story" ---
    const discoverStoryBtn = document.querySelector("#discover-story-btn");
    discoverStoryBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const aboutContent = document.querySelector(".about-text-column").innerHTML;
        // Видаляємо кнопку "Discover" з копії, щоб вона не дублювалася
        const modalHTML = aboutContent.replace('<a href="#" class="btn btn-primary btn-discover" id="discover-story-btn">Discover Our Story</a>', '');
        openModal(modalHTML);
    });

    // --- ЗАВДАННЯ 7.1: Модальні вікна "View Details" ---
    // Дані для модальних вікон (ми їх "вигадуємо")
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

    // Обробники для "View Details"
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

    // --- ЗАВДАННЯ 7.2: Модальне вікно "View All Inventory" ---
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

    // --- ЗАВДАННЯ 8: Модальні вікна "Learn More" (Services) ---
    const serviceButtons = document.querySelectorAll(".service-card .btn-link");
    
    // "Вигадані" деталі для послуг
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

    // --- ЗАВДАННЯ 9: Логіка для Заповнення Форми ---

    // 9.1: Кнопка "Schedule Test Drive" у шапці
    document.querySelector("#schedule-test-drive-header").addEventListener("click", () => {
        interestSelect.value = "Test Drive";
    });
    
    // 9.2: Кнопка "Consult" у Hero
    document.querySelector("#consult-hero").addEventListener("click", () => {
        interestSelect.value = "Consultation";
    });

    // 9.3: Кнопки "Test Drive" на картках автомобілів
    document.querySelectorAll(".test-drive").forEach(button => {
        button.addEventListener("click", function() {
            const carName = button.dataset.carName;
            interestSelect.value = "Test Drive";
            messageTextarea.value = `I am interested in a test drive for the ${carName}.`;
        });
    });

    // 9.4: Кнопка "Order Service" зсередини модального вікна
    // Використовуємо "делегування подій", оскільки кнопка створюється динамічно
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-modal-order")) {
            event.preventDefault(); // Запобігаємо звичайному "стрибку"
            
            const serviceName = event.target.dataset.serviceName;
            interestSelect.value = "Service";
            messageTextarea.value = `I would like to order the following service: ${serviceName}.`;
            
            closeModal(); // Закриваємо модальне вікно...
            
            // ...і плавно прокручуємо до форми (код з Частини 1 тут не спрацює,
            // оскільки ми зупинили подію, тому робимо це вручну)
            const targetElement = document.querySelector("#contact");
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = targetPosition - headerHeight - 20;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });

    // --- ЗАВДАННЯ 10: Відправка форми ---
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Зупиняємо реальну відправку
        
        // Повертаємо логіку з минулого проекту
        const thankYouHTML = `
            <div style="text-align: center;">
                <i class="fas fa-check-circle" style="color: #5cb85c; font-size: 48px; margin-bottom: 15px;"></i>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully. We will contact you shortly.</p>
                <button class="btn btn-primary" id="modal-ok-button">OK</button>
            </div>
        `;
        openModal(thankYouHTML);
        contactForm.reset(); // Очищуємо форму
        
        // Додаємо слухач для кнопки "ОК"
        document.querySelector("#modal-ok-button").addEventListener("click", closeModal);
    });

    console.log("Premium Motors JavaScript (v2) successfully loaded!");

});