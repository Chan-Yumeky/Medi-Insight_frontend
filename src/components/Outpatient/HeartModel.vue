<template>
    <div ref="rendererContainer" class="three-container"></div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const rendererContainer = ref(null);
const modelPath = "/models/model.fbx"; // 替换为你的实际模型路径

let renderer, scene, camera, controls, animationFrameId;

onMounted(() => {
    // 初始化场景、相机、渲染器
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        900
    );
    camera.position.set(100, 50, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xb143b); // 设置白色背景
    rendererContainer.value.appendChild(renderer.domElement);

    // 添加摄像头控制器
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 加载模型
    const loader = new FBXLoader();
    loader.load(
        modelPath,
        (fbx) => {
            fbx.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xffffff, // 纯白色材质
                        roughness: 0.5,
                        metalness: 0.0,
                    });
                }
            });

            fbx.scale.set(0.01, 0.01, 0.01); // 调整缩放
            scene.add(fbx);
        },
        undefined,
        (error) => {
            console.error("Error loading FBX model:", error);
        }
    );

    // 渲染循环
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();

    // 监听窗口大小调整
    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // 在页面切换时移除资源
    onBeforeUnmount(() => {
        // 停止渲染循环
        cancelAnimationFrame(animationFrameId);

        // 清理渲染器
        renderer.dispose();

        // 清理场景中的所有对象
        scene.traverse((object) => {
            if (object.isMesh) {
                object.geometry.dispose();
                if (object.material.isMaterial) {
                    object.material.dispose();
                }
            }
        });

        // 移除 DOM 元素
        if (renderer.domElement) {
            rendererContainer.value.removeChild(renderer.domElement);
        }

        // 移除事件监听器
        window.removeEventListener("resize", onResize);

        // 清理其他引用
        renderer = null;
        scene = null;
        camera = null;
        controls = null;
    });
});
</script>

<style>
.three-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}
</style>
