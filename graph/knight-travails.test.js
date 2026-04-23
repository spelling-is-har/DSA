import { getValidMoves } from "./knight-travails.js"

test("getValidMoves() will return valid moves starting from [0,0]", () => {
  expect(getValidMoves([0,0])).toStrictEqual([[2,1],[1,2]]);
});

test("getValidMoves() will return valid moves starting from [7,7]", () => {
  expect(getValidMoves([7,7])).toStrictEqual([[5,6],[6,5]]);
});

test("getValidMoves() will return valid moves starting from [5,3]", () => {
  expect(getValidMoves([5,3])).toStrictEqual([
  [ 3, 2 ], [ 3, 4 ],
  [ 7, 2 ], [ 7, 4 ],
  [ 4, 1 ], [ 4, 5 ],
  [ 6, 1 ], [ 6, 5 ]
]);
});