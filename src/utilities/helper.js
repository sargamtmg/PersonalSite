import * as THREE from 'three';

export const addAxis = (scene)=>{
    const axis = new THREE.AxesHelper(5);
    scene.add(axis);
};

export const addGrid = (scene,d)=>{
    const grid = new THREE.GridHelper(d,d);
    scene.add(grid);
}