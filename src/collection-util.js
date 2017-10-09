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

    this.flatten = function flatten(array) {
        return array.reduce(function (flatArray, next) {
            return flatArray.concat(Array.isArray(next) ? flatten(next) : next);
        }, []);
    }

}

module.exports = CollectionUtil;
