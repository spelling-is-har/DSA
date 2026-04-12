//Mode class, containing a value property and a nextNode property. These are set to null by default
class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

//the class of the linked list representing the full list
export class LinkedList {
  constructor(name) {
    this.name = name;
    this.header = new Node();
  }
  append(value) {
    const NewNode = new Node();
    NewNode.value = value;
    const tail = getTail(this.header);
    tail.nextNode = NewNode;
    return;
  }
  prepend(value) {
    const NewNode = new Node();
    NewNode.value = value;
    //checks to see if the headers nextNode is null, if it is then it can just be the first element of the linked list
    if (this.header.nextNode === null) {
      this.header.nextNode = NewNode;
      return;
    } else {
      const tempNode = this.header.nextNode;
      this.header.nextNode = NewNode;
      NewNode.nextNode = tempNode;
      return;
    }
  }
  size() {
    return getSize(this.header);
  }
  head() {
    //return undefined if there is no first item in the list
    if (this.header.nextNode === null) {
      return undefined;
    } else {
      return this.header.nextNode.value;
    }
  }
  tail() {
    //if there is no entries in the linked list return undefined
    if (this.header.nextNode === null) {
      return undefined;
    } else {
      const tailNode = getTail(this.header.nextNode);
      return tailNode.value;
    }
  }
  atIndex(n) {
    //return undefined if there are no items in the linked list
    if (this.header.nextNode === null) {
      return undefined;
    }
    const nodeAtIndex = at(this.header.nextNode, n);
    return nodeAtIndex.value;
  }
}

function at(obj, index) {
  console.log(obj);
  console.log(index);
  if (index === 0) {
    return obj;
  } else if (obj.nextNode === null && index > 0) {
    return undefined;
  } else {
    return at(obj.nextNode, --index);
  }
}

//checks to see if an element has a next node, and if it does it continues looping until it finds one that doesnt
function getTail(obj) {
  if (obj.nextNode === null) {
    return obj;
  }
  return getTail(obj.nextNode);
}

function getSize(obj, count = 0) {
  if (obj.nextNode === null) {
    return count;
  } else {
    return getSize(obj.nextNode, ++count);
  }
}
