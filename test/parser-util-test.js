var assert = require("chai").assert;
var should = require('should');

var ParserUtil = require('../src/parser-util');
var CollectionUtil = require('../src/collection-util');

describe("ParserUtil", function () {

    var parserUtil = null;
    var collectionUtil = new CollectionUtil();

    beforeEach(function () {
        parserUtil = new ParserUtil();
    });

    describe('ParserUtil remove whitespace', function () {
        it('removeWhitespace returns string without whitespace.', function () {
            assert.equal(parserUtil.removeWhitespace("  T E S T  "), "TEST");
            assert.equal(parserUtil.removeWhitespace(" \t \n T\t E\t S  T\n \t "), "TEST");
        });
    });

    describe('ParserUtil parse name', function () {
        it('parseName returns name of inputExpression.', function () {
            assert.equal(parserUtil.parseName("varon(juan)."), "varon");
            assert.equal(parserUtil.parseName("padre(juan, pepe)."), "padre");
            assert.equal(parserUtil.parseName("hijo(juan, pepe)"), "hijo");
            assert.equal(parserUtil.parseName("hijo(X, Y) :- varon(X), padre(Y, X)."), "hijo");
        });
    });

    describe('ParserUtil parse params', function () {
        it('parseParams returns the params of an input-expression.', function () {
            assert(collectionUtil.equalArrays(parserUtil.parseParams("varon(juan)."), ["juan"]));
            assert(collectionUtil.equalArrays(parserUtil.parseParams("padre(juan, pepe)."), ["juan", "pepe"]));
            assert(collectionUtil.equalArrays(parserUtil.parseParams("hijo(juan, pepe)"), ["juan", "pepe"]));
            assert(collectionUtil.equalArrays(parserUtil.parseParams("hijo(X, Y) :- varon(X), padre(Y, X)."), ["X", "Y"]));
        });
    });

});