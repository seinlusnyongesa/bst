function genRandomArrayOfNumbers(size) {
  let count = 0;
  let arr = [];
  while (count < size) {
    arr = [...arr, Math.floor(Math.random() * 100)];
    count++;
  }
  return arr;
}

module.exports = genRandomArrayOfNumbers;
