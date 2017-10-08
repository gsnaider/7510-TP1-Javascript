var Database = function (facts, rules) {

    this.contains = function (query) {
        if (facts.has(query.toString())) {
            return true;
        }
        // TODO: Check rules.
        return false;
    }

}
module.exports = Database;
