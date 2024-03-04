import React from 'react'

const Topnav = () => {
  return (
    <div className='topnav d-flex'>
        <div className="d-flex justify-content-end w-75 p-3" >
            <div className="inp-holder-nav d-flex gap-2">
            <i className="ri-search-line "></i>
            <input type="text" placeholder='Search your dashboard'/>
            <div className="enter">Enter</div>
            </div>
        </div>
        <div className="d-flex w-25 det">
            <div className="profile-img"></div>
            <div className="profile-det">
                <p>Kingsley Abraham</p>
                <p className='account-type'>Student account</p>
            </div>
        </div>
    </div>
  )
}

export default Topnav