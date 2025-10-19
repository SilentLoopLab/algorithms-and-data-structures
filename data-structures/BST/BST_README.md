# 🌳 Binary Search Tree (JavaScript Implementation)

## 📘 Overview

This project implements a **Binary Search Tree (BST)** in pure  
**JavaScript**, providing both **recursive** and **iterative** algorithms  
for insertion, search, traversal, and removal.  

It is part of the  
[`SilentLoopLab/algorithms-and-data-structures`](https://github.com/SilentLoopLab/algorithms-and-data-structures)  
repository — a custom low-level educational library exploring how  
fundamental data structures and algorithms work under the hood.

---

## ⚙️ Features

- ✅ Dual implementation: **Recursive** and **Iterative**  
- ✅ Full BST operations — insert, search, remove, traversals, height  
- ✅ Uses **Queue-based BFS** and **Stack-based DFS**  
- ✅ Pretty-print visualization directly in terminal  
- ✅ Encapsulated private fields (`#root`)  
- ✅ Built-in testing with expected vs actual output  
- ✅ Optimized for clarity, readability, and algorithmic learning

---

## 🧩 Class API

### `insertI(key)`
Insert a key **iteratively** using loop traversal.

### `insertR(key)`
Insert a key **recursively** by branching left or right.

### `containsI(key)` / `containsR(key)`
Check if a key exists in the tree, both **iterative** and **recursive**.

### `levelOrder()`
Traverse **level-by-level** (BFS) using a `Queue`.  
Returns an array of keys in breadth-first order.

### `inOrder()`
Traverse **in sorted order (Left → Root → Right)** using a **stack (iterative)**.  
Returns a sorted array of all keys.

### `getHeight()`
Compute the **maximum depth** of the tree via BFS.

### `getMinI()` / `getMaxI()`
Find **minimum/maximum** key **iteratively**.

### `getMinR()` / `getMaxR()`
Find **minimum/maximum** key **recursively**.

### `removeR(key)`
Remove a node **recursively**, handling:
1. Leaf node  
2. Single child node  
3. Two-child node (replaced with inorder successor)

### `print()`
Render a visual **ASCII tree structure**:

```
│       ┌── 8
│   ┌── 7
└── 5
    │   ┌── 4
    └── 3
        └── 2
```

---

## 🌿 Tree Structure Example

```
            [5]
           /            [3]   [7]
        /  \   /        [2] [4] [6] [8]
```

Each node satisfies the BST rule:
```
For any node N:
  all keys in N.left  < N.data
  all keys in N.right > N.data
```

---

## ⚡ Performance Analysis

| Operation        | Average Case | Worst Case | Notes |
|------------------|--------------|-------------|--------|
| **Insert**       | O(log n)     | O(n)        | Balanced vs skewed tree |
| **Search**       | O(log n)     | O(n)        | Depth affects complexity |
| **Remove**       | O(log n)     | O(n)        | Includes 3 deletion cases |
| **Traversal**    | O(n)         | O(n)        | Visits all nodes |
| **Height (BFS)** | O(n)         | O(n)        | Level-order traversal |

---

## 🧠 Internal Logic

Each node is represented by a `TreeNode`:

```js
class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
```

Traversal operations use:
- **Queue** → for BFS (`levelOrder`, `getHeight`)  
- **Stack** → for DFS (`inOrder`)  

---

## 🧪 Testing

A built-in `testBST()` function validates all behaviors:

```js
function testBST() {
  const tree = new BST();
  [5, 3, 7, 2, 4, 6, 8].forEach(v => tree.insertR(v));

  console.log(tree.levelOrder()); // [5, 3, 7, 2, 4, 6, 8]
  console.log(tree.inOrder());    // [2, 3, 4, 5, 6, 7, 8]
  console.log(tree.getHeight());  // 3
  console.log(tree.getMinI());    // 2
  console.log(tree.getMaxI());    // 8

  tree.removeR(7);
  tree.removeR(3);
  console.log(tree.levelOrder()); // [5, 4, 8, 2, 6]
  tree.print();
}
```

🧩  
The test prints ✅ or ❌ along with  
**Expected** vs **Got** values — useful for algorithm validation.

---

## 🧰 Example Usage

```js
const tree = new BST();
tree.insertI(10);
tree.insertI(5);
tree.insertI(15);

console.log(tree.containsI(5));  // true
console.log(tree.inOrder());     // [5, 10, 15]
console.log(tree.getHeight());   // 2

tree.removeR(10);
tree.print();
```

---

## 🧩 Part of SilentLoopLab

> This module is part of the  
> **[SilentLoopLab/algorithms-and-data-structures](https://github.com/SilentLoopLab/algorithms-and-data-structures)**  
> project — a JavaScript laboratory for exploring performance,  
> memory organization, and clean algorithmic design.

---

## 🧑‍💻 Author

**Alen Yeghyan**  
💻 Student & Web Developer  
📍 Yerevan, Armenia  
⚡ Passionate about algorithms, data structures, and elegant software design.  

---

## 🪶 License

MIT © 2025 **Alen Yeghyan** — *SilentLoopLab*  

Part of the *algorithms-and-data-structures* repository.  
Designed for study, performance analysis, and educational clarity.
