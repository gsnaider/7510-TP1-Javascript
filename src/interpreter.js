var FactParser = require('../src/fact-parser');
var RuleParser = require('../src/rule-parser');
var QueryParser = require('../src/query-parser');
var Database = require('../src/database');

var Interpreter = function () {

    var database = null
    var factParser = new FactParser();
    var ruleParser = new RuleParser();
    var queryParser = new QueryParser();

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

    this.checkQuery = function (inputQuery) {
        if (!database) {
            throw new Error("Database is not initialized");
        }
        var query = queryParser.parseQuery(inputQuery);
        return database.contains(query);
    }
}

module.exports = Interpreter;
