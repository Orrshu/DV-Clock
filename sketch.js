let secondDrops = [];
let minuteOceanLevel = 0;
let hourOceanLevel = 0;
let lastSecond = -1;
let lastMinute = -1;
let lastHour = -1;

function setup() {
    createCanvas(800, 600);
    lastHour = hour();
    lastMinute = minute();
    lastSecond = second();

    hourOceanLevel = map(lastHour, 0, 23, 0, height); 
    minuteOceanLevel = map(lastMinute, 0, 59, 0, 50); 
}

function draw() {
    background(225);

    let currentSecond = second();
    let currentMinute = minute();
    let currentHour = hour();
    let isAM = currentHour < 12;

    let minuteOceanColor = isAM ? color(137, 207, 240) : color(0, 150, 255);
    let hourOceanColor = isAM ? color(100, 149, 237) : color(25, 25, 112);

    if (currentSecond !== lastSecond) {
        secondDrops.push(new Drop(random(width), 0, color(0, 0, 255), 5));
        lastSecond = currentSecond;
    }
    for (let i = secondDrops.length - 1; i >= 0; i--) {
        secondDrops[i].fall();
        secondDrops[i].show();
        if (secondDrops[i].y > height - minuteOceanLevel) {
            secondDrops.splice(i, 1);
        }
    }

    if (currentMinute !== lastMinute) {
        minuteOceanLevel = map(currentMinute, 0, 59, 0, 50);
        lastMinute = currentMinute;
    }

    if (currentHour !== lastHour) {
        hourOceanLevel = map(currentHour, 0, 23, 0, height);
        lastHour = currentHour;
    }

   fill(hourOceanColor);
   rect(0, height - hourOceanLevel, width, hourOceanLevel);

   let minuteOceanY = height - hourOceanLevel - minuteOceanLevel; // Adjust Y position of minute ocean
    fill(minuteOceanColor);
    rect(0, minuteOceanY, width, minuteOceanLevel);

}

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


