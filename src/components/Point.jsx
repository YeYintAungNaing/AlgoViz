// eslint-disable-next-line react/prop-types
function Point({handleClick, point, cellSize}) {

    // eslint-disable-next-line react/prop-types
    const {row, col, isStart, isEnd, isWall, path, visited} = point


    const pointState = isStart ? 'startPoint' : isEnd?  'endPoint' : isWall? 'wall' : path? 'path' : visited? "visited" : "unvisited"

    return (
        <div 
            className={`grid-item ${pointState}`}
            style={{
                width : `${cellSize}px`,
                height:`${cellSize}px`
              }}
            id={`${row}-${col}`}
            onClick={() => handleClick(row, col)}>
        </div>  
    )
}
export default Point