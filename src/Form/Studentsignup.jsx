import React, {useState, useEffect} from 'react'
import './studentcss.css'
import logo from '../assets/gomal logo.png'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const Studentsignup = () => {
    const navigate= useNavigate()
    const [fullname, setfullname] = useState('')
    const [gender, setgender] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [grade, setgrade] = useState('')
    const [grade2, setgrade2] = useState('')
    const [data, setdata] = useState('')
    useEffect(() => {
        // Retrieve existing users' data from local storage if it exists
        const existingData = localStorage.getItem('studentData');
        if (existingData) {
            setdata(JSON.parse(existingData));
        }
    }, []);

    const submit=()=>{

        if(grade=='JSS 1A' || grade=='JSS 1B' || grade=='JSS 1C'|| grade=='JSS 1D'){
            setgrade2('JSS 1')
        }
        else if(grade=='JSS 2A' || grade=='JSS 2B' || grade=='JSS 2C'|| grade=='JSS 2D'){
            setgrade2('JSS 2')
        }
        else if(grade=='JSS 3A' || grade=='JSS 3B' || grade=='JSS 3C'|| grade=='JSS 3D'){
            setgrade2('JSS 3')
        }
        else if(grade=='SSS 1A' || grade=='SSS 1B' || grade=='SSS 1C'|| grade=='SSS 1D'){
            setgrade2('SSS 1')
        }
        else if(grade=='SSS 2A' || grade=='SSS 2B' || grade=='SSS 2C'|| grade=='SSS 2D'){
            setgrade2('SSS 2')
        }
        else if(grade=='SSS 3A' || grade=='SSS 3B' || grade=='SSS 3C'|| grade=='SSS 3D'){
            setgrade2('SSS 3')
        }
        if(fullname==""|| gender==""|| grade==""||grade2==""|| username==""|| password==""){
            alert("Fill evrything")
        }
        else{
            const newUser = { fullname, gender, grade,grade2, username, password };
            // const updatedData = [...data, newUser];
            // setdata(updatedData);
            // console.log(grade2);
            // localStorage.setItem('studentData', JSON.stringify(updatedData));
            // navigate('/studentlogin')
            let url = "https://cbt-backend-3zzv.onrender.com/user/studentsignup"
            axios.post(url, newUser).then((res)=>{
                // console.log(res);
                if(res.data.status){
                    Swal.fire({
                        title: "Good job!",
                        text: "Signup successful!",
                        icon: "success"
                    });
                    setTimeout(() => {
                        navigate('/studentlogin')
                    }, 1500);
                }
                else{
                    Swal.fire({
                        title: "Invalid!",
                        text: res.data.message,
                        icon: "error"
                    });
                }
            }).catch((err)=>{
                // console.log(err);
            })
        }

    }
    return (
        <div className='sts container shadow'>
            <div className="d-flex gap-2 justify-content-center" style={{borderBottom:"1px solid gray", alignItems:""}}>
            <img src={logo} alt="" className='sts-logo'/>
            <p className='fs-4 text-center pt-2'>Sign up, student Only</p>
            </div>
            <div className="sts d-flex">
                {/* <div className='w-100 logo d-flex p-5 justify-content-center'>
                    <img src={logo} alt="" />
                </div> */}
                <div className='sts all-inp w-100'>
                    <div className="inp-holder">
                        <input type="text" placeholder='Fullname' onChange={(e)=>{setfullname(e.target.value)}}/>
                    </div>
                    <div className="inp-holder">
                        <input type="text" placeholder='Username' onChange={(e)=>{setusername(e.target.value)}}/>
                    </div>
                    <div className="inp-holder">
                        <input type="text" placeholder='Gender' onChange={(e)=>{setgender(e.target.value)}}/>
                    </div>
                    <div className="d-flex">
                    <select name="" id="" className='inp-holder w-100' style={{ height: "48px", outline: "none" }} onChange={(e) => setgrade(e.target.value)} value={grade}>

                    <option value="" selected disabled>Select Class </option>
                            <option value="" selected>Junior Secondary School</option>
                            <option value="" disabled>JSS 1</option>
                            <option value="JSS 1A">JSS 1A</option>
                            <option value="JSS 1B">JSS 1B</option>
                            <option value="JSS 1C">JSS 1C</option>
                            <option value="JSS 1D">JSS 1D</option>
                            {/* <option value="J1">All JSS 1D</option> */}

                            <option value="" disabled>JSS 2</option>
                            <option value="JSS 2A">JSS 2A</option>
                            <option value="JSS 2B">JSS 2B</option>
                            <option value="JSS 2C">JSS 2C</option>
                            <option value="JSS 2D">JSS 2D</option>
                            {/* <option value="JS 2">All JSS 2</option> */}

                            <option value="" disabled>JSS 3</option>
                            <option value="JSS 3A">JSS 3A</option>
                            <option value="JSS 3B">JSS 3B</option>
                            <option value="JSS 3C">JSS 3C</option>
                            <option value="JSS 3D">JSS 3D</option>
                            {/* <option value="J3">All JSS 3</option> */}

                            <option value="" disabled>Senior Secondary School</option>
                            <option value="" disabled>SSS 1</option>
                            <option value="SSS 1A">SSS 1A</option>
                            <option value="SSS 1B">SSS 1B</option>
                            <option value="SSS 1C">SSS 1C</option>
                            <option value="SSS 1D">SSS 1D</option>
                            {/* <option value="Sl">All SSS 1</option> */}

                            <option value="" disabled>SSS 2</option>
                            <option value="SSS 2A">SSS 2A</option>
                            <option value="SSS 2B">SSS 2B</option>
                            <option value="SSS 2C">SSS 2C</option>
                            <option value="SSS 2D">SSS 2D</option>
                            {/* <option value="S2">All SSS 2</option> */}

                            <option value="" disabled>SSS 3</option>
                            <option value="SSS 3A">SSS 3A</option>
                            <option value="SSS 3B">SSS 3B</option>
                            <option value="SSS 3C">SSS 3C</option>
                            <option value="SSS 3D">SSS 3D</option>
                            {/* <option value="S3">All SSS 3</option> */}
                        </select>
                    </div>
                    <div className="inp-holder">
                        <input type="text" placeholder='Password' onChange={(e)=>{setpassword(e.target.value)}}/>
                    </div>
                    <div className="mt-1 text-center">
                    <button className='mt-2 w-50 text-white' onClick={submit}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studentsignup