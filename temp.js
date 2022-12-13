var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    let temp = target - nums[i];
    console.log(temp);
    let j = nums.indexOf(temp, i + 1);
    if (j>0) {
      return [i, j];
    }
  }
};

console.log(twoSum([2, 7, 11, 15], 9));

