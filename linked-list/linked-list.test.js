import { LinkedList } from "./linked-list.js";

test("List is defined", () => {
  expect(LinkedList).toBeDefined();
});

test("Append method works for the first append", () => {
  const List = new LinkedList();

  List.append("First");

  expect(List.header.nextNode.value).toBe("First");
  expect(List.header.nextNode.nextNode).toBe(null);
});

test("Append method works for the third append", () => {
  const List = new LinkedList();

  List.append("First");
  List.append("Second");
  List.append("Third");

  expect(List.header.nextNode.nextNode.nextNode.value).toBe("Third");
  expect(List.header.nextNode.nextNode.nextNode.nextNode).toBe(null);
});

test("Prepend inserts at the start of the linked list", () => {
  const List = new LinkedList();

  List.prepend("First Prepend");

  expect(List.header.value).toBe(null);
  expect(List.header.nextNode.value).toBe("First Prepend");
  expect(List.header.nextNode.nextNode).toBe(null);
});

test("Size counts length of 0 correctly", () => {
  const List = new LinkedList();

  expect(List.size()).toBe(0);
});

test("Size counts length of 10 correctly", () => {
  const List = new LinkedList();

  for (let i = 0; i < 10; i++) {
    List.append(i);
  }

  expect(List.size()).toBe(10);
});

test("head() returns undefined if there is no entries in the list", () => {
  const List = new LinkedList();

  expect(List.head()).toBe(undefined);
});

test("head() returns the first entry if there is 1 entry in the list", () => {
  const List = new LinkedList();

  List.append("First");

  expect(List.head()).toBe("First");
});

test("head() returns the first entry if there are 2 entries in the list", () => {
  const List = new LinkedList();

  List.append("First");
  List.append("Second");

  expect(List.head()).toBe("First");
});

test("tail() returns undefined on an empty list", () => {
  const List = new LinkedList();

  expect(List.tail()).toBe(undefined);
});

test("tail() returns correct object on a list of 10 long", () => {
  const List = new LinkedList();

  for (let i = 0; i < 10; i++) {
    List.append(i);
  }

  expect(List.tail()).toBe(9);
});

test("atIndex(0) returns the first element", () => {
  const List = new LinkedList();

  for (let i = 0; i < 10; i++) {
    List.append(i);
  }

  console.log(List.header.nextNode);
  expect(List.atIndex(0)).toBe(0);
});

test("atIndex(3) returns the third element", () => {
  const List = new LinkedList();

  for (let i = 0; i < 10; i++) {
    List.append(i);
  }

  expect(List.atIndex(3)).toBe(3);
});

test("atIndex(0) returns undefined if an element is not there", () => {
  const List = new LinkedList();

  expect(List.atIndex(0)).toBe(undefined);
});

test("Trying to pop() an empty list returns undefined", () => {
  const List = new LinkedList();

  expect(List.pop()).toBe(undefined);
});

test("pop() removes the last element on a linked list of 1", () => {
  const List = new LinkedList();

  List.append(1);

  expect(List.pop()).toBe(1);
  expect(List.tail()).toBe(undefined);
});

test("pop() removes the last element on a list longer than 1", () => {
  const List = new LinkedList();

  List.append(1);
  List.append(2);
  List.append(3);
  List.append(4);

  expect(List.pop()).toBe(4);
  expect(List.tail()).toBe(3);
});

test("Contains returns false for an empty linked list", () => {
  const List = new LinkedList();

  expect(List.contains("abc")).toBe(false);
});

test("Contains returns false for an item not in the list", () => {
  const List = new LinkedList();

  for (let i = 0; i < 4; i++) {
    List.append(i);
  }
  expect(List.contains("abc")).toBe(false);
});

test("Contains returns true for an item in the list", () => {
  const List = new LinkedList();

  for (let i = 0; i < 4; i++) {
    List.append(i);
  }
  expect(List.contains(2)).toBe(true);
});
