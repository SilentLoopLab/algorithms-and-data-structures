# ⚡ DynamicArray — Modern JavaScript Implementation

A fast, clean, and resizable **Dynamic Array** built entirely in modern **ES2024 JavaScript**, inspired by `std::vector` from C++.
It combines low-level control with high-level usability — supporting both classic vector operations and modern JS methods.

---

## ✨ Key Features
💎 **Efficient growth** — automatic capacity doubling
🔒 **Private fields** for true encapsulation (`#size`, `#capacity`, `#arr`)
⚙️ **Typed storage** — backed by a performant `Uint32Array`
🧩 **Full iterator protocol** — supports `for...of`, spread, and `Array.from()`
🧠 **Functional API** — includes `map`, `filter`, `reduce`, and more
💥 **Zero dependencies** — pure, minimal, and TypeScript-friendly
🚀 **C++-like behavior** — dynamic resizing, amortized O(1) push

---

## 🏗 Internal Representation
| Component | Description |
|------------|-------------|
| **Buffer** | Backed by a `Uint32Array` for memory efficiency |
| **Size** | Number of currently valid elements |
| **Capacity** | Allocated space (automatically grows) |
| **Growth Policy** | Capacity doubles when exceeded |
| **Type Restriction** | Stores only unsigned 32-bit integers (`0 … 2³²−1`) |

---

## 📘 Type Definition
```ts
class DynamicArray {
  constructor(initialCapacity: number);
  size(): number;
  capacity(): number;
  empty(): boolean;
  reserve(n: number): void;
  shrinkToFit(): void;
  clear(): void;

  // Access
  at(index: number): number;
  setValue(index: number, value: number): void;
  front(): number | undefined;
  back(): number | undefined;
  toArray(): number[];

  // Modifiers
  push_back(value: number): void;
  pop_back(): void;
  insert(pos: number, value: number): void;
  erase(pos: number): void;
  resize(n: number, fill?: number): void;
  swap(i: number, j: number): void;

  // Iteration
  [Symbol.iterator](): Iterator<number>;
  values(): Iterator<number>;
  keys(): Iterator<number>;
  entries(): Iterator<[number, number]>;
  forEach(fn: (v: number, i: number, arr: DynamicArray) => void, thisArg?: any): void;

  // Higher-order methods
  map(fn: (v: number, i: number, arr: DynamicArray) => number): DynamicArray;
  filter(fn: (v: number, i: number, arr: DynamicArray) => boolean): DynamicArray;
  reduce(fn: (acc: number, v: number, i: number, arr: DynamicArray) => number, init?: number): number;
  some(fn: (v: number, i: number, arr: DynamicArray) => boolean): boolean;
  every(fn: (v: number, i: number, arr: DynamicArray) => boolean): boolean;
  find(fn: (v: number, i: number, arr: DynamicArray) => boolean): number | undefined;
  findIndex(fn: (v: number, i: number, arr: DynamicArray) => boolean): number;
  includes(value: number): boolean;
}
```

---

## 🚀 Quick Example
```js
import { DynamicArray } from './dynamicArray.js';

const da = new DynamicArray(2);

da.push_back(10);
da.push_back(20);
da.push_back(30); // triggers automatic resize

da.insert(1, 99); // [10, 99, 20, 30]
da.erase(2);      // [10, 99, 30]

console.log([...da]); // → [10, 99, 30]

// Functional methods
const squares = da.map(x => x * x);
console.log(squares.toArray()); // → [100, 9801, 900]

const sum = da.reduce((acc, x) => acc + x, 0);
console.log(sum); // → 139
```

---

## ⚙️ Complexity Table
| Operation | Time Complexity | Notes |
|------------|----------------|-------|
| `push_back()` | Amortized **O(1)** | Doubles capacity when full |
| `pop_back()` | **O(1)** | Removes last element |
| `insert()` / `erase()` | **O(n)** | Shifts elements |
| `resize()` / `reserve()` | **O(n)** | Reallocates buffer |
| `map()` / `filter()` / `reduce()` | **O(n)** | Iterates over logical size |

---

## 🧠 Design Highlights
1. **Amortized Growth:** Resizes only when needed — typically doubling capacity.
2. **Memory Safety:** Unused cells are never exposed; iteration stops at logical size.
3. **Typed Buffer:** Uses `Uint32Array` for predictable layout and speed.
4. **Modern JS Feel:** Fully iterable, supports functional array patterns.
5. **C++ Spirit:** Low-level control, explicit resize, reserve, and capacity management.

---

## 🧪 Testing
Run directly with Node.js:
```bash
node dynamicArray.js
```
Expected output:
```
[10, 99, 30]
[100, 9801, 900]
139
```
✅ All operations tested successfully.

---

## 🪶 Author
**Alen Yeghyan**
💻 Student & Web Developer
📍 Yerevan, Armenia
⚡ Passionate about algorithms, data structures, and clean code.

---

## 📜 License
MIT © 2025 **Alen Yeghyan** — *SilentLoopLab*
✨ Built with patience, precision, and a love for low-level programming.
