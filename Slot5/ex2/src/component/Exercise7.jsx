export function Exercise7() {
    const companies = [
  { name: "Company One", category: "Finance", start: 1981, end: 2004 },
  { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
  { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
  { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
  { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
  { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
  { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
  { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
];
const company0New ={...companies[0], start: companies[0].start +1 };

function concatAll(...arrays){
    return [].concat(...arrays);
}
return (
    <div>
        <h1>Exercise 7</h1>
        <p>Companies[0]:</p>
        <pre>{JSON.stringify(companies[0], null, 2)}</pre>
        <p>companies[0]New:</p>
        <pre>{JSON.stringify(company0New, null, 2)}</pre>
        <p>Concat All [1,2], [3,4], [5]:</p>
        <p>{JSON.stringify(concatAll([1,2], [3,4], [5]), null, 2)}</p>
        
    </div>
);
}
export default Exercise7;