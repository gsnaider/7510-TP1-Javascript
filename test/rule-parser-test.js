var assert = require("chai").assert;
var should = require('should');

var Rule = require('../src/rule');
var RuleParser = require('../src/rule-parser');
var CollectionUtil = require('../src/collection-util');

describe("RuleParser", function () {

    var parentDatabase = [
        "varon(juan).",
        "padre(juan, pepe).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var incompleteDatabase = [
        "varon(juan).",
        "hijo(X, Y) :- varon"
    ];

    var invalidDatabase = [
        "varon(juan).",
        "hijo(X) :- varon(X), padre(Y, X)."
    ];

    var ruleParser = null;
    var collectionUtil = new CollectionUtil();

    beforeEach(function () {
        ruleParser = new RuleParser();
    });

    describe('RuleParser parse rules', function () {

        it('parseRules returns a set of rules from a valid database.', function () {
            var rules = ruleParser.parseRules(parentDatabase);

            assert('hijo' in rules);
            var rule1 = rules['hijo'];
            assert.equal(rule1.getName(), 'hijo');
            assert(collectionUtil.equalArrays(rule1.getParams(), ['X', 'Y']));
            assert(collectionUtil.equalSets(rule1.getFacts(), new Set(['varon(X)', 'padre(Y,X)'])));

            assert('hija' in rules);
            var rule2 = rules['hija'];
            assert.equal(rule2.getName(), 'hija');
            assert(collectionUtil.equalArrays(rule2.getParams(), ['X', 'Y']));
            assert(collectionUtil.equalSets(rule2.getFacts(), new Set(['mujer(X)', 'padre(Y,X)'])));

        });

        it('parseRules throws Exception with an incomplete database.', function () {
            assert.throws(
                function () {
                    ruleParser.parseRules(incompleteDatabase);
                },
                /Invalid rule: hijo\(X, Y\) :- varon/);
        });

        it('parseRules throws Exception with an invalid database.', function () {
            assert.throws(
                function () {
                    ruleParser.parseRules(invalidDatabase);
                },
                /Invalid rule parameters: hijo\(X\) :- varon\(X\), padre\(Y, X\)/);
        });
    });

});