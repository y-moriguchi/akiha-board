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

## Option
You can specify options by writing the line which begins ;#option=value.
The value is optional. If you do not specify the value, the value true is specified.

|Option|Description|
|:--|:--|
|dpi|dot per inch|
|lineWidth|width of wire by inch|
|outerRadius|radius of outer node by inch|
|innerRadius|radius of inner node by inch|
|positive|output positive pattern|
|negative|output negative pattern|

## Example
Input:
```
;#positive
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

