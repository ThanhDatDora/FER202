export function Exercise3() {
const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
}
    return (
        <div>
            <h1>Exercise 3</h1>
            <p>In ra màn hình: </p>
            <p>Name: {person.name}</p>
            <p>Street: {person.address.street}</p>
        </div>
    );
}
export default Exercise3;
