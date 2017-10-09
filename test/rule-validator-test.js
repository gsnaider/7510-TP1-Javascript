var assert = require("chai").assert;
var should = require('should');

var Rule = require('../src/rule');
var RuleValidator = require('../src/rule-validator');

describe("RuleValidator", function () {

    var ruleValidator = null;

    beforeEach(function () {
        ruleValidator = new RuleValidator();
    });

    describe('RuleValidator check if valid rules', function () {

        it('isValidRule returns true for valid rules.', function () {
            assert(ruleValidator.isValidRule("hijo(X, Y) :- varon(X), padre(Y, X)."));
            assert(ruleValidator.isValidRule("hija(X, Y) :- mujer(X), padre(Y, X)."));
            assert(ruleValidator.isValidRule("subtract(X, Y, Z) :- add(Y, Z, X)."));
            assert(ruleValidator.isValidRule("subtract(X, Y, Z) :- add(Y, Z, X)."));
            assert(ruleValidator.isValidRule("wet_floor(X) :- rain(X)."));
        });

        it('isValidRule returns false for invalid rules.', function () {
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y)."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- ."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon()."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon(X), ."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon(X), padre."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon(X), padre()."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon(X), padre(X, )."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X, Y) :- varon(X), padre(X, Y)"));
            assert.isFalse(ruleValidator.isValidRule("hijo :- varon(X), padre(X, Y)."));
            assert.isFalse(ruleValidator.isValidRule("hijo() :- varon(X), padre(X, Y)."));
            assert.isFalse(ruleValidator.isValidRule("hijo(X) varon(X), padre(X, Y)."));
        });

    });


    describe('RuleValidator check if valid rule params', function () {

        it('ruleHasValidParams returns true for rules with the same parameters in its name and in its facts.',
            function () {
                assert(ruleValidator.ruleHasValidParams(
                    new Rule(
                        "hijo",
                        ["X", "Y"],
                        new Set(["varon(X)", "padre(X, Y)"]))));
                assert(ruleValidator.ruleHasValidParams(
                    new Rule(
                        "subtract",
                        ["X", "Y", "Z"],
                        new Set(["add(Y, Z, X)"]))));
                assert(ruleValidator.ruleHasValidParams(
                    new Rule(
                        "wet_floor",
                        ["X"],
                        new Set(["rain(X)"]))));
            });

        it('ruleHasValidParams returns false for rules with different parameters in its name than in its facts.',
            function () {
                assert.isFalse(ruleValidator.ruleHasValidParams(
                    new Rule("hijo", ["X"], new Set(["varon(Y)"]))));
                assertisFalse(ruleValidator.ruleHasValidParams(
                    new Rule(
                        "hijo",
                        ["X"],
                        new Set(["varon(X)", "padre(X, Y)"]))));
                assertisFalse(ruleValidator.ruleHasValidParams(
                    new Rule(
                        "hijo",
                        ["X", "Y"],
                        new Set(["varon(Y)"]))));
            });

    });

});