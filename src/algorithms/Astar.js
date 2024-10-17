// Code snippet adapted from (Rohith S P,https://github.com/rohithaug) with a few changes
// URL: https://github.com/rohithaug/pathfinding-visualizer/tree/master/src/pathfindingAlgorithms

export function astar(grid, startPoint, endPoint) {
    let sortedVisitedPoints = []
    startPoint.distance = 0

    let unvisitedPoints = [];
    unvisitedPoints.push(startPoint)

    while (unvisitedPoints.length !== 0){

        unvisitedPoints.sort((pointA, pointB)=> pointA.totalDistance - pointB.totalDistance)
        const closestPoint = unvisitedPoints.shift();
        closestPoint.visited = true;
        if (closestPoint.distance === Infinity) return sortedVisitedPoints

        sortedVisitedPoints.push(closestPoint)
        if (closestPoint === endPoint) return sortedVisitedPoints;

        let unvisitedAdjacentPoints = getUnvisitedAdjacentPoints(grid, closestPoint);
        for (let adjacentPoint of unvisitedAdjacentPoints) {
            let distance = closestPoint.distance + 1
            if (neighbourNotInUnvisitedPoints(adjacentPoint, unvisitedPoints)) {
                unvisitedPoints.unshift(adjacentPoint)
                adjacentPoint.distance = distance
                //f(n) = g(n) + h(n)
                adjacentPoint.totalDistance = distance + manhattenDistance(adjacentPoint, endPoint); 
                adjacentPoint.previousPoint = closestPoint
            }
            else if (distance < adjacentPoint.distance) {
                adjacentPoint.distance = distance;
                adjacentPoint.totalDistance = distance + manhattenDistance(adjacentPoint, endPoint); 
                adjacentPoint.previousPoint = closestPoint 
            }
        }
    } 
    return sortedVisitedPoints  
}


function neighbourNotInUnvisitedPoints(adjacentPoint, unvisitedPoints) {
    for (let point of unvisitedPoints) {
        if (point.row === adjacentPoint.row && point.col=== adjacentPoint.col) {
            return false
        }
    }
    return true
}


function getUnvisitedAdjacentPoints(grid, point) {
    const adjacentPoints = [];
    // make sure we are not on upmost row and push the upper adjacent point
    if (point.row > 0) adjacentPoints.push(grid[point.row - 1][point.col])  
    // make sure we are not on lowest row and push the lower adjacent point 
    if (point.row < grid.length - 1) adjacentPoints.push(grid[point.row + 1][point.col])
    if (point.col > 0) adjacentPoints.push(grid[point.row][point.col - 1]) 
    if (point.col < grid[0].length - 1) adjacentPoints.push(grid[point.row][point.col + 1])
    return adjacentPoints.filter(adjacentPoint => !adjacentPoint.visited && !adjacentPoint.isWall)
}

function manhattenDistance(point, endPoint) {
    return Math.abs(point.row - endPoint.row) + Math.abs(point.col - endPoint.col);
  }

export function sortedAstarPathPoints(endPoint) {
    let shortestPathPoints = []
    let currentPoint = endPoint;

    while (currentPoint) {
        shortestPathPoints.unshift(currentPoint)
        currentPoint = currentPoint.previousPoint
    }
    return shortestPathPoints
}