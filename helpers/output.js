const showOutput = (array) => {
    // Remove the index in console.table
    // https://stackoverflow.com/questions/49618069/remove-index-from-console-table
    const transformed = array.reduce((arr, { id, ...x }) => { arr[id] = x; return arr }, {})
    console.table(transformed)
}

module.exports = showOutput;