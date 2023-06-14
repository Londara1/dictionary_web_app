import React from 'react';
import Logo from "../assets/logo.svg";
import Moon from "../assets/icon-moon.svg";
import MoonDark from "../assets/icon-moon-dark.svg";
import Arrow from "../assets/icon-arrow-down.svg";
import { useState } from 'react';
import '../App.css';
import '../styles.scss';

const Header = ( {setChangeFont, changeFont, isChecked, setIsChecked}) => {

  console.log(changeFont);

  return (
  <div className="header">
    <img src={Logo} alt="" />

    <div className="headerRightPart">
      <div className="headerSecondPart">


        <nav>
          <label htmlFor="touch"><span className={isChecked ? "whiteColor" : ""}>{changeFont === 1 ? "Sans Serif" : changeFont === 2 ? "Serif" : changeFont === 3 ? "Mono": ""}<img src={Arrow}/></span></label>               
          <input type="checkbox" id="touch"/>

          <ul className={`slide ${isChecked ? "whiteColor slideDark" : ""}`}>
            <button onClick={() => setChangeFont(1)} className={`buttonLight ${isChecked ? "buttondark" : ""}`}>Sans Serif</button>
            <button onClick={() => setChangeFont(2)} className={`buttonLight ${isChecked ? "buttondark" : ""}`}>Serif</button>
            <button onClick={() => setChangeFont(3)} className={`buttonLight ${isChecked ? "buttondark" : ""}`}>Mono</button>
          </ul>
        </nav>

        <div className='lineDivider'></div>
      </div>

      <div className="headerThirdpart">
          <label className="switch">
            <input type="checkbox" onChange={() => setIsChecked(!isChecked)}/>
            <span className="slider round"></span>
          </label>
          <img src={isChecked ? MoonDark : Moon} alt="" />
      </div>
    </div>
  </div>
  )
}

export default Header;