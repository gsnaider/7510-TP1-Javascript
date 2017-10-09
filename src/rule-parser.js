var RuleValidator = require('../src/rule-validator');
var ParserUtil = require('../src/parser-util');
var Rule = require('../src/rule');

var RuleParser = function () {

    const RULE_ASSIGN_CODE = ":-";
    const END_LINE_REGEX = /\.$/;
    const RULE_FACTS_SEPARATOR_REGEX = /,(?![^\(]*\))/;

    var validator = new RuleValidator();
    var parserUtil = new ParserUtil();

    /**
     * Returns a set containing all the facts as strings from a ruleString.
     */
    var parseRuleFacts = function (ruleString) {
        var facts =
            ruleString
                .split(RULE_ASSIGN_CODE)[1]
                .split(RULE_FACTS_SEPARATOR_REGEX)
                .map(parserUtil.removeWhitespace);
        return new Set(facts);
    }

    /**
     * Converts a ruleString to a Rule, or throws an Exception if the ruleString is invalid.
     */
    var parseRule = function (ruleString) {
        if (!validator.isValidRule(ruleString)) {
            throw new Error("Invalid rule: " + ruleString);
        }
        ruleString = ruleString.replace(END_LINE_REGEX, "");
        var rule = new Rule(parserUtil.parseName(ruleString),
            parserUtil.parseParams(ruleString),
            parseRuleFacts(ruleString));
        if (!validator.ruleHasValidParams(rule)) {
            throw new Error("Invalid rule parameters: " + ruleString);
        }
        return rule;
    }


    /**
     * Returns a map of Rules, with their name as key, containing all the rules from the database,
     * or throws an Exception if the databse is invalid.
     */
    this.parseRules = function (database) {
        var rules = {};
        for (var i = 0; i < database.length; i++) {
            var line = database[i];
            if (line.includes(RULE_ASSIGN_CODE)) {
                var rule = parseRule(line);
                rules[rule.getName()] = rule;
            }
        }
        return rules;
    }

}

module.exports = RuleParser;
