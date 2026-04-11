//the class of the linked list representing the full list
class LinkedList {
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

List.prepend("I'm prepending");

console.log(List.header);
console.log(List.header.nextNode);
console.log(List);

//checks to see if an element has a next node, and if it does it continues looping until it finds one that doesnt
function getTail(obj) {
  if (obj.nextNode === null) {
    return obj;
  }
  return getTail(obj.nextNode);
}
