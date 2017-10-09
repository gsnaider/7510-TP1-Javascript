var CollectionUtil = function () {

    /**
     * Returns true if both arrays are equal, that is, they have the same
     * elements in the same order, or false otherwise.
     */
    this.equalArrays = function (a1, a2) {
        return (a1.length == a2.length && a1.every(function (v, i) {
            return v === a2[i]
        }));
    }

    /**
     * Returns true if both Sets are equal, that is, they have the same
     * elements, or false otherwise.
     */
    this.equalSets = function (s1, s2) {
        if (s1.size !== s2.size) {
            return false;
        }
        for (var a of s1) {
            if (!(s2.has(a))) {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns a single array containing all the elements from array and its inner arrays (if it has any).
     */
    this.flatten = function flatten(array) {
        return array.reduce(function (flatArray, next) {
            return flatArray.concat(Array.isArray(next) ? flatten(next) : next);
        }, []);
    }

    /**
     * Returns a map with the keys specified in keys, and values specified in values.
     */
    this.newMap = function (keys, values) {
        var map = {};
        for (i = 0; i < keys.length; i++) {
            map[keys[i]] = values[i];
        }
        return map;
    }
}

module.exports = CollectionUtil;
