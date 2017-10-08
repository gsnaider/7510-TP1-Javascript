var assert = require("chai").assert;
var should = require('should');

var QueryValidator = require('../src/query-validator');

describe("QueryValidator", function () {

    var queryValidator = null;

    beforeEach(function () {
        queryValidator = new QueryValidator();
    });

    describe('QueryValidator check if valid query', function () {

        it('isValidQuery returns true for valid queries.', function () {
            assert(queryValidator.isValidQuery("varon(juan)"));
            assert(queryValidator.isValidQuery("padre(juan, pepe)"));
        });

        it('isValidQuery returns false for invalid queries.', function () {
            assert.isFalse(queryValidator.isValidQuery("varon"));
            assert.isFalse(queryValidator.isValidQuery("varon()"));
            assert.isFalse(queryValidator.isValidQuery("varon(juan)."));
            assert.isFalse(queryValidator.isValidQuery("varon(juan, )"));
            assert.isFalse(queryValidator.isValidQuery("varon(juan"));
            assert.isFalse(queryValidator.isValidQuery("(juan)"));
        });

    });

});