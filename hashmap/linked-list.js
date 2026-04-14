//This is a modified version of my linked list to work as part of a hashmap.
//It can store objects as values and find objects by searching for keys

import { get } from "node:http";

//Mode class, containing a value property and a nextNode property. These are set to null by default
class Node {
  constructor() {
    this.value = null;
    this.key = null
    this.nextNode = null;
  }
}

//the class of the linked list representing the full list
export class LinkedListHash {
  constructor() {
    this.header = new Node();
  }
  append(key, value) {
    const NewNode = new Node();
    NewNode.key = key;
    NewNode.value = value
    const tail = getTail(this.header);
    tail.nextNode = NewNode;
    return;
  }

  set(key, value) {
    const node = updateExistingNode(this.header, key, value);
    if (node === false) {
      this.append(key, value);
    } 
    return
  }

  get(key) {
    if (this.header.nextNode === null) return null
    return getValueByKey(this.header, key)
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
  contains(key) {
    //return false if there are no items in the linked list
    if (this.header.nextNode === null) {
      return false;
    } else {
      return containsItem(this.header.nextNode, key);
    }
  }
  remove(key) {
    if (this.header.nextNode === null) {
      return false;
    } else {
      return removeItem(this.header.nextNode, this.header, key);
    }
  }

  length() {
    if (this.header.nextNode === null) {
      return 0; 
    }
    return listLength(this.header.nextNode)
  }
  clear() {
    this.header.nextNode = null
  }
  keys() {
    if (this.header.nextNode === null)  return []
    return getKeys(this.header.nextNode)
  }
  values() {
    if (this.header.nextNode === null)  return []
    return getValues(this.header.nextNode)
  }
  entries() {
    if (this.header.nextNode === null)  return []
    return getEntries(this.header.nextNode)
  }
}

function getEntries(obj, arr = []) {
  arr.push([obj.key, obj.value])
  if (obj.nextNode === null) {
    return arr
  } else {
    return getEntries(obj.nextNode, arr)
  }
}

function getValues(obj, arr = []) {
    arr.push(obj.value)
    if (obj.nextNode === null) {
     return arr 
  } else {
    return getValues(obj.nextNode, arr)
  }
}

function getKeys(obj, arr = []) {
  arr.push(obj.key)
  if (obj.nextNode === null) {
     return arr 
  } else {
    return getKeys(obj.nextNode, arr)
  }

}

function listLength(obj, count = 0) {
  if (obj.nextNode === null) {
    return ++count 
  } else {
    return listLength(obj.nextNode, ++count)
  }
}

function removeItem(node, prevNode, key) {
  if (node.key === key) {
    const tempNode = node.nextNode
    prevNode.nextNode = tempNode
    node.nextNode = null
    return true
  } else if (node.nextNode === null) {
    return false
  } else {
    return removeItem(node.nextNode, node, key)
  }
}

function containsItem(obj, key) {
  if (obj.key === key) {
    return true;
  }
  //If the end of the linked list is reached without finding a match then return false
  else if (obj.nextNode === null) {
    return false;
  } else {
    return containsItem(obj.nextNode, key);
  }
}

//if an existing node can be found, then it is returned, else return false
function updateExistingNode(obj, key, value) {
  if (obj.key === key) {
    obj.value = value

    return true;
  }
  if (obj.nextNode === null) {
    return false;
  }
  return updateExistingNode(obj.nextNode, key, value);
}

function getValueByKey(obj, key) {
  if (obj.key === key) {
    return obj.value;
  }
  //If the end of the linked list is reached without finding a match then return false
  else if (obj.nextNode === null) {
    return null;
  } else {
    return getValueByKey(obj.nextNode, key);
  }
}

//checks to see if an element has a next node, and if it does it continues looping until it finds one that doesnt
function getTail(obj) {
  if (obj.nextNode === null) {
    return obj;
  }
  return getTail(obj.nextNode);
}

function removeLastNode(obj) {
  if (obj.nextNode.nextNode === null) {
    const nextNodeValue = obj.nextNode.value;
    obj.nextNode = null;
    return nextNodeValue;
  } else {
    return removeLastNode(obj.nextNode);
  }
}

function listToString(obj, string = "") {
  if (obj.nextNode === null) {
    return (string += `( ${obj.value} ) -> null`);
  } else {
    string += `( ${obj.value} ) -> `;
    return listToString(obj.nextNode, string);
  }
}
