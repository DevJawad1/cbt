import React, {useState, useEffect} from 'react'
import './studentcss.css'
import logo from '../assets/gomal logo.png'
import {useNavigate} from 'react-router-dom'
const Studentsignup = () => {
    const navigate= useNavigate()
    const [fullname, setfullname] = useState('')
    const [gender, setgender] = useState('')
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [grade, setgrade] = useState('')
    const [data, setdata] = useState('')
    useEffect(() => {
        // Retrieve existing users' data from local storage if it exists
        const existingData = localStorage.getItem('studentData');
        if (existingData) {
            setdata(JSON.parse(existingData));
        }
    }, []);

    const submit=()=>{
        const newUser = { fullname, gender, grade, username, password };
                const updatedData = [...data, newUser];
                setdata(updatedData);
                localStorage.setItem('studentData', JSON.stringify(updatedData));
                navigate('/studentlogin')

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
                    <select name="" id="" className='inp-holder w-100' style={{height:"48px", outline:"none"}}  onChange={(e) => setgrade(e.target.value)} value={grade}>

                        <option value="" selected disabled>Junior Secondary School</option>
                        <option value="" disabled>JSS 2</option>
                        <option  value="1a">1A</option>
                        <option  value="1b">1B</option>
                        <option  value="1c">1C</option>
                        <option  value="1d">1D</option>

                        <option value="" disabled>JSS 2</option>
                        <option  value="2a">2A</option>
                        <option  value="2b">2B</option>
                        <option  value="2c">2C</option>
                        <option  value="2d">2D</option>

                        <option value="" disabled>JSS 3</option>
                        <option value="1a">3A</option>
                        <option value="3b">3B</option>
                        <option value="3c">3C</option>
                        <option value="3d">3D</option>

                        <option value="" disabled>Senior Secondary School</option>
                        <option value="" disabled>SSS 1</option>
                        <option value="S1a">1A</option>
                        <option value="S1b">1B</option>
                        <option value="S1c">1C</option>
                        <option value="S1d">1D</option>

                        <option value="" disabled>SSS 2</option>
                        <option  value="S2a">2A</option>
                        <option  value="S2b">2B</option>
                        <option  value="S2c">2C</option>
                        <option  value="S2d">2D</option>
                        
                        <option value="" disabled>SSS 3</option>
                        <option  value="S3a">3A</option>
                        <option  value="S3b">3B</option>
                        <option  value="S3c">3C</option>
                        <option  value="S3d">3D</option>
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