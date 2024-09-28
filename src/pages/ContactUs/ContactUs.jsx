import { useState } from "react"

export default function ContactUs() {

  const [count, setCount] = useState(1)

  function handleClick() {
    setCount(count+1)
  }

  let test = count+1
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <div>{test}</div>
    </div>
  )
}

