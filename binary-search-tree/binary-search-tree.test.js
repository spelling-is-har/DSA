import { Tree, sanitiseArr } from "./binary-search-tree.js";

test("HashMap is defined", () => {
  expect(Tree).toBeDefined();
});

test("sanitiseArr() returns an array that does not need sanitation", () => {
  expect(sanitiseArr([0,1,2])).toStrictEqual([0,1,2]);
});

test("sanitiseArr() returns a sorted array", () => {
  expect(sanitiseArr([0,2,1])).toStrictEqual([0,1,2]);
});

test("sanitiseArr() removes duplicates", () => {
  expect(sanitiseArr([0,1,1])).toStrictEqual([0,1]);
});

test("sanitiseArr() removes duplicates and sorts", () => {
  expect(sanitiseArr([4,0,1,3,2,1])).toStrictEqual([0,1,2,3,4]);
});