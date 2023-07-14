import React, { useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import sletterTop from '../img/sletterTop.png';
import sletterMiddle from '../img/sletterMiddle.png';
import sletterBottom from '../img/sletterBottom.png';
import scrollDown from '../img/logo/scroll_down.png';

const Homepage = () =>{
    let myref = useRef(null);
    let myref2 = useRef(null);
    let myref3 = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    //this is to be used

    useEffect(()=>{
        console.log('useEffect on main page');
        let ctx = gsap.context(()=>{

            //initial setting height for letterT
            gsap.from('.letterT',{
                height: '80vh'
            });

            //elongate the upperline of T
            gsap.to('.upperline',{
                width: '90vw',
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 100%',
                    end: 'bottom 50%',
                    //markers:true,
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
                    //markers:true,
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
                    //markers:true,
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
                    //markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //decrease size of T upperline
            gsap.fromTo('.upperline',{width:'90vw'},{
                width: '15vw',
                minWidth: '90px',
                height:'20px',
                duration: 1,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom 10%',
                    end: 'bottom -35%',
                    //markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //decrease size of T middle line
            gsap.fromTo('.letterT',{height:'45vh'},{
                height: '20vw',
                width: '3vw',
                duration: 4,
                delay: 2,
                scrollTrigger:{
                    trigger: '.purple',
                    start: 'bottom -35%',
                    end: 'bottom -70%',
                    //markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            //just to pin purple element
            ScrollTrigger.create({
                trigger: '.purple',
                start: 'bottom 100%',
                end: 'bottom -50%',
                //markers: true,
                pin: true
            });
            
            gsap.to('.letterT',{
                y:'68vh',  //based on observation to align with amang at footer
                scrollTrigger:{
                    trigger: '.footer',
                    start: 'top 90%',
                    end: 'top 60%',
                    //markers:true,
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
            if(red.bottom <= window.innerHeight*0.1){//75
                navChild.classList.add('stickyToTop');
                yellowe.classList.remove('fixedToTop');
                transe.classList.add('hide');
            }
        }
        else if(red.bottom <= 0){
            navChild.classList.add('stickyToTop');
            yellowe.classList.remove('fixedToTop');
            transe.classList.add('hide');
        }
        let scrollIcon = document.querySelector('.scrolldown');
        window.scrollY===0 ? scrollIcon.classList.remove('hide') : scrollIcon.classList.add('hide');


        //page hit bottom
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            let leftname = document.querySelectorAll('.leftname');
            for (let i = 0; i < leftname.length; i++) {
                leftname[i].classList.remove('hide');
            }
        }
    });

    return(
        <>
        <div className='view1'>
                <div className='red layer' id='redid' ref ={myref}>
                </div>
                <div className={window.scrollY===0 ? 'scrolldown':'scrolldown hide'}><img src={scrollDown} alt="scroll down" width='15%'></img></div>
                <div className='yellow layer fixedToTop' id='yellowid' ref={myref2}>
                    I am YELLOWs
                    <div>Essay topics in

                    </div>
                </div>
                <div className='trans layer' id='transid' ref ={myref3}>
                    I am-------------------- transparent.
                </div>
            </div>
            <div className='view2'>
                <div className='purple layer'>  
                    <div className='whole_collection'>
                        <div className='first_two_page mini_collection'>
                            <Link to="/aboutMe"><div className='aboutMe_mini mini'> About me</div></Link>
                            <Link to='/skill'><div className='skill_mini mini'> Skill</div></Link>
                        </div>
                        <div className='letterT'>
                            <div className='upperline' id='upperline'></div>
                            <div className='middleline'></div>
                        </div>
                        <div className='second_two_page mini_collection'>
                            <Link to='/projects'><div className='project_mini mini'>project</div></Link>
                            <Link to='/game'><div className='game_mini mini'>game</div></Link>
                        </div>
                    </div>
                </div>
                <div className='blue footer' id='blueid'>
                    <div className='myName'>
                        <div className='sargam'>
                            <div className='Sletter'>
                                <img src={sletterTop} alt="S letter top" className='STop' />
                                <img src={sletterMiddle} alt="S letter middle" className='SMiddle'/>
                                <img src={sletterBottom} alt="BS letter Bottom" className='SBottom'/>
                            </div>
                            <div className='leftname hide'>argam</div>
                        </div>
                        <div className='leftname amang hide'>amang</div>
                    </div>
                    <div className='social_media'>
                        <div className='handle_collection'>
                            <a href='https://www.youtube.com/' target='_blank' className='fb handles'></a>
                            <a href='https://www.linkedin.com/in/sargam-tamang-9412a8189/' target='_blank' className='ln handles'></a>
                        </div>
                        <div className='handle_collection'>
                            <a href ='#' target='_blank' className='insta handles'></a>
                            <a href='https://github.com/sargamtmg' target='_blank' className='git handles'></a>
                        </div>
                        <div className='email_address'>sargamtmg228@gmail.com</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;