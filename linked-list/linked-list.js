//the class of the linked list representing the full list
class LinkedList {
  constructor(name) {
    this.name = name;
    this.header = new Node();
  }
  append(value) {
    const NewNode = new Node();
    NewNode.value = value;
    // if (this.header.nextNode === null) {
    //   this.header.nextNode = NewNode;
    // } else {
    const tail = getTail(this.header);
    tail.nextNode = NewNode;
    // }
  }
}

//Mode class, containing a value property and a nextNode property. These are set to null by default
class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

const List = new LinkedList("name");
List.append("hello nodes");
List.append("this is a second node");
List.append("this is a third node");
List.append("this is a fourth node");
List.append("this is a fifth node");
List.append("this is a sixth node");

console.log(List.header);

function getTail(obj) {
  if (obj.nextNode === null) {
    return obj;
  }
  return getTail(obj.nextNode);
}
