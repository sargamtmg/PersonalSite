import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Nav from './navigation';
import AboutMe from './pages/About_me';
import Contacts from './pages/Contact';
import Hobby from './pages/Hobby';
import Homepage from './pages/Homepage';
import Skill from './pages/Skills'
import Projects from './pages/Projects'

const MainPage = () => {


    window.addEventListener('scroll', ()=>{
        //if(!myref.current || !myref2.current || !myref3.current) return;
        let value = window.scrollY;
        const rede = document.querySelector('#redid');
        let red = rede.getBoundingClientRect();
        const transe = document.querySelector('#transid');
        let trans = transe.getBoundingClientRect();
        const yellowe = document.querySelector('#yellowid');
        let yellow = yellowe.getBoundingClientRect();
        const purple = document.querySelector('.purple');
        const navChild = document.querySelector('.navChild')
        const welcome = document.querySelector('.welcome');
        // const blue = document.getElementById('blue');
        console.log(red.bottom);
        if(red.bottom > 0 )
        {
            yellowe.classList.add('fixedToTop');
            transe.classList.remove('hide');
            //welcome hide
            welcome.style.left = '-'+value+'px';
            let op = (yellow.bottom - (yellow.bottom - red.bottom))/(yellow.bottom*2);
            transe.style.opacity= op;
            navChild.classList.remove('stickyToTop');
            if(red.bottom <= 75){
                navChild.classList.add('stickyToTop');
                yellowe.classList.remove('fixedToTop');
                transe.classList.add('hide');
            }
        }
        else if(red.bottom <= 0){
            //navChild.classList.add('stickyToTop');
            //yellowe.classList.add('stickyToTop');
        }
        //page hit bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            let leftname = document.querySelectorAll('.leftname');
            for (let i = 0; i < leftname.length; i++) {
                leftname[i].classList.remove('hide');
            }
        }
    });

    return(
        <Router>
        <div className='main'>
            <div className='navChild'>
                <Nav/>
            </div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/aboutMe" element={<AboutMe />} />
                <Route path="/skill" element={<Skill />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/hobby" element={<Hobby />} />
                <Route path="/contact" element={<Contacts />} />
                <Route element={<Homepage/>} />
            </Routes>
        </div>
        </Router>
    );
}

export default MainPage;