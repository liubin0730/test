import { Text } from "@createjs/easeljs";
import config from "./config";

let maskText1;
let maskText2;

const create = (stage, stageWidth) => {
  // maskShape = new Shape();
  // maskShape.graphics.beginFill("#000000").drawRect(0, 0, stageWidth, stageHeight);
  // maskShape.alpha = 0.2;
  // stage.addChild(maskShape);

  maskText1 = new Text(
    "入学小码王30天的7岁孩子作品",
    `bold 36px ${config.fontFamily}`,
    config.fontColor
  );
  maskText1.x = stageWidth / 2;
  maskText1.y = 180;
  maskText1.textAlign = "center";
  maskText1.textBaseline = "alphabetic";

  maskText2 = new Text(
    "点击画面开始水果",
    `bold 18px ${config.fontFamily}`,
    config.fontColor
  );
  maskText2.x = stageWidth / 2;
  maskText2.y = 240;
  maskText2.textAlign = "center";
  maskText2.textBaseline = "alphabetic";
  stage.addChild(maskText1, maskText2);
};

const hide = () => {
  maskText1.alpha = 0;
  maskText2.alpha = 0;
};

const show = () => {
  maskText1.alpha = 0.2;
  maskText2.alpha = 1;
};

export default {
  create,
  hide,
  show
};
