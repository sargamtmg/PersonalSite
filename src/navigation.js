import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>{
    let items = ['About Me','Skill','Projects','Hobby','Contact'];
    return(
        <div className="nav">
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
                <li className="nav-li">
                    <Link to='/Contact' className="navList">Contacts</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;