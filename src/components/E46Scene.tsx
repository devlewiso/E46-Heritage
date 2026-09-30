'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Bounds,
  Center,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'

// Modelo generado con TRELLIS.2 a partir de la foto de portada y comprimido con meshopt + webp.
const MODEL = '/models/e46.glb'

function Car() {
  // El tercer argumento activa el decodificador meshopt incluido (sin CDN).
  const { scene } = useGLTF(MODEL, false, true)
  return <primitive object={scene} />
}

export default function E46Scene({ autoRotate, margin = 0.82 }: { autoRotate: boolean; margin?: number }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [4.2, 1.3, 4.2], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      {/* Luz principal cálida desde arriba y un contraluz dorado, como el estudio de la foto */}
      <spotLight position={[4, 6, 3]} angle={0.4} penumbra={1} intensity={70} color="#ffffff" />
      <pointLight position={[-4, 1.5, -3]} intensity={8} color="#c8a03c" />

      <Suspense fallback={null}>
        <Bounds fit clip observe margin={margin}>
          <Center>
            <Car />
          </Center>
        </Bounds>
        <ContactShadows position={[0, -0.55, 0]} opacity={0.55} scale={8} blur={2.4} far={2} />
        {/* Reflejos de estudio sin descargar HDRs externos */}
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2.6} position={[0, 4, 0]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={1.2} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer form="rect" intensity={0.35} color="#c8a03c" position={[5, 1, -2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
        </Environment>
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false} // no secuestra la rueda del mouse: el scroll de la página sigue funcionando
        enableDamping
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  )
}

useGLTF.preload(MODEL, false, true)
