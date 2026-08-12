const clickSound = document.getElementById('click-sound');
function playSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => {});
}

// Boot sequence
document.getElementById('start-btn').addEventListener('click', () => {
    playSound();
    document.getElementById('boot-screen').classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
});

// Live Clocks
setInterval(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    document.getElementById('live-clock').innerText = timeStr;
    document.getElementById('taskbar-clock').innerText = timeStr;
    
    // Format calendar date dynamically
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date-text').innerText = now.toLocaleDateString('en-US', options);
}, 1000);

// Open App function
function openApp(windowId) {
    playSound();
    const win = document.getElementById(windowId);
    win.classList.remove('hidden');
    win.style.zIndex = String(Date.now());
}

// Close Window buttons
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        playSound();
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('hidden');
    });
});

// Window Dragging functionality
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

// JINE Dialogue cycles
const dialogueLines = [
    "\"Apparently with this -credit card- thing we can buy anything we want? Let's give it a spin!\"",
    "\"Check out my resume and projects window, senpai~\"",
    "\"Pressing buttons releases happy chemicals!\"",
    "\"BBA Business Analytics student ready for deployment!\""
];

setInterval(() => {
    const line = dialogueLines[Math.floor(Math.random() * dialogueLines.length)];
    document.getElementById('jine-dialogue').innerText = line;
}, 8000);
