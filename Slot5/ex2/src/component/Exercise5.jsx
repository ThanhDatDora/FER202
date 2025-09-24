

//In ra tên và tuổi của những người trong độ tuổi từ 13 đến 19

function Exercise5() {
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
    return (
        <div>
            <h1>Exercise 5</h1>
            <p>Danh sách tuổi từ 13 đến 19:</p>
            <ul>
                {teens.map((t, i) => (<li key={i}>{t}</li>))}
            </ul>
        </div>
    );
}
export default Exercise5;
