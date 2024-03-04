import React, { useEffect, useRef, useState } from 'react';
import Topnav from '../component/Topnav';
import Sidenav from '../component/Sidenav';
import { useParams } from 'react-router-dom'
import './studentdsb.css'
const Studentdsb = () => {
    const [subject, setsubject] = useState('')
    const handleCategoryChange = (category) => {
        // let sub = Number()
        setsubject(category)
        console.log(subject);
    };

    const getallSub = localStorage.tutorquestion?JSON.parse(localStorage.tutorquestion):""
    let realsubject=getallSub[Number(subject)]
    const [allqusetion, setallqusetion] = useState(getallSub[Number(subject)]);
    const [questionNo, setquestionNo] = useState(0)
    useEffect(()=>{
        if(localStorage.tutorquestion){
            set
        }
    })
    useEffect(()=>{
        console.log(allqusetion);
        console.log(getallSub[Number(subject)]);
        setallqusetion(getallSub[Number(subject)])
        console.log(allqusetion);
    }, [subject])
    console.log(allqusetion);
    useEffect(()=>{
        console.log(allqusetion);
       if(allqusetion){
        allqusetion.map((item, i)=>{
            console.log(item.question[questionNo]);
        })
       }
    })
    const { id } = useParams()

    const shufflearray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const [gatherqst, setgatherqst] = useState([])
    useEffect(() => {
        let allQuestions = [];
        setTimeout(() => {
            allqusetion.forEach(item => {
                allQuestions = allQuestions.concat(item.question);
            });
            const shuffledQuestions = shufflearray(allQuestions);
            setallqusetion([{ ...allqusetion[0], question: shuffledQuestions }]);
        }, 1000);
    }, []);

    const choose = () => {
        // console.log(opt.current.value);
    }

    const [questionlnght, setquestionlnght] = useState(null)

    const getquestion = (i) => {
        setquestionNo(i)
    }
    const wwo = () => {
        allqusetion.map((item, i) => {
            setquestionNo(questionNo < questionlnght ? questionNo + 1 : questionlnght)
            console.log(questionNo, item.question.length);
        })
    }

    const [chooseicom, setchooseicom] = useState("")

    const [sovleqst, setsovleqst] = useState([])
    const [updsolve, setupdsolve] = useState('')
    const pickanswer = (i) => {
        setchooseicom(i)
        const shuffledQuestions = [...allqusetion[0].question];
        shuffledQuestions[questionNo].styling = i;
        setallqusetion([{ ...allqusetion[0], question: shuffledQuestions }])
        let obj = {
            questionNo: questionNo,
            optionpick: i,
            answer: allqusetion[0].question[questionNo].answer,
            statue: i == allqusetion[0].question[questionNo].answer ? "Correct" : "Wrong"
        }
        sovleqst.push(obj)
        localStorage.setItem("answered", JSON.stringify(sovleqst))
    }


    const [popsubmit, setpopsubmit] = useState(false)
    const [corrctanswer, setcorrctanswer] = useState("")
    const [inputValues, setInputValues] = useState([]);
    const [getstudentinput, setgetstudentinput] = useState([])
    const submit = () => {
        let getanser = JSON.parse(localStorage.answered)

        const filteredSovleqst = [];
        const seenQuestionNos = new Set();

        for (let i = getanser.length - 1; i >= 0; i--) {
            const item = sovleqst[i];
            if (!seenQuestionNos.has(item.questionNo)) {
                filteredSovleqst.unshift(item);
                seenQuestionNos.add(item.questionNo);
            }
        }
        // console.log(filteredSovleqst);

        localStorage.setItem('allanswe', JSON.stringify(filteredSovleqst))
        let sum = 0
        filteredSovleqst.map((item, i) => {
            if (item.statue == "Correct") {
                if (item.statue === "Correct") {
                    sum = i;
                    setcorrctanswer(item)
                    // console.log(corrctanswer);
                }
            }
        })
        let resultarray = []

        let allOption = ""

        allqusetion.map((item, i) => {
            allOption = item.question
            // console.log(allOption);
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
            tutor: allOption.tutor
        }

        if (localStorage.studentresult) {
            let getstudent = JSON.parse(localStorage.studentresult)
            resultarray = getstudent
            let setresult = false
            for (let index = 0; index < getstudent.length; index++) {
                if (getstudent[index].studentname == id) {
                    // console.log(getstudent[index].studentname);
                    break
                }
                else {
                    setresult = true
                    break
                }
            }
            if (setresult == true) {
                resultarray.push(studentresult)
                console.log(resultarray);
                localStorage.setItem('studentresult', JSON.stringify(resultarray))
            }
            else {
                alert("You have already done this exam")
            }
        }
        else {
            resultarray.push(studentresult)
            console.log(resultarray);
            localStorage.setItem('studentresult', JSON.stringify(resultarray))
        }
    }

    const handleInputChange = (index, value) => {
        setInputValues(prevInputValues => {
            const newInputValues = [...prevInputValues];
            newInputValues[index] = { value };
            return newInputValues;
        });
        let getnumber
        let space
        allqusetion.map((item, i) => {
            getnumber = item.question[questionNo].no
            space = item.question[questionNo].spaces
        })

        if (space == index + 1) {
            let noOptionObj = {
                questionNo: getnumber,
                answer: inputValues,
                space: space
            }
            getstudentinput.push(noOptionObj)
            // getstudentinput.slice(0,space)
            // setInputValues("")
            console.log(getstudentinput);
        }
    };
    return (
        <div className='dashb'>
            <div>
                <Topnav />
                <Sidenav show={handleCategoryChange} />
            </div>

            <div className="content p-4 d-flex gap-5">
                <div className="wit1">
                    {
                        subject!=="" && allqusetion.length > 0?
                        allqusetion.map((item, i) => (
                            <div>
                                <div className="tutor">
                                    <p className='fs-2 subject'>Subject: {item.subject}</p>
                                    <p className='tutorname'>By <span style={{ textTransform: "capitalize" }}>{item.tutor}</span></p>
                                    {/* <p>{item.spaces}</p> */}
                                </div>

                                <div className="question-div p-3">
                                    {item.question[questionNo].question}
                                    {/* {
                                    item.question.map((qst, index)=>(
                                        <p>{qst.question}</p>
                                    ))
                                } */}
                                </div>
                                <div className="option-div mt-4 p-3">
                                    <p className='text-end'>Question No {questionNo + 1}</p>
                                    {
                                        item.question[questionNo].Ao !== "" ?
                                            <div >
                                                <div className="d-flex gap-4" onClick={() => { pickanswer("A") }}>
                                                    <div className={`choose ${item.question[questionNo].styling == "A" ? "choosed" : ""}`}>
                                                        <p>A</p>
                                                    </div>
                                                    <p>{item.question[questionNo].Ao}</p>
                                                </div>
                                                <div className="d-flex gap-4" onClick={() => { pickanswer("B") }}>
                                                    <div className={`choose ${item.question[questionNo].styling == "B" ? "choosed" : ""}`}>
                                                        <p>B</p>
                                                    </div>
                                                    <p>{item.question[questionNo].Bo}</p>
                                                </div>
                                                <div className="d-flex gap-4" onClick={() => { pickanswer("C") }}>
                                                    <div className={`choose ${item.question[questionNo].styling == "C" ? "choosed" : ""}`}>
                                                        <p>C</p>
                                                    </div>
                                                    <p>{item.question[questionNo].Co}</p>
                                                </div>
                                                <div className="d-flex gap-4" onClick={() => { pickanswer("D") }}>
                                                    <div className={`choose ${item.question[questionNo].styling == "D" ? "choosed" : ""}`}>
                                                        <p>D</p>
                                                    </div>
                                                    <p>{item.question[questionNo].Do}</p>
                                                    {/* <p>{item.no} d</p> */}
                                                </div>
                                            </div>
                                            : <div>
                                                {
                                                    Array.from({ length: Number(item.question[questionNo].spaces) }, (_, index) => (
                                                        <div>
                                                            <input key={index} type="text" className='generate-inp w-100 mt-2' placeholder='Provide you answer here' onChange={(e) => handleInputChange(index, e.target.value)} /> <br />
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                    }
                                    {/* {
                                        item.type == "noOption" && questionNo==i ?
                                            <div>
                                                ddhgj
                                            </div>
                                            : null
                                    } */}
                                </div>
                                <div className="slide-btn d-flex gap-1 justify-content-center pt-3">
                                    <button className='border-0' onClick={() => { setquestionNo(questionNo > 0 ? questionNo - 1 : 0) }}><i className="ri-arrow-left-wide-fill"></i> Preview</button>
                                    <button className='border-0' style={{ backgroundColor: "rgb(0,70,128)" }} onClick={wwo}><i className="ri-arrow-right-wide-fill"></i> Next</button>
                                </div>
                            </div>
                        ))
                        :<div className='container shadow p-5'>
                            <p className='text-center text-white'>No Exam for now</p>
                        </div>
                    }
                </div>
                {
                    subject!==""?
                    <div className="wit2">
                    {
                        allqusetion.map((item, i) => (
                            <div className={`d-flex gap-2 mx-auto ${allqusetion[0].question.length > 40 ? "scroll" : ""}`}>
                                {
                                    item.question.map((qst, index) => (
                                        <button className='qst-no border-0 mt-2' onClick={() => { getquestion(index) }}>{index + 1}</button>
                                    ))
                                }
                            </div>
                        ))
                    }
                    <button className='mt-3 submit w-100 border-0 border rounded text-white' onClick={() => { setpopsubmit(true) }} style={{ backgroundColor: "rgb(0,70,128)", height: "45px" }}>Submit</button>
                </div>
                :null
                }
            </div>

            {
                popsubmit == true ?
                    <div className="popsubmit">
                        <div className="board p-2">
                            <div>
                                <p className='text-center fw-bold'>Are you sure you are ready to submit</p>
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


