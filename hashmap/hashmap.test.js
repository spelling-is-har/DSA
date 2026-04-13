import { HashMap } from "./hashmap.js";
import { LinkedList } from "../linked-list/linked-list.js";

test("HashMao is defined", () => {
  expect(HashMap).toBeDefined();
});

test("Hash will return a number", () => {
  const hashMap = new HashMap();

  expect(typeof hashMap.hash("abc")).toBe("number");
});

test("Hash will return the same number if called multiple times on the same string", () => {
  const hashMap = new HashMap();
  const hash = hashMap.hash("abc");

  for (let i = 0; i < 10; i++) {
    expect(hashMap.hash("abc")).toBe(hash);
  }
});

test("set() will set a key and value when the hashmap has no entries", () => {
  const hashMap = new HashMap();
  const hashedKey = hashMap.hash("key");

  hashMap.set("key", "value");
  expect(hashMap.buckets[hashedKey].tail().value).toBe("value");
  expect(hashMap.buckets[hashedKey].tail().key).toBe("key");
});
