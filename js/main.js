/**
 * TODO:
 * - Don't use absolute numbers for size and coordinates. Use relative numbers
 * that are calculated at the start (and on resize/orientationchange?)
 * -
 */

requirejs.config({
    baseUrl: 'js'
});

requirejs([
    'lib/requestanimationframe',
    'c',
    'ball',
    'vector2',
    'managers/objectmanager',
    'text'
], function (
    requestAnimationFrame,
    C,
    Ball,
    Vector2,
    ObjectManager,
    Text
) {
    'use strict';

    var canvas = C.canvas;
    var ctx = C.ctx;
    var isRunning = false;
    var isPaused = false;
    var lock = false;
    var objMan = new ObjectManager();
    var bgColor = '#fffbe0';
    var color = '#80ff80';
    var halfColor = '#c0fdb0';
    var radius = 150;
    var colliding = null;
    var number = 3;
    var result = 0;
    var goal = 4;
    var setup = function () {
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mouseup', mouseUp);
        canvas.addEventListener('mousemove', mouseMove);
        canvas.addEventListener('touchstart', touchDown);
        canvas.addEventListener('touchend', touchUp);
        canvas.addEventListener('touchmove', touchMove);

        document.body.addEventListener('touchstart', function (evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }
            if (evt && evt.stopPropagation) {
                evt.stopPropagation();
            }
            return false;
        });
        document.body.addEventListener('touchmove', function (evt) {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }
            if (evt && evt.stopPropagation) {
                evt.stopPropagation();
            }
            return false;
        });
    };
    var mainLoop = function () {
        if (!isRunning) {
            return;
        }
        var i = 0;
        var len = managers.length;

        if (!isPaused) {
            for (i = 0, len = managers.length; i < len; i++) {
                managers[i].update();
            }
        }

        objMan.draw();

        requestAnimationFrame(mainLoop);
    };
    var run = function () {
        if (!isRunning) {
            isRunning = true;
            mainLoop();
        }
    };
    var keyDown = function (e) {
        // ballMan.keyDown(e);
    };
    var keyUp = function (e) {
        // ballMan.keyUp(e);
    };
    var mouseDown = function (e) {
        var pos = new Vector2(e.x, e.y);
        e.preventDefault();
        down(pos);
    };
    var mouseUp = function (e) {
        e.preventDefault();
        up();
    };
    var mouseMove = function (e) {
        var pos = new Vector2(e.x, e.y);
        e.preventDefault();
        move(pos);
    };
    var touchDown = function (e) {
        var pos = new Vector2(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
        down(pos);
    };
    var touchUp = function (e) {
        e.preventDefault();
        up();
    };
    var touchMove = function (e) {
        var pos = new Vector2(e.touches[0].clientX, e.touches[0].clientY);
        e.preventDefault();
        move(pos);
    };
    var down = function (pos) {
        if (!ball.position.isFartherThan(pos, ball.radius + ball.radius)) {
            lock = true;
        }
        objMan.draw();
    };
    var up = function () {
        lock = false;
        if (colliding) {
            ball.setPosition(colliding.position.clone());
            if (colliding === circles[0]) {
                result /= number;
            } else if (colliding === circles[1]) {
                result *= number;
            } else if (colliding === circles[2]) {
                result += number;
            } else if (colliding === circles[3]) {
                result -= number;
            }
        } else {
            ball.setPosition(new Vector2(C.canvasWidth / 2, C.canvasHeight - 600));
        }
        objMan.draw();
    };
    var move = function (pos) {
        if (lock) {
            moveBall(pos);
            checkCollision();
        }
        objMan.draw();
    };
    var moveBall = function (pos) {
        clipMovement(pos);
        ball.setPosition(pos);
    };
    var checkCollision = function () {
        var i = 0;
        var len = 0;
        for (i = 0, len = circles.length; i < len; ++i) {
            if (ball.collidesWith(circles[i])) {
                colliding = circles[i];
                circles[i].setColor(halfColor);
            } else {
                if (colliding === circles[i]) {
                    colliding = null;
                }
                circles[i].setColor(bgColor);
            }
        }
    };
    var clipMovement = function (pos) {
        if (pos.x - ball.radius < rect.x - ball.radius) {
            pos.x = rect.x + ball.radius - ball.radius;
        } else if (pos.x + ball.radius > rect.x + rect.width + ball.radius) {
            pos.x = rect.x + rect.width - ball.radius + ball.radius;
        }
        if (pos.y - ball.radius < rect.y - ball.radius) {
            pos.y = rect.y + ball.radius - ball.radius;
        } else if (pos.y + ball.radius > rect.y + rect.height + ball.radius) {
            pos.y = rect.y + rect.height - ball.radius + ball.radius;
        }
    };

    setup();

    var ball = new Ball({
        radius: radius,
        x: C.canvasWidth / 2,
        y: C.canvasHeight - 600,
        color: color,
        text: {
            string: '' + number,
            font: '200px sans-serif',
            baseline: 'middle',
            align: 'center',
            color: bgColor
        }
    });
    var rect = {
        x: C.canvasWidth / 2 - 300,
        y: C.canvasHeight - 900,
        width: 600,
        height: 600,
        color: bgColor,
        draw: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    var circles = [
        new Ball({
            radius: radius,
            x: rect.x,
            y: rect.y + rect.height / 2,
            color: bgColor,
            text: {
                string: '÷',
                font: '100px sans-serif',
                baseline: 'middle',
                align: 'center',
                color: '#9a9a9a'
            }
        }),
        new Ball({
            radius: radius,
            x: rect.x + rect.width,
            y: rect.y + rect.height / 2,
            color: bgColor,
            text: {
                string: '×',
                font: '100px sans-serif',
                baseline: 'middle',
                align: 'center',
                color: '#9a9a9a'
            }
        }),
        new Ball({
            radius: radius,
            x: rect.x + rect.width / 2,
            y: rect.y,
            color: bgColor,
            text: {
                string: '+',
                font: '100px sans-serif',
                baseline: 'middle',
                align: 'center',
                color: '#9a9a9a'
            }
        }),
        new Ball({
            radius: radius,
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height,
            color: bgColor,
            text: {
                string: '-',
                font: '100px sans-serif',
                baseline: 'middle',
                align: 'center',
                color: '#9a9a9a'
            }
        })
    ];
    var bg = {
        x: 0,
        y: 0,
        width: C.canvasWidth,
        height: C.canvasHeight,
        color: color,
        draw: function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    objMan.add(bg);
    objMan.add(rect);
    objMan.add(circles[0]);
    objMan.add(circles[1]);
    objMan.add(circles[2]);
    objMan.add(circles[3]);
    objMan.add(ball);
    objMan.add({
        draw: function () {
            ctx.fillStyle = bgColor;
            ctx.font = '200px sans-serif';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';
            ctx.fillText('' + result, 200, 200);
        }
    });

    objMan.draw();
});