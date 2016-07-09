define('managers/objectmanager', [
    'c'
], function (
    C
) {
    'use strict';
    return function () {
        var canvas = C.canvas;
        var ctx = C.ctx;
        var objects = [];
        var update = function () {
            var i = 0;
            var len = 0;
            for (i = 0, len = objects.length; i < len; i++) {
                // preventing errors
                if (!objects[i]) {
                    console.log('Index ' + i + ' in objects returns null.');
                    continue;
                }

                if (objects[i].update) {
                    objects[i].update();
                }
            }
        };
        var draw = function () {
            var i = 0;
            var len = 0;
            // Clear screen befor drawing
            ctx.clearRect(0, 0, C.canvasWidth, C.canvasHeight);
            for (i = 0, len = objects.length; i < len; i++) {
                if (objects[i].draw) {
                    objects[i].draw();
                }
            }
        };
        var add = function (object) {
            objects.push(object);
            //Keeping the amount of on screen objects low for performance
            if (objects.length > 300) {
                objects.shift();
            }
            if (object.init) {
                object.init();
            }
        };
        var module = {
            add: add,
            update: update,
            draw: draw,
            /**
             * Clears all objects from screen
             */
            clearBalls: function () {
                objects.length = 0;
            },
            toggleGravity: function () {
                var i = 0;
                var len = 0;
                C.gravity = !C.gravity;
                for (i = 0, len = objects.length; i < len; i++) {
                    objects[i].toggleGravity();
                }
            },
            toggleFriction: function () {
                var i = 0;
                var len = 0;
                C.friction = !C.friction;
                for (i = 0, len = objects.length; i < len; i++) {
                    objects[i].toggleFriction();
                }
            }
        };

        return module;
    };
});