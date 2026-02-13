// ===== ELEMENTS =====
const bulb = document.getElementById("bulb");
const content = document.getElementById("mainContent");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const music = document.getElementById("bgMusic");

let lightOn = false;

// =============================
// 💡 BULB CLICK (MAIN TRIGGER)
// =============================
bulb.addEventListener("click", () => {

    if (lightOn) return; // Prevent double click bug
    lightOn = true;

    // Bulb glow
    bulb.classList.add("on");

    // Background light effect
    document.body.classList.add("light-on");

    // Show content smoothly
    content.style.opacity = "1";
    content.style.pointerEvents = "auto";

    // Play music
    if (music) {
        music.play().catch(() => {});
    }
});


// ======================================
// 😈 SUPER SENSITIVE NO BUTTON REPEL
// ======================================
let repelRadius = 150;   // sensitivity area
let moveDistance = 120;  // jump distance

document.addEventListener("mousemove", (e) => {

    if (!lightOn) return; // only active after bulb on

    const rect = noBtn.getBoundingClientRect();

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repelRadius) {

        const angle = Math.atan2(dy, dx);

        const moveX = -Math.cos(angle) * moveDistance;
        const moveY = -Math.sin(angle) * moveDistance;

        let newLeft = rect.left + moveX;
        let newTop = rect.top + moveY;

        // Keep inside screen
        newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - rect.height, newTop));

        noBtn.style.position = "fixed";
        noBtn.style.left = newLeft + "px";
        noBtn.style.top = newTop + "px";
    }
});


// ============================
// 💖 YES BUTTON CLICK
// ============================
yesBtn.addEventListener("click", () => {

    result.innerHTML = "SHE SAID YESSSS!!! 💍🎉💖";
    result.style.fontSize = "28px";
    result.style.marginTop = "20px";

    // Celebration effect
    for (let i = 0; i < 80; i++) {
        const spark = document.createElement("div");
        spark.innerHTML = "✨";
        spark.style.position = "fixed";
        spark.style.left = Math.random() * 100 + "vw";
        spark.style.top = Math.random() * 100 + "vh";
        spark.style.fontSize = (Math.random() * 20 + 10) + "px";
        spark.style.pointerEvents = "none";
        spark.style.animation = "sparkMove 1s linear forwards";

        document.body.appendChild(spark);

        setTimeout(() => spark.remove(), 1000);
    }
});
