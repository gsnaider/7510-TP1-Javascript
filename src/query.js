var Query = function (name, params) {

    this.getName = function () {
        return name;
    }

    this.getParams = function () {
        return params;
    }

    this.toString = function () {
        return name + '(' + params.join() + ')';
    }

}
module.exports = Query;
