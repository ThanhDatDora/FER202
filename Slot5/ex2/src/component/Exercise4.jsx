function Exercise4() {
    const ages=[33, 12, 20, 16];
    const [first,, third=0, ...restAges] = ages;
    return (
        <div>
            <h1>Exercise 4</h1>
            <p>First: {first}, Third: {third}, RestAges: {restAges.join(", ")}</p>
        </div>
    );
}

export default Exercise4;