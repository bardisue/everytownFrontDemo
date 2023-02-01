import Phaser from 'phaser';
import Config from "../Config";
import Player, { Direction } from '../characters/Player';
import Structure from '../objects/Tower';
import * as phaser from "phaser";
import axios, {create} from "axios";
import Talk from "../marker/Talk";
import imageHtml from "../assets/text/image.html";
import Ui from "../ui/Ui";


export default class PlayingScene extends Phaser.Scene {

   // triggerTimer = phaser.Time.TimerEvent;
    constructor() {
        super("playGame");
    }

    preload(config)
    {
        this.load.html("please", "src/assets/text/image.html")
        this.load.html("talkHtml", "src/assets/text/talkHtml.html")
        this.load.html('nameform', 'src/assets/text/nameform.html');
    }
    create(config) {

        this.talkList = []
        this.counter = 0

        this.runLogin();

       // this.m_element = this.add.dom(400, 0).createFromCache('nameform');

        this.playList = []
        // sound
        this.sound.pauseOnBlur = false;
        // background
        this.m_background = this.add.tileSprite(0, 0, Config.width, Config.height, "background");
        this.m_background.setOrigin(0, 0);
        //minimap
       // this.minimap = this.cameras.add(10, 10, 500, 500).setZoom(0.2).setName('mini');
       // this.minimap.setBackgroundColor(0x002244);
   //     this.minimap.scrollX = 1600;
      //  this.minimap.scrollY = 300;
        // player
        //this.m_player = new Player(this);
        this.m_player = new Player(this);
        this.resetCharacter();

        this.m_canMove = true;

        this.cameras.main.setBounds(0, 0, 1920, 1080);
        //this.m_player.add(new Player(this));
        this.cameras.main.startFollow(this.m_player);
        //this.cameras.main.setSize(200,200);
        this.cameras.main.setZoom(2,2);
        //this.cameras.main.setSize(3000,2000)
        //this.cameras.resize(200 ,200);
        //this.cameras.onResize(200,200);
        // keys
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        console.log(this.m_cursorKeys);

        //this.m_talk = new Talk(this);
        //Object
        /***
        this.m_click = this.add.sprite(400, 300, "bus").setInteractive()//on('pointerdown', this.popup);

        this.m_click.on('pointerup', this.popup, this);

        this.m_text = this.add.bitmapText(this.m_player.getCenter().x, this.m_player.getCenter().y, 'hyper', 'Arkanoid\nRevenge of Doh', 96);
        this.m_text.setText("YES");
        const graphics = this.add.graphics(0, 0);
        const bounds = this.m_text.getTextBounds();

        graphics.lineStyle(1, 0x00FF00, 1.0);
        graphics.strokeRect(bounds.global.x, bounds.global.y, bounds.global.width, bounds.global.height);
         ***/


        //this.m_tower.body.onWorldBounds = true;
        //this.m_tower.body.setCollideWorldBounds(false );


        this.resources = 0;
        this.timer = 0;

        this.created = false;

        this.loadObjects();

        //const text = this.add.dom(400, 400, "span", { color: "white" }, "Hello");


        /***
        var element =  this.add.dom(330, 330).createFromCache('please').setOrigin(0);
        element.setScale(0.5, 0.5)
        //this.m_element.setVisible(true);
        element.setPerspective(800);
       // let photo = this.m_element.getChildByID('Frame');
         ***/

        //UI
        this.m_ui = new Ui(this);
       // this.m_ui.setVisible(false);

       // this.m_ui.talk.setPosition(this.cameras.main.centerX-100,this.cameras.main.centerY+215);
       // this.m_ui.setPosition(this.m_player.getCenter().x,this.m_player.getCenter().y+81 )
        //this.m_ui.startFollow(this.m_player);
        //this.m_ui.setPosition(this.cameras.main.centerX,this.cameras.main.centerY+181)



        //console.log(photo)
        /***
        axios.post('http://localhost:3002/upload' ,{
            "nickname" : this.m_player.name,
            "point" : {
                "x" : this.m_player.getCenter().x,
                "y" : this.m_player.getCenter().y
            }
        },{
            withCredentials: true,
        }).then(res => {
            console.log('succes');
        }).catch(error => {
            console.log('erro', error);
        })
        ***/
    }

