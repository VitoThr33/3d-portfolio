import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      //Desktop
      "(min-width: 969px)": () => {
        console.log("fired desktop");
        this.room.scale.set(0.065,0.065,0.065)
        //FIRST SECTION  -------------------------------------------------------------------------->

        this.firstMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        this.firstMoveTimeline.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0013;
          },
        });

        //Second SECTION  -------------------------------------------------------------------------->
        this.secondMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 3,
            invalidateOnRefresh: true,
          },
        });
        this.secondMoveTimeline.to(
          this.room.position,
          {
            x: () => {
              return -1.7;
            },
            z: () => {
              return this.sizes.height * 0.0032;
            },
          },
          "uno"
        );
        this.secondMoveTimeline.to(
          this.room.scale,
          {
            x: 0.175,
            y: 0.175,
            z: 0.175,
          },
          "uno"
        );
        //THIRD SECTION  -------------------------------------------------------------------------->

        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
            x: -4.1,
            y: 1.5,
          });
      },
      //Mobile
      "(max-width: 968px)": () => {
        console.log("fired mobile");

        //RESETS
        this.room.scale.set(0.05, 0.05, 0.05);

         //FIRST SECTION  -------------------------------------------------------------------------->

         this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }).to(this.room.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
          })
          //Second SECTION  -------------------------------------------------------------------------->
        this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 3,
              invalidateOnRefresh: true,
            },
          }).to(this.room.scale,{
            x: 0.15,
            y: 0.15,
            z: 0.15,
          }, "uno").to(this.room.position,{
            x:1.1,
            z:4,
            
          }, "uno")

          //THIRD SECTION  -------------------------------------------------------------------------->

        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 3,
              invalidateOnRefresh: true,
            },
          }).to(this.room.position, {
            z: -3.5,
        }, "uno").to(this.room.scale,{
            x: 0.25,
            y: 0.25,
            z: 0.25,
          }, "uno")
      },
    });
  }

  resize() {}

  update() {}
}
