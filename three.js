// -------------- import ----------------
import * as THREE from'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

// -------------- variables ----------------
let camera;
let scene;
let renderer;
let model;

// ---------------- init() ----------------
function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // カメラの作成
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  // カメラセット
  camera.position.set(1, 1, 1);
  camera.lookAt(new THREE.Vector3(0, 0, 4.5));

  // 滑らかにカメラコントローラーを制御する
  const controls = new OrbitControls(camera, document.body);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 光源1
  const firstLight = new THREE.SpotLight(0xffffff, 1); //color,強度
  firstLight.position.set(0, 20, 10);
  scene.add(firstLight);

  // 光源2
  const secondLight = new THREE.SpotLight(0xffffff, 1); //color,強度
  secondLight.position.set(0, 20, 90);
  scene.add(secondLight);

  // ヘルパーを作成
  // const lightHelper = new THREE.SpotLightHelper(dirLight);
  // scene.add(lightHelper);

  // 背景色
  const background = new THREE.Color(0x222222);
  scene.background = background;

  // レンダラー
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // glbファイルの読み込み
  const loader = new GLTFLoader();
  loader.load('./model/マークザッカーバーグ.glb', function(gltf) {
    model = gltf.scene;
    model.traverse((object) => {           //モデルの構成要素
      if(object.isMesh) {                  //その構成要素がメッシュだったら
        object.material.trasparent = true; //透明許可
        object.material.opacity = 0.8;       //透過
        object.material.depthTest = true;  //陰影で消える部分
      }})
    scene.add(model);
  }, undefined, function(e) {
    console.error(e);
  });

  // htmlのid取得
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
}

// ---------------- onResize() ----------------
// リサイズイベント発生時に実行
window.addEventListener('resize', onResize);

function onResize(e) {
  // サイズを取得
  const width = window.innerWidth;
  const height = window.innerHeight;

  // レンダラーのサイズを調整する
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // カメラのアスペクト比を正す
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// ---------------- animate() ----------------
function animate() {
  requestAnimationFrame(animate);
  // model.rotation.x += 0.001;	// x軸方向に回転
  // model.rotation.y += 0.005;	// y軸方向に回転
  // model.rotation.z += 0.0001;	// z軸方向に回転
  renderer.render(scene, camera);
}

init();
onResize();
animate();
