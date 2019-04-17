import { Text, Bitmap } from "@createjs/easeljs";
import config from "./config";
import mouseImg from "./img/mouse.png";

let maskText;
let mouseBitmap;

const create = (stage, stageWidth) => {
  mouseBitmap = new Bitmap(mouseImg);
  mouseBitmap.x = stageWidth / 2 + 460;
  mouseBitmap.y = 20;

  maskText = new Text(
    "点击空白区域游戏暂停\n点击内部区域游戏开始",
    `bold 12px ${config.fontFamily}`,
    config.fontColor
  );
  maskText.x = stageWidth / 2 + 490;
  maskText.y = 20;
  maskText.textAlign = "left";
  maskText.lineHeight = 16;
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
