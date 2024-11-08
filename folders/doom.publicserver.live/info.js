class UpdateDisplay {
    constructor() {
        this.currentIndex = 0;
        this.displayDuration = 5000; // 5 seconds per update
        this.fadeTime = 1000; // 1 second fade transition
        this.thumbnail = document.getElementById('entry-thumbnail');
        this.textElement = document.getElementById('entry-text');
        this.isTransitioning = false;
    }

    start() {
        if (updates.length === 0) return;
        this.showUpdate(0);
        setInterval(() => this.nextUpdate(), this.displayDuration);
    }

    showUpdate(index) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        // Fade out current content
        this.thumbnail.classList.remove('fade-in');
        this.textElement.classList.remove('fade-in');

        setTimeout(() => {
            const update = updates[index];
            
            // Update content
            this.thumbnail.src = update.image;
            this.textElement.innerHTML = `
                <h3>${update.text}</h3>
                <p>Score: ${update.score}</p>
            `;

            // Fade in new content
            this.thumbnail.classList.add('fade-in');
            this.textElement.classList.add('fade-in');
            
            this.currentIndex = index;
            this.isTransitioning = false;
        }, this.fadeTime);
    }

    nextUpdate() {
        const nextIndex = (this.currentIndex + 1) % updates.length;
        this.showUpdate(nextIndex);
    }
}

// Initialize the display after updates are loaded
function initializeDisplay() {
    const display = new UpdateDisplay();
    display.start();
} 