requirejs.config({
    baseUrl: 'js'
});

requirejs([
    'lib/requestanimationframe',
    'c',
    'ball',
    'vector2',
    'managers/objectmanager'
], function (
    requestAnimationFrame,
    C,
    Ball,
    Vector2,
    ObjectManager
) {
    'use strict';

    var canvas = C.canvas;
    var ctx = C.ctx;
    var isRunning = false;
    var isPaused = false;
    var lock = false;
    var objMan = new ObjectManager();
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
        e.preventDefault();
        if (!ball.position.isFartherThan(new Vector2(e.x, e.y), ball.radius + ball.radius)) {
            lock = true;
        }
        // objMan.draw();
    };
    var mouseUp = function (e) {
        e.preventDefault();
        lock = false;
        // objMan.draw();
    };
    var mouseMove = function (e) {
        e.preventDefault();
        if (lock) {
            ball.position.x = e.x;
            ball.position.y = e.y;
        }
        ctx.clearRect(0, 0, C.canvasWidth, C.canvasHeight);
        ball.draw();
        // objMan.draw();
    };
    var touchDown = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        e.preventDefault();
        if (!ball.position.isFartherThan(new Vector2(x, y), ball.radius + ball.radius)) {
            lock = true;
        }
        // objMan.draw();
    };
    var touchUp = function (e) {
        e.preventDefault();
        lock = false;
        // objMan.draw();
    };
    var touchMove = function (e) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        e.preventDefault();
        if (lock) {
            ball.position.x = x;
            ball.position.y = y;
        }
        ctx.clearRect(0, 0, C.canvasWidth, C.canvasHeight);
        ball.draw();
        // objMan.draw();
    };

    setup();

    var ball = new Ball({
        radius: 100,
        x: 100,
        y: 100
    });

    // objMan.add(ball);
    ball.draw();

});