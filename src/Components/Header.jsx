import React from 'react';
import Logo from "../assets/logo.svg";
import Moon from "../assets/icon-moon.svg";
import Arrow from "../assets/icon-arrow-down.svg";
import { useState } from 'react';
import '../App.css';
import '../styles.scss';

const Header = () => {
    return (
    <div className="header">
      <img src={Logo} alt="" />

      <div className="headerRightPart">
        <div className="headerSecondPart">


          <nav>
            <label htmlFor="touch"><span>Sans Serif<img src={Arrow} alt="" /></span></label>               
            <input type="checkbox" id="touch"/>


            <ul className="slide">
              <li><a href="#">Sans Serif</a></li>
              <li><a href="#">Serif</a></li>
              <li><a href="#">Mono</a></li>
            </ul>
          </nav>

          <div className='lineDivider'></div>
        </div>

        <div className="headerThirdpart">
            <label className="switch">
              <input type="checkbox"/>
              <span className="slider round"></span>
            </label>
            <img src={Moon} alt="" />
        </div>
      </div>
    </div>
    )
}

export default Header;