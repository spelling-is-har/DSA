import { Tree, sanitiseArr } from "./binary-search-tree.js";
import {expect, jest} from '@jest/globals'

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
    tree.delete(4)
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

test("levelOrderForEach() uses the callback and mutates values in place", () => {

    function callback(value) {
        return ++value 
    }

    const tree = new Tree([1,2,3,4,5,6,7])

    tree.levelOrderForEach(callback)
    expect(tree.values()).toStrictEqual([2,3,4,5,6,7,8])
})

test("levelOrderForEach() can console log every element", () => {

    function callback(value) {
        console.log(value)
    }

    const tree = new Tree([1,2,3])

    const consoleSpy = jest.spyOn(console, "log")

    tree.levelOrderForEach(callback)

    expect(consoleSpy.mock.calls[0]).toStrictEqual([2])
    expect(consoleSpy.mock.calls[1]).toStrictEqual([1])
    expect(consoleSpy.mock.calls[2]).toStrictEqual([3])
})

test("preOrderForEach() can console log every element", () => {

    function callback(value) {
        console.log(value)
    }

    const tree = new Tree([1,2,3])

    const consoleSpy = jest.spyOn(console, "log")

    tree.preOrderForEach(callback)

    expect(consoleSpy.mock.calls[0]).toStrictEqual([2])
    expect(consoleSpy.mock.calls[1]).toStrictEqual([1])
    expect(consoleSpy.mock.calls[2]).toStrictEqual([3])
})

test("preOrderForEach() uses the callback and mutates values in place", () => {

    function callback(value) {
        return ++value 
    }

    const tree = new Tree([1,2,3,4,5,6,7])

    tree.preOrderForEach(callback)
    expect(tree.values()).toStrictEqual([2,3,4,5,6,7,8])
})



test("preOrderForEach() throws Error if called without a callback function", () => {
    expect(() => {
        const tree = new Tree([1,2,3])
        tree.preOrderForEach("abc")
    }).toThrow(Error)
});

test("inOrderForEach() throws Error if called without a callback function", () => {
    expect(() => {
        const tree = new Tree([1,2,3])
        tree.inOrderForEach("abc")
    }).toThrow(Error)
});

test("inOrderForEach() can console log every element", () => {

    function callback(value) {
        console.log(value)
    }

    const tree = new Tree([1,2,3])

    const consoleSpy = jest.spyOn(console, "log")

    tree.inOrderForEach(callback)

    expect(consoleSpy.mock.calls[0]).toStrictEqual([2])
    expect(consoleSpy.mock.calls[1]).toStrictEqual([1])
    expect(consoleSpy.mock.calls[2]).toStrictEqual([3])
})

test("inOrderForEach() uses the callback and mutates values in place", () => {

    function callback(value) {
        return ++value 
    }

    const tree = new Tree([1,2,3,4,5,6,7])

    tree.inOrderForEach(callback)
    expect(tree.values()).toStrictEqual([2,3,4,5,6,7,8])
})

test("postOrderForEach() throws Error if called without a callback function", () => {
    expect(() => {
        const tree = new Tree([1,2,3])
        tree.postOrderForEach("abc")
    }).toThrow(Error)
});

test("postOrderForEach() can console log every element", () => {

    function callback(value) {
        console.log(value)
    }

    const tree = new Tree([1,2,3])

    const consoleSpy = jest.spyOn(console, "log")

    tree.postOrderForEach(callback)

    expect(consoleSpy.mock.calls[0]).toStrictEqual([2])
    expect(consoleSpy.mock.calls[1]).toStrictEqual([1])
    expect(consoleSpy.mock.calls[2]).toStrictEqual([3])
})

test("postOrderForEach() uses the callback and mutates values in place", () => {

    function callback(value) {
        return ++value 
    }

    const tree = new Tree([1,2,3,4,5,6,7])

    tree.inOrderForEach(callback)
    expect(tree.values()).toStrictEqual([2,3,4,5,6,7,8])
})

test("depth() returns undefined if the value is not in the BST", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    expect(tree.depth(8)).toBe(undefined)
})

test("depth() returns 0 is the root of the BST", () => {
    const tree = new Tree([1,2,3])
    expect(tree.depth(2)).toBe(0)
})

test("depth() returns 1 if the value has a depth of 1", () => {
    const tree = new Tree([1,2,3])
    expect(tree.depth(3)).toBe(1)
})

test("depth() returns 3 if the value has a depth of 3", () => {
    const tree = new Tree([1,2,3,4,5,6,7,8,9,10,11,12,13])
    expect(tree.depth(13)).toBe(3)
})

test("height() returns undefined if the value is not in the BST", () => {
    const tree = new Tree([1,2,3,4,5,6,7])
    expect(tree.height(8)).toBe(undefined)
})

test("height() returns 1 if there is a height of 1 ", () => {
    const tree = new Tree([1,2,3])
    expect(tree.height(2)).toBe(1)
})

test("height() returns 2 if there is a height of 2 ", () => {
    const tree = new Tree([1,2,3,4,5,6,7,8,9,10,11,12,13])
    expect(tree.height(10)).toBe(2)
})

test("isBalanced returns true on a BST of size 1", () => {
    const tree = new Tree([1])
    expect(tree.isBalanced()).toBe(true)
})

test("isBalanced returns true with a node height difference of 1", () => {
    const tree = new Tree([1,2,3,4,5,6,7,8,9,10,11,12,13])
    tree.insert(14)
    expect(tree.isBalanced()).toBe(true)
})

test("isBalanced returns false on a BST that is unbalanced", () => {
    const tree = new Tree([1,2,3])
    tree.insert(4)
    tree.insert(5)
    tree.insert(6)
    tree.insert(7)

    expect(tree.isBalanced()).toBe(false)
})

test("rebalance() does not alter any values in the BST", () => {

    const tree = new Tree([1,2,3,4,5,6,7])

    tree.rebalance()
    expect(tree.values()).toStrictEqual([1,2,3,4,5,6,7])
})

test("rebalance() keeps a BST balanced if the original is balanced", () => {

    const tree = new Tree([1,2,3,4,5,6,7])
    expect(tree.isBalanced()).toBe(true)
    tree.rebalance()
    expect(tree.isBalanced()).toBe(true)
})

test("rebalance() will rebalance an unbalanced BST", () => {

    const tree = new Tree([1,2,3,4,5,6,7])
    tree.insert(8)
    tree.insert(9)
    tree.insert(10)
    expect(tree.isBalanced()).toBe(false)
    tree.rebalance()
    expect(tree.isBalanced()).toBe(true)
})


test("unbalancing the tree, then rebalancing the tree with large inputs", () => {
    function getRandomInt() {
        return Math.floor(Math.random() * 99)
    }

    let arr = []

    for (let i = 0; i < 100; i++) {
        const number = getRandomInt()
        arr.push(number)
    }

    const tree = new Tree(arr)
    expect(tree.isBalanced()).toBe(true)

    for (let i = 100; i < 110; i++) {
        tree.insert(i)
    }
    expect(tree.isBalanced()).toBe(false)
    tree.rebalance()
    expect(tree.isBalanced()).toBe(true)
})
