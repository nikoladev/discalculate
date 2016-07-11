define('text', [
    'c',
    'vector2'
], function (
    C,
    Vector2
) {
    'use strict';
    return function (data) {
        data = data || {};
        var canvas = C.canvas;
        var ctx = C.ctx;
        var string = data.string || '';
        var font = data.font || '32px sans-serif';
        var baseline = data.baseline || 'bottom';
        var align = data.align || 'left';
        var color = data.color || '#9a9a9a';
        var position = data.position || new Vector2(0, 0);
        var draw = function () {
            ctx.fillStyle = color;
            ctx.font = font;
            ctx.textBaseline = baseline;
            ctx.textAlign = align;
            ctx.fillText(string, position.x, position.y);
        };
        var text = {
            draw: draw
        };

        return text;
    };
});