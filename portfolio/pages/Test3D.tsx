import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei';

import { useLoader } from '@react-three/fiber'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Object3D } from 'three';

import OrbitControls from '../components/OrbitControls';
import Log from '../components/Log';

function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
    };
  };
}

export default function Test3D() {

  const [model, setModel] = useState<Object3D | null>(null);
  const [gltf, setGLTF] = useState<GLTF | null>(null);

  useEffect(() => {

    const loader = new GLTFLoader();
    loader.load(
      'https://app-asset-workspace.s3.ap-southeast-2.amazonaws.com/models/Fox/glTF-Binary/Fox.glb',
      async (gltf) => {
        const nodes = await gltf.parser.getDependencies('node');
        setModel(nodes[0]);
        setGLTF(gltf);
      });
  }, []);

  return (
    // Customise height of element
    // https://tailwindcss.com/docs/height
    // "h-96": 24rem; /* 384px */
    <div className={"h-96"}>
      <Canvas>
        <ambientLight/>
        <pointLight position={[10, 10, 10]}/>
        <Box position={[-1.2, 0, 0]}/>
        <Box position={[1.2, 0, 0]}/>
        {model ? (
          <primitive object={gltf?.scene} position={[0, -60, -100]}>
            <Log log='[log][Canvas]gltf:' />
            <Log log={gltf} />
            <Log log='[log][Canvas]model:' />
            <Log log={model} />
          </primitive>
        ) : (
          <Html>loading ...</Html>
        )}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
