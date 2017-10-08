var FactParser = require('../src/fact-parser');
var QueryParser = require('../src/query-parser');

var Interpreter = function () {

    var facts = null;
    var factParser = new FactParser();
    var queryParser = new QueryParser();


    this.parseDB = function (database) {
        try {
            facts = factParser.parseFacts(database);
        } catch (error) {
            console.error("Error parsing database: " + error.message);
        }
    }

    this.checkQuery = function (inputQuery) {
        if (!facts) {
            return null;
        }
        try {
            var query = queryParser.parseQuery(inputQuery);
        } catch (error) {
            console.error(error.message);
            return null;
        }
        return true;
    }

}

module.exports = Interpreter;
