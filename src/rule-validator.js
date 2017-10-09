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

    /**
     * Returns true if the parameters declared in the rule name are the same as
     * the parameters in its facts, or false otherwise.
     * @param rule
     * @returns {boolean}
     */
    this.ruleHasValidParams = function (rule) {
        // TODO
        return true;
    }

}

module.exports = RuleValidator;
