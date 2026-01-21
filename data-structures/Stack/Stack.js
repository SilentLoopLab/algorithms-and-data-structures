class Stack {
  #MAGIC_ZERO = 0;
  #MAGIC_ONE = 1;
  #INITIAL_SIZE = -1;
  #INITIAL_CAPACITY = 16;

  #data;
  #size;
  #capacity;

  constructor(initialCapacity) {
    if (!Number.isInteger(initialCapacity) || initialCapacity < this.#INITIAL_CAPACITY) {
        initialCapacity = this.#INITIAL_CAPACITY;
    }
    this.#capacity = initialCapacity;
    this.#data = new Array(this.#capacity);
    this.#size = this.#INITIAL_SIZE;
  }

  push(value) {
    if (this.#size + this.#MAGIC_ONE >= this.#capacity) {
        this.#ensureCapacity();
    }
    this.#data[++this.#size] = value;
  }

  pop() {
    if (this.#size < this.#MAGIC_ZERO) {
        throw new RangeError("Stack is empty:");
    }
    return this.#data[this.#size--];
  }

  peek() {
    if (this.#size <= this.#INITIAL_SIZE) {
        return undefined;
    }
    return this.#data[this.#size];
  }

  size() {
    return this.#size + this.#MAGIC_ONE;
  }

  isEmpty() {
    return this.#size === this.#INITIAL_SIZE;
  }

  clear() {
    this.#size = this.#INITIAL_SIZE;
  }

  toArray() {
    let arr = [];

    for (let i = this.#size; i >= this.#MAGIC_ZERO; --i) {
        arr.push(this.#data[i]);
    }
    return arr;
  }

  [Symbol.iterator]() {
    let index = this.#size;
    const self = this;
        return {
            next() {
            if (index >= self.#MAGIC_ZERO) {
                return {
                    value: self.#data[index--] , done: false
                }
            }
            return { value: undefined, done: true}
            }
        }
   }

  #ensureCapacity() {
    this.#capacity *= 2;
    let arr = new Array(this.#capacity);

    for (let i = 0; i <= this.#size; ++i) {
        arr[i] = this.#data[i];
    }
    this.#data = arr;
  }
}

// function testStackComprehensive() {
//   console.log("🧪 === STACK STRESS / SANITY TEST ===");

//   // 1) Initial state
//   {
//     const s = new Stack(16);
//     console.log("\n[1] Initial state");
//     console.log("size:", s.size(), "→ Expected:", 0);
//     console.log("isEmpty:", s.isEmpty(), "→ Expected:", true);
//     console.log("peek:", s.peek(), "→ Expected:", undefined);
//     console.log("toArray:", s.toArray(), "→ Expected:", []);
//   }

//   // 2) Basic push / peek / size / iterator (top→bottom) / toArray (top→bottom)
//   {
//     const s = new Stack(16);
//     console.log("\n[2] Push 10, 20, 30");
//     s.push(10);
//     s.push(20);
//     s.push(30);
//     console.log("size:", s.size(), "→ Expected:", 3);
//     console.log("peek:", s.peek(), "→ Expected:", 30);
//     console.log("iter (top→bottom):", [...s], "→ Expected:", [30, 20, 10]);
//     console.log("toArray (top→bottom):", s.toArray(), "→ Expected:", [30, 20, 10]);
//   }

//   // 3) Pop behavior
//   {
//     const s = new Stack(16);
//     s.push(1); s.push(2); s.push(3);
//     console.log("\n[3] Pop sequence");
//     console.log("pop:", s.pop(), "→ Expected:", 3);
//     console.log("peek after pop:", s.peek(), "→ Expected:", 2);
//     console.log("size after pop:", s.size(), "→ Expected:", 2);
//     console.log("pop:", s.pop(), "→ Expected:", 2);
//     console.log("pop:", s.pop(), "→ Expected:", 1);
//     console.log("isEmpty:", s.isEmpty(), "→ Expected:", true);
//     try {
//       s.pop();
//     } catch (e) {
//       console.log("pop on empty throws:", e.message, "→ Expected:", "Stack is empty:");
//     }
//   }

//   // 4) EnsureCapacity growth (push > capacity)
//   {
//     const s = new Stack(16); // min effective capacity is 16
//     console.log("\n[4] EnsureCapacity growth");
//     for (let i = 1; i <= 40; i++) s.push(i); // forces capacity growth
//     console.log("size:", s.size(), "→ Expected:", 40);
//     console.log("peek (top):", s.peek(), "→ Expected:", 40);
//     // top→bottom: 40..1 (мы покажем только куски)
//     const arr = s.toArray();
//     console.log("toArray length:", arr.length, "→ Expected:", 40);
//     console.log("toArray head (first 5):", arr.slice(0, 5), "→ Expected:", [40, 39, 38, 37, 36]);
//     console.log("toArray tail (last 5):", arr.slice(-5), "→ Expected:", [5, 4, 3, 2, 1]);
//   }

//   // 5) Clear behavior
//   {
//     const s = new Stack(16);
//     console.log("\n[5] Clear()");
//     s.push(7); s.push(8); s.push(9);
//     s.clear();
//     console.log("size after clear:", s.size(), "→ Expected:", 0);
//     console.log("isEmpty after clear:", s.isEmpty(), "→ Expected:", true);
//     console.log("peek after clear:", s.peek(), "→ Expected:", undefined);
//     console.log("toArray after clear:", s.toArray(), "→ Expected:", []);
//     // can push again
//     s.push(42);
//     console.log("push after clear → peek:", s.peek(), "→ Expected:", 42);
//   }

//   // 6) Mixed operations, order guarantees
//   {
//     const s = new Stack(16);
//     console.log("\n[6] Mixed operations");
//     s.push(100);
//     s.push(200);
//     console.log("peek:", s.peek(), "→ Expected:", 200);
//     s.pop(); // removes 200
//     s.push(300);
//     s.push(400);
//     // stack top→bottom now: 400, 300, 100
//     console.log("iter (top→bottom):", [...s], "→ Expected:", [400, 300, 100]);
//     console.log("toArray (top→bottom):", s.toArray(), "→ Expected:", [400, 300, 100]);
//   }

//   // 7) Edge: single element push/pop
//   {
//     const s = new Stack(16);
//     console.log("\n[7] Single element edge case");
//     s.push(777);
//     console.log("size:", s.size(), "→ Expected:", 1);
//     console.log("peek:", s.peek(), "→ Expected:", 777);
//     console.log("toArray:", s.toArray(), "→ Expected:", [777]);
//     console.log("pop:", s.pop(), "→ Expected:", 777);
//     console.log("isEmpty:", s.isEmpty(), "→ Expected:", true);
//   }

//   console.log("\n✅ TEST FINISHED — сравнивай Got/Expected в строках выше.");
// }

module.exports = { Stack };
