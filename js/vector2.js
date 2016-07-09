define('vector2', [

], function (

) {
    'use strict';
    /**
     * Adds a vector to the current one.
     * @param {Vector2} vector The vector to add
     * @return {Vector2}        The result
     */
    var add = function (vector) {
            var v = this.clone();
            v.x += vector.x;
            v.y += vector.y;
            return v;
        },
        /**
         * Subtract a vector from the current one.
         * @param  {Vector2} vector The vector to subtract with
         * @return {Vector2}        The result
         */
        subtract = function (vector) {
            var v = this.clone();
            v.x -= vector.x;
            v.y -= vector.y;
            return v;
        },
        /**
         * Returns the length of the vector as a scalar
         * @return {Number} Length of the vector
         */
        magnitude = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        /**
         * Scales the vector up or down
         * @param  {Number} factor How much to scale the vector
         * @return {Vector2}       The scaled Vector2
         */
        scale = function (factor) {
            return vec2(this.x * factor, this.y * factor);
        },
        /**
         * Return a copy of the current vector.
         * @return {Vector2} A copy of the current vector.
         */
        clone = function () {
            return vec2(this.x, this.y);
        },
        /**
         * Flip the vector along the y or x axis
         * @param  {Boolean} horizontal If true, flip horizontally. Else, flip vertically.
         * @return {Vector2}            The mirrored vector
         */
        mirror = function (horizontal) {
            if (horizontal) return vec2(-this.x, this.y);
            else return vec2(this.x, -this.y);
        },
        /**
         * Creates a vector in the same direction, but with a length of 1.
         * @param  {Vector2} vector Vector to normalize
         * @return {Vector2}        Normalized vector
         */
        normalize = function (vector) {
            var length = vector.magnitude();
            return vec2(vector.x / length, vector.y / length);
        },
        /**
         * Normalizes this vector
         * @return {Vector2} Normalized vector.
         */
        normal = function () {
            return this.normalize();
        },
        /**
         * Ensures the vectors stay in the provided region.
         * @param  {Number} clipX  The left wall
         * @param  {Number} clipY  The top wall
         * @param  {Number} width  The right wall
         * @param  {Number} height The bottom wall
         * @return {Vector2}       The new vector that is in bounds.
         */
        clip = function (clipX, clipY, width, height) {
            var nx = this.x,
                ny = this.y;
            if (this.x < clipX)
                nx = clipX;
            if (this.y < clipY)
                ny = clipY;
            if (this.x > clipX + width)
                nx = clipX + width;
            if (this.y > clipY + height)
                ny = clipY + height;
            return vec2(nx, ny);
        },
        vec2 = function (x, y) {
            return {
                x: x,
                y: y,
                add: add,
                subtract: subtract,
                magnitude: magnitude,
                scale: scale,
                clone: clone,
                mirror: mirror,
                normalize: normalize,
                normal: normal,
                clip: clip
            };
        };

    return vec2;
});