import kaboom from "kaboom";

kaboom({
  font: "sinko",
  canvas: document.querySelector("#mycanvas"),
  background: [0, 0, 255],
});

loadSprite("bg", "sprites/background.png");
loadSprite("grass", "sprites/download.png");

loadBean();
const HERO_SPEED = 400;
let map = [];
function genmap() {
  let xpush = [];
  for (let i = 0; i < width() / 64; i++) {
    xpush.push(" ");
  }
  let xpu = xpush.join("");
  // add character to screen, from a list of components
  for (let i = 0; i < (height() - 64) / 64; i++) {
    map.push(xpu);
  }
  let uxpush = [];
  for (let i = 0; i < width() / 64; i++) {
    uxpush.push("=");
  }
  map.push(uxpush.join(""));
}
genmap()

const level_config = {
  width: 64,
  height: 64,
  "=": () => [sprite("grass"), "block", area(), solid()],
};
add([sprite("bg", { width: width(), height: height() })]);
const player = add([
  sprite("bean"), // renders as a sprite
  pos(0, 80), // position in world
  area(), // has a collider
  body(),
  "player",
]);
// jump when player presses "space" key
if (player.grounded) {
  onKeyDown("d", () => {
    player.move(HERO_SPEED, 0);
  });
  onKeyDown("a", () => {
    player.move(-HERO_SPEED, 0);
  });
}
onKeyDown("space", () => {
  player.jump(500);
});

const game_level = addLevel(map, level_config);
