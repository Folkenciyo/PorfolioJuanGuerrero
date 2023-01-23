import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import GUI from "lil-gui";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.roomChildrenLights = {};

        this.lerp = {
            current: 0,
            target:0,
            ease: 0.1
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    
    setModel() {
        this.actualRoom.children.forEach((child) => {

            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group){
                child.children.forEach((group_child) => {
                    group_child.castShadow = true;
                    group_child.receiveShadow = true;
                    if(group_child instanceof THREE.Group){
                        group_child.children-forEach((x) => {
                            x.castShadow = true;
                            x.receiveShadow = true;
                        })
                    };
                });
                
                if (child.name === "pecera") {
                    
                    child.children[0].material = new THREE.MeshPhysicalMaterial();
                    child.children[0].material.roughness = 0;
                    child.children[0].material.color.set(0x549dd2);
                    child.children[0].material.ior = 3;
                    child.children[0].material.transmission = 1;
                    child.children[0].material.opacity = 1;
                }
                
                if (child.name === "estanteria") {
                    child.children[0].material = new THREE.MeshPhysicalMaterial();
                    child.children[0].material.roughness = 0;
                    child.children[0].material.color.set(0x549dd2);
                    child.children[0].material.ior = 3;
                    child.children[0].material.transmission = 1;
                    child.children[0].material.opacity = 1;
                }
            }

            if(child.name === "pantalla2"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });
            }

            if(child.name === "pantalla1"){
                child.children[2].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            // if(child.name === "secondFloor"){
            //     child.position.y = 4.217181023864746
            //     child.scale.set(0, 0, 0)  
            // }
            // if(child.name === "mail"){
            //     child.scale.set(0, 0, 0)  
            // }
            // if(child.name === "MailPalo"){
            //     child.scale.set(0, 0, 0)  
            // }
            // if(child.name === "arbol"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "arbolhojas1"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "arbolhojas2"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "arbolhojas3"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "arbolhojas4"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "arbolTierra"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "arbolTierra2"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "avatartronco"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "avatarbrazoD"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "avatarbrazoI"){
            //     child.scale.set(0, 0, 0) 
            // }
            // if(child.name === "avatarcabeza"){
            //     child.scale.set(0, 0, 0) 
            // }

            child.scale.set(0, 0, 0) 
            if(
                child.name === "introcube1"|| 
                child.name === "introcube2"){
                    /* child.scale.set(0.7,0.7,0.7); */
                    child.position.set(0, 0.1 , 0)
                }

            this.roomChildren[child.name.toLowerCase()] = child;
        });
        
        //Light FishTank
        const fishTankLight = new THREE.RectAreaLight( 
            0x549dd2, //COLOR
            5, //INTENSITY
            0.5, //WIDTH
            1 //HEIGHT
        );
        fishTankLight.position.set( -2, 1.58, 0 );
        fishTankLight.name = "fishTankLight";
        fishTankLight.rotation.x = (Math.PI/-2);
        fishTankLight.rotation.z = (Math.PI/2)/2;
        this.actualRoom.add(fishTankLight);
        this.roomChildrenLights[fishTankLight] = fishTankLight;

        // const rectLightHelper = new RectAreaLightHelper( fishTankLight );
        // fishTankLight.add( rectLightHelper );
        
        //Light Outside Window
        const windowsLight = new THREE.RectAreaLight( 
            0xffff00, //COLOR
            2, //INTENSITY
            1.5, //WIDTH
            2 //HEIGHT
        );
        windowsLight.position.set( 1, 1.6, 3 );
        windowsLight.name = "windowsLight";
        windowsLight.rotation.x = (Math.PI);
        windowsLight.rotation.y = (Math.PI/-3)
        this.actualRoom.add(windowsLight);
        this.roomChildrenLights[windowsLight] = windowsLight;

        // const rectLightHelper = new RectAreaLightHelper( windowsLight );
        // windowsLight.add( rectLightHelper );
        
