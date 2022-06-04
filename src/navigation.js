import React from "react";
import { Link } from "react-router-dom";

const Nav = () =>{
    let items = ['About Me','Skill','Projects','Hobby','Contact'];
    return(
        <div className="nav">
            <ul className="nav-ul">
                <li className="nav-li">
                    <Link to="/">Homepage</Link>
                </li>
                <li className="nav-li">
                    <Link to="/aboutMe">About Me</Link>
                </li>
                <li className="nav-li">
                    <Link to='/skill'>Skill</Link>
                </li>
                <li className="nav-li">
                    <Link to='/projects'>Projects</Link>
                </li>
                <li className="nav-li">
                    <Link to='/hobby'>Hobby</Link>
                </li>
                <li className="nav-li">
                    <Link to='/Contact'>Contacts</Link>
                </li>
            </ul>
        </div>
    );
}

export default Nav;