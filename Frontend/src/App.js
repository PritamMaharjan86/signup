import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import { useState } from 'react';
import RefreshHandler from './Components/RefreshHandler';


function App() {

  const [isAutenticate, setIsAuthenticate] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAutenticate ? element : <Navigate to='/login' />
  }



  return (
    <>
      <RefreshHandler setIsAuthenticate={setIsAuthenticate} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  );
}

export default App;
