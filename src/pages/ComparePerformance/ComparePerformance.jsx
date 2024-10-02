import  { useContext, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { GlobalContext } from '../../context/GlobalState';
import './ComparePerformance.scss'


Chart.register(...registerables);

function ComparePerformance() {
  const { timeData } = useContext(GlobalContext);
  const [selectedSpeed, setSelectedSpeed] = useState('300MS');
  // when the user selects the speed to filter the graph
  // selectedSpeed state is changed, causing the re-render
  // after that, all variables associated with the selectedSpeed will also be re-assigned based on that new selectedSpeed
  const filteredData = timeData.filter(d => d.speed === selectedSpeed);
  const sortedData = [...filteredData].sort((a, b) => a.arraySize - b.arraySize);
  const sortedLabels = Array.from(new Set(sortedData.map(d => d.arraySize)));

 
  const chartData = {
    labels: sortedLabels, // Use the sorted labels
    datasets: [
      ...['Bubble Sort', 'Selection Sort', 'Insertion Sort'].map(algo => ({
        label: algo,
        data: sortedLabels.map(size => {
          const entry = sortedData.find(d => d.name === algo && d.arraySize === size);
          return entry ? entry.timeTaken : null; // Fill with time or null if no data for that size
        }),
        fill: false,
        borderColor: getColor(algo), // Custom function for different colors
        tension: 0.4,
      })),
    ],
  };

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
                type: 'category',
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
      <div className='manage-time-data'>
        {
          timeData  && timeData.length > 0? 
          timeData.map((eachData, index) => (
            <div key={index}>
              <div>{eachData.name} || array size : {eachData.arraySize} || Time taken : {eachData.timeTaken}s || Delay : {eachData.speed}</div>
              <button>Delete</button>
            </div>
          ))
          :
          <div>There is no data to show</div>
        }
      </div>
    </div>
  );
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