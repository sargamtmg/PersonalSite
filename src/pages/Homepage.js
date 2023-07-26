import React, { useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faArrowRightLong} from "@fortawesome/free-solid-svg-icons"
import resume_doc from '../documents/Sargam_Resume.pdf';
import sletterTop from '../img/homepage/sletterTop.png';
import sletterMiddle from '../img/homepage/sletterMiddle.png';
import sletterBottom from '../img/homepage/sletterBottom.png';
import scrollDown from '../img/logo/scroll_down.png';
import { HemisphereLightProbe } from 'three';

const Homepage = () =>{
    let heroLayerRef = useRef(null);
    let aboutMeLayerRef = useRef(null);
    let myref3 = useRef(null);
    let letterT_Ref = useRef(null);
    let letterT_middleline_Ref = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    let intro_data = {
        name: 'I\'m Sargam Tamang',
        position: 'Full Stack Developer',
        content: 'I am currently seeking for new career opportunities, and if my work resonates with you, I would love to connect and discuss potential collaborations.'
    }

    let aboutMe_data = {
        tittle: 'About Me',
        content: 'I have experience as a Software Engineer for around year and a half. I have been actively engaged in both backend and frontend development, predominantly utilizing Node.js and React.js technologies. In addition to my primary focus, I have also keen interest in exploring other domains such as machine learning and mobile app development.',
        moreMe: 'Know More About Me '
    }

    let interest_data = {
        backend: {
            tittle: 'Backend Development',
            content: 'I specialized in Node.js as backend developer, I excel in building and managing multiple APIs using Express.js, ensuring efficient server-side functionality.',
            short_tittle: 'Backend',
            short_contain:'Node.js backend specialist, excelling in Express.js to build and manage APIs.'
        },
        machine_learning: {
            tittle: 'Machine Learning',
            content: 'I possess basic knowledge and limited experience with these technologies mainly CNN and RNN, which fuels my passion to explore this rapidly evolving field.',
            short_tittle: 'M.L',
            short_contain:'Basic knowledge, limited experience in CNN and RNN, passionate for exploration.'
        },
        frontend:{
            tittle: 'Frontend Development',
            content: 'I have proficiency in React js, ensuring a seamless user experience. Additionally, I utilize JavaScript and SCSS to implement responsive UI designs.',
            short_tittle: 'Frontend',
            short_contain:'Proficient in React, JavaScript, SCSS for seamless UI experiences.'
        },
        mobile_dev: {
            tittle: 'App Development',
            content: 'Basic skill in app development proficient in Java using Android Studio and Firebase to create seamless, user-centric mobile experiences.',
            short_tittle: 'App Dev.',
            short_contain:'Skilled in Java, Android Studio, Firebase for user-centric app development.'
        }
    }

    useEffect(()=>{
        //console.log('useEffect on main page');
        if( letterT_Ref.current && letterT_Ref.current.offsetParent){
            console.log('letter T width: '+letterT_Ref.current.offsetWidth);
            console.log('letter T width 2: '+letterT_middleline_Ref.current.clientWidth);
            let ctx = gsap.context(()=>{

                //initial setting height for letterT
                gsap.from('.letterT',{
                    height: '80vh' 
                });

                //initial setting width og upperline
                gsap.from('.upperline',{
                    width: letterT_Ref.current.offsetWidth
                });

                //elongate the upperline of T
                gsap.to('.upperline',{
                    width: '80vw',
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
                    //duration: 4,
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
                gsap.to('.backend_mini , .frontend_mini',{
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
                gsap.to('.mini_collection_wrapper',{
                    width: 0,
                    opacity: -1,
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
                gsap.fromTo('.upperline',{width: '80vw'},{
                    width: '15vw',
                    minWidth: '90px',
                    //duration: 1,
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
                    height: '19vw',
                    duration: 4,
                    delay: 2,
                    width:'2.4vw',
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
                    end: 'bottom -70%',
                    //markers: true,
                    pin: true
                });
                
                gsap.to('.letterT',{
                    y:'63vh',  //based on observation to align with amang at footer
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
        }
        
    },[]);


    //on page refresh scroll to top
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };

    window.addEventListener('scroll', ()=>{
        //if(!myref.current || !myref2.current || !myref3.current) return;
        let hero;
        if(heroLayerRef.current){
            hero = heroLayerRef.current.getBoundingClientRect();
        }
        const transe = document.querySelector('#transid');
        const purplee = document.querySelector('.purple');
        let purple = purplee.getBoundingClientRect();
        const navChild = document.querySelector('.navChild');
        if(heroLayerRef.current && hero.bottom > 0 )
        {
            aboutMeLayerRef.current.classList.add('fixedToTop');
            transe.classList.remove('hide');
            navChild.classList.remove('stickyToTop');
            if(hero.bottom <= window.innerHeight*0.1){//75
                navChild.classList.add('stickyToTop');
                aboutMeLayerRef.current.classList.remove('fixedToTop');
                transe.classList.add('hide');
            }
        }
        else if(heroLayerRef.current && hero.bottom <= 0){
            navChild.classList.add('stickyToTop');
            aboutMeLayerRef.current.classList.remove('fixedToTop');
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

    const download_resume = ()=>{
        let alink = document.createElement('a');
        alink.href = resume_doc;
        alink.download = 'Sargam_resume.pdf';
        alink.click();
    }

    return(
        <>
        <div className='view1'>
            <div className='hero_layer layer' id='heroid' ref ={heroLayerRef}>
                <div className='introduction'>
                    <div className='intro_name'>{intro_data.name}</div>
                    <div className='intro_position'>{intro_data.position}</div>
                    <div className='intro_content'>{intro_data.content}</div>
                    <div className='download'>
                        <div className='resume_button download_button' onClick={download_resume}>Resume <FontAwesomeIcon icon={faDownload}/></div>
                    </div>
                </div>
                <div className='profile_pic'>
                    <div className='download_button' onClick={download_resume}>Resume <FontAwesomeIcon icon={faDownload}/></div>
                </div>
            </div>
            <div className={window.scrollY===0 ? 'scrolldown':'scrolldown hide'}><img src={scrollDown} alt="scroll down" width='15%'></img></div>
            <div className='aboutMelayer layer fixedToTop' ref={aboutMeLayerRef}>
                <div className='aboutMe_card'>
                    <div className='aboutMe_card_img_wrapper'>
                        <div className='aboutMe_card_img'></div>
                    </div>
                    <div className='aboutMe_card_detail'>
                        <div className='aboutMe_card_tittle'>{aboutMe_data.tittle}</div>
                        <div className='aboutMe_card_content_wrapper'>
                            <div className='aboutMe_card_content'>{aboutMe_data.content}</div>
                        </div>
                    </div>
                    <Link to="/aboutMe"><div className='aboutMeLink'>{aboutMe_data.moreMe}<FontAwesomeIcon icon={faArrowRightLong} /></div></Link>
                </div>
            </div>
            <div className='trans layer' id='transid' ref ={myref3}>
            </div>
        </div>
            <div className='view2'>
                <div className='purple layer'>  
                    <div className='whole_collection'>
                        <div className='first_two_page mini_collection_wrapper'>
                            <div className='mini_collection'>
                                <div className='mini backend_mini'>
                                    <div className='mini_topic'>
                                        <span className='large_screen'>{interest_data.backend.tittle}</span>
                                        <span className='small_screen'>{interest_data.backend.short_tittle}</span>
                                    </div>
                                    <hr className='mini_divider'></hr>
                                    <div className='mini_content'>
                                        <span className='large_screen'>{interest_data.backend.content}</span>
                                        <span className='small_screen'>{interest_data.backend.short_contain}</span>
                                    </div>
                                </div>
                                <div className='mini machine_learning_mini'>
                                    <div className='mini_topic'>
                                        <span className='large_screen'>{interest_data.machine_learning.tittle}</span>
                                        <span className='small_screen'>{interest_data.machine_learning.short_tittle}</span>
                                    </div>
                                    <hr className='mini_divider'></hr>
                                    <div className='mini_content'>
                                        <span className='large_screen'>{interest_data.machine_learning.content}</span>
                                        <span className='small_screen'>{interest_data.machine_learning.short_contain}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='letterT' ref={letterT_Ref}>
                            <div className='upperline' id='upperline'></div>
                            <div className='middleline' ref={letterT_middleline_Ref}></div>
                        </div>
                        <div className='second_two_page mini_collection_wrapper'>
                            <div className='mini_collection'>
                                <div className='mini frontend_mini'>
                                    <div className='mini_topic'>
                                        <span className='large_screen'>{interest_data.frontend.tittle}</span>
                                        <span className='small_screen'>{interest_data.frontend.short_tittle}</span>
                                    </div>
                                    <hr className='mini_divider'></hr>
                                    <div className='mini_content'>
                                        <span className='large_screen'>{interest_data.frontend.content}</span>
                                        <span className='small_screen'>{interest_data.frontend.short_contain}</span>
                                    </div>
                                </div>
                                <div className='mini mobile_dev_mini'>
                                    <div className='mini_topic'>
                                        <span className='large_screen'>{interest_data.mobile_dev.tittle}</span>
                                        <span className='small_screen'>{interest_data.mobile_dev.short_tittle}</span>
                                    </div>
                                    <hr className='mini_divider'></hr>
                                    <div className='mini_content'>
                                        <span className='large_screen'>{interest_data.mobile_dev.content}</span>
                                        <span className='small_screen'>{interest_data.mobile_dev.short_contain}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='blue footer' id='blueid'>
                    <div className='myName_wrapper'>
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
                    </div>
                    <div className='main_logo'>
                        <div className='footer_logo'></div>
                    </div>
                    <div className='socials_wrapper'>
                        <div className='social_media'>
                            <div className='handle_wrapper'>
                                <div className='handle_collection'>
                                    <a href='https://www.facebook.com/sargam.tamang.7798' target='_blank' className='fb handles'></a>
                                    <a href='https://www.linkedin.com/in/sargam-tamang-9412a8189/' target='_blank' className='ln handles'></a>
                                </div>
                                <div className='handle_collection'>
                                    <a href ='https://www.instagram.com/sargam.tamang/' target='_blank' className='insta handles'></a>
                                    <a href='https://github.com/sargamtmg' target='_blank' className='git handles'></a>
                                </div>
                            </div>
                            <div className='email_address'>sargamtmg228@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;