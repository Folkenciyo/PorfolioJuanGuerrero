import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'



export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();
    } 

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }
    
    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
	
            // Desktop
            "(min-width: 969px)": () => {
                //resets
                this.room.scale.set(0.5, 0.5, 0.5);
                this.room.position.set(0, 0, 0);
                //first section -----------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".first-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh:true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return -this.sizes.width * 0.0014
                    },
                    z: () =>{
                        return -this.sizes.height * 0.0016
                    }
                });
                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6
                });
                

                //second section -----------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".second-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh:true,
                    },
                })
                    .to(this.room.position, {
                            x: ()=>{
                                return this.sizes.width * 0.0000000000001
                            },
                            z: () =>{
                                return -this.sizes.height *0.0034;
                            },
                    })
                        .to(this.room.children[31], {
                            width:0.5 * 3.4,
                            height: 1 * 3.4,
                            intensity: 14,
                        },
                        "same"
                    )                    
                        .to(this.room.children[34], {
                            width:0.5 * 3.4,
                            height: 0.4 * 3.4,
                            intensity: 1.6,
                        },
                        "same"
                    )                    
                        .to(this.room.children[35], {
                            width:0.25 * 3.4,
                            height: 0.25 * 3.4,
                            intensity: 1,
                        },
                        "same"
                    )
                        .to(this.room.scale, {
                            x: 2,
                            y: 2,
                            z: 2
                        },
                        "same"
                    )

                //third section -----------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".third-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh:true,
                    },
                })  
                    .to(this.room.position, {
                        x: ()=>{
                            return this.sizes.width * -0.001
                        },
                        z: () =>{
                            return -this.sizes.height *0.0034;
                        },
                    })
                    .to(this.room.children[31], {
                            width:0.5 ,
                            height: 1 ,
                            intensity: 5,
                        },
                        "same"
                    ) 
                    .to(this.room.scale, {
                            x: 1,
                            y: 1,
                            z: 1
                        },
                        "same"
                    )
                    .to(this.camera.orthographicCamera.position, {
                        y: 6,
                        x:-1.6,

                    })


            },

            //Mobile
            "(max-width: 968px)": () => {
                //resets
                this.room.scale.set(0.3, 0.3, 0.3);
                /* FishTankLight */
                this.room.children[31].width = 0.5;
                this.room.children[31].height = 0.25;
                /* WindowsLight */
                this.room.children[32].width = 1;
                this.room.children[32].height = 0.75;
                /* WallLight */
                this.room.children[33].width = 0.5;
                this.room.children[33].height = 0.5;
                /* ScreenLights */
                this.room.children[34].width = 0.2;
                this.room.children[34].height = 0.25;
                
                this.room.children[35].width = 0.1;
                this.room.children[35].height = 0.1;
                
                //first section -----------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".first-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh:true,
                    }
                }).to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4
                });
                //second section -----------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".second-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh:true,
                    },
                })
                    .to(this.room.scale,{
                            x:0.8,
                            y:0.8,
                            z:0.8 
                        },
                        "same"
                    )
                    .to(this.room.children[31], {
                            width:0.25 *3.4,
                            height:0.5*3.4
                        },
                        "same"
                    )
                    .to(this.room.position, {
                            x:-1.5
                        },
                        "same"
                    )
                //third section -----------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger:".third-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub:0.6,
                        invalidateOnRefresh:true,
                    },
                })
                .to(this.camera.orthographicCamera.position, {
                        y: 4.6,
                        x:-3,

                    },
                    "same"
                )
                .to(this.room.scale, {
                        x: 0.6,
                        y: 0.6,
                        z: 0.6 
                    },
                    "same"
                )
                .to(this.room.children[31], {
                            width:0.25 ,
                            height: 0.5 ,
                            intensity: 10,
                    },
                    "same"
                ) 
            },


            // all 
            "all": () => {
                    this.sections = document.querySelectorAll(".section")
                    this.sections.forEach((section) =>{
                        this.progressWrapper = section.querySelector(".progress-wrapper")
                        this.progressBar = section.querySelector(".progress-bar")

                        if(section.classList.contains("right")){
                            GSAP.to(section, {
                                borderTopLeftRadius: 10,
                                scrollTrigger:{
                                    trigger: section, 
                                    start: "top bottom",
                                    end: "top top",
                                    markers:false,
                                    scrub:0.6,
                                }
                            });
                            GSAP.to(section, {
                                borderBottomLeftRadius: 700,
                                scrollTrigger:{
                                    trigger: section, 
                                    start: "bottom bottom",
                                    end: "bottom top",
                                    markers:false,
                                    scrub:0.6,
                                }
                            });
                        }else{
                            GSAP.to(section, {
                                borderTopRightRadius: 20,
                                scrollTrigger:{
                                    trigger: section, 
                                    start: "top bottom",
                                    end: "top top",
                                    markers:false,
                                    scrub:0.6,
                                }
                            });
                            GSAP.to(section, {
                                borderBottomRightRadius: 700,
                                scrollTrigger:{
                                    trigger: section, 
                                    start: "bottom bottom",
                                    end: "bottom top",
                                    markers:false,
                                    scrub:0.6,
                                }
                            });
                        }

                        GSAP.from(this.progressBar, {
                            scaleY:0,
                            scrollTrigger:{
                                trigger: section,
                                start: "top top",
                                end: "bottom bottom",
                                scrub: 0.4,
                                pin: this.progressWrapper,
                                pinSpacing:false,
                            }
                        })
                    });
                
                //Circle Animations
                    //first section -----------------------------
                    this.firstMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger:".first-move",
                            markers: false,
                            start: "top top",
                            end: "bottom bottom",
                            scrub:0.6,
                            invalidateOnRefresh:true,
                        }
                    }).to(this.circleFirst.scale, {
                        x:3,
                        y:3,
                        z:3
                    });
                    //second section -----------------------------
                    this.secondMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger:".second-move",
                            markers: false,
                            start: "top top",
                            end: "bottom bottom",
                            scrub:0.6,
                            invalidateOnRefresh:true,
                        },
                    }).to(this.circleSecond.scale, {
                        x:3,
                        y:3,
                        z:3
                    });
                    //third section -----------------------------
                    this.thirdMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger:".third-move",
                            markers: false,
                            start: "top top",
                            end: "bottom bottom",
                            scrub:0.6,
                            invalidateOnRefresh:true,
                        },
                    }).to(this.circleThird.scale, {
                        x:3,
                        y:3,
                        z:3
                    });
                //Mini platform animation
                    this.thirdMoveTimelineAll = new GSAP.timeline({
                        scrollTrigger: {
                            trigger:".third-move",
                            markers: false,
                            start: "center center",
                            end: "bottom bottom",
                            scrub:0.6,
                            invalidateOnRefresh:true,
                        },
                    });
                    this.room.children.forEach(child =>{
                        if(child.name === "secondFloor"){
                            this.first = this.thirdMoveTimelineAll.to(child.position, {
                                y:4.70265,

                            })
                            .to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration: 20.6
                            });
                            
                        }
                        if(child.name === "MailPalo"){
                            this.third = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:10.6
                            })
                        }
                        if(child.name === "mail"){
                            this.second = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:7.2
                            })
                            .to(child.rotation, {
                                z:Math.PI*2,
                                duration: 5
                            })
                        }

                        if(child.name === "arbolTierra2"){
                            this.fourth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:.6
                            })
                        }
                        if(child.name === "arbolTierra"){
                            this.fifth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:2.6
                            })
                        }
                        if(child.name === "arbol"){
                            this.sixth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:.6
                            })
                        }
                        if(child.name === "arbolhojas1"){
                            this.seventh = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:.6
                            })
                        }
                        if(child.name === "arbolhojas2"){
                            this.eighth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                            })
                        }
                        if(child.name === "arbolhojas3"){
                            this.ninth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:.6
                            })
                        }
                        if(child.name === "arbolhojas4"){
                            this.tenth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:.6
                            })
                        }
                        if(child.name === "avatarcabeza"){
                            this.eleventh = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                duration:0.3
                            })
                        }
                        if(child.name === "avatartronco"){
                            this.twelve = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                            }, "same")
                        }
                        if(child.name === "avatarbrazoI"){
                            this.thirteenth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                            }, "same")
                        }
                        if(child.name === "avatarbrazoD"){
                            this.fourteenth = this.thirdMoveTimelineAll.to(child.scale, {
                                x: 1,
                                y: 1,
                                z: 1,
                                erase:"back.out(2)",
                                
                            }, "same")
                        }
                        this.thirdMoveTimelineAll.add(this.first)
                        this.thirdMoveTimelineAll.add(this.second)
                        
                        this.thirdMoveTimelineAll.add(this.fourth)
                        this.thirdMoveTimelineAll.add(this.third)
                        this.thirdMoveTimelineAll.add(this.fifth)

                        this.thirdMoveTimelineAll.add(this.seventh)
                        this.thirdMoveTimelineAll.add(this.eighth)
                        this.thirdMoveTimelineAll.add(this.ninth)
                        this.thirdMoveTimelineAll.add(this.sixth)
                        this.thirdMoveTimelineAll.add(this.tenth)
                        this.thirdMoveTimelineAll.add(this.eleventh)
                        this.thirdMoveTimelineAll.add(this.twelve)
                        this.thirdMoveTimelineAll.add(this.thirteenth)
                        this.thirdMoveTimelineAll.add(this.fourteenth)


                    })
                    
            },
        });  
    }

    resize() {
    }

    update(){
    }
}