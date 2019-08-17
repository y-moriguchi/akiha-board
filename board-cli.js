#!/usr/bin/env node
/*
 * akiha-board
 *
 * Copyright (c) 2019 Yuichiro MORIGUCHI
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 **/
var board = require("./board.js");
var fs = require("fs");

function parseOption(argv) {
    var argn = 2,
        matched,
        option = {};

    while(argv[argn].startsWith("--")) {
        if(argv[argn] === "--negative") {
            option.positive = false;
        } else {
            matched = /^--([a-zA-Z0-9]+)(?:=(.*))$/.exec(argv[argn]);
            if(!matched[2]) {
                option[matched[1]] = true;
            } else if(/^[0-9\.]$/.test(matched[2])) {
                option[matched[1]] = parseFloat(matched[2]);
            } else {
                option[matched[1]] = matched[2];
            }
        }
        argn++;
    }

    return {
        option: option,
        argn: argn
    };
}

function main() {
    var input,
        output,
        filename,
        parsedOption;

    if(process.argv.length < 3) {
        console.log("Usage: akiha-board [options] filename");
        process.exit(2);
    }

    parsedOption = parseOption(process.argv);
    filename = process.argv[parsedOption.argn];
    input = fs.readFileSync(filename, "utf8");
    output = board.drawBoardDirect(input, parsedOption.option);
    if(/\.[^\.]+$/.test(filename)) {
        filename = filename.replace(/\.[^\.]+$/, ".svg");
    } else {
        filename += ".svg";
    }
    fs.writeFileSync(filename, output.toString());
}

main();

