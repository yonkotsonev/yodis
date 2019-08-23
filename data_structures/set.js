class Node 
{
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class Set 
{
    constructor() {
        this.size = 0;
        this.root = null;
    }

    add(value) {
        let set = (root, node) => {
            if (node.value === root.value) return false;

            if (node.value > root.value) {
                if (root.right) return set(root.right, node);
                
                root.right = node;
            }  else {
                if (root.left) return set(root.left, node);

                root.left = node;
            }

            node.parent = root;

            return true;
        };

        let node = new Node(value);
        if (this.size === 0) {
            this.root = node;
            this.size++;
        } else {
            if (set(this.root, node)) this.size++;
        }

        return this.size;
    }

    remove(value) {
        let node = find(value, this.root);
        if (node) {
            if (node.right === null && node.left === null) {
                if (node === this.root) {
                    this.root = null;
                } else {
                    if (node.parent.left === node) node.parent.left = null;
                    else node.parent.right = null;
                }
            }
            else if (node.right === null) {
                if (node === this.root) {
                    this.root = node.left;
                } else {
                    if (node.parent.left === node) node.parent.left = node.left;
                    else node.parent.right = node.left;
                }
            }
            else if (node.left === null) {
                if (node === this.root) {
                    this.root = node.right;
                } else {
                    if (node.parent.left === node) node.parent.left = node.right;
                    else node.parent.right = node.right;
                }
            }
            else {
                let minRight = node.right;
                while (minRight.left) {
                    minRight = minRight.left;
                }

                node.value = minRight.value;
                minRight.parent.left = null;
            }

            this.size--;
        }

        return this.size;
    }

    isMember(value) {
        return find(value, this.root) !== null;
    }

    members() {
        let result = [];
        let current = this.root;
        let queue = current ? [current] : [];
        while (queue.length) {
            current = queue.pop();
            result.push(current.value);
            if (current.left) queue.unshift(current.left);
            if (current.right) queue.unshift(current.right);
        }

        return result;
    }
}

function find(value, current) {
    if (!current) return null;
    if (current.value === value) return current;
    if (value > current.value) return find(value, current.right);

    return find(value, current.left);
}

function union(set1, set2) {
    let result = new Set();
    set1.members().forEach((item) => {
        result.add(item);
    });

    set2.members().forEach((item) => {
        result.add(item);
    });

    return result;
}

function diff(set1, set2) {
    let result = new Set();
    set1.members().forEach((item) => {
        if (!set2.isMember(item)) result.add(item);
    });

    return result;
}

function intersect(set1, set2) {
    let result = new Set();
    set1.members().forEach((item) => {
        if (set2.isMember(item)) result.add(item);
    });

    return result;
}

module.exports = {
    Set: Set,
    union: union,
    diff: diff,
    intersect: intersect
};
