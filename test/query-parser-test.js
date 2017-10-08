var assert = require("chai").assert;
var should = require('should');

var QueryParser = require('../src/query-parser');
var CollectionUtil = require('../src/collection-util');

describe("QueryParser", function () {

    var queryParser = new QueryParser();
    var collectionUtil = new CollectionUtil();

    describe('QueryParser parse queries', function () {

        it('parseQuery returns a Query from a valid query string.', function () {
            var query = queryParser.parseQuery("varon(juan)");
            assert.equal(query.getName(), "varon");
            assert(collectionUtil.equalArrays(query.getParams(), ["juan"]));
        });

        it('parseQuery returns a Query from a valid query string with multiple parameters.', function () {
            var query = queryParser.parseQuery("padre(juan, pepe)");
            assert.equal(query.getName(), "padre");
            assert(collectionUtil.equalArrays(query.getParams(), ["juan", "pepe"]));
        });

        it('parseQuery throws Exception with an invalid query string.', function () {
            assert.throws(
                function () {
                    queryParser.parseQuery("varon");
                },
                Error);
        });

    });

});