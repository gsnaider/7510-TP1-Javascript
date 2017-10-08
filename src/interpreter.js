var FactParser = require('../src/fact-parser');

var Interpreter = function () {

    var facts = null;
    var factParser = new FactParser();

    this.parseDB = function (database) {
        try {
            facts = factParser.parseFacts(database);
        } catch (error) {
            console.error(error.getMessage);
        }
    }

    this.checkQuery = function (params) {
        if (!facts) {
            return null;
        }
        return true;
    }

}

module.exports = Interpreter;
