import './App.css';
import {Router} from "@reach/router";
import Login from './components/Login';
import Register from './components/Register';
import LogReg from './views/LogReg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'

function App() {
  return (
    
    <div className="App .container-fluid">
    
      
      
        <Router>
          <LogReg path="/" />
          <Login path="/login" />

        </Router>      

      
    </div>
  );
}

export default App;
