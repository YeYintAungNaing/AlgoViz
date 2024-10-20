import { useContext, useEffect, useState } from 'react'
import './SortingVisualizer.scss'
import  {bubbleSort, bubbleSortcodeSnippet, bubbleSortSteps}  from '../../algorithms/BubbleSort.js';
import { selectionSort, selectionSortCodeSnippet, selectionSortSteps } from '../../algorithms/Selection.js';
import 'prismjs/themes/prism.css'; 
import Prism from 'prismjs';
import { insertionSort, insertionSortCodeSnippet, insertionSortSteps } from '../../algorithms/InsertionSort.js';
import { GlobalContext } from '../../context/GlobalState.jsx';


function SortingVisualizer() {

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10)
  const [previousArray, setPreviousArray] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [userArray, setUserArray] = useState([])
  const [message, setMessage] = useState('Select your desired algorithm and visualize it')
  const [currentAlgo, setCurrentAlgo] = useState('')
  const [explanation, setExplanation] = useState([null, null])
  const [speed, setSpeed] = useState(1000)
  const [compareInfo, setCompareInfo] = useState(null)   // comparison data will be saved insided this immediately after sorting is done
  const {setTimeData} = useContext(GlobalContext);
  

  useEffect(()=>{
    if (!isLoaded) {
      let generatedArray = []
      for (let i = 0; i < arraySize ; i++) {          // could have made it better
        const randomNum = Math.floor(Math.random() * 335) + 5
        generatedArray.push(randomNum)
        setArray(generatedArray)
        setPreviousArray(generatedArray)
      }
      setIsLoaded(true)
    } 
  }, [isLoaded])
  

  //console.log('rendered')


  // useEffect(()=>{
  //   if (currentAlgo === 'BubbleSort') {
  //     setExplanation([bubbleSortSteps, bubbleSortcodeSnippet])
  //   }
  //   else if (currentAlgo === 'SelectionSort') {
  //     setExplanation([selectionSortSteps, selectionSortCodeSnippet])
  //   }
  //   else if (currentAlgo === 'InsertionSort') {
  //     setExplanation([insertionSortSteps, insertionSortCodeSnippet])
  //   }
  // }, [currentAlgo])

  
  useEffect(() => {
    Prism.highlightAll();  // highlights the code whenever explanation[1] is changed
  }, [explanation]);
  //console.log('rendered')

  function handleCheckboxChange(e) {
    setIsChecked(e.target.checked);
  }


  function handleUserInputChange(e) {
    const value = e.target.value;

    if (/^[0-9,]*$/.test(value)) {
        setUserArray(value);
    }
    else{
      setMessage('Only intergers are allowed')
    }
  }
  
  function generateArray(e) {
    e.preventDefault()
    setPreviousArray(array)

    let generatedArray = []
    for (let i = 0; i < arraySize ; i++) {
      const randomNum = Math.floor(Math.random() * 335) + 5
      generatedArray.push(randomNum)
    }
    setArray(generatedArray)  
  }
  //console.log(array)

  function handleInsert(e) {
    e.preventDefault()
    // if (userArray.length < 0) {
    //   setMessage('There is nothing to insert')
    //   return
    // }
    const numberArray = userArray.split(',').map(num => Number(num));
    if (numberArray.length < 2){
      setMessage('Array must have at least 2 elements')
      return
    }
    for (let num of numberArray) {
      if (num > 340) {
        setMessage('Interger must be smaller than 340')
        return
      } 
    }
    setArray(numberArray);
  }
  

  function handleSliderChange(e) {
    setArraySize(e.target.value)
  }


  function handleSpeedChange(e) {
    const value = e.target.value;
    if (value === 'slow') {
      setSpeed(1000);
    } 
    else if (value === 'normal') {
      setSpeed(600);
    } 
    else if (value === 'fast') {
      setSpeed(300);
    } 
    else if (value === 'superfast') {
      setSpeed(50);
    }
  }


  function startBubbleSort(e) {
      e.preventDefault()
      setIsAnimating(true)
      setMessage(`Bubble Sort is running`)
      setCurrentAlgo('BubbleSort')
      setExplanation([bubbleSortSteps, bubbleSortcodeSnippet])
      let copyArray = array.slice()
      let swapHistory = bubbleSort(copyArray)  
      //console.log(swapHistory)
      animateSorting(swapHistory, copyArray, 'Bubble Sort')  // cannot use currentAlgorithm state in the same function scope after setting a new state
     
  }
  //console.log(array)

  //function startQuickSort(e) {
    //e.preventDefault()
    //window.alert('have not implemented yet!')
    // if(isAnimating) {
    //   setMessage('Animation and state updating are in process.. pls wait')
    //   return
    // }
    // setIsAnimating(true)
    // setCurrentAlgo('selectionSort')

    // let copyArray = array.slice()
    // let swapHistory = quickSort(copyArray)
    // animateQuickSort(swapHistory, copyArray)
    // // console.log(copyArray)
    // console.log(swapHistory)
  //}

  function startSelectionSort(e) {
    e.preventDefault()
    setIsAnimating(true)
    setMessage(`Selection sort is running`)
    setCurrentAlgo('SelectionSort')
    setExplanation([selectionSortSteps, selectionSortCodeSnippet])
    let copyArray = array.slice()
    let swapHistory = selectionSort(copyArray)  
    animateSorting(swapHistory, copyArray, 'Selection Sort')  
  }


  function startInsertionSort(e) {
    e.preventDefault()
    setIsAnimating(true)
    setMessage(`Insertion sort is running`)
    setCurrentAlgo('InsertionSort')
    setExplanation([insertionSortSteps, insertionSortCodeSnippet])
    let copyArray = array.slice()
    let swapHistory = insertionSort(copyArray)  
    //console.log(swapHistory)
    animateSorting(swapHistory, copyArray, 'Insertion Sort')
  }


  //console.log(explanation)

  // function animateSorting(swapHistory, sortedArray) {
  //   let totalAnimationTime = (swapHistory.length - 1) * speed;
  //   for (let i = 0; i < swapHistory.length; i++) {
  //     setTimeout(() => {

  //       const [barOneIndex, barTwoIndex, isSwapped] = swapHistory[i]
  //       document.getElementById(barOneIndex).className = 'sorting-bar comparing'   // immediately hightlight the comparing pair
  //       document.getElementById(barTwoIndex).className = 'sorting-bar comparing'


  //       if (isSwapped) {
          
  //         const barOne = document.getElementById(barOneIndex)
  //         const barTwo = document.getElementById(barTwoIndex)

  //         setTimeout(() => {
  //           const barOneHeight = barOne.style.height;          // swapped after a certain time
  //           const barTwoHeight = barTwo.style.height;

  //           barOne.style.height = barTwoHeight;
  //           barTwo.style.height = barOneHeight; 
  //           document.getElementById(barOneIndex).className = 'sorting-bar swapped'
  //           document.getElementById(barTwoIndex).className = 'sorting-bar swapped' 
  //         }, speed * 0.3);
  //       }
  //       setTimeout(() => {
  //         document.getElementById(barOneIndex).classList.remove('comparing', 'swapped');
  //         document.getElementById(barTwoIndex).classList.remove('comparing', 'swapped');
  //       }, speed * 0.7); 

  //       if (i === swapHistory.length - 1) {  // update the array state at the last index
  //         setTimeout(() => {
  //           setArray(sortedArray);  
  //           setIsAnimating(false);  
  //           setMessage(`${totalAnimationTime / 1000} seconds`);
  //         }, speed * 0.8);    //update after the removing the animation color of last iteration
  //       }
  //     }, speed * i);   // total time for each comparison pair ( make sure all the animation time in this block is shorter than this)
  //   }
  // }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function animateSorting(swapHistory, sortedArray, algo) {
    setPreviousArray(array)
    const startTime = performance.now();  // Start timer
    for (let i = 0; i < swapHistory.length; i++) {
      const [barOneIndex, barTwoIndex, isSwapped] = swapHistory[i];
  
      // Highlight the comparing bars
      document.getElementById(barOneIndex).className = 'sorting-bar comparing';
      document.getElementById(barTwoIndex).className = 'sorting-bar comparing';
      
      await sleep(speed * 0.5); // delay before swappig or removing 
  
      if (isSwapped) {
        const barOne = document.getElementById(barOneIndex);
        const barTwo = document.getElementById(barTwoIndex);
  
        const barOneHeight = barOne.style.height;
        const barTwoHeight = barTwo.style.height;
  
        
        barOne.style.height = barTwoHeight;
        barTwo.style.height = barOneHeight;
  
        // Change to swapped style
        document.getElementById(barOneIndex).className = 'sorting-bar swapped';
        document.getElementById(barTwoIndex).className = 'sorting-bar swapped';
  
        await sleep(speed * 0.4); // Only wait for swap animation if swap happens
      }
  
      document.getElementById(barOneIndex).classList.remove('comparing', 'swapped');
      document.getElementById(barTwoIndex).classList.remove('comparing', 'swapped');
  
  
      // If it's the last iteration, update the array and stop animation
      if (i === swapHistory.length - 1) {
        const endTime = performance.now();  
        const totalTime = (endTime - startTime) / 1000;  
        setMessage(`${algo} : ${totalTime.toFixed(2)} seconds`);
        await sleep(320)
        setArray(sortedArray); 
        setCompareInfo({ name: algo, speed: `${speed}MS`, arraySize: arraySize, timeTaken: totalTime.toFixed(2)})
        setIsAnimating(false);  
      }
    }
  }


  function restoreArray(e) {
    e.preventDefault()
    setArray(previousArray)
  }

  function saveData(e) {
    e.preventDefault()
    if (!compareInfo) {
      setMessage('There is no data to save, start an algorithm to make a new data')
      return
    }
    setTimeData(prevTimeData => [...prevTimeData, compareInfo ]);
    setMessage('Data has been saved')
  }
  //console.log(timeData)
  
  return (
    <div className="sorting-visualizer">
      <div className="setting">
      <div className="checkbox-container">
        <input
          disabled={isAnimating} 
          type="checkbox" 
          id="featureCheckbox" 
          checked={isChecked} 
          onChange={handleCheckboxChange} 
        />
        <label htmlFor="featureCheckbox" className="checkbox-label">
          Insert your own array
        </label>
      </div>
        {
        isChecked?   
          <button disabled={isAnimating} onClick={handleInsert}>Insert</button>:
          <button disabled={isAnimating} onClick={generateArray}>Generate</button>
        }
        <div className='array-generator'>
          {
            isChecked? <input className='userArrayInput' disabled={isAnimating} value={userArray} onChange={handleUserInputChange}></input> : 
            <div className="slider-container">
            <p>{arraySize}</p>
            <input
              disabled={isAnimating}
              type="range"
              min="2"
              max="30"
              value={arraySize}
              onChange={handleSliderChange}
            />
          </div>
          }
        </div>      
        <div className='adjustSpeed'>
          <select disabled={isAnimating} onChange={handleSpeedChange}>
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
            <option value="superfast">Super Fast</option>
          </select>
        </div>
        <button disabled={isAnimating} onClick={startBubbleSort}>Bubble Sort</button>
        <button disabled={isAnimating} onClick={startSelectionSort}>Selection Sort</button>
        <button disabled={isAnimating} onClick={startInsertionSort}>Insertion Sort</button>
        <button disabled={isAnimating} className='special-button' onClick={restoreArray}>Restore array</button>
        <button disabled={isAnimating} onClick={saveData}>Save data</button>
      </div>
      <div className='algoInfo'><h3>{message}</h3></div>
      <div className="interface">
        {
          array.length > 0 &&
          array.map((num, index) => (
            <div
              key={index}
              id={index}
              className="sorting-bar"
              style={{ height: `${num}px` }}
            >
               {
                !isAnimating && num
               }
            </div>
          ))
        }
      </div>
      <div className="explanation">
        <div className='word-explanation'>
          <h2>{currentAlgo && currentAlgo}</h2>
            {
              explanation[0] &&
              explanation[0].map((eachStep, i) => 
                <div key={i} className='step'>{eachStep}</div>
              )
            }
        </div>
        <pre className='code-explanation'>
          <code className="language-javascript">
          {explanation[1]}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default SortingVisualizer