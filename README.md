# Akiha-board

Akiha-board draws printed wiring board pattern by ASCII-art.

## How to use

### Browser
Write this HTML fragment in your HTML file.
```
<script src="akiha-board.js"></script>
```

To output printed wiring board pattern, you surround the source of the pattern in script tag
whose type attribute is text/x-akiha-board.

## Element
Akiha-board has the elements shown as follows.

|Element|Description|
|:--|:--|
|&#124; or -|wire|
|o|node|
|p or q|node; if the nodes is neighbored, the nodes will be shorted|
|+|branch of wire|
|#|fill the box|
|*|fill the box and branches the wires|

## Example
Input:
```
############
#*##########
 |        ##
 +-----+  ##
 | +-+ |  ##
 ooooooo  ##
          ##
          ##
 opppppo--*#
 +-----+  ##
```

Output:

![svg](img/README.0001.svg)

