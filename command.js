const set = require('./data_structures/set');
const trie = require('./data_structures/trie');
const map = {
    set: {
        add: [2, (memory, args) => {
            if (!memory['sets'][args[0]]) memory['sets'][args[0]] = new set.Set();
            return memory['sets'][args[0]].add(args[1]);
        }],
        rem: [2, (memory, args) => {
            if (!memory['sets'][args[0]]) return 0;

            return memory['sets'][args[0]].remove(args[1]);
        }],
        mem: [2, (memory, args) => {
            if (!memory['sets'][args[0]]) return false;

            return memory['sets'][args[0]].isMember(args[1]);
        }],
        prn: [1, (memory, args) => {
            if (!memory['sets'][args[0]]) return '';

            return memory['sets'][args[0]].members();
        }],
        union: [2, (memory, args) => {
            let set1 = memory['sets'][args[0]] ? memory['sets'][args[0]] : new set.Set();
            let set2 = memory['sets'][args[1]] ? memory['sets'][args[1]] : new set.Set();

            return set.union(set1, set2).members();
        }],
        inter: [2, (memory, args) => {
            let set1 = memory['sets'][args[0]] ? memory['sets'][args[0]] : new set.Set();
            let set2 = memory['sets'][args[1]] ? memory['sets'][args[1]] : new set.Set();

            return set.intersect(set1, set2).members();
        }],
        diff: [2, (memory, args) => {
            let set1 = memory['sets'][args[0]] ? memory['sets'][args[0]] : new set.Set();
            let set2 = memory['sets'][args[1]] ? memory['sets'][args[1]] : new set.Set();

            return set.diff(set1, set2).members();
        }],
    },
    trie: {
        add: [2, (memory, args) => {
            if (!memory['tries'][args[0]]) memory['tries'][args[0]] = new trie.Trie();
            return memory['tries'][args[0]].add(args[1]);
        }],
        rem: [2, (memory, args) => {
            if (!memory['tries'][args[0]]) return 0;

            return memory['tries'][args[0]].remove(args[1]);
        }],
        mem: [2, (memory, args) => {
            if (!memory['tries'][args[0]]) return false;

            return memory['tries'][args[0]].isMember(args[1]);
        }],
        prn: [1, (memory, args) => {
            if (!memory['tries'][args[0]]) return '';

            return memory['tries'][args[0]].members();
        }],
        prefix: [2, (memory, args) => {
            if (!memory['tries'][args[0]]) return '';

            return memory['tries'][args[0]].prefix(args[1]);
        }],
    }
};

class Command
{
    constructor(commandString) {
        let commandArray = commandString.split(' ');
        this.struct = commandArray.shift();
        this.command = commandArray.shift();
        this.args = commandArray;
    }

    isValid() {
        if (!map[this.struct]) {
            return false;
        }

        if (!map[this.struct][this.command]) {
            return false;
        }

        if (map[this.struct][this.command][0] !== this.args.length) {
            return false;
        }

        return true;
    }

    show() {
        return `${ this.struct } ${ this.command } ${ this.args }`;
    }

    execute(memory) {
        return map[this.struct][this.command][1](memory, this.args);
    }
}

module.exports = {
    Command: Command
};
