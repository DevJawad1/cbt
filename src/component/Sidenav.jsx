import React, { useEffect, useState } from 'react'
import logo from '../assets/gomal logo.png'
import { useNavigate } from 'react-router-dom'
import axios, { all } from 'axios'
const Sidenav = ({show, name, qstcontent, grade1, grade2}) => {
    const navi = useNavigate()
    const [getsubject, setgetsubject] = useState('')
    const [subname, setsubname] = useState()
    const [allqusetion, setallqusetion]
     = useState([])
    let  receivedQuestions
    const [noexam, setnoexam] = useState('')
    useEffect(()=>{
        let url = "http://localhost:3000/user/sendquestion"
        
        const getuser = JSON.parse(localStorage.student)
        axios.post(url, {gradeOne:getuser.grade,gradeTwo:getuser.grade2, studentname:name}).then((res)=>{
            // console.log(res);
            receivedQuestions = res.data.question;
            setgetsubject(receivedQuestions.length)
            setallqusetion(receivedQuestions)
            if(res.data.status==false){
                setnoexam('No exam for now')
            }else{
                setnoexam('')
            }
            allqusetion.map((item, i)=>{
                setsubname(item.grade)
            })
        }).catch((err)=>{
            console.log(err);
        })
    },[]) // note going to remove box //
    const subid=(i)=>{
        show(i)
        qstcontent(allqusetion[i])
    }
    const [cur, setcur] = useState('')
    
    const current=(i, subject, commece, grade)=>{
        subid(i)
        
        let url = "http://localhost:3000/user/ongoingexam"
        axios.post(url, {student:name, tutor:allqusetion[i].tutoremail, subject:allqusetion[i].subject, grade1:grade1, grade2:grade2}).then((Result)=>{
            console.log(Result);
        }).catch((err)=>{
            console.log(err);
        })
        
        // if(allqusetion[i].commence==false){
        //     Swal.fire({
        //         title: "Cannot start exam!",
        //         text: "Your teacher have not give the permission to start exam",
        //         icon: "error"
        //     });
        // }else{
        //     console.log(name, subject);
        //     let url = "http://localhost:3000/user/existedresult"
        //     axios.post(url, {name, subject}).then((res)=>{
        //     if(res.data.status){
        //         subid(i)
        //     }else{
        //         Swal.fire({
        //             title: "Denied!",
        //             text: res.data.message,
        //             icon: "error"
        //         });
        //     }
        // }).catch((err)=>{
        //     console.log(err);
        // })
        // }
    }
    
    const [commenced, setcommenced] = useState(null)
    useEffect(()=>{
        allqusetion.map((item, i)=>{

            current(i,item.subject, item.commence, item.grade)
        })
    },[])
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
                    {
                     allqusetion.length>0?
                     <div>
                    <p className='subject'>Class: {subname} </p>
                    <p className='subject'>{allqusetion.length>1 ?"Subjects":"Subject"} </p>
                    </div>
                    :<p className='subject'>No Exam for now</p>
                    }
                    
                    <div>
                    {
                     noexam==""?
                     <div>
                         <p>{
                             allqusetion.map((item, i)=>(
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
                                                 {/* <p >{item.grade}</p> */}
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
                     :<p>{noexam}</p>
                     
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidenav