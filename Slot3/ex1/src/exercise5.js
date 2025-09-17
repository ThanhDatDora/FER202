var people = [
  { name: 'Jack', age: 50 },
  { name: 'Michael', age: 9 }, 
  { name: 'John', age: 40 }, 
  { name: 'Ann', age: 19 }, 
  { name: 'Elisabeth', age: 16 }
];

const teens = people.filter(person => person.age >= 13 && person.age <= 19)
.map(p => `${p.name} (${p.age})`);
teens.forEach(t => console.log(t));

//cách khác: dùng map trước rồi lọc string hợp lệ
const teens1 = people.map(p => (p.age >= 13 && p.age <= 19 ? `${p.name} (${p.age})` : null))
.filter(Boolean);

teens1.forEach (t => console.log(t));