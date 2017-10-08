var FactValidator = require('../src/fact-validator');

var FactParser = function () {

  const RULE_ASSIGN_CODE = ":-";
  var validator = new FactValidator();

  var parseFact = function(factString) {
    if (!validator.isValidFact(factString)) {
      throw new Error("Invalid fact.");
    }

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
