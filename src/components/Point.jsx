// eslint-disable-next-line react/prop-types
function Point({handleClick, point}) {

    // eslint-disable-next-line react/prop-types
    const {row, col, isStart, isEnd, isWall} = point


    const pointState = isStart ? 'startPoint' : isEnd?  'endPoint' : isWall? 'wall' : "unvisited"

    return (
        <div 
            className={`grid-item ${pointState}`}
            id={`${row}-${col}`}
            onClick={() => handleClick(row, col)}>
        </div>  
    )
}
export default Point