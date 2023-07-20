import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Nav = (props) =>{
    //let items = ['About Me','Skill','Projects','Hobby','Game','Contact'];

    const [isNavOpen,setIsNavOpen] = useState(false);
    
    const toggleIsNavOpen = ()=>{
        isNavOpen ? enable_scroll() : disable_scroll();
        setIsNavOpen(!isNavOpen);
    }

    const disable_scroll = ()=>{
        document.body.classList.add('disable-scrolling');
    }

    const enable_scroll = ()=>{
        document.body.classList.remove('disable-scrolling');
    }

    return(
        <div className="nav">
            <div className="logo"></div>
            <ul className={`nav-ul ${isNavOpen? 'nav_active':''}`}>
                <li className="nav-li">
                    <NavLink to="/" className="navList" activeclassname="active" onClick={toggleIsNavOpen}>Homepage</NavLink>
                </li>
                <li className="nav-li">
                    <NavLink to="/aboutMe" className="navList" activeclassname="active" onClick={toggleIsNavOpen}>About Me</NavLink>
                </li>
                <li className="nav-li">
                    <NavLink to='/skill' className="navList" activeclassname="active" onClick={toggleIsNavOpen}>Skill</NavLink>
                </li>
                <li className="nav-li">
                    <NavLink to='/projects' className="navList" activeclassname="active" onClick={toggleIsNavOpen}>Projects</NavLink>
                </li>
                <li className="nav-li">
                    <NavLink to='/hobby' className="navList" activeclassname="active" onClick={toggleIsNavOpen}>Hobby</NavLink>
                </li>
                {props.gameInclude &&
                <li className="nav-li">
                    <NavLink to='/game' className="navList" activeclassname="active" onClick={toggleIsNavOpen}>Game</NavLink>
                </li>
                }
                <li className="nav-li">
                    <NavLink to='/Contact' className="navList" activeclassname="active" onClick={toggleIsNavOpen}>Contacts</NavLink>
                </li>
            </ul>
            <div className="triple_bar" onClick={toggleIsNavOpen}>
                {isNavOpen ? <FontAwesomeIcon icon={faXmark} className="nav_icon"/> : <FontAwesomeIcon icon={faBars} className="nav_icon"/>}
            </div>
        </div>
    );
}

export default Nav;