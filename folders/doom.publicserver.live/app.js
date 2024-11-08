let speed = 0;
let targetSpeed = 0;
let updates = [];
let totalScore = 0;

// Fetch and process updates
async function loadUpdates() {
    try {
        const response = await fetch('rawUpdates.json');
        updates = await response.json();
        
        // Calculate total score
        totalScore = updates.reduce((sum, update) => sum + update.score, 0);
        targetSpeed = totalScore;
        
        // Initialize display after loading updates
        initializeDisplay();
    } catch (error) {
        console.error('Error loading updates:', error);
    }
}

// Ensure p5.js is properly initialized
window.setup = function() {
    const canvas = createCanvas(800, 400);
    canvas.parent('canvas-container');
    loadUpdates();
}

window.draw = function() {
    // Update loading text to show current speed
    const loadingText = document.getElementById('loading-text');
    loadingText.textContent = Math.round(speed);

    // Smoothly animate speed towards target
    let easing = 0.05;
    speed = speed + (targetSpeed - speed) * easing;
    
    background(0);
    
    // Draw speedometer in upper portion
    translate(400, 180);
    
    // Main circle - now showing full circle
    stroke(255);
    strokeWeight(2);
    noFill();
    circle(0, 0, 300); // Changed from arc to full circle
    
    // Draw tick marks around the full circle
    for (let i = 0; i <= 20; i++) {
        let angle = map(i, 0, 20, 0, TWO_PI);
        push();
        rotate(angle);
        stroke(255);
        strokeWeight(3);
        line(140, 0, 150, 0);
        
        // Add numbers at major ticks - showing 500-0 range on bottom half
        if (i <= 10) {  // Only show numbers on bottom half
            push();
            translate(165, 0);
            rotate(-angle); // Rotate text back to be readable
            fill(255);
            noStroke();
            textAlign(CENTER);
            textSize(16);
            text(Math.round(map(i, 0, 10, 500, 0)), 0, 0);
            pop();
        }
        pop();
    }
    
    // Draw needle - moving from right (0) to left (500) on bottom half
    let angle = map(speed, 0, 500, 0, PI); // Range remains the same
    push();
    rotate(angle);
    stroke(255, 0, 0);
    strokeWeight(3);
    line(0, 0, 130, 0);
    pop();
    
    // Center pivot point
    fill(100);
    noStroke();
    circle(0, 0, 15);
}

// Update every minute
setInterval(showRandomUpdate, 60000);

// Click to show new update
function mousePressed() {
    showRandomUpdate();
} 