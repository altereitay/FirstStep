import React from 'react'
import {Button} from './Button'
import './HeroSection.css';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
    <div className='hero-container'>
    
        <h1>FIRST STEP</h1>
        <p>Towards Your Career</p>
        <div class Name="hero-btns">
        <Link to='/register-select'>
            <Button className='btn' buttonStyle='btn--pramiry'
            buttonSize='btn--large'  >
                GET STARTED
            </Button>
          </Link>
        </div>
    </div>
    </div>
  )
}

export default HeroSection