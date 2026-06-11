import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const AssetNode = ({ position, label, status, onClick }: any) => {
  const meshRef = useRef<any>();
  const color = status === 'VULNERABLE' ? '#ef4444' : status === 'ACTIVE' ? '#22d3ee' : '#64748b';

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} onClick={onClick}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={2} 
            wireframe 
          />
        </mesh>
      </Float>
      <Text
        position={[0, -0.7, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        {label}
      </Text>
    </group>
  );
};

const ConnectionLine = ({ start, end }: any) => {
  const points = useMemo(() => [new THREE.Vector3(...start), new THREE.Vector3(...end)], [start, end]);
  return (
    <line>
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial attach="material" color="#0891b2" opacity={0.2} transparent />
    </line>
  );
};

export const AttackSurfaceVisualizer = ({ assets }: { assets: any[] }) => {
  const centerNode = [0, 0, 0];
  
  return (
    <div className="w-full h-[600px] bg-slate-950 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl relative">
      <div className="absolute top-8 left-8 z-10">
        <h3 className="text-xl font-bold text-white mb-1">3D Attack Surface Map</h3>
        <p className="text-sm text-cyan-400 font-mono">Real-time Node Visualization</p>
      </div>

      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Central Core */}
        <Sphere args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color="#0891b2"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>

        {assets.map((asset, i) => {
          const angle = (i / assets.length) * Math.PI * 2;
          const radius = 5 + Math.random() * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = (Math.random() - 0.5) * 3;
          const pos = [x, y, z];

          return (
            <React.Fragment key={asset.id}>
              <AssetNode 
                position={pos} 
                label={asset.value} 
                status={asset.status} 
              />
              <ConnectionLine start={centerNode} end={pos} />
            </React.Fragment>
          );
        })}

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      <div className="absolute bottom-8 right-8 flex gap-4">
         <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="text-slate-400">Secure Asset</span>
         </div>
         <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-slate-400">Critical Finding</span>
         </div>
      </div>
    </div>
  );
};