/*      POSICION DE LA LUZ PEGADA A LA VENTANA
        windowsLight.position.set( 1, 1.6, 3 );
        windowsLight.rotation.x = (Math.PI);
        windowsLight.rotation.y = (Math.PI/0.21) */
        
        //Wall Light
        const wallLight = new THREE.RectAreaLight( 
            0xffff00, //COLOR
            2, //INTENSITY
            1 , //WIDTH
            1 //HEIGHT
        );
        wallLight.position.set( -3, 2, 2 );
        wallLight.name = "wallLight";
        wallLight.rotation.x = (Math.PI);
        wallLight.rotation.y = (Math.PI/0.21)/2;
        this.actualRoom.add(wallLight);
        this.roomChildrenLights[wallLight] = wallLight;
        

        // const rectLightHelper = new RectAreaLightHelper( wallLight );
        // wallLight.add( rectLightHelper );

        //Screen Lights
        const screenLight1 = new THREE.RectAreaLight( 
            0xffffff, //COLOR
            0.8, //INTENSITY
            0.5 , //WIDTH
            0.4 //HEIGHT
        );
        screenLight1.position.set( 1.97, 1.48, -0.46 );
        screenLight1.name = "screenLight1";
        screenLight1.rotation.x = (Math.PI);
        screenLight1.rotation.y = (Math.PI/0.211);
        this.actualRoom.add(screenLight1);
        this.roomChildrenLights[screenLight1] = screenLight1;

        // const rectLightHelper = new RectAreaLightHelper( screenLight1 );
        // wallLight.add( rectLightHelper );

        const screenLight2 = new THREE.RectAreaLight( 
            0xffffff, //COLOR
            0.6, //INTENSITY
            0.25 , //WIDTH
            0.25 //HEIGHT
        );
        screenLight2.position.set( 2.614, 1, -1.1 );
        screenLight2.name = "screenLight2";
        screenLight2.rotation.x = (Math.PI);
        screenLight2.rotation.y = (Math.PI/0.217);
        this.actualRoom.add(screenLight2);
        this.roomChildrenLights[screenLight2] = screenLight2;

        // const rectLightHelper = new RectAreaLightHelper( screenLight2 );
        // wallLight.add( rectLightHelper );
        
        // Avatar SpotLight
        const light = new THREE.PointLight( 0xffffff, 2, 1000 );
        light.position.set( -1, 8 , 1  );
        light.name = "light";
        this.actualRoom.add( light );
        const sphereSize = 1;
        // const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
        // this.scene.add( pointLightHelper )

        const light2 = new THREE.PointLight( 0xff0000, 2, 1000 );
        light2.position.set( -3, 8 , -1  );
        light2.name = "light2";
        this.actualRoom.add( light2 );
        const sphereSize2 = 1;
        // const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize2 );
        // this.scene.add( pointLightHelper2 )

        /* ----------------- */
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.5, 0.5, 0.5);
        // this.actualRoom.rotation.y = Math.PI;
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom)
        //fish amination
        this.swim = this.mixer.clipAction(this.room.animations[4])
        this.swim.play();
        //plane animation
        this.fly = this.mixer.clipAction(this.room.animations[5])
        this.fly.play();
        //coffee animation 
        this.vapor1 = this.mixer.clipAction(this.room.animations[13]);
        this.vapor1.play();
        this.vapor2 = this.mixer.clipAction(this.room.animations[14]);
        this.vapor2.play();
        this.vapor3 = this.mixer.clipAction(this.room.animations[15]);
        this.vapor3.play();
        
        //rgb animation
        // this.rgb = this.mixer.clipAction(this.room.animations[133])
        // this.rgb.play();

        //avatar animation
        this.avatarHead = this.mixer.clipAction(this.room.animations[21]);
        this.avatarHead.play();
        this.avatarRArm = this.mixer.clipAction(this.room.animations[20])
        this.avatarRArm.play();
        this.avatarLArm = this.mixer.clipAction(this.room.animations[23])
        this.avatarLArm.play();
    }

    onMouseMove() {
        //room rotation when mouse moves
        window.addEventListener("mousemove", (e)=>{
            this.rotation = 
                ((e.clientX - window.innerWidth/2)*2) / window.innerWidth
            this.lerp.target = this.rotation*0.1;
        })
    }

    resize() {

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}