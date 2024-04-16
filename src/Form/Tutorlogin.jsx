import React, {useState} from 'react'
import {json, useNavigate} from "react-router-dom"
import './tutorform.css'
import logo from '../assets/gomal logo.png'
import axios from 'axios'
const Tutorlogin = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const submit=()=>{
        let url = "https://cbt-backend-3zzv.onrender.com/user/tutorlogin"
        axios.post(url, {email:email, password:password}).then((res)=>{
            // console.log(res)
            if(res.data.status){
                Swal.fire({
                    title: "Good job!",
                    text: "User Found!",
                    icon: "success"
                });
                localStorage.setItem('tutor', JSON.stringify(res.data.tutor))
                setTimeout(() => {
                    navigate(`/tutor/${res.data.tutor.fullname}`)
                }, 1500);
            }
            else{
                Swal.fire({
                    title: "Wrong datails",
                    text: res.data.message,
                    icon: "error"
                });
            }
        }).catch((err)=>{
            // console.log(err);
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