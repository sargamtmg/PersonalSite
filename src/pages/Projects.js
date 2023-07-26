import React, { useEffect, useRef, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import ProjectSelector from "./page_components/ProjectSelector";
import * as THREE from 'three';
import { DoubleSide } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; 
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
//import * as dat from 'dat.gui'
import {gsap} from 'gsap';
import wall_texture from '../img/project/hd_wall2.jpg';
import intercodeImg from '../img/project/intercode.png';
import textRecogImg from '../img/project/text_recog.jpg';

const Projects = () => {

    const canvasRef =useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const sceneRef = useRef(null);
    const orbitRef = useRef(null);
    const assestloader = useRef(null);

    const [isModalOpen,setisModalOpen] = useState(false);
    const selectedObjRef = useRef(null);
    const initialSelectedPosRef = useRef(null);
    const isAssetloaderAsyncExecutedRef = useRef(false);
    const img1 = useRef(null);
    const img2 = useRef(null);
    const img3 = useRef(null);

    const projectArray = [
        {
            name:'intercode',
            image: intercodeImg
        },
        {
            name:'text_recog',
            image: textRecogImg
        },
        {
            name:'city_event',
            image: textRecogImg
        }
    ];


    // const axeshelper = new THREE.AxesHelper(10);
    // scene.add(axeshelper);


    // Ray caster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const loadPictureFrame = async(imgRef)=>{
        let modelUrl = new URL('../assets/frame_final_2.glb',import.meta.url);
        assestloader.current.load(modelUrl.href,async (gltf)=>{
            let model = gltf.scene;
            model.position.set(0,-3.6,-0.15);
            sceneRef.current.add(model);
            imgRef.current.add(model);
        },
        undefined,
        (err)=>{
            console.log('error on modling model err:'+err);
        });
    }

    useEffect(()=>{
        console.log('useeffect in');
        rendererRef.current = new THREE.WebGLRenderer();
        rendererRef.current.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);


        sceneRef.current = new THREE.Scene();
        sceneRef.current.background = new THREE.Color(0xffffff);

        let texture = new THREE.TextureLoader().load(wall_texture);

        const geowall = new THREE.PlaneGeometry(60,40);
        const matwall = new THREE.MeshStandardMaterial({color:'#ffffff', side:DoubleSide, map:texture});
        const wall = new THREE.Mesh(geowall,matwall);
        sceneRef.current.add(wall);

        
        let intercodeTexture = new THREE.TextureLoader().load(intercodeImg);
        let textRecogTexture = new THREE.TextureLoader().load(textRecogImg);

        const image_plane_geo = new THREE.PlaneGeometry(4.5,7);
        const mat_img = new THREE.MeshStandardMaterial({color:'#ffffff',map:intercodeTexture});
        img1.current = new THREE.Mesh(image_plane_geo,mat_img);
        img1.current.position.set(-10,2,0.4);
        img1.current.name='image_frame';
        img1.current.userData.name = 'intercode';
        sceneRef.current.add(img1.current);

        const image_plane_geo2 = new THREE.PlaneGeometry(4.5,7);
        const mat_img2 = new THREE.MeshStandardMaterial({color:'#ffffff',map:textRecogTexture});
        img2.current = new THREE.Mesh(image_plane_geo2,mat_img2);
        img2.current.position.set(0,2,0.4);
        img2.current.name='image_frame';
        img2.current.userData.name = 'text_recog';
        sceneRef.current.add(img2.current);

        const image_plane_geo3 = new THREE.PlaneGeometry(3,3);
        const mat_img3 = new THREE.MeshStandardMaterial({color:'#ffffff',map:texture});
        img3.current = new THREE.Mesh(image_plane_geo3,mat_img3);
        img3.current.position.set(10,2,0.4);
        img3.current.name='image_frame';
        img3.current.userData.name = 'city_event';
        sceneRef.current.add(img3.current);

        const spotLight = new THREE.SpotLight(0xffffff,1.4,0,0.2,0.2,0);
        sceneRef.current.add(spotLight);
        spotLight.position.set( -10, -24, 3 );
        spotLight.target = img1.current;

        // const spotHelper = new THREE.SpotLightHelper(spotLight,0xff00ff);
        // sceneRef.current.add(spotHelper);

        const spotLight2 = new THREE.SpotLight(0xffffff,1.4,0,0.2,0.2,0);
        sceneRef.current.add(spotLight2);
        spotLight2.position.set( 0, -24, 3 );
        spotLight2.target = img2.current;

        const spotLight3 = new THREE.SpotLight(0xffffff,1.4,0,0.2,0.2,0);
        sceneRef.current.add(spotLight3);
        spotLight3.position.set( 10, -24, 3 );
        spotLight3.target = img3.current;

        const ambientlight = new THREE.AmbientLight(0xffffff,0.3);
        sceneRef.current.add(ambientlight);

        // const gui = new dat.GUI();
        // //gui.domElement.id = 'gui';

        // const options = {
        //     pointLightColor : '#ffa500',
        //     pointIntensity : 1,
        //     color: '#0000ff',
        //     intensity: 1,
        //     distance:1,
        //     angle: Math.PI/2,
        //     penumbra: 2,
        //     decay: 1,
        //     ypos:0
        // }

        // gui.addColor(options, 'color').onChange((e) => {
        //     spotLight.color.set(e);
        //   });
          
        //   gui.add(options, 'intensity', 0, 20).onChange((e) => {
        //     spotLight.intensity = e;
        //   });
          
        //   gui.add(options, 'distance', 0, 20).onChange((e) => {
        //     spotLight.distance = e;
        //   });
          
        //   gui.add(options, 'angle', 0, Math.PI / 2).onChange((e) => {
        //     spotLight.angle = e;
        //   });
          
        //   gui.add(options, 'penumbra', 0, 20).onChange((e) => {
        //     spotLight.penumbra = e;
        //   });
          
        //   gui.add(options, 'decay', 0, 20).onChange((e) => {
        //     spotLight.decay = e;
        //   });
        //   gui.add(options, 'ypos', -20, 20).onChange((e) => {
        //     spotLight.position.y = e;
        //   });

        assestloader.current = new GLTFLoader();

        const loadmodels = async()=>{
            await loadPictureFrame(img1);
            await loadPictureFrame(img2);
            await loadPictureFrame(img3);
            console.log('loading loop complete');
        }
        if(!isAssetloaderAsyncExecutedRef.current){
            loadmodels();
            isAssetloaderAsyncExecutedRef.current = true;  // Since useeffect run twice, it prevent this async run to run twice
        }

        cameraRef.current = new THREE.PerspectiveCamera(65,window.innerWidth/ window.innerHeight);
        orbitRef.current = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        orbitRef.current.enableZoom = false;
        orbitRef.current.enableRotate = false;

        cameraRef.current.position.set(0,0,20);
        orbitRef.current.update();

        const light = new THREE.DirectionalLight(0xFFFFFF,0.5);
        light.position.set(0,4,200);
        sceneRef.current.add(light);
        // const helper = new THREE.DirectionalLightHelper( light, 10 );
        // sceneRef.current.add( helper );

        canvasRef.current.appendChild(rendererRef.current.domElement);

        const animate =()=>{
            rendererRef.current.render(sceneRef.current,cameraRef.current);
        }
        rendererRef.current.setAnimationLoop(animate);

        window.addEventListener('resize',resizeRenderer);

        const canvasMount = canvasRef.current;

        return ()=>{
            if(canvasMount){
                canvasMount.removeChild(rendererRef.current.domElement);
            }
            window.removeEventListener('resize',resizeRenderer);
        }
    },[]);

    const resizeRenderer = ()=>{
        let newWidth = canvasRef.current.clientWidth;
        let newHeight = canvasRef.current.clientHeight;
        if(rendererRef.current && cameraRef.current){
            rendererRef.current.setSize(newWidth, newHeight);

            // Update camera aspect ratio
            cameraRef.current.aspect = newWidth / newHeight;
            cameraRef.current.updateProjectionMatrix();
        }
    }

    const checkObjClicked = (event) =>{
        if(!isModalOpen){
            // const canvas = document.getElementById('demo');
            // const dim = canvas.getBoundingClientRect();
            // console.log(dim.top);
            pointer.x = ( (event.clientX-rendererRef.current.domElement.offsetLeft) / rendererRef.current.domElement.width ) * 2 - 1;
            pointer.y = - ( (event.clientY-rendererRef.current.domElement.offsetTop) / rendererRef.current.domElement.height ) * 2 + 1;
            console.log(event.clientY);
            console.log(window.innerHeight);
        
            // update the picking ray with the camera and pointer position
            raycaster.setFromCamera( pointer, cameraRef.current );
        
            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects( sceneRef.current.children );
            //const intersects = raycaster.intersectObject(Object.values(loadedModels),true);
            if(intersects.length){
                for(let i=0;i<intersects.length;i++){
                    console.log(intersects.length);
                    if(intersects[i].object.name==='image_frame'){
                        //intersects[i].object.material.color.set(0x267070);
                        const obj = intersects[i].object;
                        selectedObjRef.current=obj;
                        console.log('project name: '+selectedObjRef.current.userData.name)
                        initialSelectedPosRef.current = selectedObjRef.current.position.clone();
                        let camerapos = cameraRef.current.position.clone();

                        //console.log('end camera quaternion + '+camera.x+' '+camera.y+' '+camera.z+''+camera.w);
                        gsap.to(selectedObjRef.current.position,{
                            duration: 0.6,
                            x:camerapos.x-4,
                            y: camerapos.y,
                            z:camerapos.z-10,
                            onUpdate: ()=>{
                                selectedObjRef.current.lookAt(camerapos.x-4,camerapos.y,camerapos.z-2);
                            },
                            onComplete: ()=>{
                                openModal();
                            }
                        });
                    }
                }
                //camera.position.set(obj.position.x,obj.position.y+1,obj.position.z+3);
            }
        }
        else{
            closeModal();
        }
    }

    const openModal = ()=>{
        console.log('modal should be open');
        setisModalOpen(true);
        orbitRef.current.enabled = false;
    }
    
    const closeModal = () =>{
        console.log('modal should be close');
        setisModalOpen(false);
        if(selectedObjRef.current && initialSelectedPosRef.current)
        {
            gsap.to(selectedObjRef.current.position,{
                duration: 0.6,
                x: initialSelectedPosRef.current.x,
                y: initialSelectedPosRef.current.y,
                z: initialSelectedPosRef.current.z,
                onComplete: () => {
                    orbitRef.current.enabled = true; // Enable orbitRef.currentControls after the animation is complete
                  }
            });
        }
    }

    return(
        <>
            <div className='project_canvas' ref={canvasRef} onClick={checkObjClicked}></div>
            {
                isModalOpen &&
                <div className="modal">
                    <div className="modal_content_wrapper">
                        <FontAwesomeIcon icon={faXmark} className="cross" onClick={closeModal}/>
                        <ProjectSelector project_name={selectedObjRef.current.userData.name} className='Project_content'/>
                    </div>
                 </div>
            }
            <div className="project_canvas_mobile">
                {                    
                    projectArray.map((data) => (
                      <div key={data.name} className="project_detail">
                        <img className="project_image_mobile" src={data.image} alt={data.name} />
                        <ProjectSelector className="project_contain" project_name={data.name} />
                        <hr className="horizontal_break_project"/>
                      </div>
                    ))
                }
            </div>
        </>
    );
}

export default Projects;