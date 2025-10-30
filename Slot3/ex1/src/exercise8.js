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

    console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
    console.log("Buckets:", stats.buckets);

    const result = {
    total: stats.total,
    min: stats.min,
    max: stats.max,
    avg: (stats.total / ages.length).toFixed(2),
    buckets: stats.buckets

    
    };    console.log(result);
    console.log(JSON.stringify(result, null, 2));