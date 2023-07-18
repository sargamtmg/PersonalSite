import React, { useEffect, useRef} from "react";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {addAxis, addDirectionallightFromFourDir} from '../utilities/helper'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader' 
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

const About_me = () => {

    const isAssetloaderAsyncExecutedRef = useRef(false); //to ensure assetloader load sync func to execute once in strictmode too
    const canvas_mountRef = useRef(null);

    const model = useRef(null);

    const scene = useRef(null) ;
    const assestloader = useRef(null);
    const renderer = useRef(null);

    useEffect(()=>{
        renderer.current = new THREE.WebGLRenderer({ alpha: true });
        renderer.current.setClearColor( 0x000000, 0 );

        canvas_mountRef.current.appendChild(renderer.current.domElement);
        renderer.current.setSize(canvas_mountRef.current.clientWidth,canvas_mountRef.current.clientHeight);
        renderer.current.setPixelRatio(window.devicePixelRatio);

        scene.current = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight);

        const controls = new OrbitControls(camera,renderer.current.domElement);
        controls.enableZoom= false;
        controls.enableRotate = false;
        camera.position.set(0,4.5,9);
        controls.update();

        scene.current.add(new THREE.DirectionalLight(0xFFFFFF,1));
        addDirectionallightFromFourDir(scene.current);

        //addAxis(scene);
        //addGrid(scene,20);

        assestloader.current = new GLTFLoader();

        let modelUrl = new URL('../assets/graduation.glb',import.meta.url);
        if(!isAssetloaderAsyncExecutedRef.current){
            assestloader.current.load(modelUrl.href,async (gltf)=>{
                model.current = gltf.scene;
                scene.current.add(model.current);
                model.current.name = 'graduation';
                model.current.scale.set(4,4,4);
            },
            undefined,
            (err)=>{
                console.log('error on modling model err:'+err);
            });
            isAssetloaderAsyncExecutedRef.current = true;   // Since useeffect run twice, it prevent this async run to run twice
        }

        const animate=()=>{
            renderer.current.render(scene.current,camera);
        }
        renderer.current.setAnimationLoop(animate);

        gsap.registerPlugin(ScrollTrigger);

        let ctx = gsap.context(()=>{

            var model_scrollTrigger = {
                trigger: '.experience_section',
                start: 'top 99.8%',
                end: 'top -82%',
                //markers:true,
                //scrub: true,
                pin:'.canvas_wrapper'
                //toggleActions: 'play pause reverse none',
            }
            ScrollTrigger.create(
                model_scrollTrigger
            );

            ScrollTrigger.create({
                trigger:'.experience_section',
                start:'top 75%',
                end:'top 70%',
                //markers: true,
                onEnter: func_animate,
                onEnterBack: func_animate
            });
        });
        const canvasMount = canvas_mountRef.current;
        return () =>{ 
            ctx.revert();
            if(canvasMount){
                canvasMount.removeChild( renderer.current.domElement);
            }
        }
    },[]);

    //on page refresh scroll to top
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
      
    // to resize canvas and renderer accordingly(since canvas append render dom)
    window.addEventListener("resize",()=>{
        if(renderer.current){
            renderer.current.setSize(canvas_mountRef.current.clientWidth,canvas_mountRef.current.clientHeight);
            console.log('renderer size updated');
        }
    });

    // Register the mousemove event
    document.addEventListener('mousemove', onMouseMove, false);

    let rotateBackTween = null;
    // Function to handle the mousemove event
    function onMouseMove(event) {
        const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    
        const sensitivity = 0.002;
        if(model.current){
            model.current.rotation.y += deltaX * sensitivity -deltaY * sensitivity;
            model.current.rotation.x += deltaY * sensitivity * 0.7;
        }

        if (rotateBackTween) {
            rotateBackTween.kill();
        }
        
        rotateBackTween = gsap.to(model.current.rotation, {
            x: 0,
            y: 0,
            duration: 2.5,
            ease: 'power2.out',
        });
    }

    // Disable scroll
    function disableScroll() {
        document.body.classList.add('stopScroll');
    }
    
    // // Enable scroll
    function enableScroll() {
        document.body.classList.remove('stopScroll');
    }

    const moving_out_animation = ()=>{
        return new Promise((resolve)=>{
            let animation_out_Interval = setInterval(()=>{
                if(model.current)
                    model.current.position.x-=2;
            },25);

            setTimeout(()=>{
                clearInterval(animation_out_Interval);
                resolve();
            },200);
        });
    }

    const moving_in_animation = async ()=>{
        return new Promise((resolve)=>{
            let animation_in_Interval = setInterval(()=>{
                model.current.scale.x+=0.2;
                model.current.scale.y+=0.2;
                model.current.scale.z+=0.2;
                console.log(model.current.scale.x);
                //console.log(model.current.position.x);
            },20);

            setTimeout(()=>{
                clearInterval(animation_in_Interval);
                resolve();
            },400);
        });
    }

    const func_animate = async()=>{

        disableScroll();

        await moving_out_animation();

        let first_model_name;
        if(model.current){
            first_model_name = model.current.name;
            scene.current.remove(model.current);
        }
        let modelUrl;
        if(first_model_name==='home_office'){
            modelUrl = new URL('../assets/graduation.glb',import.meta.url);
            assestloader.current.load(modelUrl.href,async (gltf)=>{
                model.current = gltf.scene;
                scene.current.add(model.current);
                model.current.name = 'graduation';
                //model.current.scale.set(3,3,3);
                model.current.scale.set(0,0,0);
                window.scrollBy({
                    top: -window.innerHeight * 0.3,
                    behavior: "smooth"
                });
                await moving_in_animation();
                model.current.scale.set(4,4,4);
                enableScroll();
            },
            undefined,
            (err)=>{
                console.log('error on modling model err:'+err);
            });
        }else{
            modelUrl = new URL('../assets/home_office.glb',import.meta.url);
            assestloader.current.load(modelUrl.href,async (gltf)=>{
                model.current = gltf.scene;
                scene.current.add(model.current);
                model.current.name = 'home_office';
                //model.current.scale.set(4.5,4.5,4.5);
                model.current.scale.set(0,0,0);
                window.scrollBy({
                    top: window.innerHeight * 0.3,
                    behavior: "smooth"
                });
                await moving_in_animation();
                model.current.scale.set(4,4,4);
                enableScroll();
            },
            undefined,
            (err)=>{
                console.log('error on modling model err:'+err);
            });
        }
        //await moving_in_animation();
    }

    return(
        <div className='aboutme_wrapper'>
            <div className="canvas_wrapper">
                <div id='gamecanvas' className="gamecanvas" ref={canvas_mountRef}></div>
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