import { Text, Bitmap } from "@createjs/easeljs";
import config from "./config";
import mouseImg from "./img/mouse.png";

let maskText;
let mouseBitmap;

const create = (stage, stageWidth) => {
  mouseBitmap = new Bitmap(mouseImg);
  mouseBitmap.x = stageWidth / 2 - 80;
  mouseBitmap.y = 150;
  mouseBitmap.scaleX = 1.8;
  mouseBitmap.scaleY = 1.8;

  maskText = new Text(
    "点击空白区域游戏暂停\n点击内部区域游戏开始",
    `bold 18px ${config.fontFamily}`,
    config.fontColor
  );
  maskText.x = stageWidth / 2 + 60;
  maskText.y = 150;
  maskText.textAlign = "center";
  maskText.lineHeight = 30;
  stage.addChild(mouseBitmap, maskText);
};

const hide = () => {
  mouseBitmap.alpha = 0;
  maskText.alpha = 0;
};

const show = () => {
  mouseBitmap.alpha = 1;
  maskText.alpha = 1;
};

export default {
  create,
  hide,
  show
};
