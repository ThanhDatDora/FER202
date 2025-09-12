const listInt = [1,2,3,4,5];
const listSquare = listInt.map(x => x*x);
console.log(listSquare);

listInt.filter(x => x%2 ===0).forEach(x => console.log);

const sum = listInt.reduce((acc, x) => acc + x, 0);
console.log(sum);

let people = [
  { id: 1, name: "Alice", age: 19 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 30 },
  { id: 4, name: "David", age: 18 }
];

console.log("List:");
for (let p of people) {
  console.log(`ID: ${p.id}, Name: ${p.name}, Age: ${p.age}`);
  if (p.age > 20) {
    console.log(`People more than 20 ages: ${p.name}`);
  }
}



const myPromise = new Promise((resolve, reject) => {
    //Asynchronous operation
    //Resolve the promise when the operation is successful
    //Reject the promise if there is an error
    setTimeout (() => {
        const randomNum = Math.random();
        if (randomNum < 0.5) {
            resolve(randomNum);
        }else {
            reject(`Error: Random number is greater than 0.5`);
        }
    }, 2000);
});

myPromise
.then(result => {
    console.log(`Success: ${result}`);
})
.catch(error => {
    console.error(error);
});

const anotherPromise = new Promise((resole, reject) => {
    resole(`Another promise`);
});

anotherPromise
.then(result => {
    console.log(result);
    return `Chained promise`;
})
.then(result => {
    console.log(result);
});

let promise1 = new Promise((resole, reject) => {
    setTimeout(() => {
        resole("Promise 1 resolved");
    }, 2000);
});

let promise2 = new Promise((resole, reject) => {
    setTimeout(() => {
        resole("Promise 2 resolved");
    }, 1000);
});

Promise.all([promise1, promise2]).then((values) => {
    console.log(values); //Result: ["Promise 1 resolved", "Promise 2 resolved"]
});

console.log(`Start`);

let data ='';
for (let i =0; i<100;i++){
    data += i;
}

console.log(`Finished with data: `+ data);

let myPromise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resole("Promise resolved");
    }, 2000);
});

myPromise.then(value => {
    console.log(value);//Output: Promise resolved
});

let myPromise4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved");
    }, 2000);
});

async function asyncFunction() {
    let value = await myPromise;
    console.log(value); //Output: Promise resolved
}

asyncFunction();

class Retangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
    const rect = new Retangle(5, 10);
    console.log(rect.getArea()); //Output: 50

const square = new Square(5);
console.log(square.getArea()); //Output: 25