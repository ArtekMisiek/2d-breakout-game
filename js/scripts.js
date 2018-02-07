//define variables
var canvas = document.getElementById("myCanvas"); // canvas
var ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var x = canvas.width / 2;
var y = canvas.height - 30;

//ball speed and angle
var dx = 7;
var dy = -7;

var mainColor = "#0095DD" //color of ball, paddle, blocks

var ballRadius = 10; // ball radius

// define paddle
var paddleHeight = 10;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth) / 2;

// moving
var rightPressed = false;
var leftPressed = false;

// bricks (or blocks)
var brickRowCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickMinusColumn = (brickWidth - brickOffsetLeft) * 2;
var brickColumnCount = Math.round(parseInt((canvas.width - brickMinusColumn) / (brickWidth + brickPadding)));
console.log(brickMinusColumn);
console.log(brickColumnCount);
var bricks = [];

var score = 0;
var lives = 3;

var font = '16px Arial';

// check if keys are pressed or stop beeing pressed
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// mouse control
document.addEventListener("mousemove", mouseMoveHandler, false);

// handle the right or left arrow key pressed 
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// create new bricks
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// draw Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = mainColor;
    ctx.fill();
    ctx.closePath();
}

// draw Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = mainColor;
    ctx.fill();
    ctx.closePath();
}

// draw Bricks (or blocks)
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                if (c == 0) {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft + brickWidth / 2;
                    console.log(brickX);
                } else {
                    var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                }
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS! You got " + score + " points");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = font;
    ctx.fillStyle = mainColor;
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = font;
    ctx.fillStyle = mainColor;
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }

}

// main drawing on canvas function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    // check if ball hits walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        //mainColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase(); //change color when ball touches left or right wall
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        //mainColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase(); //change color when ball touches top or bottom wall

    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert('Game Over');
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = 2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // change the x or y value to negative (move in another direction -> bounce)
    x += dx;
    y += dy;

    //move paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    requestAnimationFrame(draw);
}

draw();
