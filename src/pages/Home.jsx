import { Link } from "react-router-dom"
import sortingImg from "../imgs/sortingImg.png"
import pathFinderImg from "../imgs/pathfinderImg.png"
import dsImg from "../imgs/DsImg.png"
import myAlgo from "../imgs/myAlgo.png"

function Home() {
  return (
    <div className="home">
     <div className="home-cards">
      <div className="home-card">
        <Link className="link" to="/AlgoViz/sortingVisualizer">
          <img src={sortingImg} alt="Sorting Visualizer" />
        </Link>
        <h3>Sorting Visualizer</h3>
        <p>Learn how sorting algorithms work with interactive visualizations.</p>
        <Link className="link" to="/AlgoViz/sortingVisualizer">
          <button className="submit-button">Get Started</button>
        </Link>
      </div>
      <div className="home-card">
        <Link className="link" to="/AlgoViz/dataStructureVisualizer">
          <img src={dsImg} alt="dataStructureVisualizer" />
        </Link>
        <h3>Data Structure Visualizer</h3>
        <p>Explore various data structures through easy-to-understand visuals.</p>
        <Link className="link" to="/AlgoViz/dataStructureVisualizer">
          <button className="submit-button">Get Started</button>
        </Link>
      </div>
      <div className="home-card">
        <Link className="link" to="/AlgoViz/pathFindingVisualizer">
          <img src={pathFinderImg} alt="pathFindingVisualizerr" />
        </Link>
        <h3>PathFinding Visualizer</h3>
        <p>Understand pathfinding algorithms with real-time visualizations.</p>
        <Link className="link" to="/AlgoViz/pathFindingVisualizer">
          <button className="submit-button">Get Started</button>
        </Link>  
      </div>
      <div className="home-card">
        <Link className="link" to="/AlgoViz/myAlgorithm">
          <img src={myAlgo} alt="myAlgorithm" />
        </Link>
        <h3>My Algorithm</h3>
        <p>Customize and visualize your own algorithms on this page.</p>
        <Link className="link" to="/AlgoViz/myAlgorithm">
          <button className="submit-button">Get Started</button>
        </Link>
      </div>   
    </div>
  </div>
  )
}

export default Home