# ⚡ HashTable — Modern JavaScript Hash Map Implementation
A fast, educational, and fully custom hash table built from scratch in modern JavaScript (ES2024+).  
Designed for performance, clarity, and deep understanding of how real hash maps work internally.

Inspired by C++ `unordered_map`, Java `HashMap`, and Python `dict`, but handcrafted with pure JS and zero dependencies.

---

## ✨ Key Features
--------------------------------------------------------------------------------------------

1. 🔥 **Modern hashing (djb2 XOR variant)** — fast and collision-resistant  
2. 🧩 **Dynamic resizing** using prime-table growth  
3. 🌀 **Fully iterable** (`for...of`, spread, Array.from)  
4. 🧱 **Separate chaining** collision resolution  
5. 📈 **Custom load factor** (default: 1.0)  
6. 🚀 **Pure JavaScript** — zero dependencies  
7. 🔍 **Supports any key type** (string, number, object via `JSON.stringify`)  
8. 🛠️ **Simple, compact, and easy to modify**  
9. 🧠 **Perfect for algorithms, data structure practice, and interviews**

---

## 📘 Public API
--------------------------------------------------------------------------------------------

```ts
class HashTable<K, V> {

  constructor(initialCapacity?: number, loadFactor?: number);

  set(key: K, value: V): void;

  get(key: K): V | undefined;

  has(key: K): boolean;

  delete(key: K): boolean;

  clear(): void;

  size(): number;

  keys(): IterableIterator<K>;

  values(): IterableIterator<V>;

  entries(): IterableIterator<[K, V]>;

  [Symbol.iterator](): IterableIterator<[K, V]>;

  mapPrint(): void;
}
```

---

## 🚀 Quick Example
--------------------------------------------------------------------------------------------

```js
import HashTable from './HashTable.js';

const ht = new HashTable(11);

// Insert values
ht.set("a", 10);
ht.set("b", 20);
ht.set("c", 30);

console.log(ht.get("a"));    // 10
console.log(ht.has("b"));    // true
console.log(ht.size());      // 3

// Iterate
for (const [key, value] of ht) {
  console.log(key, value);
}

// Delete
ht.delete("b");
console.log(ht.get("b"));    // undefined

// Clear table
ht.clear();
console.log(ht.size());      // 0
```

---

## 🧪 Running Built-in Tests
--------------------------------------------------------------------------------------------

Simply run:

```
node yourFile.js
```

You should see:

```
=== TEST START ===
...
=== TEST END ===
```

The test suite includes:

- ✔️ Simple inserts/gets  
- ✔️ Collision resolution  
- ✔️ Large batch insert  
- ✔️ Resize behavior  
- ✔️ Iterator checks  
- ✔️ Mass deletion stress test  
- ✔️ Clear and reinsertion tests  

This thoroughly validates correctness.

---

## ⚙️ Internal Algorithms
--------------------------------------------------------------------------------------------

| Component             | Purpose                          | Complexity          |
|----------------------|----------------------------------|---------------------|
| Hash Function        | Convert key → bucket index        | O(n) per key        |
| Separate Chaining    | Collision handling                | O(1) avg            |
| Resize (Prime-based) | Reduce collisions, expand table   | O(n)                |
| Iterators            | Full traversal of all buckets     | O(n)                |

Notes:

- Hash function uses **djb2 XOR** (fast and high distribution quality)  
- Resize uses next prime number for better bucket spread  
- Objects are matched via `JSON.stringify()` (simple approach)

---

## ⚙️ Design Notes
--------------------------------------------------------------------------------------------

1. Uses **prime bucket sizes** to minimize clustering.  
2. Implements **separate chaining** for clean collision resolution.  
3. Fully iterative — no recursion used internally.  
4. Memory automatically managed by JS garbage collector.  
5. Codebase easy to extend with custom hash or key comparison logic.  
6. Ideal for students learning: hashing, collisions, distribution, resizing.  

---

## 🧠 Author
--------------------------------------------------------------------------------------------

**Alen Yeghyan**  
💻 Student & Web Developer  
📍 Yerevan, Armenia  
⚡ Passionate about algorithms, data structures, and clean software design.

---

## 💬 Contribute
--------------------------------------------------------------------------------------------

Have ideas for improvement?  
Want faster hashing or WeakMap-based object keys?

Open an issue or contribute — PRs are welcome 🤝

---

## 🪶 License
--------------------------------------------------------------------------------------------

MIT © 2025 **Alen Yeghyan** — *SilentLoopLab*  
✨ Built with curiosity, discipline, and love for low-level data structures.
