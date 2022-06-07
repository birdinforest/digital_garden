// components/OrbitControls.jsx
// Reference to https://dev.to/hnicolus/how-to-use-threejs-in-react-nextjs-4120

import React from "react";
import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });

// @ts-ignore
function Controls(props) {
  const { camera, gl } = useThree();
  // @ts-ignore
  return <orbitControls attach={"orbitControls"}  args={[camera, gl.domElement]} />;
}

export default Controls;
