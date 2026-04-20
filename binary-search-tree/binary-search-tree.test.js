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


test("Error is thrown if trying to create tree using a type that is not an array", () => {
    expect(() => {
        const tree = new Tree("abc")
    }).toThrow(Error)

});

test("contains() returns false in an empty tree", () => {
    const tree = new Tree([])
    expect(tree.contains(4)).toBe(false)
})

test("contains() returns false if there is no matches in a tree with exactly balanced branches tree", () => {
    const tree = new Tree([1,2,3])
    expect(tree.contains(4)).toBe(false)
})


test("contains() returns false if there is no matches in an unbalanced tree", () => {
    const tree = new Tree([1,2,3,4])
    expect(tree.contains(0)).toBe(false)
})

test("contains() returns true if there is a match in a tree with exactly balanced branches tree", () => {
    const tree = new Tree([1,2,3])
    expect(tree.contains(2)).toBe(true)
    expect(tree.contains(1)).toBe(true)
    expect(tree.contains(3)).toBe(true)

})

test("contains() returns true if there is a match in a bigger tree with exactly balanced branches tree", () => {
    const tree = new Tree([1,2,3,4,5])
    expect(tree.contains(5)).toBe(true)
})

test("contains() returns true if there is only one value in the bst", () => {
    const tree = new Tree([1])
    expect(tree.contains(1)).toBe(true)
})

test("values() returns an empty array if the BST is empty", () => {
    const tree = new Tree([])
    expect(tree.values()).toStrictEqual([])
})

test("values() returns an array of with one value for a BST with one value", () => {
    const tree = new Tree([1])
    expect(tree.values()).toStrictEqual([1])
})

test("values() returns an array of with multiple values", () => {
    const tree = new Tree([1,2,3,4,5,6,7,8,9,10])
    expect(tree.values()).toStrictEqual([1,2,3,4,5,6,7,8,9,10])
})

test("insert() can insert in to an empty BST", () => {
    const tree = new Tree([])
    expect(tree.contains(1)).toBe(false)
    tree.insert(1)
    expect(tree.contains(1)).toBe(true)
})

test("insert() inserts a value at the end of the tree", () => {
    const tree = new Tree([1,2,3])
    expect(tree.contains(4)).toBe(false)
    tree.insert(4)
    expect(tree.contains(4)).toBe(true)
})


test("insert() inserts a value at the end of the tree", () => {
    const tree = new Tree([1,2,3])
    expect(tree.contains(4)).toBe(false)
    tree.insert(4)
    expect(tree.contains(4)).toBe(true)
})

test("insert() inserts a value in the middle of the tree", () => {
    const tree = new Tree([1,2,3,5,6,7])
    expect(tree.contains(4)).toBe(false)
    tree.insert(4)
    expect(tree.contains(4)).toBe(true)
})

test("insert() does not insert duplicate values", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    tree.insert(4)

    expect(tree.values()).toStrictEqual([1,2,3,4,5,6,7])
})

test("delete() will delete a child with no children", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    tree.delete(7)

    expect(tree.values()).toStrictEqual([1,2,3,4,5,6])
})

test("delete() will delete a child with one child", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    tree.delete(7)

    expect(tree.values()).toStrictEqual([1,2,3,4,5,6])
})

test("delete() will delete a child with two children", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    tree.delete(6)

    expect(tree.values()).toStrictEqual([1,2,3,4,5,7])
})

test("delete() will delete a child with two children", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    console.log(tree.values())
    tree.delete(4)
    console.log(tree.values())
    expect(tree.values()).toStrictEqual([1,2,3,5,6,7])
})


test("delete() will delete the entire tree, but values can still be added", () => {
    const tree = new Tree([1])
    tree.delete(1)
    expect(tree.contains(1)).toBe(false)    
    tree.insert(2)
    expect(tree.values()).toStrictEqual([2])

})

test("levelOrderForEach throws Error if called without a callback function", () => {
    expect(() => {
        const tree = new Tree([1,2,3])
        tree.levelOrderForEach("abc")
    }).toThrow(Error)

});
