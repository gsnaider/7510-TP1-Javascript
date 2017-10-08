var assert = require("chai").assert;
var should = require('should');

var FactValidator = require('../src/fact-validator');

describe("FactValidator", function () {

    var factValidator = null;

    beforeEach(function () {
        factValidator = new FactValidator();
    });

    describe('FactValidator check if valid facts', function () {

        it('isValidFact returns true for valid facts.', function () {
            assert(factValidator.isValidFact("varon(juan)."));
            assert(factValidator.isValidFact("padre(juan, pepe)."));
        });

        it('isValidFact returns false for invalid facts.', function () {
            assert.isFalse(factValidator.isValidFact("varon"));
            assert.isFalse(factValidator.isValidFact("varon."));
            assert.isFalse(factValidator.isValidFact("varon()."));
            assert.isFalse(factValidator.isValidFact("varon(juan)"));
            assert.isFalse(factValidator.isValidFact("varon(juan,)."));
            assert.isFalse(factValidator.isValidFact("varon(juan."));
            assert.isFalse(factValidator.isValidFact("(juan)."));
        });

    });

});