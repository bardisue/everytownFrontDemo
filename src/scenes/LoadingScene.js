import Phaser from 'phaser';
import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";
import bgImg from '../assets/images/map.png';
import catImg from '../assets/images/bus.png';
import busImg from '../assets/images/bu1s.png';
import beamImg from '../assets/images/beam.png';
import batImg from "../assets/spritesheets/bat.png";
import dogImg from "../assets/spritesheets/dog.png";
import eyeballImg from "../assets/spritesheets/eyeball.png";
import expUpImg from '../assets/spritesheets/exp-up.png';
import explosionImg from '../assets/spritesheets/explosion.png';
import objImg from '../assets/images/someObj.png';
import boardImg from '../assets/images/board.png';
import talkImg from '../assets/images/talk.png';
import imageHtml from '../assets/text/image.html';
import uiImage from "../assets/images/UI.png"
import photoImage from "../assets/images/photo.png"

export default class LoadingScene extends Phaser.Scene{
    constructor() {
        super("bootGame");
        // bootGame : 이 scene의 identifier
    }
    //http://labs.phaser.io/assets/fonts/bitmap/hyperdrive.png
    preload() {
        this.load.image("photo", photoImage);
        this.load.image("UI", uiImage);
        this.load.image("background", bgImg);
        this.load.image("cat", catImg);
        this.load.image("beam", beamImg);
        this.load.image("some", objImg);
        this.load.image("bus", busImg);
        this.load.image("board", boardImg);
        this.load.image("talk", talkImg);
        //this.load.bitmapFont('hyper', 'http://labs.phaser.io/assets/fonts/bitmap/hyperdrive.png', 'http://labs.phaser.io/assets/fonts/bitmap/hyperdrive.xml');


        this.load.spritesheet("bat", batImg, {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("dog", dogImg, {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("eyeball", eyeballImg, {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("explosion", explosionImg, {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet("exp-up", expUpImg, {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.bitmapFont("pixelFont", fontPng, fontXml);
    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");
        // this.scene.start("mainScene");

        this.anims.create({
            key: "bat_anim",
            frames: this.anims.generateFrameNumbers("bat"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: "dog_anim",
            frames: this.anims.generateFrameNumbers("dog"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: "eyeball_anim",
            frames: this.anims.generateFrameNumbers("eyeball"),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });

        this.anims.create({
            key: "red",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "gray",
            frames: this.anims.generateFrameNumbers("exp-up", {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });
    }
}
