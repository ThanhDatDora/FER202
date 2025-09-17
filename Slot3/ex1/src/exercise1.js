const double = (x) => x * 2;
console.log(double(5)); 

//cách viết khác:
const double2 = x => {return x * 2};
console.log(double2(10));

const isEven = num => num % 2 === 0;
console.log(isEven(4)); 
console.log(isEven(5));