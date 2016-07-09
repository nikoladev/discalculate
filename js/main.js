requirejs.config({
    baseUrl: 'js'
});

requirejs([
    'lib/requestanimationframe',
    'c',
    'managers/objectmanager',
    'managers/ballmanager',
    'ball'
], function (
    requestAnimationFrame,
    C,
    ObjectManager,
    BallManager,
    Ball
) {
    'use strict';

    var canvas = C.canvas,
        ctx = C.ctx,
        i = 0,
        len = 0,
        isRunning = false,
        isPaused = false,
        objMan = new ObjectManager(),
        ballMan = new BallManager(objMan),
        managers = [objMan, ballMan],
        setup = function () {
            window.addEventListener('keydown', keyDown);
            window.addEventListener('keyup', keyUp);
            canvas.addEventListener('mousedown', mouseDown);
            canvas.addEventListener('mouseup', mouseUp);
            canvas.addEventListener('mousemove', mouseMove);
        },
        mainLoop = function () {
            if (!isRunning)
                return;

            if (!isPaused)
                for (i = 0, len = managers.length; i < len; i++)
                    managers[i].update();

            objMan.draw();

            requestAnimationFrame(mainLoop);
        },
        run = function () {
            if (!isRunning) {
                isRunning = true;
                mainLoop();
            }
        },
        keyDown = function (e) {
            ballMan.keyDown(e);
        },
        keyUp = function (e) {
            ballMan.keyUp(e);
        },
        mouseDown = function (e) {
            ballMan.mouseDown(e);
        },
        mouseUp = function (e) {
            ballMan.mouseUp(e);
        },
        mouseMove = function (e) {
            ballMan.mouseMove(e);
        };

    setup();

    run();
});