    postTalk(obj){
        let element =  this.add.dom(1000, 700).createFromCache('talkHtml').setScrollFactor(0);

        element.setScale(0.6)

        element.setPerspective(800);

        let post_id = this.m_id.text;
        let post_token = this.m_token;


        element.addListener('click');

        element.on('click', function (event) {
            if (event.target.name === 'submitButton')
            {
                console.log("뭐임?")
                let title = this.getChildByName('title').value;
                let content = this.getChildByName('content').value;
                console.log(obj.getCenter().x,obj.getCenter().y, post_id)

                axios.post('http://10.188.191.212:7777/marker/new/talk' ,{
                    "id" : post_id,
                    "point" : {
                        "x" : obj.getCenter().x,
                        "y" : obj.getCenter().y
                    },
                    "title" : title,
                    "contents" : content
                },{
                    headers:{
                        Authorization: post_token.text
                    },
                    withCredentials: true,
                }).then(res => {
                    element.setVisible(false);
                    console.log("success post talk")
                }).catch(error => {
                    console.log(post_token.text)
                })
            }
        });

    }


    runLogin(){
        let element =  this.add.dom(350, 300).createFromCache('please').setOrigin(0);


        this.m_token = this.add.text(-100, -100, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        this.m_id =  this.add.text(-100, -100, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        let m_id = this.m_id;
        let m_token = this.m_token;
        //this.m_player.canMove = false;
        element.setScale(1, 1)
        //this.m_element.setVisible(true);
        element.setPerspective(800);

        // let photo = this.m_element.getChildByID('Frame');

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton')
            {
                let inputUsername = this.getChildByName('username').value;
                let inputPassword = this.getChildByName('password').value;
                console.log(inputUsername,inputPassword)
                let authentication = false;
                axios.post('http://10.188.191.212:7777/auth/login' ,{
                    "id" : inputUsername,
                    "password" : inputPassword
                },{
                    withCredentials: true,
                }).then(res => {
                    let tmp = JSON.stringify(res.data)
                    let myObj = JSON.parse(tmp);
                    m_token.setText("Bearer " + myObj.accessToken)
                    m_id.setText(inputUsername);
                    console.log(m_token.text);
                    {
                        //  Turn off the click events
                        this.removeListener('click');

                        //  Tween the login form out
                        element.setVisible(false);

                        //  Populate the text with whatever they typed in as the username!
                        //text.setText('Welcome ' + inputUsername.value);
                    }
                }).catch(error => {
                    console.log(m_toekn.text())
                })
            }
        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }


    popup(){
        let board = this.add.sprite(this.m_player.getCenter().x, this.m_player.getCenter().y, "board");
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

        var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        var text = this.add.text(board.getTopLeft().x, board.getTopLeft().y, ["abc defgh ijklm nopq rsq uvwxyz", "abcdefghijklmnopqrsquvwxyz"], { fontFamily: 'Arial', color: '#00ff00', wordWrap: { width: 205 } }).setOrigin(0);

        text.setMask(mask);

        //  The rectangle they can 'drag' within
        var zone = this.add.zone(board.getTopLeft().x, board.getTopLeft().y, 150, 150).setOrigin(0).setInteractive();
    }

    loadObjects(){
         axios.get('http://10.188.191.212:7777/buildings' ,
         {'Access-Control-Allow-Credentials': '*'},{
                withCredentials: true,
            }).then(res => {
             const tmp = JSON.stringify(res.data)
             const myObj = JSON.parse(tmp);
             let len = myObj.length;
             for(let i = 0; i <len; i++) {
                 this.m_tower = new Structure(this);
                 this.m_tower.setPosition(myObj[i].point.x,myObj[i].point.y);
                 this.m_tower.setImmovable(true);
                 this.physics.add.collider(this.m_player, this.m_tower);
             }
        }).catch(error => {
            console.log('WTF', error);
        });
    }

    timerEvent(resources) {
        if(this.counter%50 !== 0){
            return
        }
        axios.defaults.withCredentials = true;
        axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        axios('http://10.188.191.212:7777/player' ,
            {},{
            }).then(res => {
            this.treatData(res.data)
            this.postPosition();
        }).catch(error => {
            console.log('erro', error);
        })

    }

    async postPosition(){
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("완료!"), 1000)
        });
        let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
        axios.post('http://10.188.191.212:7777/player/save' ,{
            "nickname" : this.m_player.name,
            "point" : {
                "x" : this.m_player.getCenter().x,
                "y" : this.m_player.getCenter().y
            }
        },{
            withCredentials: true,
        }).then(res => {
            console.log('succes');
        }).catch(error => {
            console.log('erro', error);
        })
    }

    resetCharacter(){
        /***
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("완료!"), 1000)
        });
        axios.gost('http://localhost:7777/create_userName' ,
            {'Access-Control-Allow-Credentials': '*'},{
                withCredentials: true,
            }).then(res => {
                const tmp = JSON.stringify(res.data);
                this.m_player.setName(JSON.parse(tmp).nickname);
        }).catch(error => {
            console.log('WTF', error);
        });
        this.m_player.setPosition(800,800)
        ***/
        axios.post('http://10.188.191.212:7777/player/create_userName' ,{
            "point" : {
                "x" : this.m_player.x,
                "y" : this.m_player.y
            }
        },{
            withCredentials: true,
        }).then(res => {
            const tmp = JSON.stringify(res.data);
            this.m_player.setName(JSON.parse(tmp).nickname);
            console.log('success');
        }).catch(error => {
            console.log('erro', error);
        })

        this.created = true;

        //let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
        /***
        axios.post('http://localhost:7777/users/save' ,{
            "nickname" : this.m_player.name,
                "point" : {
                "x" : 800,
                    "y" : 800
            }
        },{
                withCredentials: true,
            }).then(res => {
            console.log('succes');
        }).catch(error => {
            console.log('erro', error);
        })
        ***/
    }


    async treatData(res){
        const tmp = JSON.stringify(res)
        const myObj = JSON.parse(tmp);
        var len = myObj.length
        for(var i = 0; i <len; i++) {
            var tmpName = myObj[i].nickname
            var tmpX = myObj[i].point.x
            var tmpY = myObj[i].point.y
            if(tmpName === this.m_player.name) {
                continue;
            }
            var found = this.playList.find(element => element.name === tmpName);
            if(found === undefined){
                var nP = new Player(this);
                nP.setName(tmpName);
                nP.setPosition(tmpX,tmpY)
                this.playList.push(nP);
            }
            else{
                found.setPosition(tmpX,tmpY);
            }
            /***
            if(!this.playList.){
                var nP = new Player(this);
                nP.setName(tmpName);
                nP.setPosition(tmpX,tmpY)
                this.playList.push(nP);
            }
            else {
                var found = playList.find(element => element.name == tmpName);
                found.setPosition(tmpX,tmpY)
            }
             ***/
        }
    }

    getMarker(){
        if(this.counter%50 !== 1)
            return
        axios('http://10.188.191.212:7777/marker/all' ,
            {},{
            }).then(res => {
            let markers = JSON.parse(JSON.stringify(res.data))
            let markersLen = markers.length
            for(var i = 0; i <markersLen; i++) {
                var markerId = markers[i].id
                var markerX = markers[i].point.x
                var markerY = markers[i].point.y
                let makerType = markers[i].type
                let isExistMarker;
                if(makerType === "Talk"){
                    isExistMarker = this.talkList.find(element => element.getCenter().x === markerX && element.getCenter().y === markerY )
                    if (isExistMarker === undefined) {
                        let newMarker = new Talk(this);
                        newMarker.setPosition(markerX, markerY)
                        this.talkList.push(newMarker)
                    }
                }
            }
        }).catch(error => {
            console.log('erro', error);
        })
    }

    update() {
        this.counter += 1

        if(this.m_canMove){
            this.handlePlayerMove();
        }
        this.getMarker()

        this.timerEvent(this.resources)
        //this.m_ui.setPosition(this.cameras.main.centerX,this.cameras.main.centerY+181)
    }

    //////////////////////// FUNCTIONS ////////////////////////

    handlePlayerMove() {
        //console.log(this.m_token.text);
        if (this.keyLeft.isDown) {
            this.m_player.move(Direction.Left);
            //this.m_ui.move(Direction.Left);
        } else if (this.keyRight.isDown) {
            this.m_player.move(Direction.Right);
            //this.m_ui.move(Direction.Right);
        }

        if (this.keyUp.isDown) {
            this.m_player.move(Direction.Up);
           // this.m_ui.move(Direction.Up);
        }
        else if (this.keyDown.isDown) {
            this.m_player.move(Direction.Down);
         //   this.m_ui.move(Direction.Down);
        }

        if(!this.keyLeft.isDown && !this.keyRight.isDown){
            this.m_player.setVelocityX(0);
           // this.m_ui.setVelocityX(0);
            //this.m_ui.talk.setVelocityX(0);
            //this.m_ui.photo.setVelocityX(0);
            //this.m_ui.button.setVelocityX(0);
        }

        if(!this.keyUp.isDown && !this.keyDown.isDown){
            this.m_player.setVelocityY(0);
          //  this.m_ui.setVelocityY(0);
           // this.m_ui.talk.setVelocityY(0);
           // this.m_ui.photo.setVelocityY(0);
           // this.m_ui.button.setVelocityY(0);
        }

    }

}
