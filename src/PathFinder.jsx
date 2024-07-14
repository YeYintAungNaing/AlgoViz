import { useEffect, useState } from 'react'
import './App.scss'
import Point from './components/Point';
import  {dijkstra, sortedShortestPoints}  from './algorithms/Dijkstra.js';
import { recursiveDivision } from './mazeGenerators/recursiveDivision.js';

function PathFinder() {

  const [grid, setGrid] =  useState([]);
  const [gridLoaded, setGridLoaded] = useState(false)
  // const pointsRef = useRef({});  

  const START_X = 2;
  const START_Y = 2;
  const END_X = 7;
  const END_Y = 7;


  useEffect(()=>{
    if (!gridLoaded){
      initializeGrid()
      setGridLoaded(true)
    }
    console.log('useEffect')
  }, [gridLoaded])



 function handleClick(row, col) {

    if (row === START_X && col === START_Y || row === END_X && col === END_Y ) {
      movePoint(row , col)
    }
    else{
      wallToggle(row, col)
    }
  };


  function movePoint(row, col) {
    console.log('start or end')
  }


  function wallToggle(row, col) {
    let newGrid = grid.slice()
    let newPoint = grid[row][col]
    newPoint = {...newPoint, isWall : !newPoint.isWall}
    newGrid[row][col] = newPoint
    //console.log(newPoint)
    setGrid(newGrid)
  }

  function createPoint(row, col) {     // constructing each point in grid (showing its state, coordinates, type etc....)
    return {
      row : row,
      col : col,
      isStart : row === START_X && col === START_Y,
      isEnd : row === END_X && col === END_Y,
      distance : Infinity,
      visited : false,
      isWall : false,
      previousPoint : null
    }
  }

  console.log("rendered")

  function initializeGrid() {     
      const copyGrid = []
      for (let row=0; row<10 ; row++){
        const currentRow = []
        for (let col=0; col<10 ; col++){
          currentRow.push(createPoint(row, col))
        }
        copyGrid.push(currentRow)
      }
      setGrid(copyGrid)
  }


  function generateRecursiveDivisionMaze() {
    const startPoint = grid[START_X][START_Y]
    const endPoint = grid[END_X][END_Y]
    const generatedWalls = recursiveDivision(grid, startPoint, endPoint)
    console.log(generatedWalls)
  }

  //console.log(grid)

  function startDijkstra() {
    const startPoint = grid[START_X][START_Y]
    const endPoint = grid[END_X][END_Y]

    // not making a deep copy causes changes to origianl state value
    // but does not effect the app 
    // const copyGrid = JSON.parse(JSON.stringify(grid));    // using strigify method changes "infinity" value in each obejct to null
    // const copyGrid = grid.slice()   // this does not work since it is array of obejct ....objects are still pointing to the same original address
    // console.log(copyGrid)
    
    const sortedVisitedPoints = dijkstra(grid, startPoint, endPoint)
    //console.log(sortedVisitedPoints)
    visualizeDijkstra(sortedVisitedPoints, endPoint)
  }

  function visualizeDijkstra(sortedVisitedPoints, endPoint) {
    for (let i = 0; i < sortedVisitedPoints.length ; i++) {
      setTimeout(() => {
        const visitedPoint = sortedVisitedPoints[i]
        document.getElementById(`${visitedPoint.row}-${visitedPoint.col}`).className = "grid-item visited" 
      }, 20 * i);
    }

    //timeout delay to call findDijkstraPath after all previous timeouts have finished
    setTimeout(() => {
      findDijkstraPath(endPoint);
    }, 20 * sortedVisitedPoints.length);
  }

  function findDijkstraPath(endPoint) {
    let shortestPath = sortedShortestPoints(endPoint)
    if (shortestPath.length === 1) {
      window.alert('Unable to find the path')
      return
    }
    //console.log(shortestPath)
    for (let i = 0; i < shortestPath.length ; i++) {
      setTimeout(() => {
        const eachPath = shortestPath[i]
        document.getElementById(`${eachPath.row}-${eachPath.col}`).className = "grid-item path"
      }, 20 * i);
    }
  }

  function clearBoard() {
    //setGridLoaded(false)  // since the color, class of each point are not directly connected to "grid" state this does not work
  }

  return (
    <div className='app'>
      <button onClick={startDijkstra}> visualize</button>
      <button onClick={generateRecursiveDivisionMaze}> generate walls</button>
      <button onClick={clearBoard}>clear board</button>
      <div className='gridContainer'>
        {
          grid.map((eachRow) => 
            eachRow.map((point) =>  // each point created from createPoint()
            <Point 
              key={`${point.row}-${point.col}`}
              handleClick={handleClick}
              point={point}>
            </Point>   
          ))
        }
      </div>
    </div>
  )
}

export default PathFinder
