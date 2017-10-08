var Query = function (name, params) {

    this.getName = function () {
        return name;
    }

    this.getParams = function () {
        return params;
    }

}
module.exports = Query;
