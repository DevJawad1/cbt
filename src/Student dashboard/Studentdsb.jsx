import React, { useEffect, useRef, useState } from 'react';
import Topnav from '../component/Topnav';
import Sidenav from '../component/Sidenav';
import { json, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './studentdsb.css'
import axios, { all } from 'axios'
const Studentdsb = () => {
    const navi = useNavigate()
    const [allqusetion, setallqusetion] = useState([])
    const [allsubject, setallsubject] = useState([])
    const [questionNo, setquestionNo] = useState(0)
    const getuser = JSON.parse(localStorage.student)
    const { id } = useParams()
    const [subject, setsubject] = useState('')
    const handleCategoryChange = (category) => {
        setsubject(category)
    };
    useEffect(() => {
        let url = "http://localhost:3000/user/sendquestion"
        axios.post(url, { gradeOne: getuser.grade, gradeTwo: getuser.grade2 }).then((res) => {
            const receivedQuestions = res.data.question;
            setallsubject(receivedQuestions)
            const allQuestions = receivedQuestions[Number(subject)];
            const shuffledQuestions = shufflearray(allQuestions.question);
            const updatedQuestions = { ...allQuestions, question: shuffledQuestions };
            setallqusetion(updatedQuestions)
            // console.log(allqusetion);
        }).catch((err) => {
            console.log(err);
        })

    }, [subject]);
    useEffect(()=>{
        if(allqusetion){
            if(allqusetion.commence==false){
                setsubject("")
            }
        }
    })
    const shufflearray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const [questionlnght, setquestionlnght] = useState(null)
    const getquestion = (i) => {
        setquestionNo(i)
    }
    const [chooseicom, setchooseicom] = useState("")
    const [sovleqst, setsovleqst] = useState([])
    const [updsolve, setupdsolve] = useState('')
    const pickanswer = (i) => {
        setchooseicom(i)
        allqusetion.question[questionNo].styling = i;
        console.log(allqusetion.question);
        if(allqusetion.question[questionNo].styling==i){
                allqusetion.question[questionNo].styling = i;
        }
        let obj = {
            questionNo: questionNo,
            optionpick: i,
            answer: allqusetion.question[questionNo].answer,
            statue: i == allqusetion.question[questionNo].answer ? "Correct" : "Wrong"
        }
        sovleqst.push(obj)
        localStorage.setItem("answered", JSON.stringify(sovleqst))
    }
    const [popsubmit, setpopsubmit] = useState(false)
    const [corrctanswer, setcorrctanswer] = useState("")
    const [inputValues, setInputValues] = useState([]);
    const [getstudentinput, setgetstudentinput] = useState([])
    const [msg, setmsg] = useState('Are you sure you are ready to submit')
    const [allanswer, setallanswer] = useState('')
    const submit = () => {
        setpopsubmit(true)
        let getanser = JSON.parse(localStorage.answered)
        console.log(sovleqst);
        console.log(getanser);
        const filteredSovleqst = [];
        const seenQuestionNos = new Set();

        if (getanser.length > 1) {
            for (let i = getanser.length - 1; i >= 0; i--) {
                const item = sovleqst[i];
                if (!seenQuestionNos.has(item.questionNo)) {
                    filteredSovleqst.push(item);
                    seenQuestionNos.add(item.questionNo);
                }
            }
        }
        filteredSovleqst.map((item, i) => {
            if (item.statue == "Correct") {
                if (item.statue === "Correct") {
                    setcorrctanswer(item)
                }
            }
        })
        const filteredArray = Object.values(getstudentinput.reduce((acc, obj) => {
            acc[obj.questionNo] = obj;  // Store the latest object for each questionNo
            return acc;
        }, {}));
        let result = filteredSovleqst.filter(item => item.statue === "Correct")
        let studentresult = {
            studentname: id,
            result: result.length,
            correctAnswer: filteredSovleqst.filter(item => item.statue === "Correct"),
            questionNoOption: filteredArray,
            subject: allqusetion.subject,
            grade: getuser.grade,
            grade2: getuser.grade2,
            tutor:allqusetion.tutoremail
        }
        // console.log(studentresult);
        let url = "http://localhost:3000/user/sendresult"
        axios.post(url, studentresult).then((res)=>{
            console.log(res);
            if(res.data.status){
                Swal.fire({
                    title: "Good job!",
                    text: "Exam submitted!",
                    icon: "success"
                });
                handleCategoryChange('')
                setsubject('')
            }else{
                Swal.fire({
                    title: "Denied!",
                    text: res.data.message,
                    icon: "error"
                });
            }
            setpopsubmit(false)
            setsubject('')
        }).catch((err)=>{
            console.log(err);
        })
       
    }

    const handleInputChange = (index, value) => {
        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues];
            newInputValues[index] = { value };
            return newInputValues;
        });
        let getnumber
        let space
        getnumber = allqusetion.question[questionNo].no
        space = allqusetion.question[questionNo].spaces
        if (space == index + 1) {
            let noOptionObj = {
                questionNo: getnumber,
                answer: inputValues,
                space: space
            }
            getstudentinput.push(noOptionObj)
        }
    };
    return (
        <div className='dashb'>
            <div>
                <Topnav studentname={id} />
                <Sidenav show={handleCategoryChange} name={id}/>
            </div>
            {
                allsubject.length>0?
                <div className="content p-4 d-flex gap-5">
                <div className="wit1">
                    {
                        subject !== "" ?
                            <div>
                                <div className="tutor">
                                    <p className='fs-2 subject'>Subject: {allqusetion.subject}</p>
                                    <p className='tutorname'>By <span style={{ textTransform: "capitalize" }}>{allqusetion.tutor}</span></p>
                                </div>

                                <div className="question-div p-3">
                                    {allqusetion.question[questionNo].question}
                                </div>
                                <div className="option-div mt-4 p-3">
                                    <p className='text-end'>Question No {questionNo + 1}</p>
                                    {
                                        allqusetion.question[questionNo].Ao !== "" ?
                                        <div >
                                            <div className="d-flex gap-4" onClick={() => { pickanswer("A") }}>
                                                <div className={`choose ${allqusetion.question[questionNo].styling == "A" ? "choosed" : ""}`}>
                                                    <p>A</p>
                                                </div>
                                                <p>{allqusetion.question[questionNo].Ao}</p>
                                            </div>
                                            <div className="d-flex gap-4" onClick={() => { pickanswer("B") }}>
                                                <div className={`choose ${allqusetion.question[questionNo].styling == "B" ? "choosed" : ""}`}>
                                                    <p>B</p>
                                                </div>
                                                <p>{allqusetion.question[questionNo].Bo}</p>
                                            </div>
                                            <div className="d-flex gap-4" onClick={() => { pickanswer("C") }}>
                                                <div className={`choose ${allqusetion.question[questionNo].styling == "C" ? "choosed" : ""}`}>
                                                    <p>C</p>
                                                </div>
                                                <p>{allqusetion.question[questionNo].Co}</p>
                                            </div>
                                            <div className="d-flex gap-4" onClick={() => { pickanswer("D") }}>
                                                <div className={`choose ${allqusetion.question[questionNo].styling == "D" ? "choosed" : ""}`}>
                                                    <p>D</p>
                                                </div>
                                                <p>{allqusetion.question[questionNo].Do}</p>
                                                {/* <p>{item.no} d</p> */}
                                            </div>
                                        </div>
                                        : <div>
                                            {
                                                Array.from({ length: Number(allqusetion.question[questionNo].spaces) }, (_, index) => (
                                                    <div>
                                                        <input key={index} type="text" className='generate-inp w-100 mt-2'placeholder='Provide you answer here' onChange={(e) => handleInputChange(index, e.target.value)} /> <br />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="slide-btn d-flex gap-1 justify-content-center pt-3">
                                    <button className='border-0' onClick={() => { setquestionNo(questionNo > 0 ? questionNo - 1 : 0) }}><i className="ri-arrow-left-wide-fill"></i> Preview</button>
                                    <button className='border-0' style={{ backgroundColor: "rgb(0,70,128)" }} onClick={() => { setquestionNo(questionNo < allqusetion.question.length - 1 ? questionNo + 1 : allqusetion.question.length - 1) }}><i className="ri-arrow-right-wide-fill"></i> Next</button>
                                </div>
                            </div>
                            : <div className='container shadow p-5 '>
                                <p className='text-center text-white'>Click on the subject you are doing</p>
                            </div>
                    }
                </div>
                {
                    subject !== "" ?
                        <div className="wit2">
                                <div className={`d-flex gap-2 mx-auto ${allqusetion.question.length > 40 ? "scroll" : ""}`}>
                                {
                                allqusetion.question.map((item, index) => (
                                    <button className='qst-no border-0 mt-2' onClick={() => { getquestion(index) }}>{index + 1}</button>
                                ))
                                }
                        </div>
                            
                            <button className='mt-3 submit w-100 border-0 border rounded text-white' onClick={() => {setpopsubmit(true) }} style={{ backgroundColor: "rgb(0,70,128)", height: "45px" }} >Submit</button>
                        </div>
                        : null
                }
            </div>
            :<div className='w-50 text-white shadow container text-center p-5'>
                <p>Your exam are not ready</p>
            </div>
            }
            {
                popsubmit == true ?
                    <div className="popsubmit">
                        <div className="board p-2">
                            <div>
                                <p className='text-center fw-bold'>{msg}</p>
                                <div className="d-flex gap-3  justify-content-center">
                                    <button className='btn btn-danger' onClick={() => { setpopsubmit(false) }}>No</button>
                                    <button className='btn btn-success' onClick={submit}>Yes</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
};
export default Studentdsb;