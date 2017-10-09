var RuleValidator = require('../src/rule-validator');
var ParserUtil = require('../src/parser-util');
var Rule = require('../src/rule');

var RuleParser = function () {

    const RULE_ASSIGN_CODE = ":-";
    var validator = new RuleValidator();
    var parserUtil = new ParserUtil();

    /**
     * Returns a set containing all the facts as strings from a ruleString.
     */
    var parseRuleFacts = function (ruleString) {
        //TODO
        return new Set();
    }

    /**
     * Converts a ruleString to a Rule, or throws an Exception if the ruleString is invalid.
     */
    var parseRule = function (ruleString) {
        if (!validator.isValidRule(ruleString)) {
            throw new Error("Invalid rule: " + ruleString);
        }
        var rule = new Rule(parserUtil.parseName(ruleString),
            parserUtil.parseParams(ruleString),
            parseRuleFacts(ruleString));
        // TODO: Validate rule params.
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
