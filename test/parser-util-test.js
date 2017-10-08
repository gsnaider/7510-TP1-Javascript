var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var ParserUtil = require('../src/parser-util');

describe("ParserUtil", function () {

    var parserUtil = null;

    beforeEach(function () {
        parserUtil = new ParserUtil();
    });

    describe('ParserUtil parse name', function () {

        it('parseName returns name of inputExpression.', function () {
            assert(parserUtil.parseName("varon(juan).") === "varon");
            assert(parserUtil.parseName("padre(juan, pepe).") === "padre");
            assert(parserUtil.parseName("hijo(juan, pepe)") === "hijo");
            assert(parserUtil.parseName("hijo(X, Y) :- varon(X), padre(Y, X).") === "hijo");
        });

        it('parseParams returns the params of an input-expression.', function () {
            assert(equalArrays(parserUtil.parseParams("varon(juan)."), ["juan"]));
            assert(equalArrays(parserUtil.parseParams("padre(juan, pepe)."), ["juan", "pepe"]));
            assert(equalArrays(parserUtil.parseParams("hijo(juan, pepe)"), ["juan", "pepe"]));
            assert(equalArrays(parserUtil.parseParams("hijo(X, Y) :- varon(X), padre(Y, X)."), ["X", "Y"]));
        });

    });

    function equalArrays(a1, a2) {
        return (a1.length==a2.length && a1.every((v,i)=> v === a2[i]));
    }

});