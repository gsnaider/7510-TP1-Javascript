var assert = require("chai").assert;
var should = require('should');

var Database = require('../src/database');
var Query = require('../src/query');
var Rule = require('../src/rule');

describe("Database", function () {

    var facts = new Set([
        "varon(juan)",
        "varon(pepe)",
        "varon(hector)",
        "varon(roberto)",
        "varon(alejandro)",
        "mujer(maria)",
        "mujer(cecilia)",
        "padre(juan,pepe)",
        "padre(juan,pepa)",
        "padre(hector,maria)",
        "padre(roberto,alejandro)",
        "padre(roberto,cecilia)"
    ]);

    var rules = {
        "hijo": new Rule("hijo", ["X", "Y"], new Set(["varon(X)", "padre(Y,X)"])),
        "hija": new Rule("hija", ["X", "Y"], new Set(["mujer(X)", "padre(Y,X)"]))
    };

    var database = null;

    beforeEach(function () {
        database = new Database(facts, rules);
    });

    describe('Database Facts', function () {

        it('contains returns true if the fact represented by query is in database.', function () {
            assert(database.contains(new Query("varon", ["juan"])));
            assert(database.contains(new Query("padre", ["juan", "pepe"])));
        });

        it('contains returns false if the fact represented by query is not in database.', function () {
            assert.isFalse(database.contains(new Query("varon", ["mario"])));
            assert.isFalse(database.contains(new Query("mujer", ["juan"])));
        });

    });

    describe('Database Rules', function () {

        it('contains returns true if the rule represented by query is in database.', function () {
            assert(database.contains(new Query("hijo", ["pepe", "juan"])));
            assert(database.contains(new Query("hija", ["cecilia", "roberto"])));
        });

        it('contains returns false if the rule represented by query is not in database.', function () {
            assert.isFalse(database.contains(new Query("hijo", ["hector", "roberto"])));
            assert.isFalse(database.contains(new Query("hija", ["maria", "roberto"])));
        });

    });

});