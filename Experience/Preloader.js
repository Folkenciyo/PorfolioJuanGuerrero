import { EventEmitter } from "events";
import Experience from "./Experience.js"
import GSAP from "gsap";

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
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro(){
        return new Promise((resolve)=>{

            this.timeline = new GSAP.timeline();
    
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
                    duration:0.7,
                    onComplete:resolve,
                })
                this.room.children.forEach((child)=>{
                    if(
                        child.name === "fishTankLight"||
                        child.name === "windowsLight"||
                        child.name === "wallLight"||
                        child.name === "screenLight1"||
                        child.name === "screenLight2"){
                            child.intensity = 0
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
                    z:1,
                    ease: "power1.out",
                    duration:0.7,
                    onComplete:resolve,
                });
            }
        });
    }
    secondIntro(){
        return new Promise ((resolve) =>{
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(this.room.position, {
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
            }, "introcube").to(this.roomChildren.avion.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.corcho.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.escritorio.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.estanteria.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.floor.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, "chair").to(this.roomChildren.pantalla1.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.pantalla2.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.pecera.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.pez.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).to(this.roomChildren.silla.scale, {
                x:1,
                y:1,
                z:1,
                duration:0.5
            }, "chair").to(this.roomChildren.silla.rotation, {
                y:4 * Math.PI ,
                ease: "power2.out",
                duration:0.5
            }, "chair").to(this.roomChildren.topescritorio.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"topdesk").to(this.roomChildren.vapor1.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"topdesk").to(this.roomChildren.vapor2.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },"topdesk").to(this.roomChildren.vapor3.scale, {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
                onComplete: resolve
            },"topdesk")
    
        });
    }

    onScroll(e) {
        if(e.deltaY >0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            /* console.log("swipped up"); */
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel",  this.scrollOnceEvent)
        window.removeEventListener("touchstart",  this.touchStart)
        window.removeEventListener("touchmove",  this.touchMove)
    }

    async playIntro() {
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel",  this.scrollOnceEvent)
        window.addEventListener("touchstart",  this.touchStart)
        window.addEventListener("touchmove",  this.touchMove)
    }

    async playSecondIntro(){
        await this.secondIntro();
        this.emit("enablecontrols");
    }
}
