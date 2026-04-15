import { LinkedListHash } from "./linked-list.js";

export class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = createLinkedLists(this.capacity);
  }
  getBucketLength() {
    return this.buckets.length
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }
  set(key, value) {
    const hash = this.hash(key);

    //checks that the hash index is in bounds
    if (hash < 0 || hash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    this.buckets[hash].set(key, value);
    
    //checks to see if the buckets need doubling, and doubles them if they do
    if(checkCapacity(this.loadFactor, this.capacity, this.length())) this.doubleBuckets()
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
  clear() {
    this.buckets.forEach((bucket) => {
      bucket.clear()
    })
  }
  length() {
    let length = 0
    this.buckets.forEach((bucket) => {
      length += bucket.length()
    })
    return length
  }

  doubleBuckets() {
    const arr = this.entries()
    this.clear()
    this.capacity *= 2
    this.buckets = createLinkedLists(this.capacity)

    for (let i = 0; i < arr.length; i++) {
      this.set(arr[i][0], arr[i][1])
    }
  }
  keys() {
    const arr = []
    this.buckets.forEach((bucket) => {
      arr.push(...bucket.keys())
    })
    return arr
  }
  values() {
    const arr = []
    this.buckets.forEach((bucket) => {
      arr.push(...bucket.values())
    })
    return arr
  }
  remove(key) {
    const hash = this.hash(key);

    //checks that the hash index is in bounds
    if (hash < 0 || hash >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const returnValue = this.buckets[hash].remove(key)
    if (returnValue === false) {
      return false
    } else {
      return true
    }
  }
}

// const map = new HashMap()
//  for (let i = 0; i < 10; i++) {
//     map.set("key" + i, "value" + i);
//  }
// console.log(map.buckets)
// console.log("lets double")
// map.doubleBuckets()
// console.log(map.buckets)


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
