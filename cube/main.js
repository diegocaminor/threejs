import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "dat.gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const axesHelper = new THREE.AxesHelper(10);
const grid = new THREE.GridHelper(20);

// const camera = new THREE.OrthographicCamera(1, 10, 10, 10, 0.1, 1000);

// Camera setup
// const aspect = window.innerWidth / window.innerHeight;
// const d = 10;
// const camera = new THREE.OrthographicCamera(
//   -d * aspect,
//   d * aspect,
//   d,
//   -d,
//   0.1,
//   1000
// );
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material = new THREE.MeshBasicMaterial({
  color: 0xff0055,
  wireframe: false,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(axesHelper);
scene.add(grid);

// camera.position.z = 2;
// camera.position.x = 0.5;
// camera.position.y = 0.5;

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffff,
  wireframe: false,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = -5;
sphere.position.y = 5;
sphere.position.z = -10;
scene.add(sphere);

// camera.position.set(0.2, 0.5, 5);
camera.position.set(-10, 30, 30);
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const gui = new dat.GUI();

const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
};
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e);
});

gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.1);
scene.add(sphere);

let step = 0;
// let speed = 0.01;
function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  step += options.speed;
  sphere.position.y = 10 * Math.sin(step);
  renderer.render(scene, camera);
}
