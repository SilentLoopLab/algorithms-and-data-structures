const RED = 'red';
const BLACK = 'black';

class Node {
  constructor(data = null, left = null, right = null, color = RED, parent = null) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.color = color;
    this.parent = parent;
  }
}


class RBT {
  #cmp;
  constructor(cmp) {
    if (typeof cmp !== 'function') {
      cmp = (a, b) => a - b;
    }
    this.#cmp = cmp;
    this.nil = new Node(null);
    this.nil.color = BLACK;
    this.root = this.nil;
  }

  //main methoods

  insert(data) {
    const newNode = new Node(data);
    let parentNode = this.nil;
    let current = this.root;

    while (current !== this.nil) {
      
    }

  }
}


