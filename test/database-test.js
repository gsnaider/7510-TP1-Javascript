var assert = require("chai").assert;
var should = require('should');

var Database = require('../src/database');
var Query = require('../src/query');

describe("Database", function () {

    var facts = [
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
    ];

    // TODO: Add rules
    var rules = [];

    var database = null;

    beforeEach(function () {
        database = new Database(facts, rules);
    });

    describe('Database contains', function () {

        it('contains returns true if the fact represented by query is in database.', function () {
            assert(database.contains(new Query("varon", ["juan"])));
            assert(database.contains(new Query("padre", ["juan", "pepe"])));
        });

        it('contains returns false if the fact represented by query is not in database.', function () {
            assert.isFalse(database.contains(new Query("varon", ["mario"])));
            assert.isFalse(database.contains(new Query("mujer", ["juan"])));
        });

    });

});