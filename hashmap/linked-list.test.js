import { LinkedListHash } from "./linked-list.js";

test("List is defined", () => {
  expect(LinkedListHash).toBeDefined();
});

test("set() method works for the first append", () => {
  const List = new LinkedListHash();

  List.set("key", "first");

  expect(List.header.nextNode.value).toBe("first");
  expect(List.header.nextNode.key).toBe("key");
  expect(List.header.nextNode.nextNode).toBe(null);
});

test("set() works for multiple inputs", () => {
  const List = new LinkedListHash();

  List.set("key1", "First");
  List.set("key2", "Second");
  List.set("key3", "Third");

  expect(List.header.nextNode.value).toBe("First");
  expect(List.header.nextNode.nextNode.value).toBe("Second");
  expect(List.header.nextNode.nextNode.nextNode.value).toBe("Third");
  expect(List.header.nextNode.nextNode.nextNode.key).toBe("key3");
  expect(List.header.nextNode.nextNode.nextNode.nextNode).toBe(null);
});

test("set() will update a value if the key already exists", () => {
  const List = new LinkedListHash();

  List.set("key1", "First");
  expect(List.header.nextNode.key).toBe("key1");
  expect(List.header.nextNode.value).toBe("First");

  List.set("key1", "Second");
  expect(List.header.nextNode.key).toBe("key1");
  expect(List.header.nextNode.value).toBe("Second");

  List.set("key1", "Third");
  expect(List.header.nextNode.key).toBe("key1");
  expect(List.header.nextNode.value).toBe("Third");

});


test("get() will return null if there are no matches in an empty linked list", () => {
  const List = new LinkedListHash();

  expect(List.get("key")).toBe(null);

});

test("get() will return null if there are no matches in a populated linked list", () => {
  const List = new LinkedListHash();
  List.set("key", "abc")
  List.set("key2", "def")
  List.set("key3", "hij")

  expect(List.get("notAValidKey")).toBe(null);

});

test("get() will return a value if the item is in a list of 1", () => {
  const List = new LinkedListHash();
  List.set("key", "abc")
  expect(List.get("key")).toBe("abc");

});

test("get() will return a value if the item is in a populated list", () => {
  const List = new LinkedListHash();

  List.set("key", "abc")
  List.set("key2", "def")
  List.set("key3", "hij")

  expect(List.get("key2")).toBe("def");
});

test("contains() will return false on an unpopulated list", () => {
  const List = new LinkedListHash();

  expect(List.contains("key")).toBe(false);
});

test("contains() will return false when looking for an item in a populated list", () => {
  const List = new LinkedListHash();

  List.set("key", "abc")
  List.set("key2", "def")
  List.set("key3", "hij")

  expect(List.contains("notAValidKey")).toBe(false);
});

test("contains() will return true when looking for an item in a list of 1", () => {
  const List = new LinkedListHash();

  List.set("key", "abc")

  expect(List.contains("key")).toBe(true);
});


test("contains() will return true when looking for an item in a list with multiple entries", () => {
  const List = new LinkedListHash();

  List.set("key", "abc")
  List.set("key2", "def")
  List.set("key3", "hij")

  expect(List.contains("key")).toBe(true);
  expect(List.contains("key2")).toBe(true);
  expect(List.contains("key3")).toBe(true);
});

test("remove() will return false on an unpopulated list", () => {
  const List = new LinkedListHash();

  expect(List.remove("key")).toBe(false);
});

test("remove() will return false on an populated list with no matching key", () => {
  const List = new LinkedListHash();

  List.set("key", "abc")
  List.set("key2", "def")
  List.set("key3", "hij")

  expect(List.remove("invalidKey")).toBe(false);
});

test("remove() will remove an item and return true in a list of size 1", () => {
  const List = new LinkedListHash();
  
  List.set("key", "abc")

  expect(List.remove("key")).toBe(true);
  expect(List.contains("key")).toBe(false)
});


test("remove() will remove an item and return true in a list of size 1", () => {
  const List = new LinkedListHash();
  
  List.set("key", "abc")
  List.set("key2", "def")
  List.set("key3", "hij")

  expect(List.remove("key2")).toBe(true);
  expect(List.contains("key")).toBe(true)
  expect(List.contains("key2")).toBe(false)
  expect(List.contains("key3")).toBe(true)
});

test("length() to be 0 on an empty list", () => {
  const List = new LinkedListHash();

  expect(List.length()).toBe(0);
});

test("length() to be 1 on a list of 1", () => {
  const List = new LinkedListHash();
  List.set("key3", "hij")
  expect(List.length()).toBe(1);
});

test("length() to be 5 on a list of 5", () => {
  const List = new LinkedListHash();
  for (let i = 0; i < 5; i++) {
    const keyString = "key" + i
    List.append(keyString, "value")
  }

  expect(List.length()).toBe(5);
});

test("clear() clears the list", () => {
  const List = new LinkedListHash();
  for (let i = 0; i < 5; i++) {
    const keyString = "key" + i
    List.append(keyString, "value")
  }
  List.clear()
  expect(List.length()).toBe(0);
});

test("values() returns an empty array on an empty list", () => {
  const List = new LinkedListHash();

  expect(List.values()).toStrictEqual([]);
});

test("values() gets all the values from a linked list", () => {
  const List = new LinkedListHash();
  for (let i = 0; i < 5; i++) {
    const keyString = "key" + i
    const valueString = "value" + i
    List.append(keyString, valueString)
  }
  expect(List.values()).toStrictEqual(["value0", "value1", "value2", "value3", "value4"]);
});

test("keys() returns an empty array on an empty list", () => {
  const List = new LinkedListHash();

  expect(List.keys()).toStrictEqual([]);
});

test("keys() gets all the keys from a linked list", () => {
  const List = new LinkedListHash();
  for (let i = 0; i < 5; i++) {
    const keyString = "key" + i
    const valueString = "value" + i
    List.append(keyString, valueString)
  }
  expect(List.keys()).toStrictEqual(["key0", "key1", "key2", "key3", "key4"]);
});

test("getEntries() returns an empty array on an empty list", () => {
  const List = new LinkedListHash();

  expect(List.entries()).toStrictEqual([]);
});

test("getEntries() gets all the entries from a linked list", () => {
  const List = new LinkedListHash();
  for (let i = 0; i < 5; i++) {
    const keyString = "key" + i
    const valueString = "value" + i
    List.append(keyString, valueString)
  }
  expect(List.entries()).toStrictEqual([["key0","value0"],["key1","value1"],["key2","value2"],["key3","value3"],["key4","value4"]]);
});