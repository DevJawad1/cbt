import { useState, useEffect } from "react"
import React from 'react'
import './studentcss.css'
import logo from '../assets/gomal logo.png'
import {useNavigate} from 'react-router-dom'
import axios from "axios"
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
        // data.map((item, i)=>{
        //     if(item.username.toLowerCase()==username.toLowerCase() && item.password.toLowerCase()==password.toLowerCase()){
        //         localStorage.setItem('currentstudent', i)
        //         Swal.fire({
        //             title: "Good job!",
        //             text: "Login successful!",
        //             icon: "success"
        //           });
        //         setTimeout(() => {
        //             navigate(`/student/${item.fullname}`)
        //         }, 1000);
        //     }
        //     else{
        //         Swal.fire({
        //             title: "Good job!",
        //             text: "Student not found!",
        //             icon: "error"
        //           });
        //     }
        // })
        let url = "https://cbt-backend-3zzv.onrender.com/user/studentlogin"
        axios.post(url, {username:username, password:password}).then((res)=>{
            // console.log(res)
            if(res.data.status){
                Swal.fire({
                    title: "Good job!",
                    text: "User Found!",
                    icon: "success"
                });
                localStorage.setItem('student', JSON.stringify(res.data.student))
                setTimeout(() => {
                    navigate(`/student/${res.data.student.username}`)
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
    <div className='sts container p-2 shadw'>
            <div className="d-flex gap-2 justify-content-center" style={{borderBottom:"1px solid gray", alignItems:""}}>
            <img src={logo} alt="" className='sts-logo'/>
            <p className='fs-4 text-center pt-2'>Login, student Only</p>
            </div>
                    <div className="inp-holder w-100">
                        <input type="text" placeholder='Username' onChange={(e)=>{setusername(e.target.value)}}/>
                    </div>
                    <div className="inp-holder w-100">
                        <input type="text" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}}/>
                    <div className="mt-1 text-center">
                    <button className='mt-2 w-50 text-white logbtn' onClick={submit}>Login</button>
                    </div>
                </div>
        </div>
  )
}

export default Studentlogin