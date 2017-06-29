
var OFFSET_STR = '│   ';
var LAST_OFFSET_STR = '    ';
var CHILD_STR = '├── ';
var LAST_CHILD_STR = '└── ';

function dfs(node) {
    var res = '';
    var children = node.node.children;
    var keys = Object.keys(children);
    var i, isLast, child;

    for (i = 0; i < keys.length; i++) {
        isLast = i === keys.length - 1;
        child = children[keys[i]];
        // node
        res += (
            node.offset +
            (isLast ? LAST_CHILD_STR : CHILD_STR) +
            keys[i] + (child.value ? ' : ' + child.value + ' ' : '') +
            '\n'
        );
        // children
        res += dfs({
            node: child,
            offset: node.offset + (isLast ? LAST_OFFSET_STR : OFFSET_STR)
        });
    }

    return res;
}

module.exports = function(node) {
    return '[root]\n' + dfs({ node: node, offset: '' });
};
