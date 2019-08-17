/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var common = require("./board-common.js");
var defaultOption = {
    dpi: 90,
    xMargin: 0,
    yMargin: 0,
    lineWidth: 0.03,
    outerRadius: 0.035,
    innerRadius: 0.01,
    rectMargin: 0,
    positive: true
};

function drawBoard(drawer, parsed, option) {
    var svg,
        opt = common.extend(defaultOption, option ? option : {}),
        line,
        circle,
        lineColorBlack = opt.positive ? "black" : "white",
        lineColorWhite = opt.positive ? "white" : "black",
        i;

    svg = drawer.createCanvas((parsed.sizeX * 0.1 + opt.xMargin * 2) * opt.dpi,
            (parsed.sizeY * 0.1 + opt.yMargin * 2) * opt.dpi,
            "0 0 " + (parsed.sizeX + opt.xMargin * 20) + " " + (parsed.sizeY + opt.yMargin * 20));

    if(!opt.positive) {
        drawer.addRect(svg, 0, 0, parsed.sizeX + opt.xMargin * 20, parsed.sizeY + opt.yMargin * 20, {
            "fill": "black"
        });
    }

    for(i = 0; i < parsed.horizontalLines.length; i++) {
        line = parsed.horizontalLines[i];
        drawer.addLine(svg, line.x1 + opt.xMargin * 10 + 0.5, line.y + opt.yMargin * 10 + 0.5, line.x2 + opt.xMargin * 10 + 0.5, line.y + opt.yMargin * 10 + 0.5, {
            "stroke": lineColorBlack,
            "stroke-width": opt.lineWidth * 10,
            "stroke-linecap": "round"
        });
    }

    for(i = 0; i < parsed.verticalLines.length; i++) {
        line = parsed.verticalLines[i];
        drawer.addLine(svg, line.x + opt.xMargin * 10 + 0.5, line.y1 + opt.yMargin * 10 + 0.5, line.x + opt.xMargin * 10 + 0.5, line.y2 + opt.yMargin * 10 + 0.5, {
            "stroke": lineColorBlack,
            "stroke-width": opt.lineWidth * 10,
            "stroke-linecap": "round"
        });
    }

    for(i = 0; i < parsed.circles.length; i++) {
        circle = parsed.circles[i];
        drawer.addCircle(svg, circle.x + opt.xMargin * 10 + 0.5, circle.y + opt.yMargin * 10 + 0.5, opt.outerRadius * 10, {
            "fill": lineColorBlack
        });
        drawer.addCircle(svg, circle.x + opt.xMargin * 10 + 0.5, circle.y + opt.yMargin * 10 + 0.5, opt.innerRadius * 10, {
            "fill": lineColorWhite
        });
    }

    for(i = 0; i < parsed.alls.length; i++) {
        drawer.addRect(svg, parsed.alls[i].x + (opt.xMargin - opt.rectMargin) * 10, parsed.alls[i].y + (opt.yMargin - opt.rectMargin) * 10, 1 + opt.rectMargin * 10, 1 + opt.rectMargin * 10, {
            "fill": lineColorBlack
        });
    }
    return svg;
}

module.exports = drawBoard;

