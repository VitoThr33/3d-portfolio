import * as THREE from "three";
import Experience from "../Experience.js";



export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.Scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        console.log(this.actualRoom);
    }

    setModel() {
        
    }

    resize(){}

    update(){}
}