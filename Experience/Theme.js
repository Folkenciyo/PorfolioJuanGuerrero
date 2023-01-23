import { EventEmitter } from "events";

export default class Sizes extends EventEmitter{
    constructor() {
        super();

        this.theme = "light"

        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.icon = document.getElementById("icon");
        this.playSvg = '<path fill="currentColor" d="m9.5 16.5 7-4.5-7-4.5ZM12 22q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/>';
        this.pauseSvg = '<path fill="currentColor" d="M8.85 16.15H11v-8.3H8.85Zm4.15 0h2.15v-8.3H13Zm-1 6.15q-2.125 0-4.012-.812-1.888-.813-3.275-2.2-1.388-1.388-2.2-3.263Q1.7 14.15 1.7 12q0-2.15.813-4.038.812-1.887 2.2-3.275Q6.1 3.3 7.988 2.5 9.875 1.7 12 1.7q2.15 0 4.038.8 1.887.8 3.274 2.187Q20.7 6.075 21.5 7.962q.8 1.888.8 4.038 0 2.15-.8 4.025-.8 1.875-2.188 3.263-1.387 1.387-3.274 2.2Q14.15 22.3 12 22.3Zm0-2.15q3.425 0 5.788-2.363Q20.15 15.425 20.15 12t-2.362-5.788Q15.425 3.85 12 3.85q-3.425 0-5.787 2.362Q3.85 8.575 3.85 12q0 3.425 2.363 5.787Q8.575 20.15 12 20.15ZM12 12Z"/>';
        this.isPlaying = false;
        this.audio = new Audio("/music/happy.mp3");
        this.audioDay = new Audio("/music/happy.mp3");
        this.audioNight = new Audio("/music/piano.mp3");
        this.isMuted = false;

        this.setEventListener();
        this.setAudio();

    }

    setEventListener() {
        this.toggleButton.addEventListener("click", ()=> {
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme === "light" ? "dark" : "light";
            if(this.theme === "light"){
                this.audio.pause();
                this.audio =this.audioDay
                this.audio.play();
                this.icon.innerHTML = this.pauseSvg;
                this.isPlaying = true;
            }else{
                this.audio.pause();
                this.audio =this.audioNight
                this.audio.play();
                this.icon.innerHTML = this.pauseSvg;
                this.isPlaying = true;
            }
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            
            this.emit("switch", this.theme)
        })
    }

    setAudio(){
        this.audio.play();
        this.icon.innerHTML = this.playSvg;

        document.getElementById("my-button").addEventListener("click", () => {
            if (!this.isPlaying) {
                this.audio.play();
                this.icon.innerHTML = this.pauseSvg;
                this.isPlaying = true;
            } else {
                this.audio.pause();
                this.icon.innerHTML = this.playSvg;
                this.isPlaying = false;
            }
        });

    }
}