var FactParser = require('../src/fact-parser');
var QueryParser = require('../src/query-parser');
var Database = require('../src/database');

var Interpreter = function () {

    var facts = null;
    var database = null
    var factParser = new FactParser();
    var queryParser = new QueryParser();


    this.parseDB = function (inputDatabase) {
        try {
            facts = factParser.parseFacts(inputDatabase);
            // TODO: parse rules and set to database.
            database = new Database(facts, {});
        } catch (error) {
            console.error("Error parsing database: " + error.message);
        }
    }

    this.checkQuery = function (inputQuery) {
        if (!database) {
            console.warn("Database not initialized. Returning null.");
            return null;
        }
        try {
            var query = queryParser.parseQuery(inputQuery);
        } catch (error) {
            console.error(error.message);
            return null;
        }
        return database.contains(query);
    }
}

module.exports = Interpreter;
