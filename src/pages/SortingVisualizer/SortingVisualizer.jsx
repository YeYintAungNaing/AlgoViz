import { useEffect, useState } from 'react'
import './SortingVisualizer.scss'
import  {bubbleSort}  from '../../algorithms/BubbleSort.js';
import { selectionSort } from '../../algorithms/Selection.js';
import 'prismjs/themes/prism.css'; 
import Prism from 'prismjs';

function SortingVisualizer() {

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [message, setMessage] = useState('')


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

  useEffect(() => {
    Prism.highlightAll();  // Ensures Prism.js highlights the code when the component is mounted
  }, []);

  const codeSnippet = `
    for (let i = 0; i < array.length -1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) 
        if (array[j] > array[j + 1]) {
          let tempNum = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tempNum;
        }
      }
    }
  `;

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
      if(isAnimating) {
        setMessage('Animation and state updating are in process.. pls wait')
        return
      }
      setIsAnimating(true)
      let copyArray = array.slice()
      let swapHistory = bubbleSort(copyArray)  
      //console.log(swapHistory)
      animateSorting(swapHistory, copyArray)
     
  }
  //console.log(array)

  function startQuickSort(e) {
    e.preventDefault()
    window.alert('Have not implemented yet')
  }

  function startSelectionSort(e) {
    e.preventDefault()
    if(isAnimating) {
      setMessage('Animation and state updating are in process.. pls wait')
      return
    }

    setIsAnimating(true)
   
    let copyArray = array.slice()
    let swapHistory = selectionSort(copyArray)  
    animateSorting(swapHistory, copyArray)
  }

  function startMergeSort(e) {
    e.preventDefault()
    window.alert('Have not implemented yet')
  }

  function animateSorting(swapHistory, sortedArray) {
    for (let i = 0; i < swapHistory.length; i++) {
      setTimeout(() => {

        const [barOneIndex, barTwoIndex, isSwapped] = swapHistory[i]
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

      if (i === swapHistory.length - 1) {
        setTimeout(() => {
          setArray(sortedArray)
          setIsAnimating(false)   
        }, 1100 * i);   // if the timing is off, the last swap will happen after the array state update and messed up the last two bar order
      }
    }
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
            max="30"
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
        <div className='word-explanation'>
          <div>{message}</div>
        </div>
        <pre className='code-explanation'>
          <code className="language-javascript">
            {codeSnippet}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default SortingVisualizer