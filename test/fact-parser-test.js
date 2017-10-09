var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var FactParser = require('../src/fact-parser');
var CollectionUtil = require('../src/collection-util');

describe("FactParser", function () {

    var parentDatabase = [
        "varon(juan).",
        "padre(juan, pepe).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var incompleteDatabase = [
        "varon(juan).",
        "varon"
    ];

    var factParser = null;
    var collectionUtil = new CollectionUtil();

    beforeEach(function () {
        // runs before each test in this block
        factParser = new FactParser();
    });

    describe('FactParser parse facts', function () {

        it('parseFacts returns a set of facts from a valid database.', function () {
            assert(collectionUtil.equalSets(
                factParser.parseFacts(parentDatabase),
                new Set(["varon(juan)", "padre(juan,pepe)"])));
        });

        it('parseFacts throws Exception with an incomplete database.', function () {
            assert.throws(
                function () {
                    factParser.parseFacts(incompleteDatabase);
                },
                /Invalid fact: varon/);
        });

    });

});