
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
        if (Array.isArray(arr) === false) {
            throw new Error("Tree ust be initialised with an array")
        }
        this.root = this.#buildTree(arr)
    }
    print() {
        prettyPrint(this.root)
    }
    #buildTree(arr) {
        return buildTree(arr)
    }
    contains(value) {
        //case for when the BST has no entries
        if (this.root === null) return false
        return containsValue(this.root, value)
    }
    insert(value) {
        //if there are no values in the BST then the tree needs to be built
        if (this.root === null) {
            const arr = [value]
            this.root = this.#buildTree(arr)
        } else {
            this.root = insertValue(this.root, value)
        }
    }
    // returns all the values in the BST in a sorted array
    values() {
        //case where the BST is empty
        if (this.root === null) return []

        const arr = getValues(this.root)
        //sort the array
        return arr.sort((a, b) => a - b)
    }
    delete(value) {
        //case for when the BST is empty
        if (this.root === null) {
            return
        } else {
            this.root = deleteValue(this.root, value)   
        }
    }
    levelOrderForEach(callback) {
        if (typeof callback != "function") {
            throw new Error("levelOrderFunction only accepts callback functions")
        }
    }
}

function deleteValue(root, value) {
    //if a null node is found then return null
    if (root === null) return null

    //if the value is smaller traverse left
    if (value < root.value) {
        root.left = deleteValue(root.left, value)
    }

    //if the value is larger traverse right
    else if (value > root.value) {
        root.right = deleteValue(root.right, value)
    } else {
        if (root.right === null) {
            return root.left
        }
        if (root.left === null) {
            return root.right
        }

        //Now we handle the case where the root has two branches
        //finds the in order successor, which is the smallest value on the right branch.
        const successor = getSuccessor(root)
        //temporarily assigns the successor value to the root. We now temporarily have
        //two copies of this value
        root.value = successor.value
        //we now recursively look to delete the value that we now have a copy of
        root.right = deleteValue(root.right, successor.value)
    }
    
    return root
}

//looks for the the in order successor, which is the smallest value on the right branch
// of the root.
function getSuccessor(root) {
    root = root.right
    while (root != null && root.left != null)  {
        root = root.left
    }
    return root
}


function insertValue(root, value) {
    //If a null node is found then a new node will be created at this root
    if (root === null) return new Node(value)

    //if value is smaller than the current node then traverse left
    if (value < root.value) {
        root.left = insertValue(root.left, value)
    }

    //if the value is larger than the current node then traverse right
    if (value > root.value) {
        root.right = insertValue(root.right, value)
    } 

    //if the node is not null, and the value is not bigger or smaller than the current
    //nodes value then the value must be the same as the current position in the BST.
    //Therefore the root should be returned unchanged    
    
    return root
}


function getValues(root, arr = []) {
    //push the value of this node to the array
    arr.push(root.value)

    if (root.left != null) getValues(root.left, arr)
    if (root.right != null) getValues(root.right, arr)

    return arr
}

function containsValue(root, value) {
    //case where this root equals the value
    if (root.value === value) {
        return true
    }
    //case where the value is smaller than root
    if (value < root.value && root.left != null) {
        return containsValue(root.left, value)
    //case where the value is bigger than root
    } else if (value > root.value && root.right != null) {
        return containsValue(root.right, value)
    //if root.value is not null or larger or smaller than value then this must be match.
    //We now need to handle the cases for whether root has left or right branches 
    } 

    return false
}

// const tree =  new Tree([1,2,3,4,5,6,7,8])
// tree.print()
// tree.delete(1)
// tree.insert(3)
// tree.print()




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

// // Get inorder successor (smallest in right subtree)
// function getSuccessor(current) {
//     current = current.right;
//     while (current !== null && current.left !== null)
//         current = current.left;
//     return current;
// }

// // Delete a node that matches a value
// function deleteValue(root, value) {
//     if (root === null)
//         return null

//     // if the value is smaller than the current root then traverse left
//     if (root.value > value)
//         root.left = deleteValue(root.left, value);
//     //if value is bigger than current root than traverse right
//     else if (root.value < value)
//         root.right = deleteValue(root.right, value);
//     //else the value must match the current root as it is not bigger or smaller
//     else {
//         //check to see if node has children
//         if (root.left === null)
//             return root.right;
//         if (root.right === null)
//             return root.left;

//         // Node with 2 children
//         const successor = getSuccessor(root);
//         root.value = successor.value;
//         root.right = deleteValue(root.right, successor.value);
//     }
//     return root;
// }



// function insertValue(root, value) {
//     // If the tree is empty, return a new node
//     if (root === null) return new Node(value);
//     if (root.value === value) return

//     // Otherwise, recur down the tree
//     if (value < root.value)
//         root.left = insertValue(root.left, value);
//     else
//         root.right = insertValue(root.right, value);

//     // Return the (unchanged) node pointer
//     return root;
// }

