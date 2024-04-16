import React from 'react'
import './landing.css'
import bottle from '../assets/bottle (2).png'
import cover from '../assets/cover.png'
const Landingpage = () => {
  return (
    <div>
        <div className="landing">
            <div className="bottle-div">
                <img src={cover} alt="" className='cover'/>
                <img src={bottle} alt="" className='bottle'/>
            </div>
            
        </div>
        <div className="title text-center">
            <p className='fuel'>Fuel Up</p>
            <p className='fw-bold hydra' style={{wordSpacing:"10px", letterSpacing:"6px"}}>Hydation Boost</p>
        </div>
        <div className="circle1"></div>
    </div>
  )
}

export default Landingpage