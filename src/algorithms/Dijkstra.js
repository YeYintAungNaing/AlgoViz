export function dijkstra(grid, startPoint, endPoint) {
    const sortedVisitedPoints = []
    startPoint.distance = 0;

    let unvisitedPoints = []
    // push all points into the array (individual point in each row)
    for (const row of grid) {
        for (const point of row){
            unvisitedPoints.push(point)
        }
    }
  
    while (unvisitedPoints.length) {
        // sorting each point in the array based on distance attribute
        unvisitedPoints.sort((pointA, pointB)=> pointA.distance - pointB.distance) 
        
        const closestPoint = unvisitedPoints.shift();  // remove first element and return 

        if (closestPoint.distance === Infinity) return sortedVisitedPoints
        if (closestPoint.isWall) continue
        closestPoint.visited = true;
        sortedVisitedPoints.push(closestPoint) 
        if (closestPoint === endPoint) return sortedVisitedPoints;
        updateUnivistedAdjacentPoints(grid, closestPoint)        
    }
}


// updating distance of each adjacent point
function updateUnivistedAdjacentPoints(grid, point) {
    const unvisitedAdjacentPoints = getUnvisitedAdjacentPoints(grid, point);
    for (const adjacentPoint of  unvisitedAdjacentPoints) {   // update distance and previours point of each neighbour
        adjacentPoint.distance = point.distance + 1;
        adjacentPoint.previousPoint = point
    }
}


function getUnvisitedAdjacentPoints(grid, point) {
    const adjacentPoints = [];
    // make sure we are not on upmost row and push the upper adjacent point
    if (point.row > 0) adjacentPoints.push(grid[point.row - 1][point.col])  
    // make sure we are not on lowest row and push the lower adjacent point 
    if (point.row < grid.length - 1) adjacentPoints.push(grid[point.row + 1][point.col])
    if (point.col > 0) adjacentPoints.push(grid[point.row][point.col - 1]) 
    if (point.col < grid[0].length - 1) adjacentPoints.push(grid[point.row][point.col + 1])
    return adjacentPoints.filter(adjacentPoint => !adjacentPoint.visited)
}


export function sortedDijkstraPathPoints(endPoint) {
    let shortestPathPoints = []
    let currentPoint = endPoint;
    
    while (currentPoint) {
        shortestPathPoints.unshift(currentPoint);
        currentPoint = currentPoint.previousPoint
    }
    return shortestPathPoints  
}

