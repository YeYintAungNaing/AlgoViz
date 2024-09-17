
// let test = [12,3,66]

export function bubbleSort(array) {
    let numSwaps = []
    for (let i = 0; i < array.length -1  ; i++) {
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

//console.log(bubbleSort(test))
//console.log(numSwaps)

// function getSwapNumPairs() {
//     return numSwaps
// }


export const bubbleSortcodeSnippet = `
    for (let i = 0; i < array.length -1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) 
        if (array[j] > array[j + 1]) {
          let tempNum = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tempNum;
        }
      }
    }
  `

export const bubbleSortSteps = [
      `1. Start by comparing the first two adjacent elements in the array.`,
      `2. If the first element is larger, swap the two elements.`,
      `3. Move to the next adjacent pair and repeat the comparison and swap if necessary.`,
      `4. Continue this process until the largest element moves to the last position of the array.`,
      `5. Repeat the entire process for the remaining unsorted elements, reducing the array length by 1 each time.`,
      `6. The array is sorted when no more swaps are needed during an entire pass.`
]