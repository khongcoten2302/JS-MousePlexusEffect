var c = document.getElementById("canvas-plexus");
var ctx = c.getContext("2d");
var mousePos = {x: -500, y: -500};
var lastScrollY = window.scrollY;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.onresize = () => {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

window.addEventListener('mousemove', function(evt) {
    let newMousePos = getMousePos(c, evt);
    for (let i = 0; i < points.length; i+=2) {
        points[i] -= newMousePos.x - mousePos.x;
        points[i+1] -= newMousePos.y - mousePos.y;
    }

    mousePos = newMousePos;
    Draw();
}, false);

window.onscroll = e => {
    let scroll = lastScrollY - window.scrollY;
    for (let i = 1; i < points.length; i+=2) {
        points[i] += scroll;
    }

    lastScrollY = window.scrollY;
}

var points = [];
var movement = [];
const maxX = 125;
const maxY = 125;
const speed = 50;
var genPoints = 5;

while (genPoints > 0) {
    points.push(Math.random() * maxX);
    points.push(Math.random() * maxY);
    movement.push(Math.random() / 2 + 0.5 * (Math.random() > 0.5 ? 1 : -1));
    movement.push(Math.random() / 2 + 0.5 * (Math.random() > 0.5 ? 1 : -1));
    genPoints--;
}

function animate() {
    requestAnimationFrame(animate);
    Draw();
}

var lastTime = (new Date()).getTime();
var deltaTime = 0.001; // factor to get smooth and constant movement / frame interpolation

function Draw() {
        currentTime = (new Date()).getTime();
        delta = (currentTime-lastTime);
        lastTime = (new Date()).getTime();
        deltaTime = delta / 1000;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < points.length; i+=2) {
            ctx.beginPath();
            ctx.strokeStyle = '#FFFFFF';
            points[i] = (points[i] + movement[i] * speed * deltaTime);
            points[i+1] = (points[i+1] + movement[i+1] * speed * deltaTime);

            if(points[i] > maxX)
                points[i] = points[i] - maxX * 2;

            if(points[i] < -maxX)
                points[i] = 2 * maxX + points[i];

            if(points[i+1] > maxY)
                points[i+1] = points[i+1] - maxY * 2;

            if(points[i+1] < -maxY)
                points[i+1] = 2 *maxY + points[i+1];

            let DeltaX = (1 - Math.abs( points[i] / maxX ));
            let DeltaY = (1 - Math.abs( points[i+1] / maxY ));
            ctx.globalAlpha = Math.min(DeltaX, DeltaY);
            ctx.moveTo(mousePos.x, mousePos.y);
            ctx.lineTo(mousePos.x + points[i], mousePos.y + points[i+1]);
            ctx.stroke();
        }
}

animate();



function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
