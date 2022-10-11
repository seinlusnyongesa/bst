const genRandomArrayOfNumbers = require("./genRandomNumbers");
const Tree = require("./bst");

let p = new Tree(genRandomArrayOfNumbers(16));
console.log(p.isBalanced());
console.log("pre", p.preOrder());
console.log("post", p.postOrder());
console.log("inOrder", p.inOrder());

p.insert(108);
p.insert(209);
p.insert(193);

console.log(p.isBalanced());

p.rebalance();

console.log(p.isBalanced());

console.log("pre", p.preOrder());
console.log("post", p.postOrder());
console.log("inOrder", p.inOrder());
