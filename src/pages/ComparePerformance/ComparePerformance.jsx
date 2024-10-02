import  { useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { GlobalContext } from '../../context/GlobalState';
import './ComparePerformance.scss'


Chart.register(...registerables);

function ComparePerformance() {
  const { timeData, setTimeData } = useContext(GlobalContext);
  const [selectedSpeed, setSelectedSpeed] = useState('300MS');
  // when the user selects the speed to filter the graph
  // selectedSpeed state is changed, causing the re-render
  // after that, all variables associated with the selectedSpeed will also be re-assigned based on that new selectedSpeed
  // const filteredData = timeData.filter(d => d.speed === selectedSpeed);
  // const sortedData = [...filteredData].sort((a, b) => a.arraySize - b.arraySize);
  // const sortedLabels = Array.from(new Set(sortedData.map(d => d.arraySize)));

  const filteredData = timeData.filter(d => d.speed === selectedSpeed);
  const sortedData = [...filteredData].sort((a, b) => a.arraySize - b.arraySize);
  const sortedLabels = Array.from(new Set(sortedData.map(d => d.arraySize))).sort((a, b) => a - b);
  
  
  const chartData = {
    labels: sortedLabels,  // Use the sorted array sizes as labels
    datasets: [
      ...['Bubble Sort', 'Selection Sort', 'Insertion Sort'].map(algo => ({
        label: algo,
        data: sortedLabels.map(size => {
          // Find the entry for this algorithm and array size
          const entry = sortedData.find(d => d.name === algo && d.arraySize === size);
          // Return timeTaken or null to ensure a gap is inserted if no data exists
          return entry ? parseFloat(entry.timeTaken) : null;
        }),
        fill: false,
        borderColor: getColor(algo),  // Custom function for different colors
        tension: 0.4,
        spanGaps: true,  // This allows lines to connect across null values
      })),
    ],
  };

  function deleteData(e, index) {
    e.preventDefault()
    let copyTimeData = timeData.filter((eachData)=> timeData.indexOf(eachData) !== index )
    setTimeData(copyTimeData)
  }

  return (
    <div className='compare-perf'>
      <div className='setting'>
      <h2>Compare Performance</h2>
      <div className='speed-filter'>
      
        Filter with delay:
        <select value={selectedSpeed} onChange={(e) => setSelectedSpeed(e.target.value)}>
          <option value="50MS">50MS</option>
          <option value="300MS">300MS</option>
          <option value="600MS">600MS</option>
          <option value="1000MS">1000MS</option>
        </select>
      </div>
      </div> 
      <div className="chart-container">
  <Line
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false, // To allow flexible height
      scales: {
        x: {
          title: {
            display: true,
            text: 'Array Size',
          },
          type: 'linear',  // Changed to linear to handle numerical x-axis properly
          beginAtZero: true,  // Optional: Start the x-axis from zero if needed
          ticks: {
            stepSize: 1,  // Ensures increments of 1 if necessary
          },
        },
        y: {
          title: {
            display: true,
            text: 'Time Taken (s)',
          },
        },
      },
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.raw.y} s`,
          },
        },
      },
    }}
  />
</div>
      
    {timeData && timeData.length > 0 && (
      <div className='manage-time-data'>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Algorithm Name</th>
            <th>Array Size</th>
            <th>Time Taken (s)</th>
            <th>Delay</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {timeData.map((eachData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{eachData.name}</td>
              <td>{eachData.arraySize}</td>
              <td>{eachData.timeTaken}</td>
              <td>{eachData.speed}</td>
              <td>
                <button onClick={(e)=>deleteData(e, index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )}
</div>
    
  )
}

const getColor = (algoName) => {
  const colors = {
    'Bubble Sort': '#8884d8',
    'Selection Sort': '#82ca9d',
    'Insertion Sort': '#ff7300'
  }
  return colors[algoName] || '#000'  // Default color
};

export default ComparePerformance;