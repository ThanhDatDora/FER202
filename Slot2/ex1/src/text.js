const result = (a, b) => a + b;
console.log(result(1,2));

let greet = (name, timeOfDay) => {
    console.log(`Good ${timeOfDay}, ${name}!`);
};
greet(`Alice`, `morrning`)
//Output: Good morning, Alice!
greet(`Bob`,`evening`)
//Output: Good evening, Bob!
let square = num => {
    return num * num;
};

console.log(square(5));// Output: 25
console.log(square(8));//Output: 64

let sayHello = () => {
    console.log("Hello there");
};

sayHello(); //Output: Hello there!

let person = {
name: "Join",
age: 30,
greet:() => {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age}years old.`);
}


};
const multiineString = `
    This is a
    multi-line
    string.
`;

console.log(multiineString);
/*
    Output:
    This is a
    multi-line
    string.
*/

const a=10; 
const b=5;

const result1 = `${a} + ${b} equals ${a + b}`;
console.log(result); //Output: 10 + 5 = 15
