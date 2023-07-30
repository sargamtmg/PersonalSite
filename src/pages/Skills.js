import React,{useEffect} from 'react';
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
import {motion} from 'framer-motion';
import scrollDown from '../img/logo/scroll_down.png';
import SkillCard from './page_components/SkillCard';
import SoftSkillCard from './page_components/SoftSkillCard';
import HTML_logo from '../img/skill/HTML.png';
import CSS_logo from '../img/skill/CSS.png';
import Sass_logo from '../img/skill/Sass.png';
import Node_logo from '../img/skill/node.png';
import React_logo from '../img/skill/react.png';
import Git_logo from '../img/skill/Git.png';
import JS_logo from '../img/skill/JS.png';
import AWS_logo from '../img/skill/AWS.png';
import MongoDB_logo from '../img/skill/mongoDB.png';
import MySQL_logo from '../img/skill/mySQL.png';
import Cpp_logo from '../img/skill/Cpp.png';
import Java_logo from '../img/skill/Java.png';
import Three_logo from '../img/skill/Three.png';
import Jest_logo from '../img/skill/Jest.png';
import VSCode_logo from '../img/skill/VSCode.png';
import Postman_logo from '../img/skill/postman.png'


const Skill = () => {

    gsap.registerPlugin(ScrollTrigger);

    useEffect(()=>{
        let ctx = gsap.context(()=>{

            var card1_back_scrollTrigger = {
                trigger: '.card2_section',
                start: 'top 100%',
                end: 'top -82%',
                //markers:true,
                scrub: true,
                toggleActions: 'play pause reverse none',
            }
            var both_card1_2_back_scrollTrigger = {
                trigger: '.card3_section',
                start: 'top 100%',
                end: 'top 7%',
                //markers:true,
                scrub: true,
                toggleActions: 'play pause reverse none',
            }

            //Card1 goes back
            gsap.to('.card1',
                {
                    y: '-15vh',
                    scale: 0.8,
                    scrollTrigger:card1_back_scrollTrigger
            });

            //Card2 both goes back
            gsap.to('.card2',
                {
                    y: '-8vh',
                    scale:0.9,
                    scrollTrigger: both_card1_2_back_scrollTrigger
            });

            var pin_card1 = Object.assign({}, card1_back_scrollTrigger, {pin:'.card1'});
            let pin_card2 = Object.assign({}, both_card1_2_back_scrollTrigger, {pin:'.card2'});

            //just to pin card 1
            ScrollTrigger.create(
                pin_card1
            );
            ScrollTrigger.create(
                pin_card2
            );
        });
        return () => ctx.revert();
    },[]);

    const skill_list = [
        {
        heading:'',
        lists:[
        {
            img_url:HTML_logo,
            name:'HTML'
        },
        {
            img_url:CSS_logo,
            name:'CSS'
        },
        {
            img_url:Sass_logo,
            name:'SASS'
        },
        {
            img_url:React_logo,
            name:'React'
        },
        {
            img_url:Node_logo,
            name:'Node JS'
        },
        {
            img_url:Git_logo,
            name:'Git'
        },
        {
            img_url:AWS_logo,
            name:'AWS'
        },
        {
            img_url: MongoDB_logo,
            name:'MongoDB'
        },
        {
            img_url:MySQL_logo,
            name:'MySQL'
        },
        ]
    }];
    const Programming_list = [
        {
        heading:'Programming Languages',
        lists:[
            {
            img_url:JS_logo,
            name:'Javascript'
            },
            {
                img_url:Cpp_logo,
                name:'C++'
            },
            {
                img_url:Java_logo,
                name:'Java'
            }
            ]
        },
        {
        heading:'Other skill',
        lists:[
            {
                img_url:Three_logo,
                name:'Three js'
            },
            {
                img_url:Jest_logo,
                name:'Jest'
            },
            {
                img_url:VSCode_logo,
                name:'VS Code'
            },
            {
                img_url:Postman_logo,
                name:'Postman'
            }
            ]
        },
    ];
    const softskill_list = [
        {
        heading:'',
        lists:[
            'Communication',
            'Collaborations',
            'Effective time management',
            'Acquaintance with Agile principles and practices',
            'familiar with Jira for project management'
            ]
        }
    ];

    window.addEventListener('scroll', ()=>{
        let scrollIcon = document.querySelector('.scrolldown');
        window.scrollY===0 ? scrollIcon.classList.remove('hide') : scrollIcon.classList.add('hide');

    });

    //on page refresh scroll to top
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };

    return(
        <motion.div 
            className="skill_wrapper"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 0.5 }}
            >
            <div className={window.scrollY===0 ? 'scrolldown':'scrolldown hide'}><img src={scrollDown} alt="scroll down" width='15%'></img></div>
            <div className="card1_section">
                <SkillCard list={skill_list} card_heading='Professional Skills' identifier='card1'/>
            </div>
            <div className="card2_section">
                <SkillCard list={Programming_list} card_heading='Some More Skills' identifier='card2'/>
            </div>
            <div className="card3_section">
                <SoftSkillCard list={softskill_list} card_heading='Soft Skills' identifier='card3'/>
            </div>
        </motion.div>
    );
}

export default Skill;