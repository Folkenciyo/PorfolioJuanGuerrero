import { EventEmitter } from "events";
import Experience from "./Experience.js"
import GSAP from "gsap";
import convert from "./Utils/convert.js";

export default class Preloader extends EventEmitter{
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device

        this.sizes.on("switchdevice", (device) =>{
            this.device = device;
        })

        this.world.on("worldready", ()=>{
            this.setAssets();
            this.playIntro();
        })
    }
    setAssets() {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading-title"))
        convert(document.querySelector(".hero-second-subheading"))

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro(){
        return new Promise((resolve)=>{

            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
                        this.timeline.to(".preloader", {
                opacity: 0,
                zIndex: -90,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            });
    
            if(this.device === "desktop"){
                this.timeline.to(this.roomChildren.introcube1.scale, {
                    x:2,
                    y:2,
                    z:2,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, "same")
                this.timeline.to(this.roomChildren.introcube2.scale, {
                    x:2,
                    y:2,
                    z:2,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, "same").to(this.room.position, {
                    x:1,
                    ease: "power1.out",
                    duration:0.7
                })
                this.room.children.forEach((child)=>{
                    if(
                        child.name === "fishTankLight"||
                        child.name === "windowsLight"||
                        child.name === "wallLight"||
                        child.name === "screenLight1"||
                        child.name === "screenLight2"){
                            this.setLights(child, 0)
                        }
                })
                
            }else {
                this.timeline.to(this.roomChildren.introcube1.scale, {
                    x:2,
                    y:2,
                    z:2,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, "same")
                this.timeline.to(this.roomChildren.introcube2.scale, {
                    x:2,
                    y:2,
                    z:2,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }, "same").to(this.room.position, {
                    z:1.2,
                    ease: "power1.out",
                    duration:0.7,
                });

                this.room.children.forEach((child)=>{
                    if(
                        child.name === "fishTankLight"||
                        child.name === "windowsLight"||
                        child.name === "wallLight"||
                        child.name === "screenLight1"||
                        child.name === "screenLight2"){
                            this.setLights(child, 0)
                        }
                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger:0.05,
                ease:"back.out(1.7)",
            }).to(".arrow-svg-wrapper", {
                opacity:1
            }, "last").to(".toggle-bar", {
                opacity:1,
                onComplete:resolve,
            }, "last")
        });
    }
    secondIntro(){
        return new Promise ((resolve) =>{
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger:0.05,
                ease:"back.in(1.7)",
            }, "fadeout").to(".arrow-svg-wrapper", {
                opacity:0
            }, "fadeout").to(this.room.position, {
                x:0,
                y:0,
                z:0,
                ease: "power1.out",
            }).to(this.roomChildren.introcube1.rotation, {
                y: 2*Math.PI + Math.PI/4
            },"same").to(this.roomChildren.introcube1.scale, {
                x:11.0163,
                y:11.0163,
                z:11.0163
            }, "same").to(this.roomChildren.introcube2.rotation, {
                y: 2*Math.PI + Math.PI/4
            },"same").to(this.roomChildren.introcube2.scale, {
                x:11.0163,
                y:11.0163,
                z:11.0163
            },"same").to(this.camera.orthographicCamera.position, {
                y:0.5
            }).to(this.roomChildren.introcube1.position, {
                x:0,
                y:2.33258,
                z:0.982697
            }, "same").to(this.roomChildren.introcube2.position, {
                x:0,
                y:2.33258,
                z:0.982697 
            }, "same").set(this.roomChildren.cuarto.scale, {
                x:1,
                y:1,
                z:1,
            }).to(this.roomChildren.introcube1.scale, {
                x:0,
                y:0,
                z:0
            }, "introcube").to(this.roomChildren.introcube2.scale, {
                x:0,
                y:0,
                z:0
            }, "introcube").to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger:0.05,
                ease:"back.out(1.7)",
            }, "introcube").to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger:0.05,
                ease:"back.out(1.7)",
            }, "introcube").to(".hero-second-subheading-title .animatedis", {
                yPercent: 0,
                stagger:0.05,
                ease:"back.out(1.7)",
            }, "introcube").to(".hero-second-subheading .animatedis", {
                yPercent: 0,
                stagger:0.05,
                ease:"back.out(1.7)",
            }, "introcube").to(this.roomChildren.avion.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.52
            }).to(this.roomChildren.corcho.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.escritorio.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.estanteria.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.floor.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }, "chair").to(this.roomChildren.pantalla1.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.pantalla2.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.pecera.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.pez.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            }).to(this.roomChildren.silla.scale, {
                x:1,
                y:1,
                z:1,
                duration:0.2
            }, "chair").to(this.roomChildren.silla.rotation, {
                y:4 * Math.PI ,
                ease: "power2.out",
                duration:0.2
            }, "chair").to(this.roomChildren.topescritorio.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            },"topdesk").to(this.roomChildren.vapor1.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            },"topdesk").to(this.roomChildren.vapor2.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
            },"topdesk").to(this.roomChildren.vapor3.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.2,
                
            },"topdesk").to(".arrow-svg-wrapper", {
                opacity:1,
                onComplete:resolve,
            }, "last"); 
        });
    }

    setLights(name, intensity){
        name.intensity = intensity;
    }

    setLightsOn(){
        this.room.children.forEach((child)=>{
            if(child.name === "fishTankLight"){
                    this.setLights(child, 5)
                }
            if(child.name === "windowsLight"){
                this.setLights(child, 2)
            }
            if(child.name === "wallLight"){
                this.setLights(child, 2)
            }
            if(child.name === "screenLight1"){
                this.setLights(child, 0.8)
            }
            if(child.name === "screenLight2"){
                this.setLights(child, 0.6)
            }
        })
    }


    onScroll(e) {
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            /* console.log("swipped up"); */
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();      
        this.setLightsOn();  
        this.scaleFlag = false;
        
        this.emit("enablecontrols");
    }

    move() {
        if(this.device === "desktop"){
            this.room.position.set(1,0,0);
        }else{
            this.room.position.set(0,0,1);
        }
    }

    scale() {
        if(this.device === "desktop"){
            this.room.scale.set(0.5,0.5,0.5);
        }else{
            this.room.scale.set(0.5,0.5,0.5);
        }
    }

    update(){
        if(this.moveFlag){
            this.move();
        }

        if(this.scaleFlag){
            this.scale();
        }
        
    }
}
