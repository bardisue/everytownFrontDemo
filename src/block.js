
import car from './afsf/car90.png';

export default class Block extends Phaser.Physics.Arcade.Image {

    constructor(scene) {
        super(scene, 48, 48, "car");
        this.setPosition(600,600)
        this.scale = 1;
        this.alpha = 1;

        scene.add.existing(this);
        scene.physics.add.existing(this);

    }
}
