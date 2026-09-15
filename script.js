const testimonialContainer = document.querySelector(".testimonials-track");
const prevButton = document.querySelector(".testimonial-prev");
const nextButton = document.querySelector(".testimonial-next");
const dots = document.querySelector(".dots")
const stepsList = document.querySelector(".how-it-works-steps");
const stepsPrev = document.querySelector(".steps-prev");
const stepsNext = document.querySelector(".steps-next");
const stepsPagination = document.querySelector(".steps-pagination");
const stepCards = document.querySelectorAll(".step-card");

let stepsIndex = 0;
const STEPS_GAP =  35.74;
let currentIndex = 0;

const testimonialItems = [
    {
        name: 'Jan S.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: 'Super unkomplizierte Bestellvorgang, schnelle Bearbeitung, Schneller Versenden. <span>Von der Bestellung bis zum Erhalt 2–3 Tage.</span> Dankeschön',
    },
    {
        name: 'Rainer N.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: 'Einfach und <span>unkompliziert 3 Bestellungen</span> bisher gemacht und hat immer reibungslos funktioniert, praktisch auch alles im Rahmen',
    },
    {
        name: 'Daniel L.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: 'Es hat bis jetzt bei <span>3 Bestellungen alles perfekt</span> funktioniert und die <span>Qualität</span> war top !!! Höchstens der Preis könnte ein bisschen billiger sein aber bis jetzt alles <span>perfekt</span>',
    },
    {
        name: 'Michael A.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: '<span>Schnelle Diagnose, sehr schnelle Bearbeitung</span> und schnelle Lieferung. Bin sehr zufrieden Jahr Kunde und kann es nur weiterempfehlen. Top',
    },
    {
        name: 'Lena K.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: 'Sehr freundlicher Service und <span>schnelle Bearbeitung</span>. Die Bestellung war einfach und alles wurde verständlich erklärt.',
    },
    {
        name: 'Sophie M.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: '<span>Unkomplizierte Beratung</span> und schnelle Lieferung. Ich wurde über jeden Schritt informiert und bin sehr zufrieden.',
    },
    {
        name: 'Thomas R.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: 'Hat alles <span>schnell und diskret</span> funktioniert. Die Behandlung kam pünktlich an und der Ablauf war sehr angenehm.',
    },
    {
        name: 'Julia B.',
        date: '25 October',
        dateTime: '2025-10-25',
        review: 'Von der Bestellung bis zur Lieferung war alles <span>klar, schnell und zuverlässig</span>. Vielen Dank für den guten Service.',
    }
];

const renderStepsDots = () => {
    stepsPagination.innerHTML = "";

    stepCards.forEach((_, index) => {
        const button = document.createElement("button");

        button.classList.add("steps-dot-button");

        if (index === stepsIndex) {
            button.classList.add("active");
        }

        stepsPagination.appendChild(button);

        button.addEventListener("click", () => {
            stepsIndex = index;
            updateStepsSlider();
            updateStepsDots();
        });
    });
};

const updateStepsDots = () => {
    const dotButtons = stepsPagination.querySelectorAll(".steps-dot-button");

    dotButtons.forEach((button, index) => {
        button.classList.toggle("active", index === stepsIndex);
    });
};

const updateStepsSlider = () => {
    if (window.innerWidth >= 1024) {
        stepsList.style.transform = "";
        return;
    }

    const card = stepCards[0];

    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;

    stepsList.style.transform =
        `translateX(-${stepsIndex * (cardWidth + STEPS_GAP)}px)`;
};

stepsNext.addEventListener("click", () => {
    if (stepsIndex < stepCards.length - 1) {
        stepsIndex++;
        updateStepsSlider();
        updateStepsDots();
    }
});

stepsPrev.addEventListener("click", () => {
    if (stepsIndex > 0) {
        stepsIndex--;
        updateStepsSlider();
        updateStepsDots();
    }
});

window.addEventListener("resize", () => {
    updateStepsSlider();
});

const renderTestimonials = () => {
    testimonialContainer.innerHTML = "";

    testimonialItems.forEach(item => {
        const li = document.createElement("li");

        li.classList.add("testimonial-card");

        li.innerHTML = `
            <h3>${item.name}</h3>
            <time datetime="${item.dateTime}">${item.date}</time>
            <p>
                ${item.review}
                <p>...</p>
            </p>
            <div>
                <img src="assets/circle-check.svg"/>
                <p>Verifizierte Bewertung</p>
            </div>
        `;

        testimonialContainer.appendChild(li);
    });
};

const renderDots = () => {
    const cards = getCardCount();

    const dotsCount = cards === 1
        ? testimonialItems.length
        : testimonialItems.length - cards + 1;

    dots.innerHTML = "";

    Array(dotsCount).fill().forEach((_, index) => {
        const button = document.createElement("button");

        button.classList.add("testimonial-dot-button");

        if (index === currentIndex) {
            button.classList.add("active");
        }

        dots.appendChild(button);

        button.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
            updateDots();
        });
    });
};

const updateDots = () => {
    const dotButtons = dots.querySelectorAll(".testimonial-dot-button");

    dotButtons.forEach((button, index) => {
        button.classList.toggle("active", index === currentIndex);
    });
};

const updateSlider = (index = currentIndex) => {
    const card = testimonialContainer.querySelector(".testimonial-card");

    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 24;

    testimonialContainer.style.transform =
        `translateX(-${index * (cardWidth + gap)}px)`;
};

const getCardCount = () => {
    return window.innerWidth < 1024 ? 1 : 4;
};

nextButton.addEventListener("click", () => {
    const cardCount = getCardCount();

    if (currentIndex < testimonialItems.length - cardCount) {
        currentIndex++;
        updateSlider();
        updateDots();
    }
});

prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
        updateDots();
    }
});

renderTestimonials();
renderDots();
renderStepsDots();
updateStepsSlider();