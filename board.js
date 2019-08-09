/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var browser = require("./svg-browser.js");
var direct = require("./svg-direct.js");
var base = require("./svg-base.js");
var parser = require("./board-parser.js");
var boardDraw = require("./board-draw.js");

function drawBoard(drawer) {
    return function(input, option) {
        var parsed = parser(input),
            drawSvg = boardDraw(drawer, parsed, option);

        return drawSvg;
    }
}

module.exports = {
    drawBoardBrowser: drawBoard(base(browser)),
    drawBoardDirect: drawBoard(base(direct))
};

