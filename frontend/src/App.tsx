import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import  { Toaster } from 'react-hot-toast';
import { useUserContext } from './context/UserContext';
import Register from './Pages/Register';
function App() {
  const { isAuth } = useUserContext();

  return (
    <>
       <Router>
         <Toaster />
        <Routes>
          <Route path='/' element={ isAuth ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={ isAuth ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={ <Register />} />
        </Routes>
       </Router>
    </>
  )
}

export default App
