import { arrayBuffer } from "node:stream/consumers"

class Node {
    constructor() {
        this.value = null
        this.left = null
        this.right = null
    }
}

export class Tree {
    constructor(arr) {
        if (!arr || arr.length === 0) throw new Error("Must initialise with a value")
        this.root = this.#buildTree(arr)
    }
    print() {
        prettyPrint(this.root)
    }
    #buildTree(arr) {
        return buildTree(arr)
    }
    contains(value) {
        //if the BST is empty do not search is and return false
        // if (this.root.left === null && this.root.right === null) return false
        return containsValue(this.root, value)
    }
}

function containsValue(root, value) {
    //if the value is found return true
    if (root.value === value) return true
    //if the value is bigger than the value in the current node in the tree, then traverse
    //right along the tree, if value is smaller than the current node then traverse left
    if(value > root.value) {
        //returns false if there is no node on the right
        if (root.right === null) {
            return false
        } else {
            return containsValue(root.right, value)
        }
    } else if (value < root.value) {
        //returns false if there is no node on the left
        if (root.left === null) {
            return false
        } else {
            return containsValue(root.left, value)
        }
    //returns false if the value cannot be found
    } else {
        return false
    }
}


function buildTree(arr) {
    const sanitisedArr = sanitiseArr(arr)
    
    return populateTree(sanitisedArr, 0, sanitisedArr.length - 1)
}

function populateTree(arr, start, end) {
    if (start > end) return null

    const mid = start + Math.floor((end - start) / 2)
    const root = new Node(arr[mid])
    //if there is no value, then set the value to null
    root.value = arr[mid]

    //make left and right branches
    root.left = populateTree(arr, start, mid - 1)
    root.right = populateTree(arr, mid + 1, end)
    
    return root
}

export function sanitiseArr(arr) {
    //allows the user to initialise the BST with an array length of 0

    const noDuplicatesArr = [... new Set(arr)]
    return noDuplicatesArr.sort((a,b) => a - b)
}

// function supplied by the odin project for printing all the nodes in the BST
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

// const tree = new Tree()
// tree.print()
// // console.log(tree.root)