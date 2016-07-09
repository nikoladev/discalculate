define('ball', [
    'c',
    'vector2'
], function (
    C,
    Vector2
) {
    'use strict';
    return function (pX, pY, pVelocity, pRadius) {
        var canvas = C.canvas,
            ctx = C.ctx,
            radius = pRadius ? pRadius : Math.floor(Math.random() * 11) + 15,
            pos = new Vector2(
                pX ? pX : Math.floor(Math.random() * (C.canvasWidth - radius - radius)) + radius,
                pY ? pY : Math.floor(Math.random() * (C.canvasHeight - radius - radius)) + radius
            ),
            oldPos = pos.clone(),
            velocity = pVelocity || new Vector2(0, 0),
            gravity,
            friction,
            twoPi = Math.PI + Math.PI,
            color = 'rgba(' +
            Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',' +
            Math.floor(Math.random() * 256) + ',0.5)',
            getNewVelocity = function () {
                var nx,
                    ny;
                // Reverse ball x-direction if it's heading out of screen
                if (pos.x <= radius || pos.x >= C.canvasWidth - radius)
                    nx = velocity.mirror(true).x;
                else
                    nx = pos.x - oldPos.x;
                // Idem for y-direction
                if (pos.y <= radius || pos.y >= C.canvasHeight - radius)
                    ny = velocity.mirror(false).y;
                else
                    ny = pos.y - oldPos.y;

                return new Vector2(nx, ny);
            },
            move = function () {
                velocity = getNewVelocity();
                // Apply friction and gravity if applicable
                if (friction)
                    velocity = velocity.scale(friction);
                if (gravity)
                    velocity = velocity.add(gravity);

                oldPos = pos.clone();
                pos = pos.add(velocity);
                //Prevents balls from falling through floor
                pos = pos.clip(radius, radius, C.canvasWidth - radius - radius,
                    C.canvasHeight - radius - radius);
            },
            ball = {
                init: function () {
                    pos = pos.add(velocity);
                    this.toggleGravity();
                    this.toggleFriction();
                },
                update: function () {
                    move();
                },
                draw: function () {
                    ctx.beginPath();
                    ctx.arc(pos.x, pos.y, radius, 0, twoPi);
                    ctx.fillStyle = color;
                    ctx.fill();
                },
                toggleGravity: function () {
                    if (C.gravity)
                        gravity = new Vector2(0, 0.25);
                    else
                        gravity = null;
                },
                toggleFriction: function () {
                    if (C.friction)
                        friction = 0.985;
                    else
                        friction = null;
                }
            };
        return ball;
    };
});