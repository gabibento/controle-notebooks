import './App.css';
import Home from './components/Home';
import Form from './components/Form';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/form/:id' element={<Form/>}></Route>
        </Routes>
      </Router>
 
      
    </div>
  );
}

export default App;
