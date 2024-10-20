import {  useState } from "react"
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
  const BLOCK_WIDTH = 50;

  const MAX_QUEUE_SIZE = 8;


  const stackExplanation = [
    'A stack is a linear data structure that follows the Last In, First Out (LIFO) principle. This means that the last element added to the stack is the first one to be removed. Stacks are widely used in programming, especially in scenarios where you need to reverse elements or maintain a specific order, such as in undo operations, function calls, or parsing expressions.',
    [
      'Push : Insert an element at the top. If the stack is full (reaches its size limit), the push operation results in a stack overflow.',
      'Pop : The top-most element is removed. If the stack is empty, the pop operation results in a stack underflow.',
      'Peek : The element at the top of the stack is accessed, allowing you to see the most recent addition without modifying the stack.'
    ]
  ]

  const queueExplanation = [
    'A queue is a linear data structure that follows the First In, First Out (FIFO) principle. This means that the first element added to the queue is the first one to be removed. Queues are commonly used in programming scenarios where order matters, such as in task scheduling, handling requests in web servers, or breadth-first search algorithms.',
    [
      'Enqueue: Insert an element at the rear (end) of the queue. If the queue is full (reaches its size limit), the enqueue operation results in a queue overflow.',
      'Dequeue: The element at the front (beginning) of the queue is removed. If the queue is empty, the dequeue operation results in a queue underflow.',
      'Peek: The element at the front of the queue is accessed, allowing you to see the oldest addition without modifying the queue.'
    ]
  ]

  const [explanation, setExplanation] = useState(stackExplanation)


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
      setExplanation(stackExplanation)
      
    } 
    else if (value === 'queue') {
      setCurrentDs('queue')
      setExplanation(queueExplanation)
     
    }
    setNumbers([12, 14, 44, 23])
    setMessage('')
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // console.log('re')

  async function handleStackPeek(e) {
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
    if (newValue > 999) {
      setMessage('Only 3 digits are allowed')
      return
    }
    if (newValue.length > 3) {
      setMessage('Only 3 characters are allowed')
      return
    }
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

  async function handleQueuePeek(e) {
    e.preventDefault()
    setIsAnimating(true)
    if(numbers.length > 0) {
      document.getElementById(0).className = 'queue-block peeked'
      await sleep(1000)
      document.getElementById(0).className = 'queue-block'
      setIsAnimating(false)
    }
    else{
      setMessage("Queue underflow: No elements to peek")
    }
    setIsAnimating(false)
  }

  async function handleEnqueue(e, newValue) {
    e.preventDefault();
    if (newValue > 999) {
      setMessage('Only 3 digits are allowed')
      return
    }
    if (newValue.length > 3) {
      setMessage('Only 3 characters are allowed')
      return
    }
       
    if (numbers.length < MAX_QUEUE_SIZE) {
      setIsAnimating(true);
      const targetIndex = numbers.length;  
      setTempElement({ value: newValue, targetIndex });
      await sleep(610);
      setNumbers([...numbers, newValue]);
      setMessage(`${newValue} has been inserted into the queue`);
      setTempElement(null);
      setIsAnimating(false);
    } else {
      setMessage('Queue overflow: Maximum queue size reached');
    }
  }
  
  
  async function handleDequeue(e) {
    e.preventDefault();
    if (numbers.length > 0) {
      setIsAnimating(true);
      const dequeuedValue = numbers[0];  
      setPoppedElement(dequeuedValue);   
      await sleep(600);
      setNumbers(numbers.slice(1));
      setMessage(`${dequeuedValue} has been dequeued from the queue`);
      setPoppedElement(null);  
      setIsAnimating(false);
    } else {
      setMessage('Queue underflow: No elements to dequeue');
    }
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
        {currentDs === 'stack' ? (
          <div>
            <button disabled={isAnimating} onClick={handleStackPeek}>Peek</button>
            <button disabled={isAnimating} onClick={(e) => handlePush(e, prompt("Enter a value to push"))}>Push</button>
            <button disabled={isAnimating} onClick={handlePop}>Pop</button>
          </div>
        ) 
        : (
          <div>
            <button disabled={isAnimating} onClick={handleQueuePeek}>Peek</button>
            <button disabled={isAnimating} onClick={(e) => handleEnqueue(e, prompt("Enter a value to push"))}>Enqueue</button>
            <button disabled={isAnimating} onClick={handleDequeue}>Dequeue</button>
          </div>
        )}
      </div>
      <div className='algoInfo'><h3>{message}</h3></div>
      {
        currentDs === 'stack' && (
          <div className="stack-interface">
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
        )
      }
      {
        currentDs === "queue" && (
          <div className="queue-interface">
          <div className="queue-container">
          {Array(MAX_QUEUE_SIZE).fill(null).map((_, index) => (
            <div key={index} id={index} className="queue-block">
              {numbers[index] !== undefined ? numbers[index] : ''}
            </div>
          ))}
          {tempElement && (
            <div
              className="queue-block enqueue-animation"
              style={{
                top: '-70px', //  (70px between container ground and the  lower part of that block)
                left: `${tempElement.targetIndex * (BLOCK_WIDTH)}px`, 
              }}
            >
              {tempElement.value}
            </div>
          )}
          {poppedElement && (
            <div
              className="queue-block dequeue-animation"
              style={{
                top: '0px',  
                left: '0px', 
              }}
            >
              {poppedElement}
            </div>
          )}
          </div>
          </div>
        ) 
      }
      <div className="explanation-container">
        <div className='explanation'>
          <h1>{currentDs && currentDs}</h1>
          <p>{explanation[0]}</p>
          {
          explanation[1].map((operation, i) => (
            <div className="DS-operation" key={i}>{operation}</div>
          ))
          }
        </div>
      </div>
    </div>
    )
}


export default DataStructureVisualizer