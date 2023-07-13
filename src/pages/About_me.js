import React,{useEffect} from "react";
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

const About_me = () => {
    gsap.registerPlugin(ScrollTrigger);

    useEffect(()=>{
        console.log('useEffect on main page');
        let ctx = gsap.context(()=>{

            gsap.to('.school_logo',{
                height:0,
                scrollTrigger:{
                    trigger: '.secondary_detail',
                    start: 'top 50%',
                    end: 'top 40%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            gsap.to('.secondary_logo',{
                height:0,
                scrollTrigger:{
                    trigger: '.college_detail',
                    start: 'bottom 50%',
                    end: 'top 40%',
                    markers:true,
                    scrub: true,
                    toggleActions: 'play pause reverse none',
                }
            });

            gsap.to('.detail_content',{
                y: '-52vh',
                scrollTrigger:{
                    trigger: '.education_screen',
                    start: 'bottom 100%',
                    end: 'bottom -100%',
                    markers:true,
                    scrub: true,
                    pin: true,
                    toggleActions: 'play pause reverse none',
                }
            });

        });
        return () => ctx.revert();
    },[]);

    return(
        <>
        <div className="education_screen">
            <span className="heading">Education</span>
            <div className="edu_wrapper">
                <div className="edu_symbol"></div>
                <div className="edu_logo_section">
                    <div className="college_logo edu_logo"></div>
                    <div className="secondary_logo edu_logo"></div>
                    <div className="school_logo edu_logo"></div>
                </div>
                <div className="edu_detail_section">
                    <div className="detail_content">
                        <div className="blank_detail"></div>
                        <div className="school_detail edu_detail">
                            <span className="date">2014</span>
                            <span className="org_name">Gloal collegiate school</span>
                            <span className="location">-Pokhara, Nepal</span>
                        </div>
                        <div className="secondary_detail edu_detail">
                            <span className="date">2016</span>
                            <span className="org_name">Gloal collegiate higher secondary school</span>
                            <span className="faculty">Science Faculty</span>
                            <span className="location">-Pokhara, Nepal</span>
                        </div>
                        <div className="college_detail edu_detail">
                            <span className="date">2017-2021</span>
                            <span className="org_name">Motilal Nehru Nation Institute of Technology</span>
                            <span className="faculty">Computer science and engineering department</span>
                            <span className="location">-Prayagraj, India</span>
                        </div>
                        <div className="blank_detail"></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="work_screen">
            <div className="work_wrapper">
                <div className="logo_description">
                    <div className="company_logo"><img src="../img/edu_logo/nationalpen_logo.png"></img></div>
                    <div className="company_description"></div>
                </div>
                <div className="experience_responsibility"></div>
            </div>
        </div>
        <div className="skill_screen"></div>
        </>
    );
}

export default About_me;