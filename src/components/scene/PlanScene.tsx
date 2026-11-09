"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { palette } from "@/lib/palette";
import type { Layout } from "@/lib/plan";
import { sceneBoxes } from "@/lib/scene";
import { sunVector, type SunPosition } from "@/lib/sun";
import type { Finish, Rect } from "@/lib/types";
import { OrbitRig } from "./OrbitRig";
import { SceneBox } from "./SceneBox";

export type PlanSceneProps = {
  layout: Layout;
  finish: Finish;
  sun?: SunPosition;
  terrace?: Rect;
};

const DEFAULT_SUN: SunPosition = { azimuth: 135, altitude: 50 };

export default function PlanScene({
  layout,
  finish,
  sun,
  terrace,
}: PlanSceneProps) {
  const { width, depth } = layout;
  const boxes = useMemo(() => sceneBoxes(layout), [layout]);
  const size = Math.max(width, depth);
  const distance = size * 1.5;
  const light = sunVector(sun && sun.altitude > 0 ? sun : DEFAULT_SUN);
  const daylight = !sun || sun.altitude > 0;
  const span = size;

  return (
    <Canvas
      shadows="percentage"
      frameloop="demand"
      dpr={[1, 2]}
      camera={{
        position: [size * 0.35, distance * 0.95, -distance * 0.7],
        fov: 35,
        near: 0.5,
        far: size * 10,
      }}
    >
      <color attach="background" args={[palette.paper]} />
      <hemisphereLight
        args={[palette.surface, palette.paper, daylight ? 1.6 : 0.5]}
      />
      {daylight && (
        <directionalLight
          position={[
            light.x * size * 2,
            light.y * size * 2,
            light.z * size * 2,
          ]}
          intensity={2.8}
          color={palette.sun}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-span}
          shadow-camera-right={span}
          shadow-camera-top={span}
          shadow-camera-bottom={-span}
          shadow-camera-far={size * 6}
          shadow-bias={-0.0004}
        />
      )}
      <OrbitRig distance={distance} />
      <group position={[-width / 2, 0, -depth / 2]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[width / 2, -0.25, depth / 2]}
          receiveShadow
        >
          <planeGeometry args={[size * 6, size * 6]} />
          <meshStandardMaterial color={palette.paper} roughness={1} />
        </mesh>
        {terrace && (
          <SceneBox
            item={{
              x: terrace.x + terrace.w / 2,
              z: terrace.y + terrace.h / 2,
              width: terrace.w,
              depth: terrace.h,
              bottom: -0.2,
              top: 0,
            }}
            color={palette.line}
          />
        )}
        {layout.rooms.map((room) => (
          <mesh
            key={room.id}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[room.x + room.w / 2, 0.01, room.y + room.h / 2]}
            receiveShadow
          >
            <planeGeometry args={[room.w, room.h]} />
            <meshStandardMaterial
              color={
                room.type === "bath" || room.type === "powder"
                  ? finish.stone
                  : finish.floor
              }
              roughness={0.8}
            />
          </mesh>
        ))}
        {boxes.solid.map((item, index) => (
          <SceneBox key={index} item={item} color={palette.wall} />
        ))}
        {boxes.glass.map((item, index) => (
          <SceneBox
            key={index}
            item={item}
            color={palette.glass}
            opacity={0.35}
            edges={false}
          />
        ))}
      </group>
    </Canvas>
  );
}
