import React, { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
// import {}
const Tutor = () => {
    const navigate = useNavigate()
    // const result = JSON.parse(localStorage.studentresult)
    const {id}=useParams()
    const [result, setresult] = useState([])
    useEffect(()=>{
        if(localStorage.studentresult){
            setresult(JSON.parse(localStorage.studentresult))
        }
        result.map((item, i)=>{
            item.questionNoOption.map((qst, id)=>{
                 console.log(qst.answer);
                 qst.answer.map((ans, ii)=>{
                    // console.log(ans);
                 })
            })
        })
        // console.log(result);
    })

    const [sum, setsum] = useState(0)
    const [push, setpush] = useState([])
    const [qstid, setqstid] = useState('')
    const correct =(i, id)=>{   
        console.log(id);
        result.map((item, i)=>{
            if(item.studentname==id){
                setqstid(item.studentname)
                console.log(qstid, id2);
            }
        })
    }
    const wrong=()=>{

    }
  return (
    <div className='tutorpage'>
        <div className="nav pt-2" style={{borderBottom:"1px solid", height:"45px"}}>Welcome,    <span className='fw-bold px-2
        ' style={{textTransform:"capitalize"}}> {id}</span>
        </div>
        <div className="mt-2 p-2">
        <button className='btn btn-success' onClick={()=>{navigate(`/uploadquestion/${id}`)}}>Upload question</button>
        <div>
        <p>Your student result</p>
        <div>
        {
            result.length>0?
            <table className='table'>
            <tr >
            <td >Student Name</td>
            <td >Student Result</td>
            </tr>
            <tbody>
            {
                result.length>1?
                result.map((item,i)=>(
                    <tr className='table-success'>
                        <td className='w-25 table-succss' style={{borderLeft:"1px solid"}}>{item.studentname}
                        
                        </td>
                        
                        <td className='w-25 table-waring' style={{borderLeft:"1px solid"}}>{
                        item.result==0?"This student din't got anything, "+ 
                        qstid==item.studentname?
                        Number(item.result+sum):
                        Number(item.result)+" scrore"
                        
                        :qstid==i?
                        Number(item.result+sum):
                        Number(item.result)
                        }</td>
                        <td className='w-25 table-waring' style={{borderLeft:"1px solid"}}>{
                        item.questionNoOption.map((item, i)=>(
                            <div className='border border-1 border-success mt-2'>
                                <p>Qusetion number: {item.questionNo}</p>
                                <p>All qusetion number {item.questionNo} Answer</p>
                                {
                                    item.answer.length==item.space?
                                    <div>{
                                        item.answer.map((ans, id)=>(
                                            <div className='d-flex mt-3 w-100 justify-content-enter gap-2'>
                                                <p  style={{borderBottom:"1px solid"}} className='w-100'>{ans.value}</p>
                                                <div className="border w-100">
                                                <button className='btn btn-success' onClick={()=>{correct(1, item.studentname)}}>Correct</button>
                                                {/* <p>{item.studentname}</p> */}
                                                <button className='btn btn-danger mx-2' onClick={()=>{wrong(0)}}>Wrong</button>
                                                    
                                                </div>
                                            </div>
                                        ))
                                        }</div>
                                    :<div>
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
                :<div>
                    
                </div>
            }
            </tbody>

        </table>
        :<div className='shadow p-5 text-center container'>
            <p>Student result are not yet available</p>
        </div>
        }
           
        </div>
        </div>
        </div>

    </div>
  )
}

export default Tutor