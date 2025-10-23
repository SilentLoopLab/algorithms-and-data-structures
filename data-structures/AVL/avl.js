const { Queue } = require('../Queue/Queue.js');

class Node {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  #root;
  constructor(val = null) {
    this.#root = val !== null ? new Node(val) : null;
  }
  //----INTERFACE-----
  insert(key) {
    this.#root = this.#insert(this.#root, key);
  }

  remove(key) {
    this.#root = this.#remove(this.#root, key);
  }

  find(key) {
    if (!this.#root) return false;
    let curr = this.#root;
    while (curr) {
      if (key < curr.data) {
        curr = curr.left;
      } else if (key > curr.data) {
        curr = curr.right;
      } else {
        return true;
      }
    }
    return false;
  }

  min(node = this.#root) {
    if (!node) return null;
    let curr = node;
    while (curr.left) {
      curr = curr.left;
    }
    return curr.data;
  }

  max(node = this.#root) {
    if (!node) return null;
    let curr = node;
    while (curr.right) {
      curr = curr.right;
    }
    return curr.data;
  }

  //----HELPERS-------
  _updateHeight(node) {
    return 1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right));
  }

  inOrderTraversal(node, cmp) {
    if (!node) return;
    this.inOrderTraversal(node.left, cmp);
    cmp(node);
    this.inOrderTraversal(node.right, cmp);
  }

  preOrderTraversal(node, cmp) {
    if (!node) return;
    cmp(node);
    this.preOrderTraversal(node.left, cmp);
    this.preOrderTraversal(node.right, cmp);
  }

  postOrderTraversal(node, cmp) {
    if (!node) return;
    this.postOrderTraversal(node.left, cmp);
    this.postOrderTraversal(node.right, cmp);
    cmp(node);
  }

  levelOrder(cmp) {
    if (!this.#root) return;
    const queue = new Queue;
    queue.enqueue(this.#root);
    while (!queue.isEmpty()) {
      let size = queue.size();
      while (size--) {
        const node = queue.dequeue();
        cmp(node);
        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);
      }
    }
  }

  isBalanced(node = this.#root) {
    if (!node) return true;
    const bf = this.#getBalanceFactor(node);
    if (Math.abs(bf) > 1) return false;
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  clear() {
    this.#root = null;
  }

  //----OTHERS--------
  size(node = this.#root) {
    if (!node) return 0;
    return 1 + this.size(node.left) + this.size(node.right);
  }

  empty() {
    return this.#root === null;
  }

  vizualize() {
    if (!this.#root) {
      console.log("Empty AVL TREE");
      return;
    }
    const queue = new Queue();
    queue.enqueue(this.#root);
    while (!queue.isEmpty()) {
      let size = queue.size();
      let level = [];
      while (size--) {
        const node = queue.dequeue();
        level.push(node.data);
        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);
      }
      console.log(level.join(" "));
    }
  }


  //----PRIVATE-------
  #insert(node, key) {
    if (!node) return new Node(key);

    if (key < node.data) {
      node.left = this.#insert(node.left, key);
    } else if (key > node.data) {
      node.right = this.#insert(node.right, key);
    } else {
      return node;
    }
    node.height = this._updateHeight(node);
    node = this.#rebalance(node);
    return node;
  }

  #remove(node, key) {
    if (!node) return null;

    if (key < node.data) {
      node.left = this.#remove(node.left, key);
    } else if (key > node.data) {
      node.right = this.#remove(node.right, key);
    } else {
      if (!node.right && !node.left) {
        return null;
      } else if (!node.right) {
        return node.left;
      } else if (!node.left) {
        return node.right;
      } else {
        const maxData = this.max(node.left);
        node.data = maxData;
        node.left = this.#remove(node.left, maxData);
      }
    }
    node.height = this._updateHeight(node);
    node = this.#rebalance(node);
    return node;
  }

  #rebalance(node) {
    const bf = this.#getBalanceFactor(node);
    if (bf > 1 && this.#getBalanceFactor(node.left) >= 0) {
      node = this.#rotateRight(node);
    } else if (bf > 1 && this.#getBalanceFactor(node.left) < 0) {
      node = this.#rotateLeftRight(node);
    } else if (bf < -1 && this.#getBalanceFactor(node.right) <= 0) {
      node = this.#rotateLeft(node);
    } else if (bf < -1 && this.#getBalanceFactor(node.right) > 0) {
      node = this.#rotateRightLeft(node);
    }
    return node;
  }

  #getHeight(node) {
    return node ? node.height : 0
  }

  #getBalanceFactor(node) {
    if (!node) return 0;
    return this.#getHeight(node.left) - this.#getHeight(node.right);
  }

  #rotateLeft(node) {
    if (!node || !node.right) return node;
    const newRoot = node.right;
    const tmp = newRoot.left;
    newRoot.left = node;
    node.right = tmp;
    node.height = this._updateHeight(node);
    newRoot.height = this._updateHeight(newRoot);
    return newRoot;
  }

  #rotateRight(node) {
    if (!node || !node.left) return node;
    const newRoot = node.left;
    const tmp = newRoot.right;
    node.left = tmp;
    newRoot.right = node;
    newRoot.height = this._updateHeight(newRoot);
    node.height = this._updateHeight(node);
    return newRoot;
  }

  #rotateLeftRight(node) {
    node.left = this.#rotateLeft(node.left);
    return this.#rotateRight(node);
  }

  #rotateRightLeft(node) {
    node.right = this.#rotateRight(node.right);
    return this.#rotateLeft(node);
  }

}

function testAVL() {
  const avl = new AVL();

  console.log("=== INSERT TEST ===");
  [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
  avl.vizualize();
  console.log("✅ Ожидается сбалансированное дерево высотой 3");

  console.log("\n=== SIZE & FIND TEST ===");
  console.log("size:", avl.size(), "→ ожидается 6");
  console.log("find(25):", avl.find(25), "→ ожидается true");
  console.log("find(100):", avl.find(100), "→ ожидается false");

  console.log("\n=== MIN/MAX TEST ===");
  console.log("min:", avl.min(), "→ ожидается 10");
  console.log("max:", avl.max(), "→ ожидается 50");

  console.log("\n=== REMOVE TEST ===");
  avl.remove(40);
  avl.remove(10);
  avl.vizualize();
  console.log("✅ После удаления 40 и 10 структура должна оставаться сбалансированной");

  console.log("\n=== IS BALANCED TEST ===");
  console.log("isBalanced:", avl.isBalanced(), "→ ожидается true");

  console.log("\n=== CLEAR TEST ===");
  avl.clear();
  console.log("empty:", avl.empty(), "→ ожидается true");
  avl.vizualize();
}

testAVL();

