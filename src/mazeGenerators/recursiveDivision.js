let walls = [];

export function recursiveDivision(grid, startPoint, endPoint) {
    const columnIndices = range(grid[0].length);
    const rowIndices = range(grid.length);
    getRecursiveWalls(grid, columnIndices, rowIndices, startPoint, endPoint)
    return walls
}

function range(len) {
    let result = [];
    for (let i = 0; i < len; i++) {
      result.push(i);
    }
    return result;
}


function getRecursiveWalls(grid, columnIndices, rowIndices, startPoint, endPoint) {
  if (columnIndices.length < 2 || rowIndices.length < 2 ) {
    return false
  }

  let verticalWall;  // represent the divided wall (not individual wall)
  let randomNum;

  if (columnIndices.length > rowIndices.length) {
    verticalWall = true;
    randomNum = getRandomOddNumberForDivision(columnIndices);
  }
  else {
    verticalWall = false;
    randomNum = getRandomOddNumberForDivision(rowIndices)
  }

  if (verticalWall) {
    addWall(verticalWall, randomNum, rowIndices, columnIndices, startPoint, endPoint);

    // for left side of the divided wall
    getRecursiveWalls(grid, columnIndices.slice(0, columnIndices.indexOf(randomNum)), rowIndices, startPoint, endPoint)

    // for right side of the divided wall
    getRecursiveWalls(grid, columnIndices.slice(columnIndices.indexOf(randomNum) + 1), rowIndices, startPoint, endPoint)

  }
  else{
    addWall(verticalWall, randomNum, rowIndices, columnIndices, startPoint, endPoint)

    // for upper side of the divided wall
    getRecursiveWalls(grid, columnIndices, rowIndices.slice(0, rowIndices.indexOf(randomNum)), startPoint, endPoint)

    // for lower side of the divided wall
    getRecursiveWalls(grid, columnIndices, rowIndices.slice(rowIndices.indexOf(randomNum) + 1), startPoint, endPoint)
  }
}


/* function getRandomOddNumberForDivision(range) {  
  let max = range.length - 1   
  let randomIndex = Math.floor(Math.random() * max);
  if (randomIndex % 2 === 0) {
    randomIndex = (randomIndex + 1) % max; 
  }
  return range[randomIndex];
} */

  function getRandomOddNumberForDivision(array) {
    let max = array.length - 1;
    let randomNum =
      Math.floor(Math.random() * (max / 2)) +
      Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 === 0) {
      if (randomNum === max) {
        randomNum -= 1;
      } else {
        randomNum += 1;
      }
    }
    return array[randomNum];
  }


function addWall(verticalWall, randomNum, rowIndices, columnIndices, startPoint, endPoint) {
  let isStartEnd = false // to check whether the current cell overlaps with start/end point
  let tempWalls = [];

  if (verticalWall) {    
    if (rowIndices.length === 2) return

    for (let index of rowIndices) {    // looping each row in the grid board
      if (
        index === startPoint.row && randomNum === startPoint.col || 
        index === endPoint.row && randomNum === endPoint.col
      ) {
        isStartEnd = true;
        continue
      } 
      tempWalls.push([index, randomNum])   // pushing each cooridinate pair from the entire column except start/end point to the array
    } 
  }

  else {     // horizontal wall   
    if (columnIndices.length === 2) return

    for (let index of columnIndices) {    // looping each column in the grid board
      if (
        index === startPoint.col && randomNum === startPoint.row ||
        index === endPoint.col && randomNum === endPoint.row
      ) {
        isStartEnd = true;
        continue
      }
      tempWalls.push([randomNum, index])
    }
  }

  // have to make a random hole in the entire wall if the wall is not on the start/end point
  if (!isStartEnd) {   
    tempWalls.splice(getRandomOddNumber(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}


/* function getRandomOddNumber(range) {
  let randomIndex = Math.floor(Math.random() * range.length);
  if (randomIndex % 2 === 0) {
    randomIndex = (randomIndex + 1) % range.length; 
  }
  return randomIndex;
} */

  function getRandomOddNumber(max) {
    let randomNum =
      Math.floor(Math.random() * (max / 2)) +
      Math.floor(Math.random() * (max / 2));
    if (randomNum % 2 !== 0) {
      if (randomNum === max) {
        randomNum -= 1;
      } else {
        randomNum += 1;
      }
    }
    return randomNum;
  }