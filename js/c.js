define('c', [], function () {
    'use strict';
    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight,
        gravity = false,
        friction = false;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    return {
        canvas: canvas,
        ctx: ctx,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        gravity: gravity,
        friction: friction
    };
});