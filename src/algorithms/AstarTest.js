import TinyQueue from 'tinyqueue';


// does not work atm

export function astar(grid, startPoint, endPoint) {
    let sortedVisitedPoints = [];
    startPoint.distance = 0;
    startPoint.totalDistance = manhattanDistance(startPoint, endPoint);

    let unvisitedPoints = new TinyQueue([startPoint], (a, b) => a.totalDistance - b.totalDistance);

    while (unvisitedPoints.length > 0) {
        const closestPoint = unvisitedPoints.pop();
        closestPoint.visited = true;

        if (closestPoint.distance === Infinity) return sortedVisitedPoints;
        sortedVisitedPoints.push(closestPoint);

        if (closestPoint === endPoint) return sortedVisitedPoints;

        let unvisitedAdjacentPoints = getUnvisitedAdjacentPoints(grid, closestPoint);
        for (let adjacentPoint of unvisitedAdjacentPoints) {
            let distance = closestPoint.distance + 1;

            if (distance < adjacentPoint.distance) {
                adjacentPoint.distance = distance;
                adjacentPoint.totalDistance = distance + manhattanDistance(adjacentPoint, endPoint);
                adjacentPoint.previousPoint = closestPoint;

                if (!adjacentPoint.visited) {
                    unvisitedPoints.push(adjacentPoint);
                    unvisitedPoints.heapify();
                }
            }
        }
    }
    return sortedVisitedPoints;
}

function getUnvisitedAdjacentPoints(grid, point) { 
    const adjacentPoints = [];
    if (point.row > 0) adjacentPoints.push(grid[point.row - 1][point.col]);
    if (point.row < grid.length - 1) adjacentPoints.push(grid[point.row + 1][point.col]);
    if (point.col > 0) adjacentPoints.push(grid[point.row][point.col - 1]);
    if (point.col < grid[0].length - 1) adjacentPoints.push(grid[point.row][point.col + 1]);
    return adjacentPoints.filter(adjacentPoint => !adjacentPoint.visited && !adjacentPoint.isWall);
}

function manhattanDistance(node, endPoint) {
    return Math.abs(node.row - endPoint.row) + Math.abs(node.col - endPoint.col);
}


export function sortedAstarPathPoints(endPoint) {
    let shortestPathPoints = [];
    let currentPoint = endPoint;

    while (currentPoint) {
        shortestPathPoints.unshift(currentPoint);
        currentPoint = currentPoint.previousPoint;
    }
    return shortestPathPoints;
}
