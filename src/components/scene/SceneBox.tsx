"use client";

import { useMemo } from "react";
import { BoxGeometry, EdgesGeometry } from "three";
import { palette } from "@/lib/palette";
import type { Box } from "@/lib/scene";

type SceneBoxProps = {
  item: Box;
  color: string;
  edges?: boolean;
  opacity?: number;
};

export function SceneBox({
  item,
  color,
  edges = true,
  opacity = 1,
}: SceneBoxProps) {
  const height = item.top - item.bottom;
  const geometry = useMemo(
    () => new BoxGeometry(item.width, height, item.depth),
    [item.width, height, item.depth],
  );
  const outline = useMemo(() => new EdgesGeometry(geometry), [geometry]);
  const position: [number, number, number] = [
    item.x,
    item.bottom + height / 2,
    item.z,
  ];

  return (
    <group position={position}>
      <mesh geometry={geometry} castShadow={opacity === 1} receiveShadow>
        <meshStandardMaterial
          color={color}
          transparent={opacity < 1}
          opacity={opacity}
          roughness={0.9}
        />
      </mesh>
      {edges && (
        <lineSegments geometry={outline}>
          <lineBasicMaterial color={palette.ink} transparent opacity={0.55} />
        </lineSegments>
      )}
    </group>
  );
}
