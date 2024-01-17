let secondDrops = [];
let minuteDrops = [];
let oceanLevel = 0;

function setup() {
    createCanvas(800, 600);
}


function draw() {
    background(225);

    let isAM = hour() < 12;
    let oceanColor = isAM ? color(0, 150, 255) : color(0, 71, 171); // Light blue for AM, dark blue for PM

    // Update and draw second drops
    if (frameCount % 60 == 0) { // Every second
        secondDrops.push(new Drop(random(width), 0, color(0, 0, 255), 5));
    }
    for (let i = secondDrops.length - 1; i >= 0; i--) {
        secondDrops[i].fall();
        secondDrops[i].show();
        if (secondDrops[i].y > height - oceanLevel) {
            secondDrops.splice(i, 1);
        }
    }

    if (frameCount % 3600 == 0) { // Every minute
        let currentMinute = minute();
        let minSize = map(currentMinute, 0, 59, 10, 20); // Size changes with minute
        let minColor = color(137, 207, 240); // Constant color for all minute drops
        minuteDrops.push(new Drop(random(width), 0, minColor, minSize));
    }
    for (let i = minuteDrops.length - 1; i >= 0; i--) {
        minuteDrops[i].fall();
        minuteDrops[i].show();
        if (minuteDrops[i].y > height - oceanLevel) {
            minuteDrops.splice(i, 1);
        }
    }
    // Update ocean level based on hours
    oceanLevel = map(hour() % 12, 0, 12, 0, height / 2);

    // Draw ocean
    fill(oceanColor, 150); // semi-transparent
    rect(0, height - oceanLevel, width, oceanLevel);
    }
    
    // Drop class
    class Drop {
    constructor(x, y, col, size) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.size = size;
    this.speed = 2;
    }

    fall() {
        this.y += this.speed;
    }
    
    show() {
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.size);
    }
}


