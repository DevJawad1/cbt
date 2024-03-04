import React, { useEffect, useState } from 'react'
import logo from '../assets/gomal logo.png'
const Sidenav = ({show}) => {
    const [getsubject, setgetsubject] = useState('')
    const [subname, setsubname] = useState(localStorage.tutorquestion?JSON.parse(localStorage.tutorquestion):"")
    useEffect(()=>{
        if(localStorage.tutorquestion){
            let getqusetion=JSON.parse(localStorage.tutorquestion)
            setsubname(JSON.parse(localStorage.tutorquestion))
            console.log(subname);

            setgetsubject(getqusetion.length)
            console.log(getsubject);
            for (let index = 0; index < subname.length; index++) {
                
            }
            // setgetsubject(getqusetion.length)
        }
    },[])

    const subid=(i)=>{
        show(i)

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
                        <p>Tutor Dashboard</p>
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
                                
                                <p onClick={()=>{subid(index)}}>{

                                    subname[index].map((item, i)=>(
                                        <span>
                                            {
                                                item.length?
                                                <span className='subject'>{item[0].subject}</span>
                                                :<span className='subject'>{item.subject}</span>
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