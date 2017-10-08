var ParserUtil = require('../src/parser-util');

var QueryValidator = function () {

    const QUERY_REGEX = /^\w+\((\w+)(,\w+)*\)$/;
    var parserUtil = new ParserUtil();

    /**
     * Returns true if the format of queryString is a valid query format, or false otherwise.
     */
    this.isValidQuery = function (queryString) {
        return QUERY_REGEX.test(parserUtil.removeWhitespace(queryString));
    }

}

module.exports = QueryValidator;
