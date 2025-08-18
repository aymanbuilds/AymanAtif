// Prepare letters
const title = document.getElementById('hero-title');
let text = title.textContent.replace(/\s+/g, ' ').trim();
title.textContent = '';

const letters = text.split('').map((char) => {
    const span = document.createElement('span');
    span.innerHTML = char === ' ' ? '&nbsp;' : char;
    span.classList.add('letter');
    title.appendChild(span);
    return span;
});

function animateLoop() {
    // Fade in letters from right to left
    letters.forEach((span, i) => {
        setTimeout(() => {
            span.classList.remove('fade-out');
            span.classList.add('fade-in');
        }, i * 80); // stagger 80ms
    });

    // Wait 2s after last letter faded in, then fade out right-to-left (first letter first)
    const fadeOutDelay = letters.length * 80 + 2000;
    letters.forEach((span, i) => {
        setTimeout(() => {
            span.classList.remove('fade-in');
            span.classList.add('fade-out');
        }, fadeOutDelay + i * 80);
    });

    // Repeat loop
    const totalDelay = fadeOutDelay + letters.length * 80 + 600; // 600ms for fade-out
    setTimeout(animateLoop, totalDelay);
}

// Start animation
animateLoop();

const bg = document.querySelector('.domino-bg');
const cells = [];
const cellSpacing = 50;

// Create grid cells and store their original positions
for (let x = 0; x < window.innerWidth; x += cellSpacing) {
    for (let y = 0; y < window.innerHeight; y += cellSpacing) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        bg.appendChild(div);
        cells.push({ el: div, ox: x, oy: y }); // store original positions
    }
}

document.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    cells.forEach(c => {
        const dx = mx - c.ox;
        const dy = my - c.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxForce = 50;       // max distance cell can move
        const influenceRadius = 300; // bigger = more cells affected

        // force decreases smoothly with distance
        const force = dist < influenceRadius ? maxForce * (1 - dist / influenceRadius) : 0;

        const tx = (dx / dist) * force || 0;
        const ty = (dy / dist) * force || 0;
        c.el.style.transform = `translate(${tx}px, ${ty}px)`;
    });
});

const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");

    // Toggle button icon
    if (menu.classList.contains("hidden")) {
        btn.textContent = "☰"; // hamburger
    } else {
        btn.textContent = "✕"; // close
    }
});

const carousel = document.getElementById('carousel');
const scrollLeft = document.getElementById('scrollLeft');
const scrollRight = document.getElementById('scrollRight');

scrollLeft.addEventListener('click', () => {
    carousel.scrollBy({ left: -260, behavior: 'smooth' });
});

scrollRight.addEventListener('click', () => {
    carousel.scrollBy({ left: 260, behavior: 'smooth' });
});

const pfCarousel = document.getElementById('pfCarousel');
const pfScrollLeft = document.getElementById('pfScrollLeft');
const pfScrollRight = document.getElementById('pfScrollRight');
const pfViewer = document.getElementById('pfViewer');

