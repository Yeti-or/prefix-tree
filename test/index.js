var expect = require('chai').expect;

var Tree = require('../lib');

it('should provide a Function', () => {
    expect(Tree).to.be.a('Function');
});
