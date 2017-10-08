var FactValidator = require('../src/fact-validator');
var ParserUtil = require('../src/parser-util');

var FactParser = function () {

    const RULE_ASSIGN_CODE = ":-";
    const END_LINE_REGEX = /\.$/;
    var validator = new FactValidator();
    var parserUtil = new ParserUtil();

    /**
     * Returns the fact as a string without whitespace and without the end-line character,
     * or throws an Error if the fact has an invalid format.
     */
    var parseFact = function (factString) {

        if (!validator.isValidFact(factString)) {
            throw new Error("Invalid fact.");
        }
        return parserUtil.removeWhitespace(factString).replace(END_LINE_REGEX, "");
    }

    /**
     * Returns a set containing all the facts from the database as strings,
     * or throws an Exception if the databse is invalid.
     */
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
