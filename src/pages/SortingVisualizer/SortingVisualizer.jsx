import { useEffect, useState } from 'react'
import './SortingVisualizer.scss'
import  {bubbleSort, bubbleSortcodeSnippet, bubbleSortSteps}  from '../../algorithms/BubbleSort.js';
import { selectionSort, selectionSortCodeSnippet, selectionSortSteps } from '../../algorithms/Selection.js';
import 'prismjs/themes/prism.css'; 
import Prism from 'prismjs';

function SortingVisualizer() {

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isChecked, setIsChecked] = useState(false);
  const [userArray, setUserArray] = useState([])
  const [message, setMessage] = useState('This is the message container')
  const [currentAlgo, setCurrentAlgo] = useState('')
  const [explanation, setExplanation] = useState([null, null])
  const [speed, setSpeed] = useState(1000)


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

  useEffect(()=>{
    if (currentAlgo === 'bubbleSort') {
      setExplanation([bubbleSortSteps, bubbleSortcodeSnippet])
    }
    else if (currentAlgo === 'selectionSort') {
      setExplanation([selectionSortSteps, selectionSortCodeSnippet])
    }

  }, [currentAlgo])

  useEffect(() => {
    Prism.highlightAll();  // highlights the code whenever explanation[1] is changed
  }, [explanation]);

  console.log('rendered')

  function handleCheckboxChange(e) {
    setIsChecked(e.target.checked);
  }

  function handleUserInputChange(e) {
    setUserArray(e.target.value)
  }
  
  function generateArray(e) {
    e.preventDefault()
    if(isAnimating) {
      setMessage('Animation and state updating are in process.. pls wait')
      return
    }
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
    const numberArray = userArray.split(',').map(num => Number(num));
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
      if(isAnimating) {
        setMessage('Animation and state updating are in process.. pls wait')
        return
      }
      setIsAnimating(true)
      setCurrentAlgo('bubbleSort')
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
    setCurrentAlgo('selectionSort')
    let copyArray = array.slice()
    let swapHistory = selectionSort(copyArray)  
    animateSorting(swapHistory, copyArray)
  }

  function startMergeSort(e) {
    e.preventDefault()
    window.alert('Have not implemented yet')
  }
  //console.log(explanation)

  function animateSorting(swapHistory, sortedArray) {
    let totalAnimationTime = (swapHistory.length - 1) * speed;
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
          }, speed * 0.3);
        }
        setTimeout(() => {
          document.getElementById(barOneIndex).classList.remove('comparing', 'swapped');
          document.getElementById(barTwoIndex).classList.remove('comparing', 'swapped');
        }, speed * 0.7); 

        if (i === swapHistory.length - 1) {  // update the array state at the last index
          setTimeout(() => {
            setArray(sortedArray);  
            setIsAnimating(false);  
            setMessage(`${totalAnimationTime / 1000} seconds`);
          }, speed * 0.8);    //update after the removing the animation color of last iteration
        }
      }, speed * i);   // total time for each comparison pair ( make sure all the animation time in this block is shorter than this)

      // if (i === swapHistory.length - 1) {
      //   setTimeout(() => {
      //     setArray(sortedArray)
      //     setIsAnimating(false)
      //     setMessage(`${totalAnimationTime / 1000} seconds`)  
      //   }, speed * 1.2 * i);   // if the timing is off, the last swap will happen after the array state update and messed up the last two bars order
      // }
    }
  }

  
  return (
    <div className="sorting-visualizer">
      <div className="setting">
      <div className="checkbox-container">
        <input 
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
          <button onClick={handleInsert}>Insert</button>:
          <button onClick={generateArray}>Generate</button>
        }
        <div className='array-generator'>
          {
            isChecked? <input className='userArrayInput' value={userArray} onChange={handleUserInputChange}></input> : 
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
          }
        </div>      
        <div className='adjustSpeed'>
          <select onChange={handleSpeedChange}>
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
            <option value="superfast">Super Fast</option>
          </select>
        </div>
        <button onClick={startBubbleSort}>Bubble Sort</button>
        <button onClick={startQuickSort}>Quick Sort</button>
        <button onClick={startSelectionSort}>Selection Sort</button>
        <button onClick={startMergeSort}>Merge Sort</button>
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
            />
            ))
          }
      </div>
      <div className="explanation">
        <div className='word-explanation'>
          <h2>Algorithm explanation</h2>
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