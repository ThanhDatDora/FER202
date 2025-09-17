function sum(...nums) {
  return nums.reduce((acc, n) => {
    return (typeof n === "number" && !isNaN(n)) ? acc + n : acc;
  }, 0);
}


function avg(...nums) {
  const validNums = nums.reduce((arr, n) => {
    if (typeof n === "number" && !isNaN(n)) arr.push(n);
    return arr;
  }, []);

  if (validNums.length === 0) return 0;

  const total = validNums.reduce((acc, n) => acc + n, 0);
  return (total / validNums.length).toFixed(2); 
}


console.log(sum(1, 2, 3));      
console.log(sum(1, 'x', 4));    
console.log(avg(1, 2, 3, 4));   
console.log(avg());             
