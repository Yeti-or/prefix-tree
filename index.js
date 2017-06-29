
function Node() {
    this.children = {};
    this.value = null;
}

Node.prototype.toString = function() {
    return this.value ? ' : ' + this.value + ' ' : '';
};

function Tree() {
    this._root = new Node();
}

/**
 * Find node by key
 *
 * @param {String} key
 * @returns {Node|null} - node
 */
Tree.prototype.find = function(key) {
    var node = this._root;
    var i;

    for (i = 0; i < key.length; i++) {
        if (node.children[key[i]]) {
            node = node.children[key[i]];
        } else {
            return null;
        }
    }

    return node;
};

/**
 * Find nodes that matches prefix
 *
 * @param {String} prefix
 * @returns {Array<Node>}
 */
Tree.prototype.match = function(prefix) {
    var match = this.find(prefix);
    if (!match) { return []; }

    var nodes = [match];
    var n = 0;
    var node, i, keys;

    while(n < nodes.length) {
        node = nodes[n];
        keys = Object.keys(node.children);
        for (i = 0; i < keys.length; i++) {
            nodes.push(node.children[keys[i]]);
        }
        n++;
    }

    return nodes;
};

/**
 * Insert value to a prefix tree by key
 *
 * @param {String} key
 * @param {*} value
 */
Tree.prototype.insert = function(key, value) {
    var node = this._root;
    var i;

    for (i = 0; i < key.length; i++) {
        if (node.children[key[i]]) {
            node = node.children[key[i]];
        } else {
            node = node.children[key[i]] = new Node();
        }
    }

    node.value = value;
};

/**
 * For debuggability
 */
Tree.prototype.toString = function() {
    if (process.env.NODE_ENV === 'development') {
        return require('./toString')(this._root);
    } else {
        return this;
    }
};

module.exports = Tree;
