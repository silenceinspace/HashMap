export class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      let currentNode = this.head;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
      this.tail = node;
    }
    this.size++;
  }

  find(key) {
    let node = this.head;
    while (node.key !== key) {
      node = node.next;
      if (!node) return null;
    }

    return node;
  }

  remove(key) {
    let node = this.head;
    if (node.key === key) {
      this.head = node.next;
      this.tail = node.next;
    } else {
      let previous;
      while (node.key !== key) {
        previous = node;
        node = node.next;
      }

      if (!node.next) {
        previous.next = null;
        this.tail = previous;
      } else {
        previous.next = node.next;
      }
    }
    this.size--;
  }
}
