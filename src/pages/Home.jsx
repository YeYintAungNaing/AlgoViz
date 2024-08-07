import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home">
      <div className="home-cards">
      <div className="home-card">
        <Link className="link" to="/AlgoViz/sortingVisualizer">
          <button>Sorting Visualizer</button>
        </Link>
      </div>
      <div className="home-card">
        <Link className="link" to="/AlgoViz/dataStructureVisualizer">
        <button>Data Structure Visualizer</button>
        </Link>
      </div>
      <div className="home-card">
        <Link className="link" to="/AlgoViz/pathFindingVisualizer">
          <button>PathFinding Visualizer</button>
        </Link>  
      </div>
      <div className="home-card">
        <Link className="link" to="/AlgoViz/myAlgorithm">
          <button>My Algorithm</button>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default Home