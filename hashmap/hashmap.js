import { LinkedList } from "../linked-list/linked-list.js";

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
    this.buckets[hash].append({ key, value });
  }
}

//TO DO: I need to copy my linked list implimentation in to its own file
//so i can edit it freely to be used in a hashmap. I need the ability to
//search for objects using their key and i need the ability to update
//that objects value. I also need to to handle objects, rather than primitives

// const map = new HashMap();
// const key = "jon";
// const value = "loves coding so much";
// const hashedKey = map.hash(key);

// map.set(key, value);
// console.log(map.buckets[hashedKey].tail());

function createLinkedLists(capacity) {
  const arr = [];
  for (let i = 0; i < capacity; i++) {
    const list = new LinkedList();
    arr.push(list);
  }
  return arr;
}
