import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react';
import './MyAlgorithm.scss'
import { selectionSortSteps } from '../../algorithms/Selection';

function MyAlgorithm() {

    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(10)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [message, setMessage] = useState('This is the message container')
    const [speed, setSpeed] = useState(1000)
    const [code, setCode] = useState('function myAlgorithm(array) {\n  // Implement  logic here\n}');



    const handleEditorChange = (value) => {
      setCode(value);
    };

    // function swap(i, j) {
    //   console.log(i, j)
    // }
  
    // function runCode() {
    //   try {
    //     const sandbox = new Function('array', 'swap', 'console', `
    //       ${code}
    //       return myAlgorithm(array);
    //     `);
    //     sandbox(array, swap, console);
    //     setMessage('success')

    //   } catch (err) {
    //     console.error('Error in executing the code:', err);
    //     setMessage('error')
    //   }
    // }

    // function runCode() {
    //   try {
    //     // Define the sandbox environment with allowed functions
    //     const sandbox = {
    //       console: {
    //         log: (...args) => {
    //           console.log(...args); // Redirect to the actual console
    //         },
    //       },
    //       swap: (i, j) => {
    //         console.log(`Swapping elements at indices ${i} and ${j}`);
    //         // Implement your swap logic here
    //       },
    //       Array: Array // Allow usage of the Array object
    //     };



    async function runCode() {

      if(isAnimating) {
        setMessage('is animating')
        return
      }

      setIsAnimating(true)

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
  
      try {
        // Define the sandbox environment with allowed functions
        const sandbox = {
          swap: async (array, i, j) => {

            let tempNum = array[i]
            array[i] = array[j]
            array[j] = tempNum
            const barOne = document.getElementById(i)
            const barTwo = document.getElementById(j)

            document.getElementById(i).className = 'sorting-bar swapped'  // color the swapped bar immediately
            document.getElementById(j).className = 'sorting-bar swapped'

            const barOneHeight = barOne.style.height;   // change the height as th system highlight the bars       
            const barTwoHeight = barTwo.style.height;
            barOne.style.height = barTwoHeight;
            barTwo.style.height = barOneHeight; 

            await sleep(speed*0.7)   // wait for delay
           
            document.getElementById(i).classList.remove('swapped');  // remove the color after delay
            document.getElementById(j).classList.remove('swapped');
          },
          Array: Array // Allow usage of the Array object
        };
    
        const sandboxKeys = Object.keys(sandbox);
        const sandboxValues = Object.values(sandbox);
    
        // Create a new function that doesn't have access to global scope
        const wrappedCode = new Function(...sandboxKeys, `
          "use strict";
          return (function() {
            // Secure the environment by setting dangerous globals to undefined
            const window = undefined;
            const document = undefined;
            const alert = undefined;
            const fetch = undefined;
            const XMLHttpRequest = undefined;
            const localStorage = undefined ;
            const sessionStorage = undefined;
            const Function = undefined;
            const navigator = undefined;
            const setTimeout = undefined;
            const setInterval = undefined;
            const history = undefined;
            const ServiceWorker = undefined;
    
            ${code} // User's code
            
            if (typeof myAlgorithm !== 'function') {
              throw new Error('myAlgorithm function not defined');
            }
            return myAlgorithm;
          })();
        `);
    
        // Execute the user-provided code in the sandbox
        const userFunction = wrappedCode(...sandboxValues);
        let copyArray = array.slice()
        await userFunction(copyArray, sandbox.swap);
    
        
        setMessage('Algorithm executed successfully.');
        setIsAnimating(false)
      } catch (err) {
        // Log any error in the execution and display a message
        console.error('Error in executing the code:', err);
        setMessage('Error in the user algorithm. Check console for details.');
      }
    }
   

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
        <div className='adjustSpeed'>
          <select onChange={handleSpeedChange}>
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
            <option value="superfast">Super Fast</option>
          </select>
        </div>
        <button onClick={runCode}>Start my algorithm</button>
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
      <div className='code-editor-container'>
      <Editor
        height="400px"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="vs-dark"
        onChange={handleEditorChange}
      />
      </div>
    </div>
  )
}

export default MyAlgorithm
