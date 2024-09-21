export function insertionSort(array) {
    let swapHistory = [];
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        
        while (j >= 0 && array[j] > key) {
            swapHistory.push([j, j + 1, true]); // Comparing and swapping elements
            array[j + 1] = array[j]; 
            j = j - 1;
        }
        swapHistory.push([j + 1, i, false]); // Comparing without a swap (final position)
        array[j + 1] = key;
    }
    return swapHistory;
}


export const insertionSortCodeSnippet = `
for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
        swapHistory.push([j, j + 1, true]); // Comparing and swapping elements
        array[j + 1] = array[j]; 
        j = j - 1;
    }
    swapHistory.push([j + 1, i, false]); // Comparing without a swap (final position)
    array[j + 1] = key;
}`

export const insertionSortSteps = [
    `1. Start with the second element in the array (the first element is considered sorted).`,
    `2. Compare the current element (key) with the elements in the sorted section (to its left).`,
    `3. Shift all elements in the sorted section that are greater than the key one position to the right.`,
    `4. Insert the key into its correct position in the sorted section.`,
    `5. Move to the next element in the array and repeat steps 2 to 4.`,
    `6. Continue this process until the entire array is sorted, with each element being inserted into its correct position`
];
