import React from 'react'
import {useNavigate} from 'react-router-dom'
const Routepage = () => {
    const navigate=useNavigate()
    return (
        <div>
            <div className="nav" style={{ borderBottom: "1px solid" }}>
               <div className="w-100 d-flex mx-auto justify-content-center gap-4">
                 <div class="dropdown">
                    <a class="btn dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Student
                    </a>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" onClick={()=>{navigate('/studentsignup')}}>Sign up</a></li>
                        <li><a class="dropdown-item" onClick={()=>{navigate('/studentlogin')}}>Login</a></li>
                        {/* <li><a class="dropdown-item" href="#" onClick={()=>{navigate('studentsignup')}}>Dashboard</a></li> */}
                    </ul>
                </div>
                <div class="dropdown">
                    <a class="btn dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Tutor
                    </a>

                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" onClick={()=>{navigate('/tutorsignup')}}>Sign up</a></li>
                        <li><a class="dropdown-item" onClick={()=>{navigate('/tutorlogin')}}>Login</a></li>
                        {/* <li><a class="dropdown-item" href="#">Dashboard</a></li> */}
                    </ul>
                </div>
            </div>
               </div>
            <div className="container mt-4 shadow p-5 text-center">
                <p className='fs-1'>Welcome To Gomal CBT site</p>
            </div>
        </div>
    )
}

export default Routepage