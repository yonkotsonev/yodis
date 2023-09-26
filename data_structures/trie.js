class Node {
	constructor(letter = '', parent = null) {
		this.letter = letter;
		this.parent = parent;
		this.isWord = false;
		this._children = {};
		this._size = 0;
	}

	addChild(child) {
		this._children[child.letter] = child;
		this._size += 1;
	}

	removeChild(child) {
		delete this._children[child.letter];
		this._size -= 1;
	}

	getChild(letter) {
		return this._children[letter] || null;
	}

	getSize() {
		return this._size;
	}

	getChildren() {
		return Object.values(this._children);
	}
}

class Trie {
	constructor() {
		this.root = new Node();
		this.size = 0;
	}

	add(word) {
		let current = this.root;
		for (let i = 0; i < word.length; i++) {
			if (!current.getChild(word[i])) {
				current.addChild(new Node(word[i], current));
			}

			current = current.getChild(word[i]);
		}

		current.isWord = true;
		this.size += 1;

		return this.size;
	}

	remove(word) {
		let current = this.root;
		for (let i = 0; i < word.length; i++) {
			// if the word is not in the language we return
			if (!current.getChild(word[i])) {
				return;
			}
			current = current.getChild(word[i]);
		}

		// we just set the isWord to false to remove it from the language
		current.isWord = false;

		// we will remove all letters that doesn't lead to a word
		while (current.getSize() === 0) {
			current.parent.removeChild(current);
			current = prev;
		}

		this.size -= 1;

		return this.size;
	}

	isMember(word) {
		let current = this.root;
		for (let i = 0; i < word.length; i++) {
			if (!current.getChild(word[i])) {
				return false;
			}

			current = current.getChild(word[i]);
		}

		return current.isWord;
	}

	members() {
		let members = [];
		let queue = [[this.root, '']];
		while (queue.length > 0) {
			const [current, prefix] = queue.pop(0);
			if (current.isWord) {
				members.push(`${prefix}${current.letter}`);
			}

			for (const child of current.getChildren()) {
				queue.push([child, `${prefix}${current.letter}`]);
			}
		}

		return members;
	}

	prefix(prefix) {
		let members = [];
		let current = this.root;
		for (let i = 0; i < prefix.length; i++) {
			if (!current.getChild(prefix[i])) {
				return members;
			}

			current = current.getChild(prefix[i]);
		}

		let queue = [[current, prefix]];
		while (queue.length > 0) {
			const [current, word] = queue.pop(0);
			if (current.isWord) {
				members.push(word);
			}

			for (const child of current.getChildren()) {
				queue.push([child, `${word}${child.letter}`]);
			}
		}

		return members;
	}
}

module.exports = {
	Trie
};