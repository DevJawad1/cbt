import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Studentdsb from './Student dashboard/Studentdsb'
import {Routes, Route} from 'react-router-dom'
import Tutor from './Form/Tutor'
import Tutorsignup from './Form/Tutorsignup'
import Tutorlogin from './Form/Tutorlogin'
import Studentsignup from './Form/Studentsignup'
import Studentlogin from './Form/Studentlogin'
import Uploadquestion from './Form/Uploadquestion'
import Routepage from './Routepage'
import Examboard from './Student dashboard/Examboard'
import Landingpage from './landing/Landingpage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Routepage/>}/>
      <Route path='/home' element={<Landingpage/>}/>
      <Route path='/student/:id' element={<Studentdsb/>}/>
      <Route path='/studentsignup' element={<Studentsignup/>}/>
      <Route path='/studentlogin' element={<Studentlogin/>}/>
      <Route path='/tutor/:id' element={<Tutor/>}/>
      <Route path='/tutorsignup' element={<Tutorsignup/>}/>
      <Route path='/tutorlogin' element={<Tutorlogin/>}/>
      <Route path='/uploadquestion/:id' element={<Uploadquestion/>}/> 
      <Route path='/student/exam/:id' element={<Examboard/>}/> 
    </Routes>
    </>
  )
}

export default App
