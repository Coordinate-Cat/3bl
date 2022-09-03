# 3bl

https://coordinate-cat.github.io/3bl/  
or  
`vscode live server`

## ref
- three.js bg color
  - https://stackoverflow.com/questions/16177056/changing-three-js-background-to-transparent-or-other-color
- example
  - https://notetoself-dy.com/blender-threejs-gltf/

## model is dirty?
https://ics.media/tutorial-three/renderer_resize/

```javascript
onResize();
// リサイズイベント発生時に実行
window.addEventListener('resize', onResize);

function onResize() {
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
```


## asset
- amongus
  - https://sketchfab.com/3d-models/among-us-map-the-skeld-59a93886f9e74ff6836dff0c269da45f