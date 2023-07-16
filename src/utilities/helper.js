import * as THREE from 'three';

export const addAxis = (scene)=>{
    const axis = new THREE.AxesHelper(5);
    scene.add(axis);
};

export const addGrid = (scene,d)=>{
    const grid = new THREE.GridHelper(d,d);
    scene.add(grid);
}

export const addDirectionallightFromFourDir = (scene)=>{
    const d1 = new THREE.DirectionalLight(0xFFFFFF,1);
    const d2 = new THREE.DirectionalLight(0xFFFFFF,1);
    // const d3 = new THREE.DirectionalLight(0xFFFFFF,1);
    // const d4 = new THREE.DirectionalLight(0xFFFFFF,1);
    //const d5 = new THREE.DirectionalLight(0xFFFFFF,1);

    d1.position.set(0,80,80);
    d2.position.set(80,80,0);
    // d3.position.set(0,80,-80);
    // d4.position.set(-80,80,0);
    //d5.position.set(1,1,2);
    scene.add(d1);
    scene.add(d2);
    // scene.add(d3);
    // scene.add(d4);
    //scene.add(d5);
}