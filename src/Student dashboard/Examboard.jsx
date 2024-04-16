import React, { useEffect } from 'react'
import axios from 'axios'
const Examboard = () => {
    let getuser = JSON.parse(localStorage.student)
    // console.log(getuser._id); sendquestion

    useEffect(()=>{
        let url = "http://localhost:3000/user/sendquestion"
        axios.post(url, {gradeOne:getuser.grade,gradeTwo:getuser.grade2}).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div>

    </div>
  )
}

export default Examboard