const { Queue } = require('../Queue/Queue.js');

class TreeNode {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  #root;

  constructor() {
    this.#root = null;
  }

  // ======== INSERT ========

  insertI(key) {
    const newNode = new TreeNode(key);
    if (!this.#root) {
      this.#root = newNode;
      return true;
    }
    let cur = this.#root;
    while (true) {
      if (key < cur.data) {
        if (!cur.left) {
          cur.left = newNode;
          return true;
        }
        cur = cur.left;
      } else if (key > cur.data) {
        if (!cur.right) {
          cur.right = newNode;
          return true;
        }
        cur = cur.right;
      } else {
        return false;
      }
    }
  }

  insertR(key) {
    this.#root = this._recInsert(this.#root, key);
    return true;
  }

  _recInsert(node, key) {
    if (!node) return new TreeNode(key);
    if (key < node.data) node.left = this._recInsert(node.left, key);
    else if (key > node.data) node.right = this._recInsert(node.right, key);
    return node;
  }

  // ======== CONTAINS ========

  containsI(key) {
    let curr = this.#root;
    while (curr) {
      if (curr.data === key) return true;
      curr = key < curr.data ? curr.left : curr.right;
    }
    return false;
  }

  containsR(key) {
    return this._recContains(this.#root, key);
  }

  _recContains(node, key) {
    if (!node) return false;
    if (key === node.data) return true;
    return key < node.data
      ? this._recContains(node.left, key)
      : this._recContains(node.right, key);
  }

  // ======== TRAVERSALS ========

  levelOrder() {
    const result = [];
    if (!this.#root) return result;
    const queue = new Queue();
    queue.enqueue(this.#root);
    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      result.push(node.data);
      if (node.left) queue.enqueue(node.left);
      if (node.right) queue.enqueue(node.right);
    }
    return result;
  }

  inOrder() {
    const result = [];
    const stack = [];
    let curr = this.#root;
    while (curr || stack.length) {
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      curr = stack.pop();
      result.push(curr.data);
      curr = curr.right;
    }
    return result;
  }

  // ======== HEIGHT ========

  getHeight() {
    if (!this.#root) return 0;
    const queue = new Queue();
    queue.enqueue(this.#root);
    let height = 0;
    while (!queue.isEmpty()) {
      let size = queue.size();
      while (size--) {
        const node = queue.dequeue();
        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);
      }
      height++;
    }
    return height;
  }

  // ======== MIN / MAX ========

  getMinI() {
    if (!this.#root) return null;
    let curr = this.#root;
    while (curr.left) curr = curr.left;
    return curr.data;
  }

  getMinR(node = this.#root) {
    if (!node) return null;
    if (!node.left) return node.data;
    return this.getMinR(node.left);
  }

  getMaxI() {
    if (!this.#root) return null;
    let curr = this.#root;
    while (curr.right) curr = curr.right;
    return curr.data;
  }

  getMaxR(node = this.#root) {
    if (!node) return null;
    if (!node.right) return node.data;
    return this.getMaxR(node.right);
  }

  // ======== REMOVE ========

  removeR(key) {
    this.#root = this._removeR(this.#root, key);
  }

  _removeR(node, key) {
    if (!node) return null;
    if (key < node.data) node.left = this._removeR(node.left, key);
    else if (key > node.data) node.right = this._removeR(node.right, key);
    else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      const minValue = this.getMinR(node.right);
      node.data = minValue;
      node.right = this._removeR(node.right, minValue);
    }
    return node;
  }

  // ======== DEBUG ========
  print(node = this.#root, prefix = "", isLeft = true) {
    if (!node) return;
    if (node.right) {
      this.print(node.right, prefix + (isLeft ? "│   " : "    "), false);
    }
    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data);
    if (node.left) {
      this.print(node.left, prefix + (isLeft ? "    " : "│   "), true);
    }
  }

}

function testBST() {
  const tree = new BST();

  const check = (title, actual, expected) => {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    console.log(`${ok ? "✅" : "❌"} ${title}`);
    console.log("   Expected:", expected);
    console.log("   Got     :", actual, "\n");
  };

  console.log("=== INSERT (Recursive) ===");
  [5, 3, 7, 2, 4, 6, 8].forEach(v => tree.insertR(v));
  check("Level Order", tree.levelOrder(), [5, 3, 7, 2, 4, 6, 8]);

  console.log("=== IN ORDER (Iterative) ===");
  check("In Order", tree.inOrder(), [2, 3, 4, 5, 6, 7, 8]);

  console.log("=== HEIGHT ===");
  check("Height", tree.getHeight(), 3);

  console.log("=== MIN / MAX ===");
  check("Min (Iterative)", tree.getMinI(), 2);
  check("Max (Iterative)", tree.getMaxI(), 8);
  check("Min (Recursive)", tree.getMinR(), 2);
  check("Max (Recursive)", tree.getMaxR(), 8);

  console.log("=== CONTAINS ===");
  check("Contains 4 (Iterative)", tree.containsI(4), true);
  check("Contains 10 (Recursive)", tree.containsR(10), false);

  console.log("=== REMOVE (Recursive) ===");
  tree.removeR(7);
  tree.removeR(3);
  check("After Remove 7,3 → Level Order", tree.levelOrder(), [5, 4, 8, 2, 6]);
  check("In Order After Remove", tree.inOrder(), [2, 4, 5, 6, 8]);

  console.log("=== FINAL TREE STRUCTURE ===");
  tree.print();
}

testBST();

