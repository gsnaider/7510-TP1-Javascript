var FactValidator = require('../src/fact-validator');
var ParserUtil = require('../src/parser-util');
var Fact = require('../src/fact')

var FactParser = function () {

    const RULE_ASSIGN_CODE = ":-";
    var validator = new FactValidator();
    var parserUtil = new ParserUtil();

    var parseFact = function (factString) {
        if (!validator.isValidFact(factString)) {
            throw new Error("Invalid fact.");
        }
        return new Fact(parserUtil.parseName(factString), parserUtil.parseParams(factString));
    }

    this.parseFacts = function (database) {
        var facts = new Set();
        for (var i = 0; i < database.length; i++) {
            var line = database[i];
            if (!line.includes(RULE_ASSIGN_CODE)) {
                facts.add(parseFact(line));
            }
        }
        return facts;
    }

}

module.exports = FactParser;
