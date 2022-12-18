import React from 'react'
import {Button} from './Button'
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div className='hero-container'>
        <video src="videos/homeloop.mp4" autoPlay loop muted/>
        <h1>GET STARTED</h1>
        <p>First Steps to Find a New Job</p>
        <div class Name="hero-btns">
          
            <Button className='btns' buttonStyle='btn--outline'
            buttonSize='btn--large'>
                GET STARTED
            </Button>
        </div>

    </div>
  )
}

export default HeroSection