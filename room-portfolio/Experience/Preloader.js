import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/ConvertDivsToSpans";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();

      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.4,
            y: 1.4,
            z: 1.4,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.timeline.to(".intro-text .animatedis", {
        yPercent: -100,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }).to(".arrow-svg-wrapper", {
        opacity: 1,
      },"two").to(".toggle-bar", {
        opacity: 1,
         onComplete: resolve,
      },"two")
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(".intro-text .animatedis", {
          yPercent: 100,
          stagger: 0.05,
          ease: "back.in(1.7)",
        },"out")
        .to(".arrow-svg-wrapper", {
          opacity: 0,
        },"out")
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "uno"
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "uno"
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 10,
            y: 10,
            z: 10,
          },
          "uno"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 3.5,
          },
          "uno"
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: 0.638711,
            y: 8.5618,
            z: -1.3243,
          },
          "uno"
        )
        .set(this.roomChildren.walls.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(this.roomChildren.cube.scale, {
          x: 0,
          y: 0,
          z: 0,
        })
        .to(
          ".hero-main-title .animatedis",
          {
            yPercent: -100,
            stagger: 0.007,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          ".hero-main-description .animatedis",
          {
            yPercent: -100,
            stagger: 0.007,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          ".first-sub .animatedis",
          {
            yPercent: -100,
            stagger: 0.009,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(
          ".second-sub .animatedis",
          {
            yPercent: -100,
            stagger: 0.009,
            ease: "back.out(1.7)",
          },
          "intro"
        )
        .to(this.roomChildren.wallitems1.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.accessories1.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.monitor1screen.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.3,
        },">-0.5")
        .to(this.roomChildren.floor_items.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.3,
        },">-0.4")
        .to(this.roomChildren.tv.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.3,
        },">-0.1")
        .to(this.roomChildren.screen.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.1,
        },">-0.1")
        .set(this.roomChildren.minifloor.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(this.roomChildren.chair.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back-out(2.2)",
          duration: 0.3,
        })
        .to(this.roomChildren.chair.rotation, {
          y: 4 * Math.PI + Math.PI / 4,
          ease: "power2.out",
          duration: 1,
        })
        .to(".arrow-svg-wrapper", {
          opacity: 0,
          onComplete: resolve,
        },"out")
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      console.log("added event");
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
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
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    if (this.device === "desktop") {
      this.room.scale.set(0.065, 0.065, 0.065);
    } else {
      this.room.scale.set(0.05, 0.05, 0.05);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
