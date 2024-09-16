//let arr = [1,4,5,3,6,5,4,44,23,80,9,211,34];  // 7
//let arr = [109, 170, 292, 99, 208, 233, 174, 221, 329, 115]
//let arr = [240, 112, 19, 297, 313, 311, 136]

export function selectionSort(array) {
    let numSwaps = [];
    for (let i = 0; i < array.length-1 ;  i++) {
        let minNum = array[i]
        let minIndex = i  
        for (let j = i; j < array.length - 1; j++) {
            if (minNum > array[j+1]) {
                numSwaps.push([minIndex,j+1, false])
                minNum = array[j+1]
                minIndex = j + 1
            }
            else{
                numSwaps.push([minIndex, j+1, false]) 
            }
        }
        numSwaps.push([i, minIndex, true])
        array[minIndex] =  array[i]
        array[i] = minNum
    }
    return numSwaps
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