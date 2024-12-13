<template>
    <div class="wrapper">
        <div ref="threeContainer" class="three-container"></div>
    </div>
</template>
<script setup>
import * as THREE from 'three';
import { ref,onMounted } from 'vue';
const threeContainer = ref(null);

onMounted(() => {
  if (threeContainer.value) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, threeContainer.value.clientWidth / threeContainer.value.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(threeContainer.value.clientWidth, threeContainer.value.clientHeight);
    threeContainer.value.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  } else {
    console.error("threeContainer ref 未找到");
  }
});
</script>
<style scoped>
.wrapper {
    height: 100%;
    width: 100%;
}

.three-container {
    width: 100%;
    height: 100%;
}
</style>