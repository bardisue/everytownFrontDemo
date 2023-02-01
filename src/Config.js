import LoadingScene from "./scenes/LoadingScene";
import PlayingScene from "./scenes/PlayingScene";
// import MainScene from "./scenes/MainScene";
// import PlayingScene from "./scenes/PlayingScene";
// import GameoverScene from "./scenes/GameoverScene";

const Config = {
    type: Phaser.AUTO,
    // 맵 크기
    width: 1920 ,
    height: 1080,
    backgroundColor: 0x000000,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: [LoadingScene,
        PlayingScene],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
};

export default Config;
