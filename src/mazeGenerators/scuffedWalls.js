let walls;

export function scuffedWalls(grid, startPoint, endPoint) {
  walls = []    // forgetting to put this fking simple line make me wasted so many brain cells and time ... fml 
    for (let row=0; row < grid.length; row++){
      for (let col=0; col < grid[0].length; col++){

        if (grid[row] === startPoint[row] && grid[col] === startPoint[col] || 
            grid[row] === endPoint[row] && grid[col] === endPoint[col]) {
          continue
        }

        if (row % 2 === 0){
          if (col % 3 === 0){
            continue
          }
          else{
            if (Math.random() > 0.3){
              
              walls.push([row, col])
            }
          }
        }

        else{
          if (col % 3 !== 0) {
            continue
          }
          else {
            if (Math.random() > 0.4){
            walls.push([row, col])
          }
        }
      } 
    }
  }

  return walls
}