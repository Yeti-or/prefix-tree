
/**
 * Node for prefix-tree
 *
 * @typedef {Object} Node
 * @prop {Object} children - subTree Nodes
 * @prop {*} [value=null]
 */

/**
 * Creates new prefixed Tree
 *
 * @class
 * @param {Array<[String, *]>} [items] - array of key-value pairs
 * @returns {Tree}
 */

function Tree(items) {
    this._root = { children: {}, value: null };
    (items || []).forEach(function(item) {
        this.set(item[0], item[1])
    }, this);
}

/**
 * Find node by key
 *
 * @private
 * @param {String} key
 * @returns {Node|undefined} - node
 */
Tree.prototype._find = function(key) {
    var length = key.length;
    if (!length) {
        return undefined;
    }

    var node = this._root;
    var i;

    for (i = 0; i < length; i++) {
        if (node.children[key[i]]) {
            node = node.children[key[i]];
        } else {
            return undefined;
        }
    }

    return node;
};

/**
 * Get values by prefix
 *
 * @param {String} [prefix]
 * @returns {Array<*>}
 */
Tree.prototype.get = function(prefix) {
    var match = this._find(prefix || '');
    if (!match) { return []; }

    var nodes = [match];
    var res = [];
    var n = 0;
    var node, i, keys;

    while(n < nodes.length) {
        node = nodes[n];
        node.value && res.push(node.value);
        keys = Object.keys(node.children);
        for (i = 0; i < keys.length; i++) {
            nodes.push(node.children[keys[i]]);
        }
        n++;
    }

    return res;
};

/**
 * Add value to a prefix tree by key
 *
 * @param {String} key
 * @param {*} value
 * @returns {Tree}
 */
Tree.prototype.set = function(key, value) {
    var node = this._root;
    var i;

    for (i = 0; i < key.length; i++) {
        if (node.children[key[i]]) {
            node = node.children[key[i]];
        } else {
            node = node.children[key[i]] = { children: {} };
        }
    }

    node.value = value;
    return this;
};

var _treeToString = process.env.NODE_ENV === 'development' ?
    require('./toString') :
    function() { return '[object Tree]'; };

/**
 * For debuggability
 * 
 * @returns {String}
 */
Tree.prototype.toString = function() {
    return _treeToString(this._root);
};

module.exports = Tree;
