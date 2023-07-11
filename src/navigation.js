import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) =>{
    let items = ['About Me','Skill','Projects','Hobby','Game','Contact'];
    return(
        <div className="nav">
            <div className="logo"></div>
            <ul className="nav-ul">
                <li className="nav-li">
                    <Link to="/" className="navList">Homepage</Link>
                </li>
                <li className="nav-li">
                    <Link to="/aboutMe" className="navList">About Me</Link>
                </li>
                <li className="nav-li">
                    <Link to='/skill' className="navList">Skill</Link>
                </li>
                <li className="nav-li">
                    <Link to='/projects' className="navList">Projects</Link>
                </li>
                <li className="nav-li">
                    <Link to='/hobby' className="navList">Hobby</Link>
                </li>
                {props.gameInclude &&
                <li className="nav-li">
                    <Link to='/game' className="navList">Game</Link>
                </li>
                }
                <li className="nav-li">
                    <Link to='/Contact' className="navList">Contacts</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;