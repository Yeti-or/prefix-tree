
/*
   [*] - n - i - r - v - a - n - a
    |    |
    m    i
    |    |
    u    k
    |
    j
    |
    u

*/

function Node() {
    this.children = {};
    this.value = null;
}

/**
 * Get all descendants of node
 * 
 * @returns {Array<Node>}
 */
Node.prototype.descendants = function() {
    var nodes = [this];
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
    return match ? match.descendants() : [];
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
            node._key = key.slice(0, i + 1);
        }
    }

    node.value = value;
};

Tree.prototype.toString = function() {
    return [this._root].concat(this._root.descendants());
};

module.exports = Tree;
