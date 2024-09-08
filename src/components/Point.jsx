// eslint-disable-next-line react/prop-types
function Point({handleMouseDown, handleMouseUp, handleOnMouseEnter, point, cellSize}) {

    // eslint-disable-next-line react/prop-types
    const {row, col, isStart, isEnd, isWall, path, visited} = point


    const pointState = isStart ? 'startPoint' : isEnd?  'endPoint' : isWall? 'wall' : path? 'path' : visited? "visited" : "unvisited"

    return (
        <div 
            className={`grid-item ${pointState}`}
            style=
            {{
                width : `${cellSize}px`,
                height:`${cellSize}px`
            }}
            id={`${row}-${col}`}
            onMouseDown={() => handleMouseDown(row, col)}
            onMouseEnter={() => handleOnMouseEnter(row, col)}
            onMouseUp={handleMouseUp}>
        </div>  
    )
}
export default Point