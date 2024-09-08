import { useState } from 'react'
import './SortingVisualizer.scss'
import  {bubbleSort}  from '../../algorithms/BubbleSort.js';

function SortingVisualizer() {

  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(10)
  
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


  function startBubbleSort() {
      let copyArray = array.slice()
      let swap = bubbleSort(copyArray)  
      //console.log(swap)
      for (let i = 0; i < swap.length; i++) {
        setTimeout(() => {
          const [barOneIndex, barTwoIndex, isSwapped] = swap[i]
          document.getElementById(barOneIndex).className = 'sorting-bar comparing'
          document.getElementById(barTwoIndex).className = 'sorting-bar comparing'

          if (isSwapped) {
            const barOne = document.getElementById(barOneIndex)
            const barTwo = document.getElementById(barTwoIndex)

            // const barOneHeight = barOne.style.height;
            // const barTwoHeight = barTwo.style.height;

            // barOne.style.height = barTwoHeight;
            // barTwo.style.height = barOneHeight;

            setTimeout(() => {
              const barOneHeight = barOne.style.height;
              const barTwoHeight = barTwo.style.height;
  
              barOne.style.height = barTwoHeight;
              barTwo.style.height = barOneHeight;  
            }, 150);
          }
          setTimeout(() => {
            document.getElementById(barOneIndex).classList.remove('comparing');
            document.getElementById(barTwoIndex).classList.remove('comparing');
          }, 150); // Ensure this matches your transition time

        }, 250 * i);   // total time for each comparison pair ( make sure all the animation time in this block is shorter than this)
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
            max="50"
            value={arraySize}
            onChange={handleSliderChange}
          />
        </div>
        <button onClick={startBubbleSort}>Bubble Sort</button>
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