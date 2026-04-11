import { LinkedList } from "./linked-list.js";

test("LinkedList class is defined", () => {
  expect(LinkedList).toBeDefined();
});

test("Append method exists", () => {
  expect(LinkedList.append("string")).toBeDefined();
});

// test("Returns array of one", () => {
//   expect(merge([73])).toStrictEqual([73]);
// });

// test("Returns array that is already sorted", () => {
//   expect(merge([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
// });

// test("Sorts array correctly", () => {
//   expect(merge([3, 2, 1, 13, 8, 5, 0, 1])).toStrictEqual([
//     0, 1, 1, 2, 3, 5, 8, 13,
//   ]);
// });

// test("Sorts an array of an odd length", () => {
//   expect(merge([3, 2, 1, 13, 8, 5, 1])).toStrictEqual([1, 1, 2, 3, 5, 8, 13]);
// });

// test("Sorts array of 3 digit numbers correctly", () => {
//   expect(merge([105, 79, 100, 110])).toStrictEqual([79, 100, 105, 110]);
// });
