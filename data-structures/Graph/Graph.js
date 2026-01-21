const { Queue } = require('../Queue/Queue.js');
const { Stack } = require('../Stack/Stack.js');

class Graph {
  constructor(size, isDirected = false) {
    this.size = size;
    this.isDirected = isDirected;
    this.matrix = new Array(this.size).fill(0);
    for (let i = 0; i < this.size; ++i) {
      this.matrix[i] = new Array(this.size).fill(0);
    }
  }

  addEdge(u, v) {
    if (!this.isDirected) this.matrix[v][u] = 1;
    this.matrix[u][v] = 1;
  }

  addVertex() {
    let oldSize = this.size;
    this.size += 1;

    for (let i = 0; i < oldSize; ++i) {
      this.matrix[i].push(0);
    }
    this.matrix.push(new Array(this.size).fill(0));
  }

  print() {
    for (let i = 0; i < this.size; ++i) {
      console.log(this.matrix[i]);
    }
  }

  bfs(start) {
    let res = [];
    let isVisited = new Array(this.size).fill(0);
    let queue = new Queue(50);
    queue.enqueue(start);
    while (!queue.isEmpty()) {
      let node = queue.dequeue();
      isVisited[node] = 1;
      res.push(node);
      for (let i = 1; i < this.matrix[node].length; ++i) {
        if (this.matrix[node][i] && isVisited[i] === 0) {
          queue.enqueue(i);
        }
      }
    }
    return res;
  }

  dfs(start) {
    let res = [];
    let isVisited = new Array(this.size).fill(0);
    const stack = new Stack(50);
    stack.push(start);
    while (!stack.isEmpty()) {
      const node = stack.pop();
      res.push(node);
      isVisited[node] = 1;
      for (let i = this.size - 1; i >= 0; --i) {
        if ((this.matrix[node][i]) && (isVisited[i] === 0)) {
          stack.push(i);
        }
      }
    }
    return res;
  }
}


let g = new Graph(5, false);

g.addEdge(1, 2);
g.addEdge(2, 3);
g.addEdge(3, 4);
g.addVertex();
console.log(g.bfs(1));
console.log(g.dfs(1));
g.print();


