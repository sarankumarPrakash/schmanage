import './App.css';
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Staff from './Pages/Staff';
import Course from './Pages/Course';
import Student from './Pages/Student';
import Login from './Pages/Login';
import Register from './Pages/Register'

function App() {
  return (
    <div className="App">

      <Router>
       <Routes>
        <Route path ='/' element={<Login />} />
        <Route path ='/student' element={<Student />} />
        <Route path ='/register' element={<Register />} />

        <Route path ='/course' element={<Course />} />
        <Route path ='/staff' element={<Staff />} />
       </Routes>

      </Router>
     
    </div>
  );
}

export default App;
