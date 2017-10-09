var FactParser = require('../src/fact-parser');
var RuleParser = require('../src/rule-parser');
var QueryParser = require('../src/query-parser');
var Database = require('../src/database');

function Interpreter() {

    var database = null
    var factParser = new FactParser();
    var ruleParser = new RuleParser();
    var queryParser = new QueryParser();

    /**
     * Attempts to parse an input database of facts and rules.
     */
    this.parseDB = function (inputDatabase) {
        try {
            database =
                new Database(
                    factParser.parseFacts(inputDatabase),
                    ruleParser.parseRules(inputDatabase));
        } catch (error) {
            console.error("Error parsing database: " + error.message);
        }
    }

    /**
     * Attempts to search the inputQuery in the database, and returns true
     * if the query matches a fact or a rule, or false otherwise.
     * @throws Error if the database was not initialized, or if the input query is invalid.
     */
    this.checkQuery = function (inputQuery) {
        if (!database) {
            throw new Error("Database is not initialized");
        }
        var query = queryParser.parseQuery(inputQuery);
        return database.contains(query);
    }
}

module.exports = Interpreter;
