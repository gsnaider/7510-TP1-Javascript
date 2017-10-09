var assert = require("chai").assert;
var should = require('should');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var incompleteDb = [
        "varon(juan).",
        "varon"
    ];

    var interpreter = null;

    beforeEach(function () {
        interpreter = new Interpreter();
        interpreter.parseDB(incompleteDb);
    });

    describe('Interpreter incomplete db', function () {

        it('checkQuery throws exception', function () {
            assert.throws(function() {interpreter.checkQuery('varon(juan)')}, Error, /Database is not initialized/);
        });

    });

});


