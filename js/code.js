document.addEventListener("DOMContentLoaded", () => {
  const text = "Projekty 2/3 IT o 2. světové válce";
  const typewriter = document.getElementById("typewriter");
  const enterBtn = document.getElementById("enter-btn");
  const intro = document.getElementById("intro");
  const boxes = document.querySelectorAll(".project__box");

  let i = 0;
  const speed = 80;
  let typing = true;

  function type() {
    if (i < text.length) {
      typewriter.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      typing = false;
      typewriter.classList.add("done");
      enterBtn.classList.remove("hidden");
    }
  }

  type();

  // Allow skipping typewriter animation
  intro.addEventListener("click", () => {
    if (typing) {
      typewriter.textContent = text;
      typing = false;
      typewriter.classList.add("done");
      enterBtn.classList.remove("hidden");
    }
  });

  // On enter click
  enterBtn.addEventListener("click", () => {
    intro.classList.add("fade-out");

    setTimeout(() => {
      intro.style.display = "none";
      fadeInRows();
    }, 1200);
  });

  // Fade in boxes row by row
  function fadeInRows() {
    const boxesArray = Array.from(boxes);
    const boxesPerRow = calculateBoxesPerRow();
    const rowCount = Math.ceil(boxesArray.length / boxesPerRow);
    const delay = window.innerWidth < 600 ? 200 : 400;

    for (let row = 0; row < rowCount; row++) {
      const startIndex = row * boxesPerRow;
      const endIndex = startIndex + boxesPerRow;
      const rowBoxes = boxesArray.slice(startIndex, endIndex);

      setTimeout(() => {
        rowBoxes.forEach((box) => box.classList.add("visible"));
      }, row * delay);
    }
  }

  // Determine number of boxes per row
  function calculateBoxesPerRow() {
    const firstBox = boxes[0];
    const boxWidth = firstBox.offsetWidth + 80; // gap included
    const containerWidth = document.querySelector(".main__project").offsetWidth;
    return Math.max(1, Math.floor(containerWidth / boxWidth));
  }
});

const overlay = document.getElementById("image-overlay");
const closeOverlay = document.getElementById("close-overlay");
const lastBox = document.getElementById("last-box");

// When last box is clicked — show overlay
lastBox.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.add("visible");
});

// Close overlay on X click
closeOverlay.addEventListener("click", () => {
  overlay.classList.remove("visible");
});

// Close overlay when clicking outside image
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("visible");
  }
});

const canvas = document.getElementById('smoke-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

// Generate particles
for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 30 + Math.random() * 60, // smaller, sharper smoke
    speedX: -0.5 + Math.random() * 1, // faster horizontal movement
    speedY: -0.2 + Math.random() * 0.4, // faster vertical movement
    opacity: 0.1 + Math.random() * 0.2, // more visible
  });
}

// Draw particles
function draw() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
    gradient.addColorStop(0, `rgba(255,255,255,${p.opacity})`);
    gradient.addColorStop(0.7, `rgba(255,255,255,${p.opacity / 2})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);

    // Move particle
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap around edges
    if (p.x > width + p.size) p.x = -p.size;
    if (p.x < -p.size) p.x = width + p.size;
    if (p.y > height + p.size) p.y = -p.size;
    if (p.y < -p.size) p.y = height + p.size;
  });

  requestAnimationFrame(draw);
}

draw();

// Handle resizing
window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

