import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function Box(props: ThreeElements['mesh']) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((_, delta) => (meshRef.current.rotation.x += delta));

    // Instantiate a loader
    const loader = new GLTFLoader();

    // Load a glTF resource
    loader.load(
        // resource URL
        'https://3d-api.si.edu/content/document/3d_package:306c5849-feab-425a-86dc-ec1aed717d65/USNM016308_cranium_mandible_-600-150k-1024-low.glb',
        // 'https://api.poly.pizza/v1.1/search/{keyword}?apiKey={apiKey}',
        // called when the resource is loaded
        function (_) {

            // scene.add(gltf.scene);

            // gltf.animations; // Array<THREE.AnimationClip>
            // gltf.scene; // THREE.Group
            // gltf.scenes; // Array<THREE.Group>
            // gltf.cameras; // Array<THREE.Camera>
            // gltf.asset; // Object
            console.log("succesfully loaded gltf");

        },
        // called while loading is progressing
        function (xhr) {

            console.log((xhr.loaded / xhr.total * 100) + '% loaded');

        },
        // called when loading has errors
        function (error) {

            console.log('An error happened');
            console.log(error);

        }
    );

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(_) => setActive(!active)}
            onPointerOver={(_) => setHover(true)}
            onPointerOut={(_) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
        </mesh>
    )
}

function MainCanvas() {
    // This reference will give us direct access to the mesh
    //   const meshRef = useRef();
    // Set up state for the hovered and active state
    //   const [hovered, setHover] = useState(false);
    //   const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    //   useFrame((state, delta) => (meshRef.current.rotation.x += delta));

    // Return view, these are regular three.js elements expressed in JSX

    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>,
        </div>
    );
};

export default MainCanvas;