//let arr = [1,4,5,3,6,5,4,44,23,80,9,211,34];  // 7
//let arr = [109, 170, 292, 99, 208, 233, 174, 221, 329, 115]
//let arr = [240, 112, 19, 297, 313, 311, 136]

export function selectionSort(array) {
    let swapHistory = [];
    for (let i = 0; i < array.length-1 ;  i++) {
        let minNum = array[i]   
        let minIndex = i  
        for (let j = i + 1; j < array.length ; j++) {
            swapHistory.push([minIndex,j, false])
            if (minNum > array[j]) {  
                minNum = array[j]
                minIndex = j 
            }
        }
        if (minIndex !== i) {    // only swap when the minvalue is changed
            swapHistory.push([i, minIndex, true])
            array[minIndex] =  array[i]
            array[i] = minNum   // swap the min with the number of current iteration
        }
    }
    return swapHistory
    //return array
}

//console.log(selectionSort(arr))

export const selectionSortCodeSnippet = `
for (let i = 0; i < array.length-1 ;  i++) {
        let minNum = array[i]
        let minIndex = i  
        for (let j = i; j < array.length - 1; j++) {
            if (minNum > array[j+1]) {
                minNum = array[j+1]
                minIndex = j + 1
            }
        }
        array[minIndex] =  array[i]
        array[i] = minNum
}`

export const selectionSortSteps = [
    `1. Start by finding the smallest element in the array.`,
    `2. Swap the smallest element with the first element of the array.`,
    `3. Move to the next unsorted part of the array.`,
    `4. Again, find the smallest element in the remaining unsorted section and swap it with the first element of that section.`,
    `5. Repeat the process until all elements are sorted.`,
    `6. The array is sorted when all elements have been selected and swapped into the correct order.`
]