const pfProjects = [
    {
        title: 'GridMaster',
        desc: 'Mini Spreadsheet Application',
        longDesc: 'A lightweight spreadsheet app built with React, showcasing dynamic data rendering, cell formulas, and real-time updates. Demonstrates proficiency in frontend development with HTML5, CSS3, JavaScript ES6+, Tailwind CSS for responsive styling, and React hooks for state management. <br><br> <a target="_blank" href="https://aymanbuilds.github.io/GridMaster-Template/">https://aymanbuilds.github.io/GridMaster-Template/</a>',
        img: 'assets/images/gridmaster.PNG'
    },
    {
        title: 'Alliance',
        desc: 'Modern Landing Page Template',
        longDesc: 'A sleek marketing landing page featuring cohesive color theming, animated CTAs, and responsive design principles. Highlights skills in UI/UX design, color theory implementation, and mobile-first development using CSS Grid and Flexbox. <br><br> <a target="_blank" href="https://aymanbuilds.github.io/Team-Management-Template/">https://aymanbuilds.github.io/Team-Management-Template/</a>',
        img: 'assets/images/alliance.PNG'
    },
    {
        title: 'LandingBrand',
        desc: 'Vibrant Marketing Landing Page',
        longDesc: 'A bold, colorful landing page with custom illustrations, dynamic scroll effects, and creative typography. Showcases advanced CSS art skills, SVG animations, and unconventional layout design for maximum visual impact. <br><br> <a target="_blank" href="https://aymanbuilds.github.io/LandingBrand-Template/">https://aymanbuilds.github.io/LandingBrand-Template/</a>',
        img: 'assets/images/landingbrand.PNG'
    },
    {
        title: 'CRM Dashboard',
        desc: 'Customer Relationship Management System',
        longDesc: 'Interactive admin dashboard with dynamic charts (Chart.js), paginated data tables, and role-based views. Demonstrates complex data visualization capabilities, API integration for CRUD operations, and pagination logic implementation. <br><br> <a target="_blank" href="https://aymanbuilds.github.io/Crm-Dashboard-Template/">https://aymanbuilds.github.io/Crm-Dashboard-Template/</a>',
        img: 'assets/images/crm.PNG'
    },
    {
        title: 'Calendra TaskFlow',
        desc: 'Productivity Landing Page',
        longDesc: 'Marketing page for a task management app featuring gradient animations, testimonial carousels, and feature showcases. Emphasizes skills in creating conversion-focused layouts and implementing subtle micro-interactions. <br><br> <a target="_blank" href="https://aymanbuilds.github.io/TaskFlow-Template/">https://aymanbuilds.github.io/TaskFlow-Template/</a>',
        img: 'assets/images/taskflow.PNG'
    },
    {
        title: 'Calendra',
        desc: 'Booking Form System',
        longDesc: 'Complex scheduling form with custom calendar components, timezone handling, and multi-step validation. Showcases advanced form state management, date/time picker customization, and progressive enhancement techniques. <br><br> <a target="_blank" href="https://aymanbuilds.github.io/Booking-Template/">https://aymanbuilds.github.io/Booking-Template/</a>',
        img: 'assets/images/calendra.PNG'
    }
];

// Generate cards
pfProjects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'flex-none w-[350px] h-[400px] bg-gray-800 rounded-xl shadow-lg cursor-pointer overflow-hidden opacity-20 hover:opacity-100 transition-opacity duration-300';

    card.innerHTML = `
      <img src="${p.img}" class="w-full h-64 object-cover" />
      <div class="p-4 flex flex-col gap-2">
        <h3 class="text-white font-bold text-xl">${p.title}</h3>
        <p class="text-gray-300 text-sm">${p.desc}</p>
      </div>
    `;

    card.addEventListener('click', () => {
        const rect = card.getBoundingClientRect();
        pfViewer.style.display = 'flex';
        pfViewer.style.clipPath = `circle(0% at ${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px)`;

        // Fill viewer content
        pfViewer.innerHTML = `
     <div class="w-full h-full max-h-screen flex flex-col lg:flex-row bg-gray-900 overflow-hidden">
  <!-- Image Section - Full width on mobile, half width on desktop -->
  <div class="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-4 lg:p-0">
    <img src="${p.img}" class="w-auto h-full lg:w-full lg:h-auto object-contain max-h-[50vh] lg:max-h-none">
  </div>
  
  <!-- Content Section - Full width on mobile, half width on desktop -->
  <div class="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col gap-4 lg:gap-6 text-white overflow-auto">
    <!-- Go Back Button -->
    <button id="pfBackButton" class="px-4 py-2 lg:px-6 lg:py-3 bg-transparent text-green-300 font-bold rounded-lg flex items-center gap-2 hover:text-green-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Go Back
    </button>
    
    <h2 class="text-2xl lg:text-4xl font-bold text-green-400">${p.title}</h2>
    <p class="text-gray-300 text-base lg:text-lg">${p.desc}</p>
    <div class="text-gray-200 text-sm lg:text-base">${p.longDesc}</div>
  </div>
</div>
    `;

        setTimeout(() => {
            pfViewer.style.transition = 'clip-path 0.6s ease-in-out';
            pfViewer.style.clipPath = 'circle(150% at 50% 50%)';
        }, 10);

        // Go Back button event
        const backBtn = document.getElementById('pfBackButton');
        backBtn.addEventListener('click', () => {
            pfViewer.style.transition = 'clip-path 0.6s ease-in-out';
            pfViewer.style.clipPath = 'circle(0% at 50% 50%)';
            setTimeout(() => pfViewer.style.display = 'none', 600);
        });
    });

    pfCarousel.appendChild(card);
});

// Navigation buttons
pfScrollLeft.addEventListener('click', () => {
    pfCarousel.scrollBy({ left: -360, behavior: 'smooth' });
});
pfScrollRight.addEventListener('click', () => {
    pfCarousel.scrollBy({ left: 360, behavior: 'smooth' });
});