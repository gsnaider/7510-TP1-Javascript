var ParserUtil = require('../src/parser-util');

var FactValidator = function () {

    const FACT_REGEX = /^\w+\((\w+)(,\w+)*\)\.$/;
    var parserUtil = new ParserUtil();

    /**
     * Returns true if the format of fact-string is a valid fact format, or false otherwise.
     */
    this.isValidFact = function (factString) {
        return FACT_REGEX.test(parserUtil.removeWhitespace(factString));
    }

}

module.exports = FactValidator;
