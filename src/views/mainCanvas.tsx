import { useRef, useState, useLayoutEffect } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import type { ThreeElements, ThreeElement } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { useSelector } from 'react-redux';
import type { RootState } from './../view model/store';
import { useSearchParams } from 'react-router';
import { useGLTF, useTexture, Center, Decal, Text3D, OrbitControls } from '@react-three/drei';
import { Text } from "troika-three-text";
import TroikaText from './TroikaText';

// const TroikaText = ({
//   text = 'Hello world',
//   fontSize = 0.2,
//   color = 'white',
//   ...props
// }) => {
//   const textRef = useRef()

//   // Update text layout when text or props change
//   useLayoutEffect(() => {
//     if (textRef.current) {
//       textRef.current.sync()
//     }
//   }, [text, fontSize, color])

//   return (
//     <troikaText
//       ref={textRef}
//       text={text}
//       fontSize={fontSize}
//       color={color}
//       anchorX="center"
//       anchorY="middle"
//       {...props}
//     />
//   )
// }

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

    let [searchParams] = useSearchParams();

    const items = useSelector((state: RootState) => state.mainList.items);
    const itemIndex = searchParams.get("article");
    const title = itemIndex ? items[parseInt(itemIndex)]?.title : "";
    const abstract = itemIndex ? items[parseInt(itemIndex)]?.abstract : "";

    const obj = useLoader(OBJLoader, 'Paper/518 Paper.obj');
    const degToRad = (deg: number) => (deg * Math.PI) / 180;

    const titleRef = useRef<any>(null)
  const [bodyOffset, setBodyOffset] = useState(-1.4) // default fallback

  useLayoutEffect(() => {
  if (titleRef.current?.textRenderInfo) {
    const info = titleRef.current.textRenderInfo
    const height = info.blockBounds[3] - info.blockBounds[1]
    const spacing = 0.1
    setBodyOffset(-1 - height - spacing)
  }
}, [title])

    return (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />


                <Center>

                    <primitive object={obj}
                        scale={[0.1, 0.1, 0.1]}
                        rotation={[degToRad(0), degToRad(90), degToRad(85)]} // tilt 45° around the X axis
                    />
                    
                    {/* <TroikaText ref={titleRef} text={title} fontSize={0.25} color="#444" position={[0, -1, 1]} maxWidth={3.5} /> */}
                    <TroikaText text={abstract} fontSize={0.15} color="#444" position={[0, 0, 1]} maxWidth={3.5} />
                    
                </Center>

                <OrbitControls
                // enableZoom={true}
                // enablePan={true}
                // enableRotate={true}
                // minDistance={1}
                // maxDistance={10}
                // minPolarAngle={0}
                // maxPolarAngle={Math.PI / 2}
                // minAzimuthAngle={-Math.PI / 2}
                // maxAzimuthAngle={Math.PI / 2}
                // target={[0, 0, 0]}
                >
                </OrbitControls>

            </Canvas>
        </div>
    );
};

export default MainCanvas;