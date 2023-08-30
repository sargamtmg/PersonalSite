import React, { useEffect, useRef, useState} from "react";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {addAxis, addDirectionallightFromFourDir} from '../utilities/helper'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader' 
import {gsap} from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";

const About_me = () => {

    const [isLoading,setIsLoading] = useState(false);

    const isAssetloaderAsyncExecutedRef = useRef(false); //to ensure assetloader load sync func to execute once in strictmode too
    const canvas_wrapperRef = useRef(null);
    const canvas_mountRef = useRef(null);
    const model = useRef(null);
    const scene = useRef(null) ;
    const assestloader = useRef(null);
    const renderer = useRef(null);

    const experience_data = {
        company_name: 'National Pen',
        designation: 'SoftWare Engineer (Full Stack Developer)',
        duration: 'Aug 2021 - Dec 2022',
        content:'Experienced in Node.js backend, API management, React-based dynamic websites, and UI/UX implementation using SCSS/JavaScript. Proficient in React component testing with Jest/Enzyme and experienced with various AWS services.'
    }

    const hobby_data = {
        main_tittle: 'More About Me',
        trek_tittle: 'Trekking',
        trek_content: 'Scenic views of glimmering mountains or mist surrounding you in the dense forest, along with the sound of snow crunching underfoot, all fascinate me. Backpack done, tying the shoe, and we are good to go.',
        dance_tittle: 'Dance and Music',
        dance_content: 'Best tools to express emotions, from soothing songs of the \'90s to catching up steps with the beats of RnB music, always put smiles on my face. Something where heart and soul unite'
    }

    useEffect(()=>{
        if(canvas_wrapperRef.current.offsetParent){
            renderer.current = new THREE.WebGLRenderer({ alpha: true });
            renderer.current.setClearColor( 0x000000, 0 );

            if(canvas_mountRef.current){
                canvas_mountRef.current.appendChild(renderer.current.domElement);
                renderer.current.setSize(canvas_mountRef.current.clientWidth,canvas_mountRef.current.clientHeight);
                renderer.current.setPixelRatio(window.devicePixelRatio);
            }

            scene.current = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight);

            const controls = new OrbitControls(camera,renderer.current.domElement);
            controls.enableZoom= false;
            controls.enableRotate = false;
            camera.position.set(-2.2,5,8.5);
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
                    model.current.scale.set(4.5,4.5,4.5);
                },
                undefined,
                (err)=>{
                    //console.log('error on modling model err:'+err);
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
                    end: 'top 10%',
                    //markers:true,
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

                gsap.to('.about_me_wrapper',{
                    backgroundColor: '#fcb41a',
                    color:'white',
                    scrollTrigger:{
                        trigger: '.hobby',
                        start: 'top 70%',
                        end: 'top 20%',
                        scrub:true,
                        //markers:true,
                    }
                });
            });
            const canvasMount = canvas_mountRef.current;
            return () =>{ 
                ctx.revert();
                if(canvasMount){
                    canvasMount.removeChild( renderer.current.domElement);
                }
            }
        }
    },[]);

    //on page refresh scroll to top
    window.onbeforeunload = function() {
        window.scrollTo(0, 0);
    };
      
    // to resize canvas and renderer accordingly(since canvas append render dom)
    window.addEventListener("resize",()=>{
        if(renderer.current && canvas_mountRef.current){
            renderer.current.setSize(canvas_mountRef.current.clientWidth,canvas_mountRef.current.clientHeight);
            //console.log('renderer size updated');
        }
    });

    //Register the mousemove event
    document.addEventListener('mousemove', onMouseMove, false);

    let rotateBackTween = null;
    let currentRotation = { x: 0, y: 0 }; // Store the current rotation values
    // Function to handle the mousemove event
    function onMouseMove(event) {
        const deltaX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const deltaY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    
        const sensitivity = 0.002;
        if(model.current){
            // Update the current rotation values based on mouse movement
            currentRotation.y += deltaX * sensitivity - deltaY * sensitivity;
            currentRotation.x += deltaY * sensitivity * 0.7;

            // Apply the updated rotation values to the model
            model.current.rotation.y = currentRotation.y;
            model.current.rotation.x = currentRotation.x;
        }

        if (rotateBackTween) {
            rotateBackTween.kill();
        }
        if(model.current){
            rotateBackTween = gsap.to(model.current.rotation, {
                x: 0,
                y: 0,
                duration: 2.5,
                ease: 'power2.out',
                onUpdate: () => {
                    // Apply the updated rotation values to the model during the tween
                    model.current.rotation.y = currentRotation.y;
                    model.current.rotation.x = currentRotation.x;
                },
            });
        }
    }


    // Disable scroll
    function disableScroll() {
        document.body.classList.add('disable-scrolling');
    }
    
    // // Enable scroll
    function enableScroll() {
        document.body.classList.remove('disable-scrolling');
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
                if(model.current){
                    model.current.scale.x+=0.2;
                    model.current.scale.y+=0.2;
                    model.current.scale.z+=0.2;
                    //console.log(model.current.scale.x);
                }
                //console.log(model.current.position.x);
            },15);

            setTimeout(()=>{
                clearInterval(animation_in_Interval);
                resolve();
            },300);
        });
    }

    const func_animate = async()=>{

        //disableScroll();

        await moving_out_animation();


        let first_model_name;
        if(model.current){
            first_model_name = model.current.name;
            if(first_model_name === 'graduation'){ //show loader picture (ie. home office) only when transition from graduation to homeoffice
                setIsLoading(true);
            }
            scene.current.remove(model.current);
        }
        let modelUrl;
        if(first_model_name==='home_office'){
            modelUrl = new URL('../assets/graduation.glb',import.meta.url);
            assestloader.current.load(modelUrl.href,async (gltf)=>{
                if(model.current){
                    model.current = gltf.scene;
                    scene.current.add(model.current);
                    model.current.name = 'graduation';
                    //model.current.scale.set(3,3,3);
                    model.current.scale.set(0,0,0);
                    // window.scrollBy({
                    //     top: -window.innerHeight * 0.3,
                    //     behavior: "smooth"
                    // });
                    await moving_in_animation();
                    model.current.scale.set(4.5,4.5,4.5);
                    //enableScroll();
                }
            },
            undefined,
            (err)=>{
                //console.log('error on modling model err:'+err);
            });
        }else{
            modelUrl = new URL('../assets/home_office.glb',import.meta.url);
            assestloader.current.load(modelUrl.href,async (gltf)=>{
                model.current = gltf.scene;
                scene.current.add(model.current);
                model.current.name = 'home_office';
                //model.current.scale.set(4.5,4.5,4.5);
                model.current.scale.set(0,0,0);
                // window.scrollBy({
                //     top: window.innerHeight * 0.6,
                //     behavior: "smooth"
                // });
                //await moving_in_animation();
                model.current.scale.set(4,4,4);
                setIsLoading(false);
                //enableScroll();
            },
            undefined,
            (err)=>{
                //console.log('error on modling model err:'+err);
            });
        }
        //await moving_in_animation();
    }

    return(
        <div className="about_me_wrapper">
            <div className='aboutme_edu_exp'>
                <div className="canvas_wrapper" ref={canvas_wrapperRef}>
                    {
                    isLoading ?
                    <div className="loader_about_me"></div>:
                    <div id='gamecanvas' className="gamecanvas" ref={canvas_mountRef}></div>
                    }
                </div>
                <div className="aboutme_detail">
                    <div className="aboutme_section_wrapper">
                        <div className="aboutme_detail_section education_section">
                            <div className="graduation_image"></div>
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
                            <div className="home_office_image"></div>
                            <div className="experience_detail_wrapper">
                                <div className="exp_header">EXPERIENCE</div>
                                <div className="exp_contain">
                                    <div className="basic_exp_content">
                                        <div className="company_title">
                                            <div className="company_logo_wrapper"><div className="company_logo"></div></div>
                                            <div className="company_name">{ experience_data.company_name }</div>
                                        </div>
                                        <div className="exp_position">{experience_data.designation}</div>
                                        <div className="exp_duration">{experience_data.duration}</div>
                                    </div>
                                    <div className="my_role">{experience_data.content}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hobby">
                <div className="hobby_wrapper">
                    <div className="hobby_main_heading">{hobby_data.main_tittle}</div>
                    <div className="trek_wrapper section_wrapper">
                        <div className="trek_img_wrapper img_wrapper">
                            <div className="trek_img hobby_img"></div>
                            <div className="trek_img2 hobby_img"></div>
                            <div className="trek_img3 hobby_img"></div>
                        </div>
                        <div className="trek_content hobby_content">
                            <div className="content_tittle">{hobby_data.trek_tittle}</div>
                            <div className="content">{hobby_data.trek_content}</div>
                        </div>
                    </div>
                    <div className="dance_wrapper section_wrapper">
                        <div className="dance_img_wrapper img_wrapper">
                            <div className="dance_img hobby_img"></div>
                            <div className="dance_img2 hobby_img"></div>
                            <div className="dance_img3 hobby_img"></div>
                        </div>
                        <div className="dance_content hobby_content">
                            <div className="content_tittle">{hobby_data.dance_tittle}</div>
                            <div className="content">{hobby_data.dance_content}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default About_me;