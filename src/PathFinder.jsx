import { useEffect, useState } from 'react'
import './App.scss'
import Point from './components/Point';
import  {dijkstra, sortedShortestPoints}  from './algorithms/Dijkstra.js';
import { recursiveDivision } from './mazeGenerators/recursiveDivision.js';

function PathFinder() {

  const [grid, setGrid] =  useState([]);
  const [rowCount, setRowCount] = useState(25);
  const [columnCount, setColumnCount] = useState(40);
  const [cellSize, setCellSize] = useState(25)
  const [gridLoaded, setGridLoaded] = useState(false)
  const [message, setMessage] = useState("Select the desired algorithm and find the path")
  const [speed, setSpeed] = useState(30)
  // const pointsRef = useRef({});  



  // TODO 
  // hold down mouse to make wall
  // fix maze generating algorithm
  // start and end point position fix for various grid size
  // allow use to move start and end points
  // add more path finding algorithms


  const START_X = 3;
  const START_Y = 3;
  const END_X = 13;
  const END_Y = 24;


  useEffect(()=>{
      initializeGrid()
      setGridLoaded(true)
      console.log('useEffect')
  }, [gridLoaded])


 function handleClick(row, col) {

    if (row === START_X && col === START_Y || row === END_X && col === END_Y ) {
      movePoint(row , col)
    }
    else{
      wallToggle(row, col)
    }
  }


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
      path : false,
      previousPoint : null
    }
  }

  //console.log("rendered")

  function initializeGrid() {     
      const copyGrid = []
      for (let row=0; row<rowCount ; row++){
        const currentRow = []
        for (let col=0; col<columnCount ; col++){
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
    setGridLoaded(false)  // refrest the grid before generating walls
    animateWallGeneration(generatedWalls)
    //console.log(generatedWalls)
  }

  
  function animateWallGeneration(walls) {
    for (let i=0; i < walls.length; i++) {
      if (i === walls.length-1) {
        setTimeout(() => {
          const updatedGrid = updateGridStateWithWalls(walls)
          setGrid(updatedGrid)
        }, speed  * i);
      }
      let newWall = walls[i];
      setTimeout(() => {
        document.getElementById(`${newWall[0]}-${newWall[1]}`).className = "grid-item wall"
      }, speed * i);
    }
  }

  //console.log(JSON.stringify(grid, null, 2));

  function startDijkstra() {
    const startPoint = grid[START_X][START_Y]
    const endPoint = grid[END_X][END_Y]
    
    const sortedVisitedPoints = dijkstra(grid, startPoint, endPoint)
    //console.log(sortedVisitedPoints)
    visualizeDijkstra(sortedVisitedPoints, endPoint)
  }

  function visualizeDijkstra(sortedVisitedPoints, endPoint) {
    for (let i = 1; i < sortedVisitedPoints.length-1 ; i++) {
      setTimeout(() => {
        const visitedPoint = sortedVisitedPoints[i]
        document.getElementById(`${visitedPoint.row}-${visitedPoint.col}`).className = "grid-item visited" 
      }, speed * i);
    }

    //timeout delay to call findDijkstraPath after all previous timeouts have finished
    setTimeout(() => {
      findDijkstraPath(endPoint, sortedVisitedPoints);
    }, speed * sortedVisitedPoints.length);
  }

  function findDijkstraPath(endPoint, sortedVisitedPoints) {
    let shortestPath = sortedShortestPoints(endPoint)

    //console.log(sortedVisitedPoints)
    //console.log(shortestPath)
    
    if (shortestPath.length === 1) {
      window.alert('Unable to find the path')
      return
    }
    
    for (let i = 1; i < shortestPath.length ; i++) {
      if ( i === shortestPath.length - 1) {
        setTimeout(() => {
          const newGrid = updateGridState(grid, sortedVisitedPoints, shortestPath )
          setMessage(`Shortest path distance : ${shortestPath.length-1}`)
          setGrid(newGrid)
        }, i * 30);
        return
      }
      setTimeout(() => {
        const eachPath = shortestPath[i]
        document.getElementById(`${eachPath.row}-${eachPath.col}`).className = "grid-item path"
      }, 20 * i);
    }
  }

  function clearBoard() {
    setGridLoaded(false)  
  }


  function updateGridState(grid, sortedVisitedPoints, shortestPath) {
    let updatedGrid = grid.slice();
    for (let point of sortedVisitedPoints) {
      if (point.isStart || point.isEnd) {
        continue
      }
      //let newPoint = {...point, visited : true}   // already marked visisted in algorithm
      updatedGrid[point.row][point.col] = point
    }
    for (let point of shortestPath) {
      if (point.isEnd){
        return updatedGrid
      }
      if (point.isStart || point.isEnd) {
        continue
      }
      
      let newPoint = {...point, path : true };
      updatedGrid[point.row][point.col] = newPoint
    }

  }

  function updateGridStateWithWalls(walls) {
    let updatedGrid = grid.slice();
    
    for (let wall of walls) { 
     
      let copyPoint = {...updatedGrid[wall[0]][wall[1]], isWall : true}
      updatedGrid[wall[0]][wall[1]] = copyPoint
    }
    return updatedGrid
  }


  function adjustSpeed(speed_) {
    if (speed_ === "slow"){
      setSpeed(40)
    }
    if (speed_ === "medium"){
      setSpeed(25)
    }
    else{
      setSpeed(10)
    }
  }



  function setGridSize(size) {
    if (size === "Large") {
      setCellSize(25)
      setRowCount(25)
      setColumnCount(40)
      clearBoard()
    }

    if (size === "Normal") {
      setCellSize(30)
      setRowCount(16)
      setColumnCount(20)
      clearBoard()
    }
    
    if (size === "Small") {
      setCellSize(50)
      setRowCount(10)
      setColumnCount(15)
      clearBoard()
    }
    
  }

  return (
    <div className='app'>
      <div className='setting'>
        <div>
          <h1>PathFinder</h1>
        </div>
        <div>
          <button onClick={()=> setGridSize('Small')}>Small</button>
          <button onClick={()=> setGridSize('Normal')}>Normal</button>
          <button onClick={()=> setGridSize('Large')}>Large</button>
        </div>
        <div>
          <button>Select algorithm</button>
          <button onClick={startDijkstra}> visualize</button>
        </div>
        <div>
          <button>Maze generator</button>
          <button onClick={generateRecursiveDivisionMaze}> Generate Maze</button>
        </div>
        <div>
          <button onClick={()=>adjustSpeed('slow')}>Slow</button>
          <button onClick={()=>adjustSpeed('medium')}>Medium</button>
          <button onClick={()=>adjustSpeed('fast')}>Fast</button>
        </div>
        <div>
          <button onClick={clearBoard}>clear board</button>
        </div>
      </div>
      <div className='interface'>
        <div className='message-Container'>
          <h3 className='message'>{message}</h3>
        </div>
        <div className='gridContainer'
          style={{
            gridTemplateRows: `repeat(${rowCount}, 1fr)`,
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`
          }}
        >
          {
            grid.map((eachRow) => 
              eachRow.map((point) =>  // each point created from createPoint()
              <Point 
                key={`${point.row}-${point.col}`}
                handleClick={handleClick}
                cellSize={cellSize}
                point={point}>
              </Point>   
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default PathFinder
