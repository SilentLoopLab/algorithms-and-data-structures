class HashTable {
  constructor(initialCapacity, loadFactor) {
    if (initialCapacity < 11) {
      initialCapacity = 11;
    }
    if (!this.isPrime(initialCapacity)) {
      initialCapacity = this.nextPrime(initialCapacity);
    }
    if (loadFactor < 0.3 || loadFactor > 1.0) loadFactor = 1.0;
    this.bucketSize = initialCapacity;
    this.loadFactor = loadFactor;
    this.elemCount = 0;
    this.bucket = new Array(this.bucketSize).fill(null).map(() => []);
  }

  _hash(key) {
    let str = JSON.stringify(key);
    let hashKey = 0;
    for (let i = 0; i < str.length; ++i) {
      hashKey = (hashKey * 33) ^ str.charCodeAt(i);
    }
    return (hashKey >>> 0) % this.bucketSize;
  }

  _resize() {
    const oldBuckets = this.bucket;
    const oldSize = this.bucketSize;

    let newSize = this.nextPrime(oldSize * 2);

    this.bucketSize = newSize;
    this.bucket = new Array(newSize).fill(null).map(() => []);
    this.elemCount = 0;

    for (const bucket of oldBuckets) {
      for (const entry of bucket) {
        this.set(entry.key, entry.value);
      }
    }
  }

  set(key, value) {
    let index = this._hash(key);
    const bucket = this.bucket[index];

    for (let i = 0; i < bucket.length; ++i) {
      const entry = bucket[i];
      if (entry.key === key || JSON.stringify(entry.key) === JSON.stringify(key)) {
        entry.value = value;
        return;
      }
    }
    bucket.push({ key, value });
    ++this.elemCount;
    if (this.elemCount / this.bucketSize >= this.loadFactor) this._resize();
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.bucket[index];

    for (let i = 0; i < bucket.length; ++i) {
      const entry = bucket[i];
      if (entry.key === key) {
        return entry.value;
      }
      if (JSON.stringify(bucket[i].key) === JSON.stringify(key)) {
        return bucket[i].value;
      }
    }
    return undefined;
  }

  has(key) {
    const index = this._hash(key);
    const bucket = this.bucket[index];

    for (let i = 0; i < bucket.length; ++i) {
      const entry = bucket[i];
      if (entry.key === key) {
        return true;
      }
      if (JSON.stringify(bucket[i].key) === JSON.stringify(key)) {
        return true;
      }
    }
    return false;
  }

  delete(key) {
    const index = this._hash(key);
    const bucket = this.bucket[index];
    const length = bucket.length;
    for (let i = 0; i < length; ++i) {
      const entry = bucket[i];
      if (entry.key === key) {
        [bucket[i], bucket[length - 1]] = [bucket[length - 1], bucket[i]];
        bucket.pop();
        --this.elemCount;
        return true;
      }
      if (JSON.stringify(entry.key) === JSON.stringify(key)) {
        [bucket[i], bucket[length - 1]] = [bucket[length - 1], bucket[i]];
        bucket.pop();
        --this.elemCount;
        return true;
      }
    }
    return false;
  }

  clear() {
    this.bucket = new Array(this.bucketSize).fill(null).map(() => []);
    this.elemCount = 0;
  }

  size() {
    return this.elemCount;
  }

  *keys() {
    for (const bucket of this.bucket) {
      for (const entry of bucket) {
        yield entry.key;
      }
    }
  }

  *values() {
    for (const bucket of this.bucket) {
      for (const entry of bucket) {
        yield entry.value;
      }
    }
  }

  *entries() {
    for (const bucket of this.bucket) {
      for (const entry of bucket) {
        yield [entry.key, entry.value];
      }
    }
  }

  //=====helpers======
  isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i * i <= num; ++i) {
      if (num % i === 0) return false;
    }
    return true;
  }

  nextPrime(num) {
    while (!this.isPrime(num)) {
      ++num;
    }
    return num;
  }

  *[Symbol.iterator]() {
    for (const bucket of this.bucket) {
      for (const entry of bucket) {
        yield [entry.key, entry.value];
      }
    }
  }

  mapPrint() {
    for (const elem of this.bucket) {
      console.log(elem);
    }
  }

}

export default HashTable;


function testHashTable() {
  console.log("=== TEST START ===");

  const ht = new HashTable(11);

  console.log("\n--- SET ---");
  ht.set("a", 10);
  ht.set("b", 20);
  ht.set("c", 30);
  console.log("ht.size() ->", ht.size(), "  (expected: 3)");

  console.log("\n--- GET ---");
  console.log('ht.get("a") ->', ht.get("a"), "  (expected: 10)");
  console.log('ht.get("b") ->', ht.get("b"), "  (expected: 20)");
  console.log('ht.get("c") ->', ht.get("c"), "  (expected: 30)");
  console.log('ht.get("x") ->', ht.get("x"), "  (expected: undefined)");

  console.log("\n--- HAS ---");
  console.log('ht.has("a") ->', ht.has("a"), "  (expected: true)");
  console.log('ht.has("b") ->', ht.has("b"), "  (expected: true)");
  console.log('ht.has("x") ->', ht.has("x"), "  (expected: false)");

  console.log("\n--- DELETE ---");
  console.log('ht.delete("b") ->', ht.delete("b"), "  (expected: true)");
  console.log("ht.size() ->", ht.size(), "  (expected: 2)");
  console.log('ht.get("b") ->', ht.get("b"), "  (expected: undefined)");
  console.log('ht.delete("x") ->', ht.delete("x"), "  (expected: false)");

  console.log("\n--- SET MANY (Resize Test) ---");
  for (let i = 0; i < 50; i++) {
    ht.set("k" + i, i);
  }
  console.log("ht.size() ->", ht.size(), "  (expected: 52)");

  console.log("\n--- KEYS ---");
  console.log([...ht.keys()].slice(0, 5), "  (expected: first 5 keys)");

  console.log("\n--- VALUES ---");
  console.log([...ht.values()].slice(0, 5), "  (expected: first 5 values)");

  console.log("\n--- ENTRIES ---");
  console.log([...ht.entries()].slice(0, 5), "  (expected: first 5 [key,value])");

  console.log("\n--- ITERATOR (for...of) ---");
  let count = 0;
  for (const [k, v] of ht) {
    if (count < 5) console.log(k, v);
    count++;
  }
  console.log("Iterator count ->", count, "  (expected:", ht.size() + ")");

  console.log("\n--- CLEAR ---");
  ht.clear();
  console.log("ht.size() ->", ht.size(), "  (expected: 0)");
  console.log('ht.get("a") ->', ht.get("a"), "  (expected: undefined)");

  console.log("\n=== TEST END ===");
}
