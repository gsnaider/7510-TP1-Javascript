var assert = require("chai").assert;
var should = require('should');

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

    var ruleParser = null;
    var collectionUtil = new CollectionUtil();

    beforeEach(function () {
        ruleParser = new RuleParser();
    });

    describe('RuleParser parse rules', function () {

        it('parseRules returns a set of rules from a valid database.', function () {
            assert(collectionUtil.equalSets(
                ruleParser.parseRules(parentDatabase),
                new Set(["varon(juan)", "padre(juan,pepe)"])));
        });

        it('parseRules throws Exception with an incomplete database.', function () {
            assert.throws(
                function () {
                    ruleParser.parseRules(incompleteDatabase);
                },
                /Invalid rule: hijo\(X, Y\) :- varon/);
        });

    });

});