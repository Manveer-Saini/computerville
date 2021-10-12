import './App.css';
import {Router} from "@reach/router";
import Login from './components/Login';
import Register from './components/Register';
import LogReg from './views/LogReg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import BuildPC from './components/BuildPC';
import ReviewOrder from './views/ReviewOrder';

function App() {
  return (
    
    <div className="App">
        <Router>
          <LogReg path="/" />
          <Login path="/Login" />
          <Register path="/Register"/>
          <BuildPC path="/buildOrder"/>
          <ReviewOrder path="/ReviewOrder"/>
        </Router>      

      
    </div>
  );
}

export default App;
