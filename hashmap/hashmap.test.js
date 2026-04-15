import { HashMap } from "./hashmap.js";

test("HashMap is defined", () => {
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
  expect(hashMap.buckets[hashedKey].tail()).toBe("value");
});

test("get() will return null if the key is not in an empty linked list", () => {
  const hashMap = new HashMap();
  const hashedKey = hashMap.hash("key");
  
  expect(hashMap.get("invalidKey")).toBe(null);
});

test("get() will return a value if the linked list is a length of one", () => {
  const hashMap = new HashMap();
  const hashedKey = hashMap.hash("key");

  hashMap.set("key", "value");

  expect(hashMap.get("key")).toBe("value");
});

test("get() will return a value if the linked list has multiple entries", () => {
  const hashMap = new HashMap();
  for (let i = 0; i < 10; i++) {
    hashMap.set("key" + i, "value" + i);
    expect(hashMap.get("key" + i)).toBe("value" + i);
  }
});

test("has() will return false if the key is not in an empty linked list", () => {
  const hashMap = new HashMap();
  const hashedKey = hashMap.hash("key");
  
  expect(hashMap.has("invalidKey")).toBe(false);
});

test("has() will return true if the hashmap is a length of one", () => {
  const hashMap = new HashMap();

  hashMap.set("key", "value");

  expect(hashMap.has("key")).toBe(true);
});

test("has() will return true if the hashmap has multiple entries", () => {
  const hashMap = new HashMap();
  for (let i = 0; i < 10; i++) {
    hashMap.set("key" + i, "value" + i);
    expect(hashMap.has("key" + i)).toBe(true);
  }
});


test("entries() will return an empty array if the hashmap has no entries", () => {
  const hashMap = new HashMap();
  expect(hashMap.entries()).toStrictEqual([]);
});


test("entries() will return an array of arrays of entries", () => {
  const hashMap = new HashMap();
  for (let i = 0; i < 10; i++) {
      hashMap.set("key" + i, "value" + i);
  }
  expect(hashMap.entries()).toStrictEqual([
    [ 'key0', 'value0' ],
    [ 'key1', 'value1' ],
    [ 'key2', 'value2' ],
    [ 'key3', 'value3' ],
    [ 'key4', 'value4' ],
    [ 'key5', 'value5' ],
    [ 'key6', 'value6' ],
    [ 'key7', 'value7' ],
    [ 'key8', 'value8' ],
    [ 'key9', 'value9' ]
  ]);
});

test("clear() will clear a populated hashmap", () => {
  const hashMap = new HashMap();
  for (let i = 0; i < 10; i++) {
    hashMap.set("key" + i, "value" + i);
  }

  hashMap.clear()

  for (let i = 0; i < 10; i++) {
    expect(hashMap.has("key" + i)).toBe(false);
  }
});

test("length() will be 0 on an empty hashMap", () => {
  const hashMap = new HashMap();

  expect(hashMap.length()).toBe(0);

});


test("length() will be 10 on an hashMap of 10", () => {
  const hashMap = new HashMap();

  for (let i = 0; i < 10; i++) {
    hashMap.set("key" + i, "value" + i);
  }

  expect(hashMap.length()).toBe(10);

});

test("length() will be 0 after clearing", () => {
  const hashMap = new HashMap();

  for (let i = 0; i < 10; i++) {
    hashMap.set("key" + i, "value" + i);
  }

  hashMap.clear()

  expect(hashMap.length()).toBe(0);

});