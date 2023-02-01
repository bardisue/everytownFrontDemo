

import Phaser from 'phaser';
import logoImg from './afsf/logo.png';
import car from './afsf/car.png';
import tiles from './afsf/drawtiles.png';
import grid from './afsf/grid.csv';

import Block from './Block';


import brawler from "./afsf/brawler48x48.png"

let Example = {
    preload () {
        this.load.image('car', car);
    },
    create () {
        let buttonPos = { x:0, y:0};
        let buttonPlaceholder = this.add.image(buttonPos.x, buttonPos.y).setOrigin(0, 0);
        buttonPlaceholder.setTexture('car');
        let button = this.add.image(buttonPos.x, buttonPos.y ).setOrigin(0, 0);
        button.setTexture('car');

        let a = this.physics.add.image(200, 700, 'car' ).setOrigin(0, 0);
        this.add.existing(a);
        this.physics.add.existing(a);
        a.body.setAllowGravity(false);

        this.physics.world.setBounds(0,0,400,800);
        this.physics.world.gravity.y = 60;


        this.isDragging = false;

        button.setInteractive({ useHandCursor: true });
        this.input.setDraggable(button);

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        let name = 'card-back';
        let arr = [];
        let count = 0;
        let loader = new Phaser.Loader.LoaderPlugin(this);
        for(let i = 0; i < 500; i++){
            arr.push(new Block(this));
        }

        this.input.on('dragend', function(pointer, gameObject, dragX, dragY) {
            loader.image(name, car);
            loader.once(Phaser.Loader.Events.COMPLETE, () => {
                arr[count].setTexture(name);
                arr[count].setGravity(0,300);
            });
            arr[count].setPosition(gameObject.x, gameObject.y);
            arr[count].setVelocity(0);
            arr[count].setGravity(0,300);
            loader.start();
            gameObject.x = buttonPos.x;
            gameObject.y = buttonPos.y;
            count += 1;
        });
    },
}

const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 800,
    scene: [ Example ],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        },
    },
};

const game = new Phaser.Game(config);

/***
import Phaser from 'phaser';

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('ship', 'http://labs.phaser.io/assets/sprites/fmship.png');
        this.load.tilemapTiledJSON('map', 'http://labs.phaser.io/assets/tilemaps/maps/super-mario.json');
        this.load.image('tiles1', 'http://labs.phaser.io/assets/tilemaps/tiles/super-mario.png');
    }
    create ()
    {
        let platforms;
        //this.cameras.main.setBounds(0, 0, 3392, 100);
        this.physics.world.setBounds(0, 0, 3392, 240);
        platforms = this.physics.add.staticGroup();

        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
        var layer = map.createLayer('World1', tileset, 0, 0);

        this.physics.add. (map);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.ship = this.physics.add.image(400, 100, 'ship').setAngle(90).setCollideWorldBounds(true);
        // this.ship = this.add.image(400, 100, 'ship').setAngle(90);

        //this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);

        //this.cameras.main.setZoom(4);
    }

    update ()
    {
        this.ship.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.ship.setAngle(-90).setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.setAngle(90).setVelocityX(200);
        }

        if (this.cursors.up.isDown)
        {
            this.ship.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.ship.setVelocityY(200);
        }
    }

    updateDirect ()
    {
        if (this.cursors.left.isDown && this.ship.x > 0)
        {

            const tile = this.layer.getTileAtWorldXY(this.ship.x - 32, this.ship.y, true);
            console.log(tile.index);

            if (tile.index === 12)
            {
                //  Blocked, we can't move
            }
            else
            {
                this.ship.setAngle(-90);
                this.ship.x -= 2.5;
            }

        }
        else if (this.cursors.right.isDown && this.ship.x < 3392)
        {
            this.ship.setAngle(90);
            this.ship.x += 2.5;
        }

        if (this.cursors.up.isDown && this.ship.y > 0)
        {
            this.ship.y -= 2.5;
        }
        else if (this.cursors.down.isDown && this.ship.y < 240)
        {
            this.ship.y += 2.5;
        }
    }

}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: [ Example ]
};

const game = new Phaser.Game(config);
***/
