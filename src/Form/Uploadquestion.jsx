import React, { useState } from 'react'
import './upload.css'
import { useParams } from 'react-router-dom'

const Uploadquestion = () => {
    const { id } = useParams()

    const [allquestion, setallquestion] = useState([])
    let myquestion = []
    const [objqst, setobjqst] = useState('')
    const [question, setquestion] = useState('')
    const [optiona, setoptiona] = useState('')
    const [optionb, setoptionb] = useState('')
    const [optionc, setoptionc] = useState('')
    const [optiond, setoptiond] = useState('')
    const [subject, setsubject] = useState('')
    const [anser, setanser] = useState('')
    const [space, setspace] = useState('')
    const [grade, setgrade] = useState('')
    const [questionno, setquestionno] = useState(1)

    const [noOption, setnoOption] = useState(false)
    const [alert, setalert] = useState(false)
    const submit = () => {
        if (noOption == false) {
            if (question == "" || optiona == "" || optionb == "" || optionc == "" || optiond == '' || subject == "") {
                Swal.fire({
                    title: "Error!",
                    text: "Fill everything",
                    icon: "error"
                });
            }
            else {
                if (anser == "") {
                    Swal.fire({
                        title: "Error!",
                        text: "Click the letter beside the correct option",
                        icon: "error"
                    });
                }
                else {
                    let qstobj = {
                        question: question,
                        Ao: optiona,
                        Bo: optionb,
                        Co: optionc,
                        Do: optiona, // Should this be optiond instead of optiona?
                        answer: anser,
                        styling: "",
                        spaces: 0,
                        no: questionno,
                    };
                    let obj = {
                        subject: subject,
                        tutor: id,
                        type: "Option",
                        spaces: 0,
                        grade:grade,
                        commence:false,
                        question: [qstobj]
                    };
                    setquestionno(questionno + 1);

                    if (allquestion.length === 0) {
                        allquestion.push(obj);
                    } else {
                        setallquestion(prevAllQuestions => [
                            {
                                ...prevAllQuestions[0],
                                question: [...prevAllQuestions[0].question, qstobj]
                            }
                        ]);
                    }

                    setalert(true);
                    setTimeout(() => {
                        setalert(false);
                    }, 1000);
                    empty();
                    console.log(allquestion);
                }
            }
        }
        else {
            let qstobj2 = {
                question: question,
                Ao: "",
                Bo: "",
                Co: "",
                Do: "",
                answer: "",
                styling: "",
                spaces: space,
                no: questionno,
            };
            let obj2 = {
                subject: subject,
                tutor: id,
                type: "noOption",
                spaces: space,
                grade:grade,
                commence:false,
                question: [qstobj2]
            };
            setquestionno(questionno + 1);

            if (allquestion.length === 0) {
                allquestion.push(obj2);
            } else {
                setallquestion(prevAllQuestions => [
                    {
                        ...prevAllQuestions[0],
                        question: [...prevAllQuestions[0].question, qstobj2]
                    }
                ]);
            }

            setalert(true);
            setTimeout(() => {
                setalert(false);
            }, 1000);
            console.log(allquestion);
        }
    }


    const empty = () => {
        setquestion("")
        setoptiona("")
        setoptionb("")
        setoptionc("")
        setoptiond("")
        setanser("")
    }
    const [generatespace, setgeneratespace] = useState(false)
    const generate = () => {
        if (space !== "") {
            setgeneratespace(true)
        }
    }
    const [showqst, setshowqst] = useState(false)
    const postExam = () => {
        setshowqst(true)
    }

    const saveExam = () => {
        // let general=[allquestion]
        // console.log(qqq);
        if (localStorage.tutorquestion) {
            let getback = JSON.parse(localStorage.tutorquestion)
            // console.log(getback);
            myquestion = getback
            console.log(myquestion);
            // allquestion.push(getback)
        }
        console.log(allquestion);
        myquestion.push(allquestion)
        Swal.fire({
            title: "Good job!",
            text: "Qusetion have been posted!",
            icon: "success"
        });
        localStorage.setItem(`tutorquestion`, JSON.stringify(myquestion))
        setshowqst(false)
    }
    return (
        <div className='all-question '>
            <div style={{ borderBottom: "1px solid" }} className="nav p-2" ><p>Welcome <span style={{ textTransform: "capitalize" }}>{id}</span></p></div>
            <div className="container shadow p-3 mt-2">
                <div className="d-flex justify-content-between">
                    <p>Question {questionno}</p>
                    <div>
                        <select name="" id="" className='inp-holder w-100' style={{ height: "48px", outline: "none" }} onChange={(e) => setgrade(e.target.value)} value={grade}>

                            <option value="" selected disabled>Select Class </option>
                            <option value="" selected>Junior Secondary School</option>
                            <option value="" disabled>JSS 2</option>
                            <option value="JSS 1A">JSS 1A</option>
                            <option value="JSS 1B">JSS 1B</option>
                            <option value="JSS 1C">JSS 1C</option>
                            <option value="JSS 1D">JSS 1D</option>
                            <option value="J1">All JSS 1D</option>

                            <option value="" disabled>JSS 2</option>
                            <option value="JSS 2A">JSS 2A</option>
                            <option value="JSS 2B">JSS 2B</option>
                            <option value="JSS 2C">JSS 2C</option>
                            <option value="JSS 2D">JSS 2D</option>
                            <option value="J2">All JSS 2</option>

                            <option value="" disabled>JSS 3</option>
                            <option value="JSS 3A">JSS 3A</option>
                            <option value="JSS 3B">JSS 3B</option>
                            <option value="JSS 3C">JSS 3C</option>
                            <option value="JSS 3D">JSS 3D</option>
                            <option value="J3">All JSS 3</option>

                            <option value="" disabled>Senior Secondary School</option>
                            <option value="" disabled>SSS 1</option>
                            <option value="SSS 1A">SSS 1A</option>
                            <option value="SSS 1B">SSS 1B</option>
                            <option value="SSS 1C">SSS 1C</option>
                            <option value="SSS 1D">SSS 1D</option>
                            <option value="Sl">All SSS 1</option>

                            <option value="" disabled>SSS 2</option>
                            <option value="SSS 2A">SSS 2A</option>
                            <option value="SSS 2B">SSS 2B</option>
                            <option value="SSS 2C">SSS 2C</option>
                            <option value="SSS 2D">SSS 2D</option>
                            <option value="S2">All SSS 2</option>

                            <option value="" disabled>SSS 3</option>
                            <option value="SSS 3A">SSS 3A</option>
                            <option value="SSS 3B">SSS 3B</option>
                            <option value="SSS 3C">SSS 3C</option>
                            <option value="SSS 3D">SSS 3D</option>
                            <option value="S3">All SSS 3</option>
                        </select>
                    </div>
                    <button className='btn border border-success' onClick={postExam} style={{height:"40px"}}>See your question </button>
                </div>
                <div className="question-div">
                    <div className="d-flex justify-content-between">
                        <p>Provide Your question</p>
                        <p style={{ borderBottom: "1px solid" }} onClick={() => { setnoOption(!noOption) }}>{!noOption ? "Click here if you don't want option for the question" : "Click here if you want option for the question"}</p>
                    </div>
                    <input type="text" value={question} onChange={(e) => { setquestion(e.target.value) }} className='w-100 border border-success qst-inp' placeholder='Question' />
                </div>
                {
                    noOption == false ?
                        <div className="question-option mx-auto w-75 mt-3">
                            <div className="d-flex justify-content-between">
                                <p>Provide your options</p>
                                <input type="text" value={subject} className='w-25' onChange={(e) => { setsubject(e.target.value) }} placeholder='Enter Subject name' />
                            </div>
                            <div className="d-flex gap-4 mt-2">
                                <p onClick={() => { setanser("A") }} className={`pick ${anser == "A" ? "chop" : null}`}>A</p>
                                <input type="text" value={optiona} onChange={(e) => { setoptiona(e.target.value) }} className='border border-success w-100' placeholder='Opiton A' />
                            </div>
                            <div className="d-flex gap-4 mt-2">
                                <p onClick={() => { setanser("B") }} className={`pick ${anser == "B" ? "chop" : null}`}>B</p>
                                <input type="text" value={optionb} onChange={(e) => { setoptionb(e.target.value) }} className='border border-success w-100' placeholder='Opiton B' />
                            </div>
                            <div className="d-flex gap-4 mt-2">
                                <p onClick={() => { setanser("C") }} className={`pick ${anser == "C" ? "chop" : null}`}>C</p>
                                <input type="text" value={optionc} onChange={(e) => { setoptionc(e.target.value) }} className='border border-success w-100' placeholder='Opiton C' />
                            </div>
                            <div className="d-flex gap-4 mt-2">
                                <p onClick={() => { setanser("D") }} className={`pick ${anser == "D" ? "chop" : null}`}>D</p>
                                <input type="text" value={optiond} onChange={(e) => { setoptiond(e.target.value) }} className='border border-success w-100' placeholder='Opiton D' />
                            </div>
                            <div className="submt mt-4 px-5">
                                <button className='w-100 border-0 btn btn-success' onClick={submit}>Submit question</button>
                            </div>
                        </div>
                        :
                        <div className='question-nooption mx-auto w-50'>
                            <div className="d-flex border w-100 p-2 gap-2 mt-2 answer-space">
                                <input type="text" placeholder='Write the number of answer space you want' onChange={(e) => { setspace(Number(e.target.value)) }} />
                                <button className='border-0' onClick={generate}>Send</button>
                            </div>
                            <div>
                                {
                                    generatespace && (
                                        <div>
                                            {
                                                Array.from({ length: space }, (_, index) => (
                                                    <div>
                                                        <input key={index} type="text" className='generate-inp w-100 mt-2' placeholder='Student are going to provide answer here' /> <br />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                                {
                                    generatespace ?
                                        <div className="subm mt-3">
                                            <button className='w-100 border-0 btn btn-success' onClick={submit}>Submit Question</button>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                }
            </div>

            {
                showqst ?
                    <div className="cover-question">
                        <div className="board-question p-3">
                            <div className="d-flex justify-content-between">
                                <button className='btn' onClick={() => { setshowqst(false) }}>Close</button>
                                <button className='btn' style={{ borderBottom: "1px solid" }} onClick={saveExam}>Post exam</button>
                            </div>
                            <div className="qst-holder p-2">
                                {
                                    allquestion.map((item, i) => (
                                        <div className='p-3 qst-cont mt-2 border-success'>
                                            <p>{item.question.map((qst, id) => (

                                                qst.A !== "" ?
                                                    <div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className='w-100' style={{ borderBottom: "1px solid" }}><span>{id + 1}  </span>{qst.question}</p>
                                                            <button className='btn border-success' style={{ borderBottom: "1px solid" }}>Edit</button>
                                                        </div>
                                                        <p>(A) {qst.Ao}</p>
                                                        <p>(B) {qst.Bo}</p>
                                                        <p>(C) {qst.Co}</p>
                                                        <p>(D) {qst.Do}</p>
                                                    </div>
                                                    : <div>
                                                        <p>Student are going to provide answer</p>
                                                    </div>

                                            ))}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }

            {
                alert == true ?
                    <div className="alert-tutor bg-white pt-3 d-flex justify-content-center shadow ">
                        <p>Now to question {questionno}</p>
                    </div>
                    : null
            }
        </div>
    )
}

export default Uploadquestion