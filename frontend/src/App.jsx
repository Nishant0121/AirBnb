
import './App.css'
import AuthLayout from './layouts/authLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAppContext } from './context/appContext'
import IndexPage from './pages/IndexPage'

function App() {

  const { isLogin } = useAppContext();

  console.log(isLogin);



  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={isLogin ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route path='/' element={isLogin ? <IndexPage /> : <Navigate to="/login" />} />
    </Routes>


  )
}

export default App
