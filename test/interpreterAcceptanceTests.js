var assert = require("chai").assert;
var should = require('should');

var Interpreter = require('../src/interpreter');


describe("Parent Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    beforeEach(function () {
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)'));
        });

    });

    describe('Interpreter Invalid queries', function () {

        it('varon throws exception', function () {
            assert.throws(function () {
                interpreter.checkQuery('varon')
            }, Error, /Invalid query/);
        });

        it('maria throws exception', function () {
            assert.throws(function () {
                interpreter.checkQuery('maria')
            }, Error, /Invalid query/);
        });

        it('Empty query throws exception', function () {
            assert.throws(function () {
                interpreter.checkQuery('')
            }, Error, /Invalid query/);
        });

    });

});


describe("Number Interpreter", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "subtract(X, Y, Z) :- add(Y, Z, X)."
    ];

    var interpreter = null;

    beforeEach(function () {
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    describe('Interpreter Facts', function () {

        it('add(one, one, two) should be true', function () {
            assert(interpreter.checkQuery('add(one, one, two)'));
        });

        it('add(two, one, one) should be false', function () {
            assert(interpreter.checkQuery('add(two, one, one)') === false);
        });

    });

    describe('Interpreter Rules', function () {

        it('subtract(two, one, one) should be true', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)') === true);
        });
        it('subtract(one, one, two) should be false', function () {
            assert(interpreter.checkQuery('subtract(one, one, two)') === false);
        });

    });

    describe('Interpreter Invalid queries', function () {

        it('add throws exception', function () {
            assert.throws(function () {
                interpreter.checkQuery('add')
            }, Error, /Invalid query/);
        });

        it('one throws exception', function () {
            assert.throws(function () {
                interpreter.checkQuery('one')
            }, Error, /Invalid query/);
        });

        it('Empty query throws exception', function () {
            assert.throws(function () {
                interpreter.checkQuery('')
            }, Error, /Invalid query/);
        });

    });

});

