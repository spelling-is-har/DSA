class Node {
    constructor() {
        this.value = null
        this.left = null
        this.right = null
    }
}

export class Tree {
    constructor(arr) {
        this.root = buildTree(arr)
    }
    print() {
        prettyPrint(this.root)
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
    root.value = arr[mid]

    //make left and right branches
    root.left = populateTree(arr, start, mid - 1)
    root.right = populateTree(arr, mid + 1, end)

    console.log(root)
    return root
}

export function sanitiseArr(arr) {
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

const tree = new Tree([1,2,3,4,5,6,7])
tree.print()
