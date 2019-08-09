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

function main() {
    var input,
        output,
        filename;

    if(process.argv.length < 3) {
        console.log("Usage: akiha-board filename");
        process.exit(2);
    }
    filename = process.argv[2];
    input = fs.readFileSync(filename, "utf8");
    output = board.drawBoardDirect(input);
    if(/\.[^\.]+$/.test(filename)) {
        filename = filename.replace(/\.[^\.]+$/, ".svg");
    } else {
        filename += ".svg";
    }
    fs.writeFileSync(filename, output.toString());
}

main();

