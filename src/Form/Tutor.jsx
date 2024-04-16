import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
import axios from 'axios'
const Tutor = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [result, setresult] = useState([])
    const tutor = JSON.parse(localStorage.tutor)
    function combineByClass(array) {
        let combinedArrays = {};
    
        array.forEach(student => {
            if (!combinedArrays.hasOwnProperty(student.subject)) {
                combinedArrays[student.subject] = [];
            }
            combinedArrays[student.subject].push(student);
        });
    
        return combinedArrays;
    }
    
    
    useEffect(() => {
        let urlresult = "http://localhost:3000/user/sendtutorresults"
        axios.post(urlresult, {tutor:tutor.email}).then((res)=>{
            console.log(res.data.allresult);
            let combinedByClass = combineByClass(res.data.allresult);
    
            console.log(combinedByClass);
        }).catch((err)=>{
            console.log(err);
        })
    }, [])
     
    
    const [sum, setsum] = useState(0)
    const [push, setpush] = useState([])
    const [qstid, setqstid] = useState('')
    const correct = (i, id) => {
        console.log(id);
        result.map((item, i) => {
            if (item.studentname == id) {
                setqstid(item.studentname)
                console.log(qstid, id2);
            }
        })
    }
    const wrong = () => {

    }
    const [tutorqst, settutorqst] = useState('')
    const [eachsub, seteachsub] = useState(Number(0))
    const access=()=>{
        setopenqst(true) 
        // console.log(openqst);
        let url = "http://localhost:3000/user/sendtutorqst"
        axios.post(url, {email:tutor.email}).then((res)=>{

            settutorqst(res.data.question)
            console.log(tutorqst);
            seteachsub(localStorage.currentsubview?localStorage.currentsubview:0)
            console.log(tutorqst[eachsub].tutor);
        }).catch((err)=>{
            console.log(err);
        })
    }
    // useEffect(()=>{
    //     let url = "http://localhost:3000/user/sendtutorqst"
    //     axios.post(url, {email:tutor.email}).then((res)=>{

    //         settutorqst(res.data.question)
    //         console.log(tutorqst);
    //         seteachsub(0)
    //         console.log(tutorqst[eachsub].tutor);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // })
   
    
    
    const [openqst, setopenqst] = useState(false)
    const [alertcm, setalertcm] = useState('')
    const commence = (id, grade, mail) => {
        let url = "http://localhost:3000/user/updateqst"
        axios.post(url, {id:id, grade1:grade,tutor:mail }).then((res)=>{
            console.log(res);
            if(res.data.status){
                Swal.fire({
                    title: 'Allowed',
                    text: res.data.message,
                    icon: "success"
                });
            }
            else{
                Swal.fire({
                    title: 'Restricted',
                    text: res.data.message,
                    icon: "error"
                });
            }
            // console.log(tutorqst);
            access()
            localStorage.setItem('currentsubview', eachsub)
        }).catch((err)=>{
           console.log(err);
        })
    }
    return (
        <div className='tutorpage'>
            <div className="nav pt-2" style={{ borderBottom: "1px solid", height: "45px" }}>Welcome,    <span className='fw-bold px-2
        ' style={{ textTransform: "capitalize" }}> {id}</span>
            </div>
            <div className="mt-2 p-2">
                <div className="d-flex gap-4">
                    <button className='btn btn-success' onClick={() => { navigate(`/uploadquestion/${id}`) }}>Upload question</button>
                    <button className='btn btn-success' onClick={access}>Give access to Exam</button>
                </div>
                <div>
                    
                    <div>
                        {
                            result.length > 0 ?
                                <table className='table tutor'>
                                    <tr >
                                        <td >Student Name</td>
                                        <td >Student Class</td>  
                                        <td >Student Result</td>
                                    </tr>
                                    <tbody>
                                        {
                                            result.length > 0 ?
                                                result.map(
                                                (item, i) => (
                                                    <tr className='table-success'>
                                                        <td className='w-25 table-succss' style={{ borderLeft: "1px solid" }}>{item.studentname}</td>
                                                        <td style={{ borderLeft: "1px solid" }}>
                                                            {item.grade}
                                                        </td>
                                                        <td className='w-25 table-waring' style={{ borderLeft: "1px solid" }}>{
                                                            item.result == 0 ? "This student din't got anything, " +
                                                                qstid == item.studentname ?
                                                                Number(item.result + sum) :
                                                                Number(item.result) + " scrore"

                                                                : qstid == i ?
                                                                Number(item.result + sum) :
                                                                Number(item.result)
                                                        }</td>
                                                        {
                                                            item.questionNoOption.length>0?
                                                            <td className='w-25 table-waring' style={{ borderLeft: "1px solid" }}>{
                                                                item.questionNoOption.map((item, i) => (
                                                                    <div className='border border-1 border-success mt-2'>
                                                                        <p>Qusetion number: {item.questionNo}</p>
                                                                        <p>All qusetion number {item.questionNo} Answer</p>
                                                                        {
                                                                            item.answer.length == item.space ?
                                                                                <div>{
                                                                                    item.answer.map((ans, id) => (
                                                                                        <div className='d-flex mt-3 w-100 justify-content-enter gap-2'>
                                                                                            <p style={{ borderBottom: "1px solid" }} className='w-100'>{ans.value}</p>
                                                                                            <div className="border w-100">
                                                                                                <button className='btn btn-success' onClick={() => { correct(1, item.studentname) }}>Correct</button>
                                                                                                {/* <p>{item.studentname}</p> */}
                                                                                                <button className='btn btn-danger mx-2' onClick={() => { wrong(0) }}>Wrong</button>
    
                                                                                            </div>
                                                                                        </div>
                                                                                    ))
                                                                                }</div>
                                                                                : null
                                                                        }
                                                                    </div>
                                                                ))
    
                                                            }</td>
                                                            :null
                                                        }
                                                        
                                                    </tr>
                                                ))
                                                : null
                                        }
                                    </tbody>

                                </table>
                                : <div className='shadow p-5 text-center container'>
                                    <p>Student result are not yet available</p>
                                </div>
                        }
                        {
                            openqst == true ?
                                <div className="tutorcov border">
                                    <div className="board tutorbod">
                                        <button onClick={() => { setopenqst(false) }} className={`btn `}>Close</button>
                                    <div>
                                        {
                                            tutorqst.length >0?
                                                    <div className='d-flex gap-5 justify-content-between border-bottom p-2'>
                                                        {
                                                            tutorqst.map((qsts, iq) => (
                                                                <div key={iq} >
                                                                    <button className={`btn ${tutorqst[eachsub].subject==qsts.subject && tutorqst[eachsub].grade==qsts.grade?"btn-success":""}`} onClick={()=>{seteachsub(Number(iq))}} style={{textTransform:"capitalize"}}>{qsts.subject} ({qsts.grade})</button>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                    
                                                : <div className='shadow p-5 text-center'>
                                                    <p>You haven't set any question</p>
                                                </div>
                                        }

                                        <div className="carousel-item active mt-2">
                                        {
                                           eachsub &&  tutorqst[eachsub].tutor == id ?
                                                <div className=' mt-2 p-2'>
                                                    <div className="d-flex justify-content-between">
                                                        <p>Subject: {tutorqst[eachsub].subject}</p>
                                                        <button className='btn btn-success' onClick={() => { commence(tutorqst[eachsub]._id, tutorqst[eachsub].grade, tutorqst[eachsub].tutoremail) }}>{tutorqst[eachsub].commence == false ? "Give permission to student" : "Withdral permission from student"}</button>
                                                    </div>
                                                    <div>Qustion: {
                                                        tutorqst[eachsub].question.map((qst, i) => (
                                                            <div className='border border-black p-2 mt-2' key={i}>
                                                                <p className='border-bottom border-black mt-2 bg-light p-2' style={{textTransform:"capitalize"}}>{i+1}) Question:  {qst.question}</p>
                                                                <p>Options</p>
                                                                <p>(A) {qst.Ao}</p>
                                                                <p>[B] {qst.Bo}</p>
                                                                <p>(D) {qst.Co}</p>
                                                                <p>[D] {qst.Do}</p>
                                                            </div>
                                                        ))
                                                    }</div>
                                                </div>
                                                : <div>You dont have quetion under this subject</div>
                                        }
                                        </div> 
                                    </div>

                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tutor