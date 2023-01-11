import React, { useEffect } from "react";
import * as THREE from 'three';
import { DoubleSide } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'; 
import {gsap} from 'gsap';

const Projects = () => {

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfff000);
    const geowall = new THREE.PlaneGeometry(25,25);
    const matwall = new THREE.MeshBasicMaterial({color: 0xFF00FF, side:DoubleSide});
    const wall = new THREE.Mesh(geowall,matwall);
    wall.rotateX(22/14);
    scene.add(wall);

    const geo = new THREE.BoxGeometry(2,2);
    const mat = new THREE.MeshStandardMaterial({color: 0x0000FF});
    const cube = new THREE.Mesh(geo,mat);
    cube.position.set(-10,0,0);
    scene.add(cube);

    const cube2 = new THREE.Mesh(geo,mat);
    cube2.position.set(0,0,0);
    scene.add(cube2);

    const cube3 = new THREE.Mesh(geo,mat);
    cube3.position.set(10,0,0);
    scene.add(cube3);

    const camera = new THREE.PerspectiveCamera(65,window.innerWidth/ window.innerHeight);
    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.set(0,5,20);
    orbit.update();

    const light = new THREE.DirectionalLight(0xFFFFFF,1);
    light.position.set(0,5,2);
    scene.add(light);

    // const axeshelper = new THREE.AxesHelper(10);
    // scene.add(axeshelper);

    // Ray caster
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const movePointer = (event) =>{
        const canvas = document.getElementById('demo');
        const dim = canvas.getBoundingClientRect();
        console.log(dim.top);
        pointer.x = ( (event.clientX-renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
	    pointer.y = - ( (event.clientY-renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;
        console.log(event.clientY);
        console.log(window.innerHeight);
    
        // update the picking ray with the camera and pointer position
        raycaster.setFromCamera( pointer, camera );
    
        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children );
        if(intersects.length){
            for(let i=0;i<intersects.length;i++){
                console.log(intersects.length);
                console.log(intersects[i].object.geometry.type);
                if(intersects[i].object.geometry.type === 'BoxGeometry'){
                    intersects[i].object.material.color.set(0x267070);
                    const obj = intersects[i].object;
                    gsap.to(camera.position,{
                        duration: 1,
                        x:obj.position.x,
                        y:obj.position.y+1,
                        z:obj.position.z+4,
                        onUpdate: ()=>{
                            camera.lookAt(obj.position);
                        }
                    });
                }
            }
            //camera.position.set(obj.position.x,obj.position.y+1,obj.position.z+3);
        }
    }
    

    const animate =()=>{
        renderer.render(scene,camera);
    }
    renderer.setAnimationLoop(animate);

    useEffect(()=>{
        document.getElementById('demo').appendChild(renderer.domElement);
        console.log('it is done');
    });

    return(
        <>
            <h1>Projects page</h1>
            <div id='demo' onClick={movePointer}></div>
        </>
    );
}

export default Projects;