var Fact = function (name, params) {

  this.name = name;
  this.params = params;

  this.getName = function () {
    return this.name;
  }

  this.getParams = function () {
    return this.params;
  }

}

module.exports = Fact;
