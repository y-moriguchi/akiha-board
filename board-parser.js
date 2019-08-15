/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var common = require("./board-common.js");
var undef = void 0;

function createQuadro(inputString) {
    var input = inputString.split(/\r\n|\r|\n/),
        cellMatrix = [],
        maxLength = 0,
        i,
        j,
        me;

    for(i = 0; i < input.length; i++) {
        maxLength = maxLength < input[i].length ? input[i].length : maxLength;
    }

    for(i = 0; i < input.length; i++) {
        cellMatrix[i] = [];
        for(j = 0; j < maxLength; j++) {
            cellMatrix[i][j] = {
                ch: j < input[i].length ? input[i].charAt(j) : ' '
            };
        }
    }

    me = {
        getSizeX: function() {
            return maxLength;
        },

        getSizeY: function() {
            return cellMatrix.length;
        },

        getHorizontalStrings: function() {
            var result = [],
                i,
                j;

            for(i = 0; i < cellMatrix.length; i++) {
                result[i] = "";
                for(j = 0; j < maxLength; j++) {
                    result[i] += cellMatrix[i][j].ch;
                }
            }
            return result;
        },

        getVerticalStrings: function() {
            var result = [],
                i,
                j;

            for(j = 0; j < maxLength; j++) {
                result[j] = "";
            }

            for(i = 0; i < cellMatrix.length; i++) {
                for(j = 0; j < maxLength; j++) {
                    result[j] += cellMatrix[i][j].ch;
                }
            }
            return result;
        }
    };
    return me;
}

function parse(input) {
    var i,
        j,
        quadro = createQuadro(input),
        horizontal = quadro.getHorizontalStrings(),
        vertical = quadro.getVerticalStrings(),
        matched,
        hPattern = /[\+\*]-*[\+\*]|o-*[\+\*]|[\+\*]-*o|o-+o/g,
        vPattern = /[\+\*]\|*[\+\*]|o\|*[\+\*]|[\+\*]\|*o|o\|+o/g,
        connectPattern = /[pq][pq]+/g,
        circlePattern = /o/g,
        allPattern = /[#\*]/g,
        result = {};

    result.horizontalLines = [];
    result.verticalLines = [];
    result.circles = [];
    result.alls = [];

    for(i = 0; i < horizontal.length; i++) {
        while(!!(matched = hPattern.exec(horizontal[i]))) {
            result.horizontalLines.push({
                x1: matched.index,
                x2: hPattern.lastIndex - 1,
                y: i
            });
            hPattern.lastIndex--;
        }

        while(!!(matched = connectPattern.exec(horizontal[i]))) {
            result.horizontalLines.push({
                x1: matched.index,
                x2: connectPattern.lastIndex - 1,
                y: i
            });
            for(j = matched.index; j < connectPattern.lastIndex; j++) {
                result.circles.push({
                    x: j,
                    y: i
                });
            }
        }

        while(!!(matched = circlePattern.exec(horizontal[i]))) {
            result.circles.push({
                x: matched.index,
                y: i
            });
        }

        while(!!(matched = allPattern.exec(horizontal[i]))) {
            result.alls.push({
                x: matched.index,
                y: i
            });
        }
    }

    for(i = 0; i < vertical.length; i++) {
        while(!!(matched = vPattern.exec(vertical[i]))) {
            result.verticalLines.push({
                y1: matched.index,
                y2: vPattern.lastIndex - 1,
                x: i
            });
            vPattern.lastIndex--;
        }

        while(!!(matched = connectPattern.exec(vertical[i]))) {
            result.verticalLines.push({
                y1: matched.index,
                y2: connectPattern.lastIndex - 1,
                x: i
            });
            for(j = matched.index; j < connectPattern.lastIndex; j++) {
                result.circles.push({
                    x: i,
                    y: j
                });
            }
        }
    }

    result.sizeX = quadro.getSizeX();
    result.sizeY = quadro.getSizeY();
    return result;
}

module.exports = parse;

