var ParserUtil = require('../src/parser-util');

var RuleValidator = function () {

    const RULE_REGEX = /^\w+\((\w+)(,\w+)*\):-(\w+\((\w+)(,\w+)*\))(,\w+\((\w+)(,\w+)*\))*\.$/;
    var parserUtil = new ParserUtil();

    /**
     * Returns true if the format of factString is a valid fact format, or false otherwise.
     */
    this.isValidRule = function (ruleString) {
        return RULE_REGEX.test(parserUtil.removeWhitespace(ruleString));
    }

}

module.exports = RuleValidator;
