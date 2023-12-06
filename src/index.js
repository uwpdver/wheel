import * as PIXI from 'pixi.js';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';

const app = new PIXI.Application({ background: '#ffffff', resizeTo: window });

document.body.appendChild(app.view);

const sector = new PIXI.Graphics()
const border = new PIXI.Graphics()
const centerPoint = new PIXI.Point(400, 400);
const length = 6;
const radius = 400
const anglePerCell = (2 * Math.PI) / length;
const initAngle = 0;
const d = 8

for (let i = 0; i < length; i++) {
  const startAngle = initAngle + anglePerCell * i;
  const pi = new PIXI.Point(centerPoint.x + Math.cos(startAngle) * radius, centerPoint.y + Math.sin(startAngle) * radius); 

  sector.moveTo(centerPoint.x, centerPoint.y)
    .beginFill((i % 2) ? 0xDD0085 : 0x6D05AC)
    .lineTo(pi.x, pi.y)
    .arc(centerPoint.x, centerPoint.y, radius, startAngle, startAngle + anglePerCell)
    .lineTo(centerPoint.x, centerPoint.y)
    .endFill();


  const angle2 = startAngle - 1.5 * Math.PI;
  const angle3 = startAngle - 0.5 * Math.PI;
  const p1 = new PIXI.Point(centerPoint.x + Math.cos(angle2) * 0.5 * d, centerPoint.y + Math.sin(angle2) * 0.5 * d);
  const p2 = new PIXI.Point(centerPoint.x + Math.cos(angle3) * 0.5 * d, centerPoint.y + Math.sin(angle3) * 0.5 * d);
  border.moveTo(centerPoint.x, centerPoint.y)
  .beginFill(0xFFF171)
  .moveTo(p1.x, p1.y)
  .lineTo(pi.x, pi.y)
  .lineTo(p2.x, p2.y)
  .lineTo(p1.x, p1.y)
  .endFill()
}

const selectSectorOutline = new PIXI.Graphics();
selectSectorOutline.lineStyle(8, 0xFFFFFF, 1);
const outlineStartAngle = initAngle - anglePerCell * 0.5 - 0.5 * Math.PI;
selectSectorOutline
.moveTo(centerPoint.x, centerPoint.y)
.lineTo(centerPoint.x + Math.cos(outlineStartAngle) * radius, centerPoint.y + Math.sin(outlineStartAngle) * radius)
.arc(centerPoint.x, centerPoint.y, radius, outlineStartAngle, outlineStartAngle + anglePerCell)
.lineTo(centerPoint.x, centerPoint.y);

const selectSectorOutline1 = new PIXI.Graphics();
selectSectorOutline1
.lineStyle(8, 0xFFF171, 1)
.moveTo(centerPoint.x, centerPoint.y)
.lineTo(centerPoint.x + Math.cos(outlineStartAngle) * radius, centerPoint.y + Math.sin(outlineStartAngle) * radius)
.arc(centerPoint.x, centerPoint.y, radius, outlineStartAngle, outlineStartAngle + anglePerCell)
.lineTo(centerPoint.x, centerPoint.y);
selectSectorOutline1.filters = [new PIXI.BlurFilter(7, 1, 1)]

const selectSectorOutline2 = new PIXI.Graphics();
selectSectorOutline2
.lineStyle(4, 0xFFF171, 1)
.moveTo(centerPoint.x, centerPoint.y)
.lineTo(centerPoint.x + Math.cos(outlineStartAngle) * radius, centerPoint.y + Math.sin(outlineStartAngle) * radius)
.arc(centerPoint.x, centerPoint.y, radius, outlineStartAngle, outlineStartAngle + anglePerCell)
.lineTo(centerPoint.x, centerPoint.y);
selectSectorOutline2.filters = [new PIXI.BlurFilter(4, 1, 1)]

const selectSectorOutline3 = new PIXI.Graphics();
selectSectorOutline3
.lineStyle(4, 0xFFFFFF, 1)
.moveTo(centerPoint.x, centerPoint.y)
.lineTo(centerPoint.x + Math.cos(outlineStartAngle) * radius, centerPoint.y + Math.sin(outlineStartAngle) * radius)
.arc(centerPoint.x, centerPoint.y, radius, outlineStartAngle, outlineStartAngle + anglePerCell)
.lineTo(centerPoint.x, centerPoint.y);

const container = new PIXI.Container();
container.x = centerPoint.x;
container.y = centerPoint.y;
sector.x = -radius;
sector.y = -radius;

border.x = -radius;
border.y = -radius;
border.filters = [new DropShadowFilter({x: 0, y: 0, color: 0x000000, alpha: 0.25, blur: 4, distance: 1})]

// 使用 loader 加载图片资源
const sprite = PIXI.Sprite.from('/bottom.png')
sprite.anchor.set(0.5, 0.6);
sprite.x = centerPoint.x;
sprite.y = centerPoint.y;
sprite.width = 200;
sprite.height = (151 / 112) * 200;

container.addChild(sector)
container.addChild(border)
app.stage.addChild(container);
app.stage.addChild(selectSectorOutline);
app.stage.addChild(selectSectorOutline1);
app.stage.addChild(selectSectorOutline2);
app.stage.addChild(selectSectorOutline3);
app.stage.addChild(sprite);

const maxV = 0.15
const a = 0.001
let v = 0
app.ticker.add((delta) => {
  if ((container.rotation < 2 * Math.PI) && v < maxV) {
    v = v + a
  } else {
    v = v -a
  }
  container.rotation += v * delta;
});