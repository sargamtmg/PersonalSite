import React, { useEffect, useState } from "react";
import * as THREE from 'three';
import { DoubleSide } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {addAxis, addGrid} from '../utilities/helper'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader' 

//use of set to avoid model load at same location which also prevent from multiple loading -
//of same model in same place which make less add of models causing better performance cause scene has less models.
const occupiedLocation = new Set();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(65,window.innerWidth/window.innerHeight);
const controls = new OrbitControls(camera,renderer.domElement);
camera.position.set(0,6,20);
controls.update();

const plane = new THREE.PlaneGeometry(20,20);
const mat = new THREE.MeshBasicMaterial({color:0xffffff});
const planemesh = new THREE.Mesh(plane,mat);
planemesh.name = 'plane';
planemesh.rotateX(-Math.PI/2);
planemesh.visible = false;
scene.add(planemesh);

const geohightlight = new THREE.PlaneGeometry(1,1);
const mathigh = new THREE.MeshStandardMaterial({color:0xFFFFFF, side:DoubleSide});
const hightlight = new THREE.Mesh(geohightlight,mathigh);
hightlight.rotateX(-Math.PI/2);
hightlight.position.set(0.5,0,0.5);
scene.add(hightlight);

scene.add(new THREE.DirectionalLight(0xFFFFFF,1));
const d1 = new THREE.DirectionalLight(0xFFFFFF,1);
const d2 = new THREE.DirectionalLight(0xFFFFFF,1);
const d3 = new THREE.DirectionalLight(0xFFFFFF,1);
const d4 = new THREE.DirectionalLight(0xFFFFFF,1);

d1.position.set(0,30,30);
d2.position.set(30,30,0);
d3.position.set(0,30,-30);
d4.position.set(-30,30,0);
scene.add(d1);
scene.add(d2);
scene.add(d3);
scene.add(d4);

addAxis(scene);
addGrid(scene,20);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
var hightlightpos = new THREE.Vector3();
let intersects;
const mousemove=(event)=>{
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
    pointer.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
    raycaster.setFromCamera(pointer,camera);
    intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length){
        for(let i=0;i<intersects.length;i++){
            if(intersects[i].object.name === 'plane'){
                hightlightpos = new THREE.Vector3().copy(intersects[i].point).floor().addScalar(0.5);
                //console.log(hightlightpos);
                hightlight.position.set(hightlightpos.x,0,hightlightpos.z);
            }
        }
    }

}

const con = new THREE.ConeGeometry(0.5,1);
const matcon = new THREE.MeshStandardMaterial({color:0xff00ff});
const cone = new THREE.Mesh(con,matcon);
cone.name = 'cone';

const boxgeo = new THREE.BoxGeometry(1,1);
const matbox = new THREE.MeshStandardMaterial({color:0xff00ff});
const box = new THREE.Mesh(boxgeo,matbox);
box.name = 'box';

const assestloader = new GLTFLoader();
// const modelURL = new URL('../assets/'+meshselected+'.glb',import.meta.url);
// assestloader.load(modelURL,(gltf)=>{
//     meshs = gltf.scene;
// },
// {},
// (err)=>{
//     console.log('error on modling model err:'+err);
// });

let meshs;
const mousedown = (setCoin)=>{
    console.log('mouse down');
    if(intersects && intersects.length){
        console.log('intersects :' + intersects.length);

        //stringifing array because set treat array with of same value as different because their reference is different
        let temp = JSON.stringify([hightlightpos.x,hightlightpos.y,hightlightpos.z]);
        console.log(occupiedLocation.has(temp));
        if(!occupiedLocation.has(temp)){
            for(let i=0;i<intersects.length;i++){
                if(intersects[i].object.name === 'plane'){
                    if(meshs){
                        occupiedLocation.add(temp);
                        console.log('location '+ JSON.stringify(hightlightpos));
                        console.log('set size :'+occupiedLocation.size);
                        console.log('meshs : '+meshs.name);
                        meshs = meshs.clone();
                        meshs.scale.set(1,1,1);
                        meshs.position.copy(hightlightpos);
                        scene.add(meshs);
                        console.log(meshs.name);

                        //update coin point
                        localStorage.setItem('coin',localStorage.getItem('coin')-100);
                        setCoin(localStorage.getItem('coin'));

                        return;
                    }
                }
            }
        }
    }
}

const animate=()=>{
    renderer.render(scene,camera);
}
renderer.setAnimationLoop(animate);

const Game = () => {
    const [meshselected,setmeshselect]= useState(null);
    const [coinCount,setCoin] = useState(0);

    useEffect(()=>{
        if(meshselected){
            console.log('button clicked to select model: '+meshselected);
            let modelUrl;
            if(meshselected === 'pine_tree')
                modelUrl = new URL('../assets/pine_tree.glb',import.meta.url);
            if(meshselected === 'history_house')
                modelUrl = new URL('../assets/history_house.glb',import.meta.url);
            if(meshselected === 'forest_house')
                modelUrl = new URL('../assets/forest_house.glb',import.meta.url);
            if(meshselected === 'japan_house')
                modelUrl = new URL('../assets/japan_house.glb',import.meta.url);
            //const wolfUrl = new URL('../assets/wolf_blender.glb',import.meta.url);
            assestloader.load(modelUrl.href,async (gltf)=>{
                meshs = gltf.scene;
                meshs.name = meshselected;
                meshs.scale.set(1,1,1);
            },
            undefined,
            (err)=>{
                console.log('error on modling model err:'+err);
            });
        }
    },[meshselected]);

    useEffect(()=>{
        const gamecanvas = document.getElementById('gamecanvas');
        gamecanvas.appendChild(renderer.domElement);
        gamecanvas.addEventListener('mousemove',mousemove);
        gamecanvas.addEventListener('mousedown',()=>{mousedown(setCoin)});

        //initialize coin point
        if(!window.localStorage.getItem('coin')){
            window.localStorage.setIteam('coin',5000);
        }
        setCoin(localStorage.getItem('coin'));
        console.log('I am first effect');
        return() =>{
            gamecanvas.removeEventListener('mousemove',mousemove);
            gamecanvas.removeEventListener('mousedown',()=>{mousedown()});
        }
    },[]);
    return(
        <>
        <h1>Game page</h1>
        <div id='gamecanvas' className="gamecanvas">
            <div className="coin" >coin : {coinCount}</div>
            <div id='models' className="models">
                <div className={'model_button pine_tree ' + (meshselected === 'pine_tree'? 'active': '')} onClick={()=>{setmeshselect('pine_tree')}}></div>
                <div className={" model_button history_house "+ (meshselected === 'history_house'? 'active': '')} onClick={()=>{setmeshselect('history_house')}}></div>
                <div className={" model_button japan_house "+ (meshselected === 'japan_house'? 'active': '')} onClick={()=>{setmeshselect('japan_house')}}></div>
                <div className={" model_button forest_house "+ (meshselected === 'forest_house'? 'active': '')} onClick={()=>{setmeshselect('forest_house')}}></div>
            </div>
        </div>
        </>
    );
}

export default Game;