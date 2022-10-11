function merge(leftArr, rightArr) {
  let results = [];
  let leftIdx = 0;
  rightIdx = 0;
  while (leftIdx < leftArr.length && rightIdx < rightArr.length) {
    if (leftArr[leftIdx] < rightArr[rightIdx]) {
      results.push(leftArr[leftIdx]);
      leftIdx++;
    } else {
      results.push(rightArr[rightIdx]);
      rightIdx++;
    }
  }
  let remainLeft = leftArr.slice(leftIdx);
  let remainRight = rightArr.slice(rightIdx);
  return [...results, ...remainLeft, ...remainRight];
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let midpoint = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, midpoint);
  let rightArr = arr.slice(midpoint);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

module.exports = mergeSort;
