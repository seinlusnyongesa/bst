const mergeSort = require("./mergeSort");

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    let sortedArray = this.removeDuplicateAndSort(this.array);
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);
    return node;
  }

  insert(key) {
    return (this.root = this.insertKey(this.root, key));
  }

  insertKey(root, key) {
    if (root === null) {
      root = new Node(key);
      return root;
    }

    if (key < root.data) {
      root.left = this.insertKey(root.left, key);
    } else if (key > root.data) {
      root.right = this.insertKey(root.right, key);
    }
    return root;
  }

  delete(value) {
    this.root = this.deleteKey(this.root, value);
  }

  deleteKey(root, value) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteKey(root.left, value);
    } else if (value > root.data) {
      root.right = this.deleteKey(root.right, value);
    } else {
      //node has one or no child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      // node with two children: Get the inorder
      // successor (smallest in the right subtree)
      root.data = this.min(root.right);

      // Delete the inorder successor
      root.right = this.deleteKey(root.right, root.data);
    }
    return root;
  }

  min(root) {
    let minimum = root.data;
    while (root.left !== null) {
      minimum = root.left.data;
      root = root.left;
    }
    return minimum;
  }

  find(value, root = this.root) {
    if (root === null) {
      return false;
    }

    if (root.data === value) {
      return root;
    }

    if (value < root.data) {
      return this.find(value, root.left);
    } else if (value > root.data) {
      return this.find(value, root.right);
    }
    return root;
  }

  levelOrder(root = this.root, results = []) {
    let queue = [];
    if (root === null) {
      return results;
    }
    queue.push(root);
    while (queue.length > 0) {
      let current = queue.shift();
      results.push(current.data);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
    return results;
  }

  inOrder(root = this.root, results = []) {
    if (root !== null) {
      this.inOrder(root.left, results);
      results.push(root.data);
      this.inOrder(root.right, results);
    }
    return results;
  }
  preOrder(root = this.root, results = []) {
    if (root !== null) {
      results.push(root.data);
      this.inOrder(root.left, results);
      this.inOrder(root.right, results);
    }
    return results;
  }
  postOrder(root = this.root, results = []) {
    if (root !== null) {
      this.postOrder(root.left, results);
      this.inOrder(root.right, results);
      results.push(root.data);
    }
    return results;
  }
  height(root) {
    if (root === null) {
      return -1;
    }
    let lefth = this.height(root.left);
    let righth = this.height(root.right);
    if (lefth > righth) {
      return lefth + 1;
    } else {
      return righth + 1;
    }
  }
  depth(node, root = this.root) {
    let depth = 0;
    if (root === null) {
      return -1;
    }
    if (root === node) {
      return depth;
    }
    while (root !== node && (root.left !== null || root.right !== null)) {
      if (node.data < root.data) {
        root = root.left;
        depth++;
      } else if (node.data > root.data) {
        root = root.right;
        depth++;
      }
      if (root === node) {
        return depth;
      }
    }
    return -1;
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return false;
    }

    let heightL = this.height(root.left);
    let heightR = this.height(root.right);

    let difference = heightL - heightR;
    difference < 0 ? (difference = -difference) : (difference = difference);

    if (difference > 1) {
      return false;
    }
    return true;
  }
  rebalance() {
    let arr = this.inOrder(this.root);
    return (this.root = this.buildTree(
      this.removeDuplicateAndSort(arr),
      0,
      arr.length - 1
    ));
  }
  removeDuplicateAndSort(arr) {
    return [...mergeSort([...new Set(arr)])];
  }
}

module.exports = Tree;
