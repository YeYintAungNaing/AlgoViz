export function bubbleSort(array) {
    let numSwaps = []
    for (let i = 0; i < array.length - 1 ; i++) {
        for (let j=0; j < array.length - i - 1 ; j++) {
            if (array[j] > array[j+1]) { 
                numSwaps.push([j, j+1, true])
                let tempNum = array[j]
                array[j] = array[j+1]
                array[j+1] = tempNum;   
            }
            else{
                numSwaps.push([j, j+1, false]) 
            }
        }
    }
    return numSwaps
}

//console.log(bubbleSort(array))
//console.log(numSwaps)

// function getSwapNumPairs() {
//     return numSwaps
// }