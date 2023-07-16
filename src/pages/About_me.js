import React, { useEffect} from "react";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {addAxis, addDirectionallightFromFourDir} from '../utilities/helper'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader' 
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

//use of set to avoid model load at same location which also prevent from multiple loading -
//of same model in same place which make less add of models causing better performance cause scene has less models.


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0x000000, 0 );
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight);
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableZoom= false;
camera.position.set(2,4,6);
controls.update();

// const plane = new THREE.PlaneGeometry(20,20);
// const mat = new THREE.MeshBasicMaterial({color:0xffffff});
// const planemesh = new THREE.Mesh(plane,mat);
// planemesh.name = 'plane';
// planemesh.rotateX(-Math.PI/2);
// planemesh.visible = true;
// scene.add(planemesh);

scene.add(new THREE.DirectionalLight(0xFFFFFF,1));
addDirectionallightFromFourDir(scene);

//addAxis(scene);
//addGrid(scene,20);


const assestloader = new GLTFLoader();
//let mixer;
const animate=()=>{
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);

const About_me = () => {

    useEffect(()=>{
        const gamecanvas = document.getElementById('gamecanvas');
        gamecanvas.appendChild(renderer.domElement);
        // let modelUrl = new URL('../assets/home_office_change.glb',import.meta.url);
        let modelUrl = new URL('../assets/graduation_animation_correction.glb',import.meta.url);
        assestloader.load(modelUrl.href,async (gltf)=>{
            const model = gltf.scene;
            scene.add(model);
            model.name = 'home_office';
            model.scale.set(2.5,2.5,2.5);
        },
        undefined,
        (err)=>{
            console.log('error on modling model err:'+err);
        });
        let canvas = document.querySelector('.gamecanvas').getBoundingClientRect();
        renderer.setSize(canvas.width,canvas.height);
        renderer.setPixelRatio(window.devicePixelRatio);

        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(()=>{

            var model_scrollTrigger = {
                trigger: '.experience_section',
                start: 'top 99.8%',
                end: 'top -82%',
                markers:true,
                //scrub: true,
                pin:'.canvas_wrapper'
                //toggleActions: 'play pause reverse none',
            }
            ScrollTrigger.create(
                model_scrollTrigger
            );
        });
        return () =>{ 
            ctx.revert();
        }
    },[]);
    return(
        <div className='aboutme_wrapper'>
            <div className="canvas_wrapper">
                <div id='gamecanvas' className="gamecanvas"></div>
            </div>
            <div className="aboutme_detail">
                <div className="aboutme_section_wrapper">
                    <div className="aboutme_detail_section education_section">
                        <div className="edu_detail">
                            <div className="edu_header">EDUCATION</div>
                            <div className="edu_contain">
                                <div className="edu_detail_wrapper">
                                    <div className="timeline college_timeline">2017-2021</div>
                                    <div className="edu_detail_name_faculty college_detail">
                                        <div className="edu_name college_name">NIT- Allahabad<br></br>(Motilal Nehru National Institute of Technology)</div>
                                        <div className="edu_faculty college_faculty">Computer Science and engineering</div>
                                    </div>
                                </div>
                                <div className="edu_detail_wrapper">
                                    <div className="timeline higher_timeline">2016</div>
                                    <div className="edu_detail_name_faculty higher_detail">
                                        <div className="edu_name higher_name">Global Collegiate Higher Sceondary School</div>
                                        <div className="edu_faculty higher_faculty">science faculty</div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                    <div className="aboutme_detail_section experience_section">
                        <div className="experience_detail_wrapper">
                            <div className="exp_header">EXPERIENCE</div>
                            <div className="exp_contain">
                                <div className="basic_exp_content">
                                    <div className="company_title">
                                        <div className="company_logo_wrapper"><div className="company_logo"></div></div>
                                        <div className="company_name">National Pen</div>
                                    </div>
                                    <div className="exp_position">Software Engineer (Full Stack Developer)</div>
                                    <div className="exp_duration">Aug 2021 - Dec 2022</div>
                                </div>
                                <div className="my_role">Experienced in Node.js backend development, API management, UI/UX implementation, and dynamic website development using React, CSS, and JavaScript. Skilled in problem-solving, root cause analysis, and troubleshooting to resolve order-related technical issues. Proficient in Jest and Enzyme for comprehensive React component testing</div>
                            </div>
                        </div>
                    </div>
                    <div className="aboutme_detail_section more_section"></div>
                </div>
            </div>
        </div>
    ); 
}

export default About_me;