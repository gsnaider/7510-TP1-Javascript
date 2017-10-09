var ParserUtil = require('../src/parser-util');
var CollectionUtil = require('../src/collection-util');

function RuleValidator() {

    const RULE_REGEX = /^\w+\((\w+)(,\w+)*\):-(\w+\((\w+)(,\w+)*\))(,\w+\((\w+)(,\w+)*\))*\.$/;
    var parserUtil = new ParserUtil();
    var collectionUtil = new CollectionUtil();

    /**
     * Returns true if the format of factString is a valid fact format, or false otherwise.
     */
    this.isValidRule = function (ruleString) {
        return RULE_REGEX.test(parserUtil.removeWhitespace(ruleString));
    }

    /**
     * Returns true if the parameters declared in the rule name are the same as
     * the parameters in its facts, or false otherwise.
     */
    this.ruleHasValidParams = function (rule) {
        return collectionUtil.equalSets(
            new Set(rule.getParams()),
            new Set(
                collectionUtil.flatten(
                    Array.from(rule.getFacts()).map(parserUtil.parseParams))));
    }

}

module.exports = RuleValidator;
