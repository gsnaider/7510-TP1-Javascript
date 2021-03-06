var ParserUtil = require('../src/parser-util');

function FactValidator() {

    const FACT_REGEX = /^\w+\((\w+)(,\w+)*\)\.$/;
    var parserUtil = new ParserUtil();

    /**
     * Returns true if the format of factString is a valid fact format, or false otherwise.
     */
    this.isValidFact = function (factString) {
        return FACT_REGEX.test(parserUtil.removeWhitespace(factString));
    }

}

module.exports = FactValidator;
