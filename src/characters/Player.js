export const Direction = Object.freeze({
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
});
export default class Player extends Phaser.Physics.Arcade.Image {

    constructor(scene) {
        super(scene, 400, 400, "cat");
        this.scale = 0.2;
        this.alpha = 1;

        this.canMove = true;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

    }



    npByEnemy(damage) {
    }
    sleep(milliseconds) {
        const start = Date.now();
        while ((Date.now() - start) < milliseconds);
    }

    async move(direction) {
        switch (direction) {

            case Direction.Up:
                this.setVelocityY(-200);
                break;

            case Direction.Down:
                this.setVelocityY(200);

                break;

            case Direction.Left:
                this.setVelocityX(-200);
                this.flipX = true;
                break;

            case Direction.Right:
                this.setVelocityX(200);
                this.flipX = false;
                break;
        }
    }

    stop() {
        this.setVelocity(0, 0);
    }
}
