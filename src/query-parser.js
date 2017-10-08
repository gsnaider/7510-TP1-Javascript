var QueryValidator = require('../src/query-validator');
var ParserUtil = require('../src/parser-util');
var Query = require('../src/query');


var QueryParser = function () {

    var validator = new QueryValidator();
    var parserUtil = new ParserUtil();

    /**
     * Returns a Query obtained from parsing a queryString,
     * or throws an Exception if the parsing is not possible.
     */
    this.parseQuery = function (queryString) {

        if (!validator.isValidQuery(queryString)) {
            throw new Error("Invalid query: " + queryString);
        }
        return new Query(parserUtil.parseName(queryString), parserUtil.parseParams(queryString));
    }

}

module.exports = QueryParser;
