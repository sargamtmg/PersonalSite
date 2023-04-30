import React,{useEffect,useRef} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from './navigation';
import AboutMe from './pages/About_me';
import Contacts from './pages/Contact';
import Hobby from './pages/Hobby';
import Homepage from './pages/Homepage';
import Skill from './pages/Skills';
import Projects from './pages/Projects';
import Game from './pages/Game';

const MainPage = () => {
    const comp = useRef()

    gsap.registerPlugin(ScrollTrigger);

    //this is to be used

    useEffect(()=>{
        console.log('useEffect on main page');
        let ctx = gsap.context(()=>{

            //elongate the upperline of T
            gsap.to('.upperline',{
                width: '90vw',
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 100%',
                    end: 'bottom 50%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //decrease size of T
            gsap.to('.letterT',{
                height: '45vh',
                duration: 4,
                delay: 2,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //overlap the upper two mini
            gsap.to('.aboutMe_mini , .project_mini',{
                x:-20,
                y: 170,
                duration: 1,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //width 0 to minis
            gsap.to('.mini_collection',{
                width: 0,
                height: '20vh',
                duration: 1,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 10%',
                    end: 'bottom -35%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //decrease size of T upperline
            gsap.fromTo('.upperline',{width:'90vw'},{
                width: '15vw',
                height:'20px',
                duration: 1,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 10%',
                    end: 'bottom -35%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //decrease size of T middle line
            gsap.fromTo('.letterT',{height:'45vh'},{
                height: '25vh',
                width: '20px',
                duration: 4,
                delay: 2,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom -35%',
                    end: 'bottom -70%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //just to pin purple element
            ScrollTrigger.create({
                trigger: '.purple',
                start: 'bottom 100%',
                end: 'bottom -50%',
                pin: true
            });
            
            gsap.to('.letterT',{
                y:'68vh',  //based on observation to align with amang at footer
                scrollTrigger:{
                    trigger: '.footer',
                    start: 'top 90%',
                    end: 'top 60%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

        });
        return () => ctx.revert();
    },[]);

    window.addEventListener('scroll', ()=>{
        //if(!myref.current || !myref2.current || !myref3.current) return;
        let value = window.scrollY;
        const rede = document.querySelector('#redid');
        let red = rede.getBoundingClientRect();
        const transe = document.querySelector('#transid');
        const yellowe = document.querySelector('#yellowid');
        let yellow = yellowe.getBoundingClientRect();
        const purplee = document.querySelector('.purple');
        let purple = purplee.getBoundingClientRect();
        const navChild = document.querySelector('.navChild');
        if(red.bottom > 0 )
        {
            yellowe.classList.add('fixedToTop');
            transe.classList.remove('hide');
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
                <Route path="/Game" element={<Game />} />
                <Route path="/contact" element={<Contacts />} />
                <Route element={<Homepage/>} />
            </Routes>
        </div>
        </Router>
    );
}

export default MainPage;