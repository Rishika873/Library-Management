import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './Login'
import StudentHome from './StudentHome'
import AdminPanel from './Admin'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path = '/register' element = {<Signup/>}></Route>
      <Route path = '/login' element = {<Login/>}></Route>
      <Route path = '/tostudent' element = {<StudentHome/>}></Route>
      <Route path = '/toadmin' element = {<AdminPanel/>}></Route>
    </Routes>
      
    </BrowserRouter>
  )
}

export default App
