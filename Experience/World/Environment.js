import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI();
        // this.obj = {
        //     colorObj: { r: 0, g: 0, b: 0},
        //     intensity: 2,
        // }

        this.setSunLight();
        this.setGUI();
    }

    setGUI(){
        // this.gui.addColor(this.obj, "colorObj").onChange(() =>{
        //     //console.log(this.obj.colorObj)
        //     this.sunLight.color.copy(this.obj.colorObj);
        //     this.ambientLight.color.copy(this.obj.colorObj);
        // });
        // this.gui.add(this.obj, "intensity", 0, 10).onChange(()=> {
        //     this.sunLight.intensity = this.obj.intensity
        //     this.ambientLight.intensity = this.obj.intensity
        // });
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(4096, 4096);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(1, 7, -3);
        // const helper = new THREE.CameraHelper( this.sunLight.shadow.camera);
        // this.scene.add(helper)
        this.scene.add(this.sunLight)


        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.9);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.2,
                g: 0.13333333333333333,
                b: 0.4666666666666667,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.2,
                g: 0.13333333333333333,
                b: 0.4666666666666667,
            });
        }else{
            GSAP.to(this.sunLight.color, {
                r: 255/255,
                g: 255/255,
                b: 255/255,
            });
            GSAP.to(this.ambientLight.color, {
                r: 255/255,
                g: 255/255,
                b: 255/255,
            });
        }
    }

    resize() {

    }

    update(){
        
    }
}