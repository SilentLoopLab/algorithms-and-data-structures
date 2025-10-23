# 🌲 AVL Tree (JavaScript Implementation)

## 📘 Overview

This project implements a fully functional **AVL Tree** — a **self-balancing Binary Search Tree (BST)** — written entirely in **JavaScript**.  
The tree maintains balance automatically after every insertion and deletion, ensuring that all core operations stay logarithmic in time.

It is part of the  
[`SilentLoopLab/algorithms-and-data-structures`](https://github.com/SilentLoopLab/algorithms-and-data-structures)  
repository — an educational project focused on mastering low-level data structures and algorithmic design from scratch.

---

## ⚙️ Features

- ✅ **Self-Balancing Binary Search Tree (AVL)**  
- ✅ Supports **Insert**, **Remove**, **Find**, **Min**, **Max**  
- ✅ Includes all traversal methods — InOrder, PreOrder, PostOrder, LevelOrder  
- ✅ Auto-updates node heights and rotation logic  
- ✅ Encapsulated with **private fields and methods (`#`)**  
- ✅ Built-in **visualization** for tree levels in terminal  
- ✅ Internal **balancing and rotation algorithms**: LL, RR, LR, RL  
- ✅ Simple test suite with console expectations  

---

## 🧩 Class API

### `insert(key)`
Inserts a new key while automatically rebalancing the tree if needed.

### `remove(key)`
Removes a node (handles all 3 BST deletion cases) and rebalances the tree.

### `find(key)`
Returns `true` if the key exists, otherwise `false`.

### `min()` / `max()`
Finds the smallest or largest value in the tree.

### `isBalanced()`
Checks if the tree is currently balanced.

### `size()`
Counts all nodes recursively.

### `vizualize()`
Prints the tree level-by-level (BFS), allowing you to see its structure:

```
30
20 40
10 25 35 50
```

---

## 🌿 Example Structure

After inserting `[10, 20, 30, 40, 50, 25]`,  
the AVL Tree will automatically balance itself:

```
        [30]
       /    \
    [20]    [40]
   /   \       \
 [10]  [25]   [50]
```

---

## ⚡ Performance Analysis

| Operation  | Average Case | Worst Case | Notes |
|-------------|--------------|-------------|--------|
| **Insert**  | O(log n)     | O(log n)   | Maintains balance via rotations |
| **Remove**  | O(log n)     | O(log n)   | Includes all rotation scenarios |
| **Search**  | O(log n)     | O(log n)   | Balanced depth guarantees speed |
| **Traverse**| O(n)         | O(n)       | Visits each node exactly once |
| **Height Update** | O(1)   | O(1)       | Constant-time after each insert/remove |

---

## 🧠 Internal Logic

Each node is defined as:

```js
class Node {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
```

The balancing logic relies on maintaining the **height** and **balance factor**:

```
balanceFactor(node) = height(left) - height(right)

|balanceFactor| <= 1  →  Balanced
|balanceFactor| > 1   →  Needs rotation
```

Rotation cases handled:
- **Left-Left (LL)** → Right Rotation  
- **Right-Right (RR)** → Left Rotation  
- **Left-Right (LR)** → Left then Right  
- **Right-Left (RL)** → Right then Left  

---

## 🧪 Testing

Built-in test runner (`testAVL()`) checks all major behaviors:

```js
function testAVL() {
  const avl = new AVL();

  console.log("=== INSERT TEST ===");
  [10, 20, 30, 40, 50, 25].forEach(v => avl.insert(v));
  avl.vizualize();
  console.log("✅ Balanced tree height should be 3");

  console.log("\n=== SIZE & FIND TEST ===");
  console.log("size:", avl.size(), "→ expected 6");
  console.log("find(25):", avl.find(25), "→ true");
  console.log("find(100):", avl.find(100), "→ false");

  console.log("\n=== MIN/MAX TEST ===");
  console.log("min:", avl.min(), "→ 10");
  console.log("max:", avl.max(), "→ 50");

  console.log("\n=== REMOVE TEST ===");
  avl.remove(40);
  avl.remove(10);
  avl.vizualize();
  console.log("✅ Tree remains balanced after deletions");

  console.log("\n=== IS BALANCED TEST ===");
  console.log("isBalanced:", avl.isBalanced(), "→ true");

  console.log("\n=== CLEAR TEST ===");
  avl.clear();
  console.log("empty:", avl.empty(), "→ true");
  avl.vizualize();
}
```

**Run it**:  
```bash
node AVL.js
```

You’ll see clear logs with ✅ expectations for each operation.

---

## 🧰 Example Usage

```js
const tree = new AVL();

tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(25);

console.log(tree.find(25));  // true
console.log(tree.min());     // 10
console.log(tree.max());     // 30

tree.vizualize(); // prints tree level-by-level

tree.remove(20);
console.log(tree.isBalanced()); // true
```

---

## 📦 Implementation Highlights

- Full encapsulation using private methods (`#root`, `#rotateLeft`, `#rebalance`)
- Clean separation between **interface** and **core logic**
- Perfect height maintenance via `_updateHeight()`
- Balanced after every insertion and deletion
- Readable `vizualize()` for level-order printouts

---

## 🧩 Part of SilentLoopLab

> This module is part of the  
> **[SilentLoopLab/algorithms-and-data-structures](https://github.com/SilentLoopLab/algorithms-and-data-structures)**  
> — a project exploring algorithmic clarity, data-structure fundamentals,  
> and clean JavaScript architecture.

---

## 🧑‍💻 Author

**Alen Yeghyan**  
💻 Software Developer & Student  
📍 Yerevan, Armenia  
⚡ Passionate about algorithms, data structures, and performance design  

---

## 🪶 License

MIT © 2025 **Alen Yeghyan** — *SilentLoopLab*  

Part of the *algorithms-and-data-structures* repository.  
Designed for education, benchmarking, and algorithmic clarity.
