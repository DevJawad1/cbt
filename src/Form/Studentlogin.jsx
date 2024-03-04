import { useState, useEffect } from "react"
import React from 'react'
import './studentcss.css'
import logo from '../assets/gomal logo.png'
import {useNavigate} from 'react-router-dom'
const Studentlogin = () => {
    const navigate= useNavigate()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [data, setdata] = useState('')
    useEffect(() => {
        // Retrieve existing users' data from local storage if it exists
        const existingData = localStorage.getItem('studentData');
        if (existingData) {
            setdata(JSON.parse(existingData));
        }
    }, []);

    const submit=()=>{
        data.map((item, i)=>{
            if(item.username==username && item.password==password){
                localStorage.setItem('currentstudent', i)
                setTimeout(() => {
                    navigate(`/student/${item.fullname}`)
                }, 1000);
            }
        })
    }
  return (
    <div className='sts container p-2 shadw'>
            <div className="d-flex gap-2 justify-content-center" style={{borderBottom:"1px solid gray", alignItems:""}}>
            <img src={logo} alt="" className='sts-logo'/>
            <p className='fs-4 text-center pt-2'>Sign up, student Only</p>
            </div>
                    <div className="inp-holder w-100">
                        <input type="text" placeholder='Username' onChange={(e)=>{setusername(e.target.value)}}/>
                    </div>
                    <div className="inp-holder w-100">
                        <input type="text" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}}/>
                    <div className="mt-1 text-center">
                    <button className='mt-2 w-50 text-white logbtn' onClick={submit}>Sign up</button>
                    </div>
                </div>
        </div>
  )
}

export default Studentlogin