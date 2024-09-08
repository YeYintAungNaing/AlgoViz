import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import './App.scss'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SortingVisualizer from './pages/SortingVisualizer/SortingVisualizer';
import DataStructureVisualizer from './pages/DataStructure/DataStructureVisualizer';
import MyAlgorithm from './pages/MyAlgorithm/MyAlgorithm';
import Documentation from './pages/Documenttation/Documentation';
import ContactUs from './pages/ContactUs/ContactUs';
import PathFindingVisualizer from './pages/Pathfinder/PathFinder';
import Register from './pages/auth/Register';


function App() {

    function Layout() {
      return (
        <>
          <NavBar/>
          <div className='page-container'>
            <Outlet/>
          </div>
          <Footer/>
        </>
      )
    }
  
    const router = createBrowserRouter([
      {
        path : '/AlgoViz',
        element : <Layout/>,
        children : [
          {
            path : '/AlgoViz',
            element : <Home/> 
          },
          {
            path : '/AlgoViz/register',
            element : <Register></Register>
          },
          {
            path : '/AlgoViz/sortingVisualizer',
            element : <SortingVisualizer></SortingVisualizer>
          },
          {
            path : '/AlgoViz/dataStructureVisualizer',
            element : <DataStructureVisualizer></DataStructureVisualizer>
          },
          {
            path : '/AlgoViz/pathFindingVisualizer',
            element : <PathFindingVisualizer></PathFindingVisualizer>
          },
          {
            path : '/AlgoViz/myAlgorithm',
            element : <MyAlgorithm></MyAlgorithm>
          },
          {
            path : '/AlgoViz/documentation',
            element : <Documentation></Documentation>
          },
          {
            path : '/AlgoViz/contact',
            element : <ContactUs></ContactUs>
          },
        ]
      }
    ])
    
    return (
      <div className='app'>
          <RouterProvider router={router}/>       
      </div>
    )
  }
  
  export default App