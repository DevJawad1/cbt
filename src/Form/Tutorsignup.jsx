import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './tutorform.css'
import logo from '../assets/gomal logo.png'
import axios from 'axios'

const Tutorsignup = () => {
    const [fullname, setFullname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [TutorData, setTutorData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        // Retrieve existing users' data from local storage if it exists
        const existingData = localStorage.getItem('tutorData');
        if (existingData) {
            setTutorData(JSON.parse(existingData));
        }
    }, []);

    const submit=()=>{
        const newUser = { fullname, gender, email, password };
                // const updatedData = [...TutorData, newUser];
                // setTutorData(updatedData);
                // localStorage.setItem('tutorData', JSON.stringify(updatedData));
                // navigate('/tutorlogin')
        let url = "http://localhost:3000/user/tutorsignup"
        axios.post(url, newUser).then((res)=>{
            console.log(res.data);
            if(res.data.status){
                Swal.fire({
                    title: "Good job!",
                    text: "Signup successful!",
                    icon: "success"
                });
                setTimeout(() => {
                    navigate('/tutorlogin')
                }, 1500);
            }
            else{
                Swal.fire({
                    title: "Invalid!",
                    text: res.data.message,
                    icon: "error"
                });
            }
        }).catch(err=>{
            console.log(err);
        })
    }
  return (
    <div>
        <div className="tutor container w-50 p-2 shadow mt-2">
            <div className="d-flex gap-2 justify-content-center" style={{borderBottom:"1px solid"}}>
                <img src={logo} className='sts-logo' alt="" />
                <p className='pt-3'>Signup, Tutor only</p>
            </div>
            <input
                        type="text"
                        className='form-control mt-2'
                        placeholder='Fullname'
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                    <input
                        type="text"
                        className='form-control mt-2'
                        placeholder='Gender'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
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
                        <button className='btn btn-success mt-3 w-50' onClick={submit}>Submit</button>
                    </div>
        </div>
    </div>
  )
}

export default Tutorsignup