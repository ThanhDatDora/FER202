const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12"
  }
};
const { address: { street, city = "Unknown City" } } = person;

console.log("street:", street);
console.log("city:", city);