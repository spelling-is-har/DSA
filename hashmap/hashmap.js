import { LinkedListHash } from "./linked-list.js";

export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = createLinkedLists(this.capacity);
  }
  //Please note, when using this hash function
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }
  getArrayLength() {
    return this.buckets.length;
  }
  set(key, value) {
    const hash = this.hash(key);

    //checks that the hash index is in bounds
    if (hash < 0 || hash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    this.buckets[hash].append(key, value);
  }
  get(key) {
    const hash = this.hash(key)

    //checks that the hash index is in bounds
    if (hash < 0 || hash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    return this.buckets[hash].get(key)
  }
  has(key) {
    const hash = this.hash(key) 

    //checks that the hash index is in bounds
    if (hash < 0 || hash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[hash].get(key) === null) return false
    if (this.buckets[hash].get(key)) return true
  }
  entries() {
    return getEntries(this.buckets)
  }
}

// const map = new HashMap()
//  for (let i = 0; i < 10; i++) {
//     map.set("key" + i, "value" + i);
//  }
// map.entries()


function getEntries(buckets) {
  const arr = []
  buckets.forEach((bucket) => {
    arr.push(...bucket.entries())
  })
  return arr
}

//the hashmap needs to double in size when there are more entries than loadFactor * currentCapacity
export function checkCapacity(loadFactor, currentCapacity, entries) {
  const x = loadFactor * currentCapacity
  if (entries > x) {
    return true
  } else {
    return false
  }

 }

function createLinkedLists(capacity) {
  const arr = [];
  for (let i = 0; i < capacity; i++) {
    const list = new LinkedListHash();
    arr.push(list);
  }
  return arr;
}
