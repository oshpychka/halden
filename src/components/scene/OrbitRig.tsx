"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type OrbitRigProps = { distance: number };

export function OrbitRig({ distance }: OrbitRigProps) {
  const camera = useThree((state) => state.camera);
  const element = useThree((state) => state.gl.domElement);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const controls = new OrbitControls(camera, element);
    controls.target.set(0, 0, 0);
    controls.enablePan = false;
    controls.minDistance = distance * 0.35;
    controls.maxDistance = distance * 1.8;
    controls.maxPolarAngle = Math.PI * 0.46;
    controls.update();
    const redraw = () => invalidate();
    controls.addEventListener("change", redraw);
    return () => {
      controls.removeEventListener("change", redraw);
      controls.dispose();
    };
  }, [camera, element, invalidate, distance]);

  return null;
}
