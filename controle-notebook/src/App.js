import './App.css';
import Home from './components/Home';
import AcquireForm from './components/Forms/AcquireForm';
import ReturnForm from './components/Forms/ReturnForm';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/formacquire/:id' element={<AcquireForm/>}></Route>
          <Route path='/formreturn/:id' element={<ReturnForm/>}></Route>
        </Routes>
      </Router>
 
      
    </div>
  );
}

export default App;
