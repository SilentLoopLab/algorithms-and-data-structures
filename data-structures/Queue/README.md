# Queue (JavaScript Implementation)

## 📘 Overview

This project implements a **Queue (FIFO)** data structure in pure
**JavaScript**, using circular-buffer logic and dynamic resizing.\
It is part of a custom low-level collection library inspired by C++ STL
containers.

------------------------------------------------------------------------

## ⚙️ Features

-   ✅ Circular buffer implementation (efficient front/back operations)
-   ✅ Dynamic capacity growth (`#ensureCapacity`)
-   ✅ Private class fields for encapsulation
-   ✅ Support for iteration (`for...of`)
-   ✅ Safe error handling
-   ✅ Utility methods: `front`, `back`, `size`, `isEmpty`, `clear`,
    `toArray`

------------------------------------------------------------------------

## 🧩 Class API

### `enqueue(value)`

Adds an element to the back of the queue.

### `dequeue()`

Removes and returns the element at the front.\
Throws an error if the queue is empty.

### `front()`

Returns the front element without removing it.

### `back()`

Returns the last element without removing it.

### `size()`

Returns the current number of elements in the queue.

### `isEmpty()`

Returns `true` if the queue contains no elements.

### `clear()`

Resets the queue to an empty state.

### `toArray()`

Returns a snapshot array of all current elements in queue order.

### `[Symbol.iterator]()`

Enables iteration with `for...of`.

------------------------------------------------------------------------

## 🧠 Internal Logic

The queue uses **modular arithmetic** for index wrapping:

``` js
this.#tail = (this.#tail + 1) % this.#capacity;
this.#head = (this.#head + 1) % this.#capacity;
```

When the internal buffer fills up, `#ensureCapacity()` doubles its size
and reorders elements starting from `head`.

------------------------------------------------------------------------

## 🧪 Testing

A built-in test function is provided:

``` js
function testQueue() {
  const q = new Queue(4);
  console.log("=== Queue Test Start ===");

  q.enqueue(10);
  q.enqueue(20);
  q.enqueue(30);
  q.enqueue(40);
  q.enqueue(50); // triggers capacity growth
  console.log(q.toArray()); // [10, 20, 30, 40, 50]

  console.log("Dequeued:", q.dequeue());
  console.log("Front:", q.front());
  console.log("Back:", q.back());

  console.log("Iterating:");
  for (const e of q) console.log(e);

  q.clear();
  console.log("Is empty?", q.isEmpty());

  try {
    q.dequeue();
  } catch (e) {
    console.log("Caught expected error:", e.message);
  }

  console.log("=== Queue Test End ===");
}
```

Run this function after class definition to verify all behaviors.

------------------------------------------------------------------------

## 🧰 Example Usage

``` js
const q = new Queue();
q.enqueue("A");
q.enqueue("B");
q.enqueue("C");

console.log(q.dequeue()); // "A"
console.log(q.front());   // "B"
console.log(q.back());    // "C"
```

## 🧠 Author

---

**Alen Yeghyan**
💻 Student & Web Developer
📍 Yerevan, Armenia
⚡ Passionate about algorithms, data structures, and elegant code design.


---

## 🪶 License

MIT © 2025 **Alen Yeghyan** — *SilentLoopLab*

---

Implementation designed as part of custom data structures library for
study and performance practice.
