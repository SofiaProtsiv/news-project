export default function groupBy(array, callback) {
    const groupByObj = {};

    for (const objectEl of array) {
        const key = callback(objectEl);

        if (groupByObj[key]) {
            groupByObj[key].push(objectEl);
        } else {
            groupByObj[key] = [objectEl];
        }
    }
    return Object.entries(groupByObj);
}