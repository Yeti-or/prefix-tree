var expect = require('chai').expect;

var Tree = require('../lib');

it('should provide a Function', () => {
    expect(Tree).to.be.a('Function');
});

describe('set', () => {
    it('should return itself', () => {
        var tree = new Tree();
        expect(tree.set('hello', 'world')).to.be.instanceof(Tree);
    });
});

describe('get', () => {
    it('should return an Array', () => {
        var tree = new Tree();
        tree.set('hello', 'world');
        expect(tree.get('hello')).to.be.an('Array');
    });

    it('should accept no args', () => {
        var tree = new Tree();
        tree.set('hello', 'world');
        expect(tree.get()).to.be.an('Array');
        expect(tree.get()).to.be.have.lengthOf(0);
    });

    it('should add key/value', () => {
        var tree = new Tree();
        tree.set('hello', 'world');
        expect(tree.get('hello')).to.eql(['world']);
    });

    it('should return several values for prefix', () => {
        var tree = new Tree();
        tree.set('hell', 666);
        tree.set('hello', 42);
        expect(tree.get('he')).to.eql([666, 42]);
    });

    it('should not return values of different prefix', () => {
        var tree = new Tree();
        tree.set('hell', 666);
        tree.set('hello', 42);
        expect(tree.get('xo')).to.have.lengthOf(0);
    });
});

describe('constructor', () => {
    it('should create tree with several items', () => {
        var tree = new Tree([['hello', 'hello'], ['hi', 'hi'], ['ho', 'ho']])
        expect(tree.get('h')).to.have.lengthOf(3);
    });
});

describe('toString', () => {
    it('should return String', () => {
        var tree = new Tree([['hello', 'hello'], ['hi', 'hi'], ['ho', 'ho']])
        expect(tree.toString()).to.be.a('String');
    });
});
