var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var FactParser = require('../src/fact-parser');
var Fact = require('../src/fact')

describe("FactParser", function () {

  var parentDatabase = [
    "varon(juan).",
    "padre(juan, pepe).",
    "hijo(X, Y) :- varon(X), padre(Y, X).",
    "hija(X, Y) :- mujer(X), padre(Y, X)."
  ];

  var incompleteDatabase = [
    "varon(juan).",
    "varon"
  ];

  var factParser = null;

  beforeEach(function () {
    // runs before each test in this block
    factParser = new FactParser();
  });

  describe('FactParser parse facts', function () {

    it('parseFacts returns a set of Facts from a valid database.', function () {
      assert(equalSets(factParser.parseFacts(parentDatabase),
        new Set([
          new Fact("varon", ["juan"]), 
          new Fact("varon", ["juan", "pepe"])])));
            
    });

    it('parseFacts throws Exception with an incomplete database.', function () {
      assert.throws(
        function() { factParser.parseFacts(incompleteDatabase); }, 
        Error);
    });

  });


  function equalSets(s1, s2) {
    if (s1.size !== s2.size) {
      return false;
    }
    for (var a of s1) {
      if (!bs.has(a)) {
        return false;
      }
    }
    return true;
  }

});