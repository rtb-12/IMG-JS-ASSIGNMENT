import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(3.45, 1.39, 19.22);

class Box extends THREE.Mesh {
  constructor({
    width,
    height,
    depth,
    color = 0x00ff00,
    velocity = {
      x: 0,
      y: 0,
      z: 0,
    },
    position = { x: 0, y: 0, z: 0 },
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshPhongMaterial({ color })
    );
    this.height = height;
    this.width = width;
    this.depth = depth;
    this.position.set(position.x, position.y, position.z);
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.velocity = velocity;
    this.gravity = -0.004;
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
  }

  updateSide(ground) {
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
    if (
      (this.left > ground.right ||
        this.right < ground.left ||
        this.back > ground.front ||
        this.front < ground.back) &&
      this.bottom < ground.top
    ) {
      this.velocity.y += this.gravity * 70;

      // reverse and reduce the velocity
    }
  }
  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.applyGravity();
    this.updateSide(ground);
  }
  applyGravity() {
    if (this.bottom <= ground.top) {
      this.velocity.y *= -0.6; // reverse and reduce the velocity
    } else {
      this.velocity.y += this.gravity; // apply gravity
    }
  }
}

function boxCollision({ box1, box2 }) {
  const xCollision = box1.right >= box2.left && box1.left <= box2.right;
  const yCollision =
    box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom;
  const zCollision = box1.front >= box2.back && box1.back <= box2.front;

  return xCollision && yCollision && zCollision;
}

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false;
const cube = new Box({
  width: 1,
  height: 1,
  depth: 1,
  color: "#F1FAEE",
  position: { x: 0, y: 0, z: 0 },
  velocity: { x: 0, y: 0, z: 0 },
});
cube.castShadow = true;
scene.add(cube);

const ground = new Box({
  width: 10,
  height: 0.25,
  depth: 45,
  color: "#1D3557",
  position: { x: 0, y: -2, z: 0 },
});
// ground.position.y = -2
ground.receiveShadow = true;
scene.add(ground);

const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(0, 1, 3);
light.castShadow = true;
scene.add(light);
camera.position.z = 5;

const ambientLight = new THREE.AmbientLight(0x404040, 1); // add ambient light
scene.add(ambientLight);

const enemies = [];
const enemiesEliminated = [];





function spawnEnemies(Zaccelleration = 0) {
  const enemy = new Box({
    width: 1,
    height: 1,
    depth: 1,
    color: "#E63946",
    velocity: { x: 0, y: 0, z: 0.1 + Zaccelleration },
    position: {
      x: (Math.random() - 0.5) * 10,
      y: 0,
      z: -20,
    },
  });
  enemy.castShadow = true;
  enemies.push(enemy);
  scene.add(enemy); // Add enemy to the scene
}

let frames = 0;
let spawnrate = 200;

function animate() {
  const animationID = requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (keys.a.pressed) {
    cube.velocity.x = -0.1;
  } else if (keys.d.pressed) {
    cube.velocity.x = 0.1;
  } else {
    cube.velocity.x = 0;
  }

  if (keys.w.pressed) {
    cube.velocity.z = -0.1;
  } else if (keys.s.pressed) {
    cube.velocity.z = 0.1;
  } else {
    cube.velocity.z = 0;
  }

  if (keys.space.pressed && cube.bottom <= ground.top) {
    cube.velocity.y = 0.12; // make the cube jump
  }

  cube.update();
  if(cube.bottom <= ground.top*4){
    alert("Game Over , Retry");
    location.reload();
  } 
  enemies.forEach((enemy) => {
    enemy.update();
    if (boxCollision({ box1: cube, box2: enemy })) {
      cancelAnimationFrame(animationID);
      alert("Game Over , Retry");
      location.reload();
    }
  });
  if (frames % spawnrate === 0) {
    if (spawnrate > 20) {
      spawnrate -= 20;
    }
    spawnEnemies(frames / 10000);
  }
  frames++; 
  document.getElementById("score").innerText = `${Math.floor(frames / 50)}`;
}

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  space: {
    pressed: false,
  },
};
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "w":
      keys.w.pressed = true;

      break;
    case " ":
      keys.space.pressed = true;

      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case " ":
      keys.space.pressed = false;
  }
});
animate();
