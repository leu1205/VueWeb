//const PIXI = require('pixi.js');
const Application = PIXI.Application;
const Container = PIXI.Container;
const Graphics = PIXI.Graphics;
const loader = PIXI.loader;
const ParticleContainer = PIXI.particles.ParticleContainer;
const Rectangle = PIXI.Rectangle;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;
const Text = PIXI.Text;
const TextureCache = PIXI.utils.TextureCache;

var game, app, stageW, stageH;

//window.onload = function() {
game = document.getElementById('game');
app = new Application({width:game.clientWidth,height:game.clientHeight,backgroundColor:0x00ccff});
stageW = app.renderer.width;
stageH = app.renderer.height;
game.appendChild(app.view);

loader
.add('tileset','https://raw.githubusercontent.com/Zainking/LearningPixi/master/examples/images/tileset.png')
.on('progress',loadProgressHandler)
.load(setup);
//}

function loadProgressHandler(loader,resource) {
  console.log("loading:" + resource.name);
}

var gameScene = new Container();
var gameOverScene = new Container();
var barriers = new ParticleContainer();
let rocket, barrier1, barrier2, state, message, points, score, timeout_id;

function setup () {
  message = new Text("Flappy Rocket",{fontSize:42,fill:'white'});
  message.pivot.set(message.width/2,message.height/2);
  message.position.set(stageW/2,stageH/3);
  score = new Text("Score:" + points);
  rocket = drawRocket();
  move();
  gameReset();
  state = start;
  
  let againButton = drawButton("Again?");
  againButton.on('pointerdown', play);
  
  gameOverScene.addChild(againButton);
  app.stage.addChild(gameScene);
  app.stage.addChild(gameOverScene);
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
  state(delta);
  if(hitTest(rocket,barrier1)||hitTest(rocket,barrier2)||OutofRange(rocket,{x:0,y:0,width:stageW,height:stageH})){
    state = end;
  }
}

function gameReset(){
  let startButton = drawButton("Start");
  startButton.on('pointerdown', begin);
  startButton.name = "startButton";
  
  barriers.removeChildren();
  gameScene.removeChildren();
  
  message.text = "Flappy Rocket";
  
  points = 0;
  score.text = "Score:" + points;
  
  rocket.position.set(stageW * 0.1, stageH * 0.5);
  
  barrierReset();
  barriers.position.set(stageW-barrier1.width, 0);

  gameScene.addChild(message);
  gameScene.addChild(score);
  gameScene.addChild(barriers);
  gameScene.addChild(rocket);
  gameScene.addChild(startButton);
}

function barrierReset(){
  let barrierH = randomInt(stageH/20, stageH*2/3);
  barriers.removeChild();
  barrier1 = drawBarrier(barrierH);
  barrier2 = drawBarrier(stageH-barrierH-(rocket.height*2));
  barrier2.y = stageH - barrier2.height;
  barriers.addChild(barrier1);
  barriers.addChild(barrier2);
}

function start(){
  gameScene.visible = true;
  gameOverScene.visible = false;
}

function begin(){
  state = play;
  showScore();
}

function play(delta){
  if(state === end){
    gameReset();
    start();
    begin();
  }
  rocketMove(delta);
  barrierMove(delta);
  gameScene.getChildByName("startButton").visible = false;
  if(barrier1.getGlobalPosition().x + barrier1.width <= 0){
    barrierReset();
    barriers.x = stageW;
  }
}

function end(){
  clearTimeout(timeout_id);
  gameOverScene.addChild(message);
  message.text　=　"Game Over！\n  Score:" + points;
  gameScene.visible = false;
  gameOverScene.visible = true;
}

function showScore(){
  points += 1; 
  score.text = "Score:" + points;
  timeout_id = setTimeout(showScore,1000);
}

