var ParserUtil = function () {

    const NAME_REGEX = /^\w+/;
    const PARAMS_REGEX = /\([^\)]*\)/;

    /**
     * Returns the name from a valid input expression.
     * A valid input expression must start a non-empty string followed by its parameters,
     * which must also be non-empty strings separated by a comma and a space, enclosed within parentheses.
     * A valid input expression must have at least one parameter.
     * Any text can follow after the parameters.
     */
    this.parseName = function (inputExpression) {
        return inputExpression.trim().match(NAME_REGEX)[0];
    }

    /**
     * Returns a list of strings containing the parameters from a valid input expression.
     * A valid input expression must start a non-empty string followed by its parameters,
     * which must also be non-empty strings separated by a comma and a space, enclosed within parentheses.
     * A valid input expression must have at least one parameter.
     * Any text can follow after the parameters.
     */
    this.parseParams = function (inputExpression) {
        return inputExpression
            .trim()
            .match(PARAMS_REGEX)[0]
            .replace("(", "")
            .replace(")", "")
            .split(",")
            .map(function (s) {
                return s.trim();
            });
    }

}

module.exports = ParserUtil;
