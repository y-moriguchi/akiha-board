(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var board = require("./board.js");
var drawSvgConcreteLib = require("./svg-browser.js");
var opt = {
    scriptType: "text/x-akiha-board"
};

function replaceChildNode(node, text) {
    var result,
        divNode;

    result = board.drawBoardBrowser(text);
    divNode = document.createElement("div");
    divNode.appendChild(result);
    node.parentNode.replaceChild(divNode, node);
}

document.addEventListener("DOMContentLoaded", function(e) {
    var i,
        scriptNodes;

    scriptNodes = document.getElementsByTagName("script");
    for(i = 0; i < scriptNodes.length;) {
        if(scriptNodes[i].type === opt.scriptType) {
            replaceChildNode(scriptNodes[i], scriptNodes[i].text.replace(/(?:\r\n|\n|\r)$/, ""));
        } else {
            i++;
        }
    }
});


},{"./board.js":5,"./svg-browser.js":7}],2:[function(require,module,exports){
/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var undef = void 0;

function isArray(anObject) {
    return Object.prototype.toString.call(anObject) === '[object Array]';
}

function deepcopy(anObject) {
    var result;

    function copyAll() {
        var i;

        for(i in anObject) {
            if(anObject.hasOwnProperty(i)) {
                result[i] = deepcopy(anObject[i]);
            }
        }
    }

    if(isArray(anObject)) {
        result = [];
        copyAll();
        return result;
    } else if(typeof anObject === 'object' && anObject !== null) {
        result = {};
        copyAll();
        return result;
    } else {
        return anObject;
    }
}

function extend(base, child) {
    var result = {},
        i;

    for(i in base) {
        if(base.hasOwnProperty(i)) {
            result[i] = base[i];
        }
    }

    for(i in child) {
        if(child.hasOwnProperty(i)) {
            result[i] = child[i];
        }
    }
    return result;
}

module.exports = {
    isArray: isArray,
    deepcopy: deepcopy,
    extend: extend
};


},{}],3:[function(require,module,exports){
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


},{"./board-common.js":2}],4:[function(require,module,exports){
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

function parseOption(input) {
    var option = {},
        substitute = input.replace(/^(?:\r\n|\r|\n)/, ""),
        pattern = /^;([^\r\n]*)(?:\r\n|\r|\n)/g,
        matched,
        matchedOption,
        matchedValue;

    while(!!(matched = pattern.exec(substitute))) {
        if(matched.index > 0) {
            break;
        }
        matchedOption = /^[ \t]*#([a-zA-Z0-9]+)(?:=(.*))?$/.exec(matched[1]);
        if(matchedOption) {
            if(matchedOption[1]) {
                if(matchedOption[2]) {
                    if(/^[0-9\.]+$/.test(matchedOption[2])) {
                        matchedValue = parseFloat(matchedOption[2]);
                    } else {
                        matchedValue = matchedOption[2];
                    }
                }
                if(matchedOption[1] === "negative") {
                    option["positive"] = false;
                } else {
                    option[matchedOption[1]] = matchedValue;
                }
            }
        }
        substitute = substitute.replace(pattern, "");
    }

    return {
        option: option,
        substitute: substitute
    };
}

function parse(input) {
    var i,
        j,
        result = {},
        optionParsed = parseOption(input),
        quadro = createQuadro(optionParsed.substitute),
        horizontal = quadro.getHorizontalStrings(),
        vertical = quadro.getVerticalStrings(),
        matched,
        hPattern = /[\+\*]-*[\+\*]|o-*[\+\*]|[\+\*]-*o|o-+o/g,
        vPattern = /[\+\*]\|*[\+\*]|o\|*[\+\*]|[\+\*]\|*o|o\|+o/g,
        connectPattern = /[pq][pq]+/g,
        circlePattern = /o/g,
        allPattern = /[#\*]/g;

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
    result.option = optionParsed.option;
    return result;
}

module.exports = parse;


},{"./board-common.js":2}],5:[function(require,module,exports){
/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var common = require("./board-common.js");
var browser = require("./svg-browser.js");
var direct = require("./svg-direct.js");
var base = require("./svg-base.js");
var parser = require("./board-parser.js");
var boardDraw = require("./board-draw.js");

function drawBoard(drawer) {
    return function(input, option) {
        var parsed = parser(input),
            drawSvg = boardDraw(drawer, parsed, common.extend(option, parsed.option));

        return drawSvg;
    }
}

module.exports = {
    drawBoardBrowser: drawBoard(base(browser)),
    drawBoardDirect: drawBoard(base(direct))
};


},{"./board-common.js":2,"./board-draw.js":3,"./board-parser.js":4,"./svg-base.js":6,"./svg-browser.js":7,"./svg-direct.js":8}],6:[function(require,module,exports){
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


},{"./board-common.js":2}],7:[function(require,module,exports){
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


},{}],8:[function(require,module,exports){
/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
function createSvgNode(ns, type) {
    var me,
        attrs = {},
        children = [];

    me = {
        setAttribute: function(attr, value) {
            attrs[attr] = value;
        },

        appendChild: function(child) {
            children.push(child);
        },

        toString: function() {
            var result = "",
                i;

            function putAttr(key, value) {
                result += " ";
                result += key;
                result += "=\"";
                result += value.toString();
                result += "\"";
            }

            result += "<";
            result += type;
            for(i in attrs) {
                if(attrs.hasOwnProperty(i)) {
                    putAttr(i, attrs[i]);
                }
            }
            if(ns && type === "svg") {
                putAttr("xmlns", ns);
            }
            result += ">\n";

            for(i = 0; i < children.length; i++) {
                result += children[i].toString();
                result += "\n";
            }
            if(me.textContent) {
                result += me.textContent;
            }

            result += "</";
            result += type;
            result += ">";
            return result;
        }
    };
    return me;
}

function createSvg() {
    var me;

    me = {
        createNode: function(type) {
            return createSvgNode("http://www.w3.org/2000/svg", type);
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


},{}]},{},[1]);
