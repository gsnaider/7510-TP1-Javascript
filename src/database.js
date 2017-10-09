var CollectionUtil = require('../src/collection-util');

var Database = function (facts, rules) {

    var collectionUtil = new CollectionUtil();

    /**
     * Returns the rule in rules with the same name and number of parameters as query, or null if there's no such rule.
     */
    function findRule(query) {
        if (!(query.getName() in rules)) {
            return null;
        }
        rule = rules[query.getName()];
        if (rule.getParams().length !== query.getParams().length) {
            return null;
        }
        return rule;
    }

    /**
     * Returns a fact string equal to fact, but with its parameters
     * replaced by their corresponding entries from paramsMap.
     */
    function replaceParams(fact, paramsMap) {
        for (var param in paramsMap) {
            fact = fact.replace(new RegExp(param, 'g'), paramsMap[param]);
        }
        return fact;
    }

    /**
     * Returns the fact set from rule, but replacing each generic parameter (X, Y, Z, etc.)
     * with the corresponding parameter from query.
     */
    function getFactsWithQueryParams(rule, query) {
        var paramsMap = collectionUtil.newMap(rule.getParams(), query.getParams());
        var replacedFacts =
            Array.from(rule.getFacts())
                .map(function (fact) {
                    return replaceParams(fact, paramsMap)
                });
        return new Set(replacedFacts);
    }

    /**
     * Returns true if the database contains the rule specified in query,
     * as well as all of the facts associated to that rule, or false otherwise.
     */
    function containsRule(query) {
        var rule = findRule(query);
        if (rule == null) {
            return false;
        }

        var factsWithQueryParams = getFactsWithQueryParams(rule, query);
        for (var fact of factsWithQueryParams) {
            if (!facts.has(fact)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns true if the database contains the fact or rule specified in query, or false otherwise.
     */
    this.contains = function (query) {
        if (facts.has(query.toString())) {
            return true;
        }
        return containsRule(query);
    }

}
module.exports = Database;
