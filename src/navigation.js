const Nav = () =>{
    let items = ['About Me','Skill','Projects','Hobby','Contact'];
    return(
        <div className="nav">
            <ul className="nav-ul">{
                items.map((item , index) => {
                    return <li className="nav-li">{item}</li>
                })
            }
            </ul>
        </div>
    );
}

export default Nav;