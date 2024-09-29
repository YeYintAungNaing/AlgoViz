import { useState } from "react"
import './DataStructure.scss'
 
function DataStructureVisualizer() {

  const [isAnimating, setIsAnimating] = useState(false)
  const [currentDs, setCurrentDs] = useState('stack')
  const [message, setMessage] = useState('')
  const [numbers, setNumbers] = useState([12, 14, 44, 23])
  const [tempElement, setTempElement] = useState(null)
  const [poppedElement, setPoppedElement] = useState(null);
  //const [explanation, setExplanation] = useState(null)
  const MAX_STACK_SIZE = 8;


  const stackExplanation = [
    'A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. This means that the last element added to the stack is the first one to be removed. Stacks are widely used in programming, especially in scenarios where you need to reverse elements or maintain a specific order, such as in undo operations, function calls, or parsing expressions.',
    [
      'Push : Insert an element at the top. If the stack is full (reaches its size limit), the push operation results in a stack overflow.',
      'Pop : The top-most element is removed. If the stack is empty, the pop operation results in a stack underflow.',
      'Peek : The element at the top of the stack is accessed, allowing you to see the most recent addition without modifying the stack.'
    ]
  ]



  function generateNumbers(e) {
    e.preventDefault()
    let generatedNumbers = []
    for (let i = 0; i < 4 ; i++) {
      const randomNum = Math.floor(Math.random() * 95) + 5
      generatedNumbers.push(randomNum)
    }
    setNumbers(generatedNumbers)
  }

  function handleDsChange(e) {
    const value = e.target.value;
    if (value === 'stack') {
      setCurrentDs('stack')
    } 
    else if (value === 'queuel') {
      setCurrentDs('queue')
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // console.log('re')

  async function handlePeek(e) {
    e.preventDefault()
    setIsAnimating(true)
    const lastIndex = numbers.length - 1
    console.log(lastIndex)
    document.getElementById(lastIndex).className = 'stack-element peeked'
    await sleep(1000)
    document.getElementById(lastIndex).className = 'stack-element'
    setIsAnimating(false)  
  }

  async function handlePush(e, newValue) {
    e.preventDefault();
    setIsAnimating(true)
    if (numbers.length < MAX_STACK_SIZE) {
      setTempElement(newValue);   
      await sleep(700);   // animation will play after setting a new tempEle
      setNumbers([...numbers, newValue]);
      setMessage(`${newValue} has been pushed to the stack`)
      setTempElement(null);
    } 
    else {
      setMessage('Stack overflow: Maximum stack size reached');
    }
    setIsAnimating(false)
  }

  const handlePop = async (e) => {
    e.preventDefault();
    setIsAnimating(true)
    if (numbers.length > 0) {
      const poppedValue = numbers[numbers.length - 1]; 
      setNumbers(numbers.slice(0, -1)); 
      setPoppedElement(poppedValue);
      await sleep(600); 
      setPoppedElement(null); 
      setMessage(`The last element, ${poppedValue}, has been removed to the stack`)
    } 
    else {
      setMessage('Stack underflow: No elements to pop');
    }
    setIsAnimating(false)
  }


  return (
    <div className="DS-visualizer">
      <div className="setting">  
        <div className='selectDS'>
          <select disabled={isAnimating} onChange={handleDsChange}>
            <option value="stack">Stack</option>
            <option value="queue">queue</option>
          </select>
        </div>
        <button disabled={isAnimating} onClick={generateNumbers}>Generate</button>
        <button disabled={isAnimating} onClick={handlePeek}>Peek</button>
        <button disabled={isAnimating} onClick={(e) => handlePush(e, prompt("Enter a value to push"))}>Push</button>
        <button disabled={isAnimating} onClick={handlePop}>Pop</button>
      </div>
      <div className='algoInfo'><h3>{message}</h3></div>
      <div className="interface">
      <div className="stack-container">
        {numbers.map((element, index) => (
          <div key={index} id={index} className="stack-element">
            {element}
          </div>
        ))}
         {tempElement && (   
          <div className="stack-element dropping-diagonal">
            {tempElement}
          </div>
        )}
         {poppedElement && (
          <div className="stack-element popping-diagonal">
            {poppedElement}
          </div>
        )}
      </div>  
      </div>
      <div className="explanation-container">
        <div className='explanation'>
          <h2>{currentDs && currentDs}</h2>
          <p>{stackExplanation[0]}</p>
          {
          stackExplanation[1].map((operation, i) => (
            <div key={i}>{operation}</div>
          ))
          }
        </div>
      </div>
    </div>
    )
}


export default DataStructureVisualizer