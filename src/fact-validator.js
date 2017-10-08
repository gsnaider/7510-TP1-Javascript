var FactValidator = function () {

    const FACT_REGEX = /^\w+\((\w+)(,\w+)*\)\.$/;

    /**
     * Returns true if the format of fact-string is a valid fact format, or false otherwise.
     */
    this.isValidFact = function (factString) {
        return FACT_REGEX.test(factString);
    }

}

module.exports = FactValidator;
