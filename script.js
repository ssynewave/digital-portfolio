// Sound effects handle
const clickSound = document.getElementById('click-sound');
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Audio play blocked by browser policy"));
}

// Boot screen sequence
document.getElementById('start-btn').addEventListener('click', () => {
    playSound();
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
});

// Live clock update in taskbar
setInterval(() => {
    const now = new Date();
    document.getElementById('live-clock').innerText = now.toLocaleTimeString();
}, 1000);

// Open windows from desktop shortcuts
const desktopIcons = document.querySelectorAll('.desktop-icon');
desktopIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        playSound();
        const targetID = icon.getAttribute('data-target');
        const win = document.getElementById(targetID);
        win.classList.remove('hidden');
        win.style.zIndex = String(Date.now()); // Bring to front
    });
});

// Close windows
const closeButtons = document.querySelectorAll('.close-btn');
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        playSound();
        const targetID = btn.getAttribute('data-target');
        document.getElementById(targetID).classList.add('hidden');
    });
});

// Basic Dragging Logic for Windows
document.querySelectorAll('.draggable-window').forEach(windowEl => {
    const titleBar = windowEl.querySelector('.title-bar');
    let isDragging = false;
    let startX, startY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - windowEl.offsetLeft;
        startY = e.clientY - windowEl.offsetTop;
        windowEl.style.zIndex = String(Date.now());
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        windowEl.style.left = (e.clientX - startX) + 'px';
        windowEl.style.top = (e.clientY - startY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

// VN Dialogue rotation array
const dialogues = [
    "\"Check out my projects file, it's totally poggers!\"",
    "\"Make sure to click my Coursera certifications folder!\"",
    "\"Pressing buttons releases happy chemicals~\"",
    "\"BBA Business Analytics student reporting for duty!\""
];

setInterval(() => {
    const randomText = dialogues[Math.floor(Math.random() * dialogues.length)];
    document.getElementById('dialogue-text').innerText = randomText;
}, 7000);
