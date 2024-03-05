import React, { useEffect, useState } from 'react'
import logo from '../assets/gomal logo.png'
import { useNavigate } from 'react-router-dom'
const Sidenav = ({show}) => {
    const navi = useNavigate()
    const [getsubject, setgetsubject] = useState('')
    const [subname, setsubname] = useState(localStorage.tutorquestion?JSON.parse(localStorage.tutorquestion):"")
    useEffect(()=>{
        if(localStorage.tutorquestion){
            let getqusetion=JSON.parse(localStorage.tutorquestion)
            setsubname(JSON.parse(localStorage.tutorquestion))
            // console.log(subname);
            setgetsubject(getqusetion.length)
        }
    },[])
    const [getstudent, setgetstudent] = useState(JSON.parse(localStorage.studentData))
    const [curstudent, setcurstudent] = useState(localStorage.currentstudent)
    const onestudent=getstudent[curstudent]
    const subid=(i)=>{
        show(i)
    }
    const [cur, setcur] = useState('')
    const current=(i, subject, commece, grade)=>{
        console.log(grade);
        if(grade==onestudent.grade || grade==onestudent.grade2){
            
            if(commece==false){
                Swal.fire({
                    title: "Cannot start exam!",
                    text: "Your teacher have not give the permission to start exam",
                    icon: "error"
                  });
            }
            else{
                setcur(subject)
            subid(i)
            }
        }
        else{
            Swal.fire({
                title: "Permission Denied!",
                text: "Available for "+grade,
                icon: "error"
              });
        }
        
        // console.log(onestudent.grade);
    }
    return (
        <div className='sidebar'>
            <div className="p-3">
                <div className="gomal-det d-flex gap-2 ">
                    <div className="side logo-div" >
                        <img src={logo} alt="" />
                    </div>

                    <div className="name-div pt-2">
                        <p>Gomal Baptist college</p>
                    </div>
                </div>

                <div className="router-div mt-5 p-3 ">
                    <div className="d-flex gap-2">
                    <p><i className="ri-home-4-fill"></i></p>
                    <p>Dashboard</p>
                    </div>
                    <div className="d-flex gap-2">
                        <p><i class="ri-article-fill"></i></p>
                        <p>Result</p>
                    </div>

                    <div className="d-flex gap-2">
                        <p><i class="ri-article-fill"></i></p>
                        <p onClick={()=>{navi('/tutorlogin')}}>Tutor Dashboard</p>
                    </div>
                </div>

                <div className="subject-div mt-3">
                    <p className='subject'>Subject</p>
                    <div>

                        {/* {
                            getsubject.map((item, i)=>(
                                <div>
                                    <p onClick={()=>{subid(index)}}>{
                                        item.question.map((sub, i)=>{
                                            <span></span>
                                        })

                                    }</p>
                                </div>
                            ))
                        } */}
                    {
                        Array.from({ length: Number(getsubject) }, (_, index) => (
                            <div>
                                <p>{
                                    subname[index].map((item, i)=>(
                                        <span>
                                            {
                                                item.length?
                                                <span className={`subject ${cur==item.subject?"current":""}`} onClick={()=>{current(i,item[0].subject, item[0].commence, item[0].grade)}}>
                                                    <div className='mt-1'>
                                                        <p >{item[0].grade}</p>
                                                    </div>
                                                    {item[0].subject}
                                                    <span style={{borderBottom:"1px solid"}}>
                                                    {item[0].commence==false?` Can't start yet `: cur==item[0].subject?": Started":": Start now"}
                                                    </span>
                                                </span>
                                                :<span className={`subject ${cur==item.subject?"current":""}`} onClick={()=>{current(i,item.subject, item.commence, item.grade)}}>
                                                    <div className='mt-1'>
                                                        <p >{item.grade}</p>
                                                    </div>
                                                    {item.subject}
                                                    <span style={{borderBottom:"1px solid"}}>
                                                    {item.commence==false?` Can't start yet `: cur==item.subject?": Started":": Start now"}
                                                    </span>
                                                </span>
                                            }
                                        </span>
                                    ))
                                }</p>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidenav