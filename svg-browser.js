/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
function createSvg() {
    var me;

    me = {
        createNode: function(type) {
            return document.createElementNS("http://www.w3.org/2000/svg", type);
        },

        createCanvas: function(x, y, viewBox) {
            var node = me.createNode("svg");

            node.setAttribute("width", x);
            node.setAttribute("height", y);
            node.setAttribute("viewBox", viewBox);
            return node;
        }
    };
    return me;
}

module.exports = createSvg;

