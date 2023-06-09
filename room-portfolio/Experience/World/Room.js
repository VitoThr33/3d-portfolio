import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Room {
    constructor (){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    //console.log(groupchild.material);
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }
            //console.log(child);
            
            if (child.name === "screen"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                })
            }
            if (child.name === "TV"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.TV,
                    
                })
            }
            if (child.name === "miniFloor"){
                child.position.x = -0.219974 ;
                child.position.z = 13.6171;
            }
            /*if (child.name === "mailbox" || child.name === "flowers"){
                child.scale.set(0,0,0)
            }*/
            child.scale.set(0,0,0);
            if (child.name === "Cube"){
            //child.scale.set(1,1,1);
            child.position.set(0,-1.5,0);
            child.rotation.y = Math.PI / 4;
            }
            this.roomChildren[child.name.toLowerCase()] = child;
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.065,0.065,0.065);
        
    }

    onMouseMove(){
        window.addEventListener("mousemove",(e) => {
            this.rotation =
            ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize(){

    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}