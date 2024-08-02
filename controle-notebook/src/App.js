import './App.css';
import Home from './components/Home';
import AcquireForm from './components/Forms/AcquireForm';
import ReturnForm from './components/Forms/ReturnForm';
import UserForm from './components/Forms/UserForm';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import History from './components/History';

function App() {

  
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/formacquire/:id' element={<AcquireForm/>}></Route>
          <Route path='/formreturn/:id' element={<ReturnForm/>}></Route>
          <Route path='/userform' element={<UserForm/>}></Route>
          <Route path='/history/:id' element={<History/>}></Route>
        </Routes>
      </Router>
 
      
    </div>
  );
}

export default App;
