/* eslint-disable */
import { Stage, Bitmap, Ticker, Sprite, SpriteSheet } from "@createjs/easeljs";
import { hit } from "./uitls";
import PlayMask from "./playMask";
import StopMask from "./stopMask";
import Tip from "./tip";
import bgImg from "./img/bg.png";
// import starImg from "./img/star.png";
import fruit1Img from "./img/fruit1.png";
import fruit2Img from "./img/fruit2.png";
import squirrelImg from "./img/self.png";

const FRUIT_NUM = 5;
const FRUIT_HEIGHT = 60;
const SQUIRREL_WIDTH = 196;
const SQUIRREL_HEIGHT = 200;

let canvasId;
let isPlay = false;
let stageWidth = document.body.clientWidth;
let stageHeight = 600;
let stage;
let backgroundBitmap;
let starBitmap;
let fruitBitmaps = [];
let squirrelSprite;

const tickHandler = () => {
  // starBitmap.x += 10;
  // if (starBitmap.x > stage.canvas.width) {
  //   starBitmap.x = 0;
  // }
  StopMask.hide();
  fruitBitmaps.forEach(n => {
    if (n.y > stageWidth + FRUIT_HEIGHT) {
      n.y = -FRUIT_HEIGHT;
      n.x = Math.floor(Math.random() * 1200) + 40;
      n.alpha = 1;
    }
    let isHit = hit(
      {
        x: squirrelSprite.x,
        y: squirrelSprite.y,
        w: SQUIRREL_WIDTH,
        h: SQUIRREL_HEIGHT
      },
      {
        x: n.x,
        y: n.y,
        w: n.image.width,
        h: n.image.height
      }
    );
    if (isHit) {
      n.alpha = 0;
    }
    n.y += n.speed;
  });
  stage.update();
};
let lastStageX = 0;
const mousemoveStart = e => {
  if (e.stageX < 100 || e.stageX > 1180) {
    return;
  }
  if (lastStageX > e.stageX) {
    squirrelSprite.gotoAndPlay("left");
  } else {
    squirrelSprite.gotoAndPlay("right");
  }
  lastStageX = e.stageX;
  squirrelSprite.x = e.stageX - SQUIRREL_WIDTH / 2;
};

function init({ id }) {
  document.getElementById(id).width = stageWidth < 1280 ? 1280 : stageWidth;
  document.getElementById(id).height = stageHeight;
  canvasId = id;
  stage = new Stage(id);

  backgroundBitmap = new Bitmap(bgImg);
  stage.addChild(backgroundBitmap);

  // starBitmap = new Bitmap(starImg);
  // starBitmap.x = 50;
  // starBitmap.y = 50;
  // stage.addChild(starBitmap);
  let squirrelSheet = new SpriteSheet({
    framerate: 30,
    images: [squirrelImg],
    frames: {
      regX: 0,
      height: SQUIRREL_HEIGHT,
      count: 2,
      regY: 0,
      width: SQUIRREL_WIDTH
    },
    animations: {
      left: 0,
      right: 1
    }
  });
  squirrelSprite = new Sprite(squirrelSheet, "left");
  squirrelSprite.y = 260;
  squirrelSprite.x = stageWidth / 2;
  stage.addChild(squirrelSprite);

  /*
    生成松果和糖果
  */
  let i = 0;
  while (i < FRUIT_NUM) {
    let isCandy = !!Math.floor(Math.random() * 2);
    let fruitBitmap = new Bitmap(isCandy ? fruit1Img : fruit2Img);
    fruitBitmap.x = Math.floor(Math.random() * (stageHeight - 80)) + 40;
    fruitBitmap.y = -FRUIT_HEIGHT;
    fruitBitmap.speed = Math.floor(Math.random() * 10) + 10;
    stage.addChild(fruitBitmap);
    fruitBitmaps.push(fruitBitmap);
    i++;
  }
  Tip.create(stage, stageWidth, stageHeight);
  PlayMask.create(stage, stageWidth, stageHeight);
  StopMask.create(stage, stageWidth, stageHeight);
  StopMask.hide();

  setTimeout(() => {
    stage.update();
  }, 400);

  stage.addEventListener("stagemousemove", mousemoveStart);

  window.document.addEventListener("click", e => {
    if (e.target.id === canvasId) {
      isPlay = true;
      PlayMask.hide();
      Ticker.addEventListener("tick", tickHandler);
    } else {
      isPlay = false;
      StopMask.show();
      stage.update();
      Ticker.removeEventListener("tick", tickHandler);
    }
  });
}

export default init;
