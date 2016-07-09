requirejs.config({
    baseUrl: 'js'
});

requirejs([
    'lib/requestanimationframe',
    'c'
], function (
    requestAnimationFrame,
    C
) {
    'use strict';

    var canvas = C.canvas;
    var ctx = C.ctx;
    var isRunning = false;
    var isPaused = false;
    // var managers = [objMan, ballMan];
    var setup = function () {
        window.addEventListener('keydown', keyDown);
        window.addEventListener('keyup', keyUp);
        canvas.addEventListener('mousedown', mouseDown);
        canvas.addEventListener('mouseup', mouseUp);
        canvas.addEventListener('mousemove', mouseMove);
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
        // ballMan.mouseDown(e);
    };
    var mouseUp = function (e) {
        // ballMan.mouseUp(e);
    };
    var mouseMove = function (e) {
        // ballMan.mouseMove(e);
    };

    setup();

    // run();
});