function hitTest(ob1,ob2){
  let hit, combinedWidth, combinedHeight, dx, dy;
  
  ob1.halfWidth = ob1.width/2;
  ob1.halfHeight = ob1.height/2;
  ob2.halfWidth = ob2.width/2;
  ob2.halfHeight = ob2.height/2;
  
  ob1.centerX = ob1.getGlobalPosition().x + ob1.halfWidth;
  ob1.centerY = ob1.getGlobalPosition().y + ob1.halfHeight;
  ob2.centerX = ob2.getGlobalPosition().x + ob2.halfWidth;
  ob2.centerY = ob2.getGlobalPosition().y + ob2.halfHeight;
  
  combinedWidth = ob1.halfWidth + ob2.halfWidth;
  combinedHeight = ob1.halfHeight + ob2.halfHeight;
  
  dx = Math.abs(ob1.centerX - ob2.centerX);
  dy = Math.abs(ob1.centerY - ob2.centerY);
  
  if(dx < combinedWidth){
    if(dy < combinedHeight){
      hit = true;
    }
  }else{
    hit = false;
  }
  return hit;
}

function OutofRange(sprite,container){
  let out;
  if(sprite.getGlobalPosition().x < container.x){
    out = true;
  }
  else if(sprite.getGlobalPosition().y < container.y){
    out = true;
  }
  else if(sprite.getGlobalPosition().x + sprite.width > container.width){
    out = true;
  }
  else if(sprite.getGlobalPosition().y + sprite.height > container.height){
    out = true;
  } 
  else {
    out = false;
  }
  return out;
}

function rocketMove(delta){
  rocket.x += rocket.vx;
  rocket.y += rocket.vy;
}

function barrierMove(delta){
  barrier1.x -= barrier1.vx;
  barrier2.x -= barrier2.vx;
}

function drawButton(text){
  let graphic = new Graphics();
  let buttonText = new Text(text,{fontSize:42,fill:'white'});

  buttonText.anchor.set(0.5,0.5);
  buttonText.position.set(125,25);
  
  graphic.beginFill(0,0);
  graphic.lineStyle(4, 0xffffff, 1);
  graphic.moveTo(50,0);
  graphic.lineTo(250,0);
  graphic.lineTo(200,50);
  graphic.lineTo(0,50);
  graphic.lineTo(50,0);
  graphic.endFill();
  graphic.addChild(buttonText);

  let button = new Sprite(graphic.generateTexture());
  
  button.anchor.set(0.5,0.5);
  button.position.set(stageW/2,stageH*3/4);
  button.interactive = true;
  button.buttonMode = true;

  return button;
}

function drawBarrier(h){
  let graphic = new Graphics();
  
  graphic.beginFill(0x00ff00);
  graphic.drawRect(0,0,64,h);
  graphic.endFill();
  
  let barrierTexture = graphic.generateTexture();
  let barrier = new Sprite(barrierTexture);
  
  barrier.vx = 2;
  
  return barrier;
}

function drawRocket(){
  let texture = TextureCache.tileset;
  let fetch = new Rectangle(192,128,64,64);

  texture.frame = fetch;
  
  let sprite = new Sprite(texture);
  
  sprite.pivot.set(32,32);
  sprite.vx = 0;
  sprite.vy = 0;
  
  return sprite;
}

function move() {
  let up = keyboard(87),
      left = keyboard(65),
      right = keyboard(68),
      down = keyboard(83);
  
  up.press = () => {
    rocket.vy = -2;
  };
  up.release = () => {
    if(!down.isDown)rocket.vy = 0;
  };
  down.press = () => {
    rocket.vy = 2;
  }
  down.release = () => {
    if(!up.isDown)rocket.vy = 0;
  }
  left.press = () => {
    rocket.vx = -2;
  }
  left.release = () => {
    if(!right.isDown)rocket.vx = 0;
  }
  right.press = () => {
    rocket.vx = 2;
  }
  right.release = () => {
    if(!left.isDown)rocket.vx = 0;
  }
}

function keyboard(keyCode){
  let key = {};
  key.code = keyCode;
  key.isUp = true;
  key.isDown = false;
  key.press = undefined;
  key.release = undefined;
  key.downHandler = event => {
    if(event.keyCode === key.code){
      if(key.isUp && key.press)key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  }
  key.upHandler = event => {
    if(event.keyCode === key.code){
      if(key.isDown && key.release)key.release();
      key.isDown = false;
      key.isUp = true
    }
    event.preventDefault();
  }
  window.addEventListener("keydown", key.downHandler.bind(key));
  window.addEventListener("keyup", key.upHandler.bind(key));
  
  return key;
}

function randomInt(min,max){
  return Math.floor(Math.random()*(max-min+1))+Math.floor(min);
}