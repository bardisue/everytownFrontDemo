import Phaser from "phaser";
import Block from "../block";
import car from "../afsf/car.png";
import Talk from "../marker/Talk";

export const Direction = Object.freeze({
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
});
export default class Ui extends Phaser.Physics.Arcade.Image {
    constructor(scene) {

        super(scene, 0, 0, "UI");
        this.scale = 3.5;
        this.alpha = 1;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPosition(scene.cameras.main.centerX,scene.cameras.main.centerY+220)
        this.setScrollFactor(0,0)


      this.talk = scene.physics.add.sprite(0,0, "talk")
      this.talk.setPosition(scene.cameras.main.centerX,scene.cameras.main.centerY+220);
      this.talk.setScrollFactor(0,0);
      this.talk.setScale(3);
      //scene.physics.add.existing(this.talk);
      ////this.photo = scene.physics.add.sprite(scene.cameras.main.centerX-100,scene.cameras.main.centerY+215, "photo")
      ////this.photo.setScale(0.06);
      ////scene.physics.add.existing(this.photo);
      ////scene.add.sprite(this.getCenter().x, this.getCenter().y, "cat")
      ////scene.add.sprite(this.getCenter().x, this.getCenter().y, "cat")

      this.button = scene.physics.add.sprite(0,0, "talk");
      this.button.setPosition(scene.cameras.main.centerX,scene.cameras.main.centerY+220);
      this.button.setInteractive({ useHandCursor: true });
      this.button.setScrollFactor(0,0);
      this.button.setScale(3);
      scene.input.setDraggable(this.button);
      scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
          gameObject.x = dragX;
          gameObject.y = dragY;
      });
      let arr = [];
      let count = 0;
      for(let i = 0; i < 500; i++) {
          arr.push(new Talk(scene).setPosition(-59 , -50));
      }

      scene.input.on('dragend', function(pointer, gameObject) {
          console.log(scene.input.x, scene.input.y)
          arr[count].setPosition(pointer.worldX, pointer.worldY);
          gameObject.setPosition(scene.cameras.main.centerX,scene.cameras.main.centerY+220);
          scene.postTalk(arr[count]);
          scene.talkList.push(arr[count]);
      });
    }
}
