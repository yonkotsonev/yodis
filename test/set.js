let assert = require('assert');
let set = require('../data_structures/set');

describe('Set', () => {
    describe('#constructor', () => {
        it('should create a set with 0 size', () => {
            let setObject = new set.Set();

            assert.strictEqual(setObject.size, 0);
        });
    });

    describe('#add', () => {
        it('should increase size to 1 after adding first element', () => {
            let setObject = new set.Set();

            assert.strictEqual(setObject.add(1), 1);
        });

        it('should not increase size after adding the same element', () => {
            let setObject = new set.Set();

            setObject.add(1);

            assert.strictEqual(setObject.add(1), 1);
        });
    });

    describe('#remove', () => {
        it('should not do anything when removed a value from empty set', () => {
            let setObject = new set.Set();
            assert.strictEqual(setObject.remove(1), 0);
        });

        it('should not do anything when removed a value that is not in set', () => {
            let setObject = new set.Set();
            setObject.add(2);
            assert.strictEqual(setObject.remove(1), 1);
        });

        it('should decrease size when is removed a value that is root with no children', () => {
            let setObject = new set.Set();
            setObject.add(2);
            assert.strictEqual(setObject.remove(2), 0);
        });

        it('should decrease size when is removed a value that is root with 1 left child', () => {
            let setObject = new set.Set();
            setObject.add(2);
            setObject.add(1);
            assert.strictEqual(setObject.remove(2), 1);
        });

        it('should decrease size when is removed a value that is root with 1 right child', () => {
            let setObject = new set.Set();
            setObject.add(2);
            setObject.add(3);
            assert.strictEqual(setObject.remove(2), 1);
        });

        it('should decrease size when is removed a value that is root with 2 children', () => {
            let setObject = new set.Set();
            setObject.add(2);
            setObject.add(3);
            setObject.add(1);
            assert.strictEqual(setObject.remove(2), 2);
        });

        it('should decrease size when is removed a value that is not root with 2 children', () => {
            let setObject = new set.Set();
            setObject.add(10);
            setObject.add(6);
            setObject.add(20);
            setObject.add(15);
            setObject.add(25);
            assert.strictEqual(setObject.remove(20), 4);
        });
    });

    describe('#isMember', () => {
        it('should return false when value is not a member of the set', () => {
            let setObject = new set.Set();

            assert.strictEqual(setObject.isMember(1), false);
        });

        it('should return true when value is a member of the set', () => {
            let setObject = new set.Set();

            setObject.add(1);

            assert.strictEqual(setObject.isMember(1), true);
        });

        it('should return false when value is not a member of the set string', () => {
            let setObject = new set.Set();

            assert.strictEqual(setObject.isMember('test'), false);
        });

        it('should return true when value is a member of the set string', () => {
            let setObject = new set.Set();

            setObject.add('test');

            assert.strictEqual(setObject.isMember('test'), true);
        });
    });

    describe('#members', () => {
        it('should return empty array when there is no members', () => {
            let setObject = new set.Set();

            assert.strictEqual(setObject.members().length, 0);
        });

        it('should return array when there is members', () => {
            let setObject = new set.Set();

            setObject.add(1);

            assert.strictEqual(setObject.members().length, 1);
            assert.deepEqual(setObject.members(), [1]);
        });
    });

    describe('#union', () => {
        it('should return empty array when union is called with two empty sets', () => {
            let setObject1 = new set.Set();
            let setObject2 = new set.Set();

            assert.strictEqual(set.union(setObject1, setObject2).size, 0);
        });

        it('should return new set with all values from two sets', () => {
            let setObject1 = new set.Set();
            setObject1.add(1);
            let setObject2 = new set.Set();
            setObject2.add(2);

            assert.strictEqual(set.union(setObject1, setObject2).size, 2);
        });

        it('should return new set with all unique values from two sets', () => {
            let setObject1 = new set.Set();
            setObject1.add(1);
            let setObject2 = new set.Set();
            setObject2.add(1);

            assert.strictEqual(set.union(setObject1, setObject2).size, 1);
        });
    });

    describe('#diff', () => {
        it('should return empty array when diff is called with two empty sets', () => {
            let setObject1 = new set.Set();
            let setObject2 = new set.Set();

            assert.strictEqual(set.diff(setObject1, setObject2).size, 0);
        });

        it('should return new set with all values from set 1 that are not in set 2 no duplicates', () => {
            let setObject1 = new set.Set();
            setObject1.add(1);
            let setObject2 = new set.Set();
            setObject2.add(2);

            assert.strictEqual(set.diff(setObject1, setObject2).size, 1);
        });

        it('should return new set with all values from set 1 that are not in set 2', () => {
            let setObject1 = new set.Set();
            setObject1.add(1);
            let setObject2 = new set.Set();
            setObject2.add(1);

            assert.strictEqual(set.diff(setObject1, setObject2).size, 0);
        });
    });

    describe('#intersect', () => {
        it('should return empty array when intersect is called with two empty sets', () => {
            let setObject1 = new set.Set();
            let setObject2 = new set.Set();

            assert.strictEqual(set.intersect(setObject1, setObject2).size, 0);
        });

        it('should return new set with all values from set 1 that are in set 2 no duplicates', () => {
            let setObject1 = new set.Set();
            setObject1.add(1);
            let setObject2 = new set.Set();
            setObject2.add(2);

            assert.strictEqual(set.intersect(setObject1, setObject2).size, 0);
        });

        it('should return new set with all values from set 1 that are in set 2 duplicates', () => {
            let setObject1 = new set.Set();
            setObject1.add(1);
            let setObject2 = new set.Set();
            setObject2.add(1);

            assert.strictEqual(set.intersect(setObject1, setObject2).size, 1);
        });
    });
});
