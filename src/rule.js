function Rule(name, params, facts) {

    this.getName = function () {
        return name;
    }

    this.getParams = function () {
        return params;
    }

    this.getFacts = function () {
        return facts;
    }

}

module.exports = Rule;
