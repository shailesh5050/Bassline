import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { Toaster } from 'react-hot-toast';
import { useUserContext } from './context/UserContext';
import Register from './Pages/Register';
import Loading from './Components/Loading';
import Album from './Pages/Album';
import Admin from './Pages/Admin';
import PlayList from './Pages/PlayList';
function App() {
  const { isAuth, loading } = useUserContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <Toaster />
        <Routes>
          <Route path='/' element={isAuth ? <Home /> : <Navigate to='/login' />} />
          <Route path='/login' element={isAuth ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/album/:id' element={isAuth ? <Album /> : <Navigate to='/login' />} />
          <Route path='/admin' element={isAuth ? <Admin /> : <Navigate to='/login' />} />
          <Route path='/playlist' element={isAuth ? <PlayList /> : <Navigate to='/login' />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
