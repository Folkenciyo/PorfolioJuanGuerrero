import * as THREE from "three";
import Experience from "./Experience.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera{
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }
    
    //PERSPECTIVE CAMERA
    createPerspectiveCamera() { //creating perspective camera for work on the scene better
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,                 //FOG
            this.sizes.aspect,  //ASPECT
            0.1,                //NEAR
            1000                //FAR
        );
        this.scene.add(this.perspectiveCamera)
        this.perspectiveCamera.position.x = 15;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 9;
    }
    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    //ORTOGRAPHIC CAMERA
    createOrthographicCamera() { //This one will be the viewport camera that will be used for final use
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,   //LEFT
            (this.sizes.aspect * this.sizes.frustrum)/2,    //RIGTH
            this.sizes.frustrum/2,                          //TOP
            -this.sizes.frustrum/2,                         //BOTTOM
            -60,                                           //NEAR
            60                                             //FAR
        );
        this.scene.add(this.orthographicCamera)
        this.orthographicCamera.position.y = 0; //center 0.5
        this.orthographicCamera.rotation.y = Math.PI*3;
        this.orthographicCamera.rotation.x = Math.PI/7;
        
        /* HELPERS */
        // this.helper = new THREE.CameraHelper( this.orthographicCamera);
        // this.scene.add(this.helper)

        const size = 20;
        const division = 20;

        // const gridHelper = new THREE.GridHelper(size, division);
        // this.scene.add(gridHelper)

        // const axesHelper = new THREE.AxesHelper(size, division);
        // this.scene.add(axesHelper)
    }
    
    resize() { //Resize the camera updating the size of the new window´s size
        //PERSPECTIVE CAMERA
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix()

        //ORTHOGRAPHIC CAMERA
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
        this.orthographicCamera.updateProjectionMatrix()
    }

    update(){

        this.controls.update();

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update(); 
        // this.helper.position.copy(this.orthographicCamera.position)
        // this.helper.rotation.copy(this.orthographicCamera.rotation)
    }
}