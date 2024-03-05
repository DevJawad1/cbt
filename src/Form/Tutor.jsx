import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, json } from 'react-router-dom'
// import {}
const Tutor = () => {
    const navigate = useNavigate()
    // const result = JSON.parse(localStorage.studentresult)
    const { id } = useParams()
    const [result, setresult] = useState([])
    useEffect(() => {
        if (localStorage.studentresult) {
            setresult(JSON.parse(localStorage.studentresult))
        }
        result.map((item, i) => {
            item.questionNoOption.map((qst, id) => {
                console.log(qst.answer);
                qst.answer.map((ans, ii) => {
                    // console.log(ans);
                })
            })
        })
        // console.log(result);
    })

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
    const [tutorqst, settutorqst] = useState([])
    let alltutorqst = []
    useEffect(() => {
        if (localStorage.tutorquestion) {
            // console.log(JSON.parse(localStorage.tutorquestion));
            settutorqst(JSON.parse(localStorage.tutorquestion))
            console.log(tutorqst[1]);
            // tutorqst[0].map((item, i) => {
            //     console.log(item);
            // })

        }
    },[ ])

    const [eachsub, seteachsub] = useState(0)
    const [openqst, setopenqst] = useState(false)
    const [alertcm, setalertcm] = useState('')
    const commence=(iq)=>{
        console.log(iq);
        tutorqst.map((item, i)=>{
            item.map((qst, q)=>{
                // alert(qst.commence)
                if(qst.subject==iq){
                    console.log(qst);
                    if(qst.commence==false){
                        qst.commence=true
                        console.log(qst.commence);
                        localStorage.setItem('tutorquestion', JSON.stringify(tutorqst))
                        Swal.fire({
                            title: "Exam will now be commence!",
                            text: "You give permission to students",
                            icon: "success"
                          });
                    }
                    else{
                        qst.commence=false
                        localStorage.setItem('tutorquestion', JSON.stringify(tutorqst))
                        Swal.fire({
                            title: "Exam will not be commence!",
                            text: "You withdrawl permission from students",
                            icon: "success"
                          });
                    }
                }
            })
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
                    <button className='btn btn-success' onClick={() => { setopenqst(true) }}>See your question</button>
                </div>
                <div>
                    <p>Your student result</p>
                    <div>
                        {
                            result.length > 0 ?
                                <table className='table'>
                                    <tr >
                                        <td >Student Name</td>
                                        <td >Student Result</td>
                                    </tr>
                                    <tbody>
                                        {
                                            result.length > 1 ?
                                                result.map((item, i) => (
                                                    <tr className='table-success'>
                                                        <td className='w-25 table-succss' style={{ borderLeft: "1px solid" }}>{item.studentname}

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
                                                                            : <div>
                                                                                {
                                                                                    // console.log(item.answer)
                                                                                    // <div></div>
                                                                                }
                                                                            </div>
                                                                    }
                                                                </div>
                                                            ))

                                                        }</td>
                                                    </tr>
                                                ))
                                                : <div>
                                                    {/* {
                                                        tutorqst[0].map((item, i)=>(
                                                            <p>{
                                                                item.subject
                                                            }</p>
                                                        ))
                                                    } */}
                                                </div>
                                        }
                                    </tbody>

                                </table>
                                : <div className='shadow p-5 text-center container'>
                                    <p>Student result are not yet available</p>
                                </div>
                        }
                        {
                            openqst == true ?
                                <div className="cover tutorcov">
                                    <div className="board tutorbod">
                                        <button onClick={() => { setopenqst(false) }} className='btn '>Close</button>
                                        {/* <div className="d-flex">
                                    {
                                        tutorqst.map((item, i) => (
                                            item.map((q, iq) => (
                                                <button onClick={() => { seteachsub(i), console.log(eachsub); }}>
                                                    {q.subject},{i}
                                                </button>
                                            ))
                                        ))
                                    }
                                </div> */}
                                        <div>
                                            {
                                                tutorqst.length > 1 ?
                                                    tutorqst.map((item, i) => (
                                                        <div>
                                                            {
                                                                item.map((qsts, iq) => (
                                                                    <div className=''>
                                                                        <div id="carouselExample" class="carousel slide">
                                                                            <div class="carousel-inner">
                                                                                <div class="carousel-item active">
                                                                                {
                                                                            qsts.tutor == id ?
                                                                                <div className='border mt-2 p-2'>

                                                                                    {/* <button>{nestedArray[eachsub].subject}</button> */}
                                                                                    <div className="d-flex justify-content-between">
                                                                                    <p>Subject: {qsts.subject}</p>
                                                                                    <button className='btn btn-success' onClick={()=>{commence(qsts.subject,iq)}}>{qsts.commence==false?"Give permission to student":"Withdral permission from student"}</button>
                                                                                    </div>
                                                                                    <p>Qustion: {
                                                                                        qsts.question.map((qst, i) => (
                                                                                            <div className='border p-2 mt-2'>
                                                                                                <p>{qst.question}</p>
                                                                                                <p>{qst.Ao}</p>
                                                                                                <p>{qst.Bo}</p>
                                                                                                <p>{qst.Co}</p>
                                                                                                <p>{qst.Do}</p>
                                                                                            </div>
                                                                                        ))
                                                                                    }</p>
                                                                                </div>
                                                                                : <div>You dont have quetion</div>
                                                                        }
                                                                                </div>
                                                                                <div class="carousel-item">
                                                                                    
                                                                                </div>
                                                                                <div class="carousel-item">
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                            <button class="carousel-control-prev car-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                                                <span class="visually-hidden">Previous</span>
                                                                            </button>
                                                                            <button class="carousel-control-next car-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                                                <span class="visually-hidden">Next</span>
                                                                            </button>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    ))
                                                    : null
                                            }
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