export function Exercise8() {
    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const stats = ages.reduce((acc, age) => {
    acc.total += age;
    if (age < acc.min) acc.min = age;
    if (age > acc.max) acc.max = age;
    if (age >= 13 && age <= 19) {
        acc.buckets.teen++;
    } else if (age >= 20) {
        acc.buckets.adult++;
    }

    return acc;
    }, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } });
    //In Total, min, max, buckets{teen, adult}
    return (
        <div>
            <h1>Exercise 8</h1>
            <p>Total: {stats.total}</p>
            <p>Min: {stats.min}</p>
            <p>Max: {stats.max}</p>
            <p>Teen: {stats.buckets.teen}</p>
            <p>Adult: {stats.buckets.adult}</p>
        </div>
    );
}
export default Exercise8;