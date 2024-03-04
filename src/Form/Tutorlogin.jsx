import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import './tutorform.css'
import logo from '../assets/gomal logo.png'
const Tutorlogin = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit=()=>{
        let getuser=JSON.parse(localStorage.tutorData)

        getuser.map((item, i)=>{
            if(item.email.toLowerCase()==email.toLowerCase() && item.password.toLowerCase()==password.toLowerCase()){
                localStorage.setItem('currentTutor', i)
                navigate(`/tutor/${item.fullname}`)
            }
        })
    }
  return (
    <div>
        <div className="tutor container w-50 p-2 shadow mt-2">
        <div className="d-flex gap-2 justify-content-center" style={{borderBottom:"1px solid"}}>
                <img src={logo} className='sts-logo' alt="" />
                <p className='pt-3'>Login, Tutor only</p>
            </div>
                    <input
                        type="text"
                        className='form-control mt-2'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className='form-control mt-2'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="text-center">
                    <button className='mt-3 btn btn-success w-50' onClick={submit}>Submit</button>
                    </div>
        </div>
    </div>
  )
}

export default Tutorlogin