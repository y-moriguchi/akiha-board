/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var common = require("./board-common.js");

function createSvg(base) {
    var me;

    function setAttrs(node, attrs) {
        var i;

        for(i in attrs) {
            if(attrs.hasOwnProperty(i)) {
                node.setAttribute(i, attrs[i]);
            }
        }
    }

    me = common.extend(base(), {
        addLine: function(toAdd, x1, y1, x2, y2, opt) {
            var node = me.createNode("line");

            node.setAttribute("x1", x1);
            node.setAttribute("y1", y1);
            node.setAttribute("x2", x2);
            node.setAttribute("y2", y2);
            setAttrs(node, opt);
            toAdd.appendChild(node);
        },

        addCircle: function(toAdd, x, y, radius, opt) {
            var node = me.createNode("circle");

            node.setAttribute("cx", x);
            node.setAttribute("cy", y);
            node.setAttribute("r", radius);
            setAttrs(node, opt);
            toAdd.appendChild(node);
        },

        addRect: function(toAdd, x, y, width, height, opt) {
            var node = me.createNode("rect");

            node.setAttribute("x", x);
            node.setAttribute("y", y);
            node.setAttribute("width", width);
            node.setAttribute("height", height);
            setAttrs(node, opt);
            toAdd.appendChild(node);
        }
    });
    return me;
}

module.exports = createSvg;

