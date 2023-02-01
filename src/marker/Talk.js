import Phaser from "phaser";

export default class Talk extends Phaser.Physics.Arcade.Image {

    constructor(scene) {
        super(scene, 450, 450, "talk");
        this.scale = 1;
        this.alpha = 1;

        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerup', this.popup, scene);
    }

    popup(){
        let board = this.add.sprite(this.m_player.getCenter().x, this.m_player.getCenter().y, "board");
        this.m_canMove = false;
        /***
         let text = this.add.text(board.getTopLeft().x, board.getTopLeft().y, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setOrigin(0);
         let graphics = this.make.graphics();
         graphics.fillRect(this.m_player.getCenter().x, this.m_player.getCenter().y, 205, 141);
         let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
         text.setMask(mask);
         //let zone = this.add.zone(board.getTopLeft(), board.getTopLeft(), 205, 141).setOrigin(0).setInteractive();

         this.m_container = this.add.container(board.x, board.y)
         this.m_container.content = container.scene.add.text(
         container.x - container.width / 2,
         container.y - container.height / 2,
         "", container.defaultStyles
         )
         ***/

        let graphics = this.make.graphics();

        // graphics.fillStyle(0xffffff);
        graphics.fillRect(board.getTopLeft().x, board.getTopLeft().y, 150, 150);

        var mask = new Phaser.Display.Masks.GeometryMask(this.scene, graphics);

        var text = this.add.text(board.getTopLeft().x+10, board.getTopLeft().y+10, ["abc defgh ijklm nopq rsq uvwxyz", "abcdefghijklmnopqrsquvwxyz"], { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 205 } }).setOrigin(0);

        text.setMask(mask);

        //  The rectangle they can 'drag' within
        var zone = this.add.zone(board.getTopLeft().x, board.getTopLeft().y, 150, 150).setOrigin(0).setInteractive();
    }
}
