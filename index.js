// THREE
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

let camera;
let scene;
let renderer;
let model;

init();
animate();

function init() {
  //シーンの作成
  scene = new THREE.Scene();

  //カメラの作成
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  //カメラセット
  camera.position.set(-20, 30, 50);
  camera.lookAt(new THREE.Vector3(0, 10, 0));

    // 滑らかにカメラコントローラーを制御する
  const controls = new OrbitControls(camera, document.body);
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  //光源
  const dirLight = new THREE.SpotLight(0xffffff,1.5);//color,強度
  dirLight.position.set(-20, 30, 30);
  scene.add(dirLight);
  scene.background = new THREE.Color( 0x000000 );

  //レンダラー
  renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
  });
  renderer.setClearColor(new THREE.Color(0xffffff));
  renderer.setSize(window.innerWidth, window.innerHeight);

  //glbファイルの読み込み
  const loader = new GLTFLoader();

  loader.load('https://rawcdn.githack.com/nishi-dy/glb--files/d0a6e1e252671749fc9d80dd5e8e375f132dab56/glass.glb', function(gltf) {
      model = gltf.scene;
      model.traverse((object) => { //モデルの構成要素
          if(object.isMesh) { //その構成要素がメッシュだったら
          object.material.trasparent = true;//透明許可
          object.material.opacity = 0.8;//透過
          object.material.depthTest = true;//陰影で消える部分
          }})
      scene.add(model);
  }, undefined, function(e) {
      console.error(e);
  });
  document.getElementById("WebGL-output").appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
