import { useEffect, useState } from 'react'
import './SortingVisualizer.scss'
import  {bubbleSort}  from '../../algorithms/BubbleSort.js';
import { selectionSort } from '../../algorithms/Selection.js';

function SortingVisualizer() {

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(()=>{
    if (!isLoaded) {
      let generatedArray = []
      for (let i = 0; i < arraySize ; i++) {          // could have made it better
        const randomNum = Math.floor(Math.random() * 335) + 5
        generatedArray.push(randomNum)
        setArray(generatedArray)
      }
      setIsLoaded(true)
    }
    
  }, [isLoaded])

  //console.log('redered')
  
  function generateArray(e) {
    e.preventDefault()
    let generatedArray = []
    for (let i = 0; i < arraySize ; i++) {
      const randomNum = Math.floor(Math.random() * 335) + 5
      generatedArray.push(randomNum)
    }
    setArray(generatedArray)
  }
  //console.log(array)
  
  function handleSliderChange(e) {
    setArraySize(e.target.value)
  }

  function startBubbleSort(e) {
      e.preventDefault()
      let copyArray = array.slice()
      let swap = bubbleSort(copyArray)  
      //console.log(swap)
      for (let i = 0; i < swap.length; i++) {
        setTimeout(() => {

          // if (swap[i][1]=== 'sorted') {
          //   document.getElementById(swap[i][0]).className = 'sorting-bar sorted'
          // }

          const [barOneIndex, barTwoIndex, isSwapped] = swap[i]
          document.getElementById(barOneIndex).className = 'sorting-bar comparing'   // immediately hightlight the comparing pair
          document.getElementById(barTwoIndex).className = 'sorting-bar comparing'


          if (isSwapped) {
            
            const barOne = document.getElementById(barOneIndex)
            const barTwo = document.getElementById(barTwoIndex)


            setTimeout(() => {
              const barOneHeight = barOne.style.height;          // swapped after a certain time
              const barTwoHeight = barTwo.style.height;
  
              barOne.style.height = barTwoHeight;
              barTwo.style.height = barOneHeight; 
              document.getElementById(barOneIndex).className = 'sorting-bar swapped'
              document.getElementById(barTwoIndex).className = 'sorting-bar swapped' 
            }, 300);
          }
          setTimeout(() => {
            document.getElementById(barOneIndex).classList.remove('comparing', 'swapped');
            document.getElementById(barTwoIndex).classList.remove('comparing', 'swapped');
          }, 700); 

        }, 1000 * i);   // total time for each comparison pair ( make sure all the animation time in this block is shorter than this)
      }
  }

  function startQuickSort(e) {
    e.preventDefault()
    window.alert('Have not implemented yet')
  }

  function startSelectionSort(e) {
    e.preventDefault()
    let copyArray = array.slice()
      let swap = selectionSort(copyArray)  
      console.log(swap)
      for (let i = 0; i < swap.length; i++) {
        setTimeout(() => {

          const [barOneIndex, barTwoIndex, isSwapped] = swap[i]
          document.getElementById(barOneIndex).className = 'sorting-bar comparing'   // immediately hightlight the comparing pair
          document.getElementById(barTwoIndex).className = 'sorting-bar comparing'


          if (isSwapped) {
            
            const barOne = document.getElementById(barOneIndex)
            const barTwo = document.getElementById(barTwoIndex)


            setTimeout(() => {
              const barOneHeight = barOne.style.height;          // swapped after a certain time
              const barTwoHeight = barTwo.style.height;
  
              barOne.style.height = barTwoHeight;
              barTwo.style.height = barOneHeight; 
              document.getElementById(barOneIndex).className = 'sorting-bar swapped'
              document.getElementById(barTwoIndex).className = 'sorting-bar swapped' 
            }, 300);
          }
          setTimeout(() => {
            document.getElementById(barOneIndex).classList.remove('comparing', 'swapped');
            document.getElementById(barTwoIndex).classList.remove('comparing', 'swapped');
          }, 700); 

        }, 1000 * i);   // total time for each comparison pair ( make sure all the animation time in this block is shorter than this)
      }
  }

  function startMergeSort(e) {
    e.preventDefault()
    window.alert('Have not implemented yet')
  }

  
  return (
    <div className="sorting-visualizer">
      <div className="setting">
        <button onClick={generateArray}>Generate</button>
        <div className="slider-container">
          <p>{arraySize}</p>
          <input
            type="range"
            min="2"
            max="50"
            value={arraySize}
            onChange={handleSliderChange}
          />
        </div>
        <button onClick={startBubbleSort}>Bubble Sort</button>
        <button onClick={startQuickSort}>Quick Sort</button>
        <button onClick={startSelectionSort}>Selection Sort</button>
        <button onClick={startMergeSort}>Merge Sort</button>
      </div>
      <div className="interface">
        {
          array.length > 0 &&
          array.map((num, index) => (
            <div
              key={index}
              id={index}
              className="sorting-bar"
              style={{ height: `${num}px` }}
            />
            ))
          }
      </div>
      <div className="explanation">
      </div>
    </div>
  )
}

export default SortingVisualizer