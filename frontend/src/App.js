import logo from './logo.svg';
import './App.css';
import { Text } from '@chakra-ui/react';
import Navbar from './Components/Navbar';
import AllRoutes from './Routes/AllRoutes';

function App() {
  return (
    <div className="App">
          <Navbar></Navbar>
          <AllRoutes></AllRoutes>
    </div>
  );
}

export default App;
