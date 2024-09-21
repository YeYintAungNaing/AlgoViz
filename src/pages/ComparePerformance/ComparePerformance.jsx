import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

function ComparePerformance() {

  const {timeData, setTimeData} = useContext(GlobalContext);
  console.log(timeData)

  return (
    <div>
      {
        timeData.length > 0 && 
        timeData.map((eachData) => eachData.map((ele, i) => <div key={i}>{ele}</div>))
      }
    </div>
  )
}

export default ComparePerformance