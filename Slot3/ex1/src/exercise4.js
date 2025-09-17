const ages=[33, 12, 20, 16];

const [first, ,third =0, ...restAges]=ages;
console.log(first); 
console.log(third); 
console.log(restAges);