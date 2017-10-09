var assert = require("chai").assert;
var should = require('should');

var CollectionUtil = require('../src/collection-util');

describe("CollectionUtil", function () {

    var collectionUtil = new CollectionUtil();

    describe('CollectionUtil compare arrays', function () {
        it('equalArrays returns true for equal arrays.', function () {
            assert(collectionUtil.equalArrays([], []));
            assert(collectionUtil.equalArrays([1], [1]));
            assert(collectionUtil.equalArrays([1, 3], [1, 3]));
            assert(collectionUtil.equalArrays([1, 3, 1], [1, 3, 1]));
            assert(collectionUtil.equalArrays([""], [""]));
            assert(collectionUtil.equalArrays(["test"], ["test"]));
            assert(collectionUtil.equalArrays(["test1", "test2"], ["test1", "test2"]));
        });

        it('equalArrays returns false for distinct arrays.', function () {
            assert.isFalse(collectionUtil.equalArrays([1], []));
            assert.isFalse(collectionUtil.equalArrays([1], [2]));
            assert.isFalse(collectionUtil.equalArrays([1], [1, 3]));
            assert.isFalse(collectionUtil.equalArrays([1, 3, 1], [1, 4, 1]));
            assert.isFalse(collectionUtil.equalArrays([""], ["", ""]));
            assert.isFalse(collectionUtil.equalArrays(["test"], ["test1"]));
            assert.isFalse(collectionUtil.equalArrays(["test1", "test2"], ["test1"]));
            assert.isFalse(collectionUtil.equalArrays(["test1", "test2"], ["test1", "test3"]));
        });
    });

    describe('CollectionUtil compare Sets', function () {
        it('equalSets returns true for equal Sets.', function () {
            assert(collectionUtil.equalSets(new Set(), new Set()));
            assert(collectionUtil.equalSets(new Set([1]), new Set([1])));
            assert(collectionUtil.equalSets(new Set([1, 3]), new Set([3, 1])));
            assert(collectionUtil.equalSets(new Set([""]), new Set([""])));
            assert(collectionUtil.equalSets(new Set(["test"]), new Set(["test"])));
            assert(collectionUtil.equalSets(new Set(["test1", "test2"]), new Set(["test1", "test2"])));
        });

        it('equalSets returns false for distinct Sets.', function () {
            assert.isFalse(collectionUtil.equalSets(new Set([1]), new Set()));
            assert.isFalse(collectionUtil.equalSets(new Set([1]), new Set([2])));
            assert.isFalse(collectionUtil.equalSets(new Set([1]), new Set([3, 1])));
            assert.isFalse(collectionUtil.equalSets(new Set([""]), new Set(["test"])));
            assert.isFalse(collectionUtil.equalSets(new Set(["test"]), new Set(["test1"])));
            assert.isFalse(collectionUtil.equalSets(new Set(["test1", "test2"]), new Set(["test1"])));
            assert.isFalse(collectionUtil.equalSets(new Set(["test1", "test2"]), new Set(["test1", "test3"])));
        });
    });

    describe('CollectionUtil flatten arrays', function () {
        it('flatten returns flattened array.', function () {
            assert(collectionUtil.equalArrays(collectionUtil.flatten([]), []));
            assert(collectionUtil.equalArrays(collectionUtil.flatten([1, 2, 3]), [1, 2, 3]));
            assert(collectionUtil.equalArrays(collectionUtil.flatten([[1], [2], [3]]), [1, 2, 3]));
            assert(collectionUtil.equalArrays(collectionUtil.flatten([[1], 2, [3]]), [1, 2, 3]));
            assert(collectionUtil.equalArrays(collectionUtil.flatten([[1, 2], 3, [4, 5, 6], []]), [1, 2, 3, 4, 5 ,6]));
        });
    });

});