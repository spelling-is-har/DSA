// function supplied by the odin project for printing all the nodes in the BST
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

class Node {
    constructor(value) {
        this.value = value ? value : null
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
        return containsValue(this.root, value)
    }
    insert(value) {
        this.root = insertValue(this.root, value)
    }
    //returns all the values in the BST in a sorted array
    values() {
        const arr = getValues(this.root)
        return arr.sort((a, b) => a - b)
    }
    delete(value) {
        this.root = deleteValue(this.root, value)
    }
}

// const tree =  new Tree([1,2,3,4,5,6,7,8])
// tree.print()
// tree.delete(1)
// tree.insert(3)
// tree.print()


// Get inorder successor (smallest in right subtree)
function getSuccessor(current) {
    current = current.right;
    while (current !== null && current.left !== null)
        current = current.left;
    return current;
}

// Delete a node that matches a value
function deleteValue(root, value) {
    if (root === null)
        return null

    // if the value is smaller than the current root then traverse left
    if (root.value > value)
        root.left = deleteValue(root.left, value);
    //if value is bigger than current root than traverse right
    else if (root.value < value)
        root.right = deleteValue(root.right, value);
    //else the value must match the current root as it is not bigger or smaller
    else {
        //check to see if node has children
        if (root.left === null)
            return root.right;
        if (root.right === null)
            return root.left;

        // Node with 2 children
        const successor = getSuccessor(root);
        root.value = successor.value;
        root.right = deleteValue(root.right, successor.value);
    }
    return root;
}

function getValues(root, arr = []) {
    // arr.push(root.value)
    if (root.value) {
        arr.push(root.value)
    }
    if (root.left === null && root.right === null) {
        return arr
    }

    if (root.left != null) {
        getValues(root.left, arr)
    }
    if (root.right != null) {
        getValues(root.right, arr)
    }
    console.log(arr)
    return arr
}

function insertValue(root, value) {
    // If the tree is empty, return a new node
    if (root === null) return new Node(value);
    if (root.value === value) return

    // Otherwise, recur down the tree
    if (value < root.value)
        root.left = insertValue(root.left, value);
    else
        root.right = insertValue(root.right, value);

    // Return the (unchanged) node pointer
    return root;
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