import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
