// Background music functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create audio element
    const audio = new Audio('D:/Website design/drinking-water-website-template (1)/htdocs/background music.mp3');
    audio.loop = true;
    audio.volume = 1.0;

    // Create background overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent background */
        backdrop-filter: blur(5px); /* Apply blur */
        -webkit-backdrop-filter: blur(5px); /* Safari support */
        z-index: 999998; /* Below the prompt */
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);


    // Create a styled prompt
    const prompt = document.createElement('div');
    prompt.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 30px 40px;
        background: linear-gradient(135deg, #00B4DB, #0083B0);
        color: white;
        border-radius: 15px;
        text-align: center;
        cursor: pointer;
        z-index: 999999;
        font-family: 'Poppins', sans-serif;
        box-shadow: 0 10px 25px rgba(0, 131, 176, 0.3);
        transition: all 0.3s ease, opacity 0.5s ease, transform 0.5s ease; /* Added opacity and transform transitions */
        border: 2px solid rgba(255, 255, 255, 0.1);
        /* backdrop-filter: blur(10px); Removed backdrop-filter from prompt itself */
        animation: float 2s infinite ease-in-out;
    `;

    // Add hover effect styles
    prompt.onmouseover = () => {
        prompt.style.transform = 'translate(-50%, -52%) scale(1.05)';
        prompt.style.boxShadow = '0 15px 30px rgba(0, 131, 176, 0.4)';
    };
    prompt.onmouseout = () => {
        prompt.style.transform = 'translate(-50%, -50%) scale(1)';
        prompt.style.boxShadow = '0 10px 25px rgba(0, 131, 176, 0.3)';
    };

    // Add floating animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% { transform: translate(-50%, -50%); }
            50% { transform: translate(-50%, -54%); }
            100% { transform: translate(-50%, -50%); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Add the message with icon
    prompt.innerHTML = `
        <div style="font-size: 24px; margin-bottom: 10px;">
            <i class="fas fa-tint" style="color: rgba(255, 255, 255, 0.9);"></i>
        </div>
        <div style="font-size: 18px; font-weight: 500; line-height: 1.4;">
            Ready to get your brand into everyone's hands!
        </div>
    `;
    document.body.appendChild(prompt);

    // Start audio on prompt click with fade out effect
    prompt.addEventListener('click', function() {
        audio.play().then(() => {
            // Fade out prompt
            prompt.style.opacity = '0';
            prompt.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => prompt.remove(), 500);

            // Fade out overlay
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 500);

        }).catch(error => {
            console.log('Failed to start audio:', error);
            // Still remove overlay and prompt even if audio fails
            prompt.style.opacity = '0';
            prompt.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => prompt.remove(), 500);
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 500);
        });
    });

    // Preload audio
    audio.load();
});
