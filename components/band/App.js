'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = '/assets/kartu.glb';
const TEXTURE_PATH = '/assets/bandd.png';

useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);

export default function App() {
  return (
    <div className="app-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <ul className="navbar-list">
          <li><a href="https://ajchasiloa.github.io/Curriculum_Vitae/" target="_blank" rel="noopener noreferrer">CURRICULUM VITAE</a></li>
          <li><a href="https://ajchasiloa.github.io/Projects_/" target="_blank" rel="noopener noreferrer">PROJECTS</a></li>
          <li><a href="https://ajchasiloa.github.io/Contact_Letter/" target="_blank" rel="noopener noreferrer">CONTACT LETTER</a></li>
        </ul>
      </nav>

      <h1 
        style={{ 
          color: '#2C2C2C',
          transition: 'color 0.5s',
          fontSize: '3rem',
          position: 'absolute',
          left: '0',
          top: '10vh',
          paddingLeft: '30px',
          zIndex: 10,
          textAlign: 'left',
          userSelect: 'text',
        }} 
        onMouseEnter={(e) => {
          e.target.style.color = '#00FF99';
          e.target.style.textShadow = '0 0 10px #00FF99';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#2C2C2C';
          e.target.style.textShadow = 'none';
        }}
      >
        Welcome to my portfolio
      </h1>

      <h2 
        style={{ 
          color: '#333333',
          transition: 'color 0.5s',
          fontSize: '1.5rem',
          position: 'absolute',
          left: '0',
          top: '20vh',
          paddingLeft: '20px',
          zIndex: 5,
          textAlign: 'left',
          userSelect: 'text',
        }} 
        onMouseEnter={(e) => {
          e.target.style.color = '#FF3366';
          e.target.style.textShadow = '0 0 10px #FF3366';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#333333';
          e.target.style.textShadow = 'none';
        }}
      >
        Thank you for visiting us, I invite you to learn more about me!
      </h2>
      <div style={{ position: 'relative' }}>
      <h3
  style={{ 
    color: '#333333',
    transition: 'color 0.5s',
    fontSize: '1rem',
    position: 'absolute',
    top: '20vh',  // Ajusta el top para que esté donde lo deseas
    left: '35%',  
    paddingLeft: '10px',
    zIndex: 5,
    textAlign: 'left',
    userSelect: 'text',
    width: '70%',  // Aumenté el ancho al 70% para extender más el texto
    maxWidth: '750px',  // Límite máximo para no hacer el texto demasiado largo
    lineHeight: '1.5',  // Espaciado entre líneas
    transform: 'translateX(-50%)',  // Centra el texto horizontalmente
  }} 
  onMouseEnter={(e) => {
    e.target.style.color = '#800080';  // Color morado
    e.target.style.textShadow = '0 0 10px #FF3366';
  }}
  onMouseLeave={(e) => {
    e.target.style.color = '#333333';
    e.target.style.textShadow = 'none';
  }}
>
  My name is Anderson Chasiloa, and I am a student at the Universidad de las Fuerzas Armadas ESPE. I have been actively involved in the company&apos;s programs and had the opportunity to participate in ICT Huawei 2025, where I reached the national finals in the Cloud Track category. Additionally, I have been deeply involved in the IEEE branch, which has strengthened my technical and collaborative skills. I would like to have the opportunity to join your internship program, as I am aware of the prestige your company holds in the professional environment. This opportunity would allow me to improve my CV and deepen my experience in an environment of innovation and excellence, benefiting the population.
</h3>



  <img
    src="https://scontent.fuio21-1.fna.fbcdn.net/v/t39.30808-6/464785014_954542440052513_2632003284833841730_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=qbjy4xCS-0UQ7kNvgEskeVb&_nc_oc=AdiuJ8kEswg2FRisHrU6aG3ujviZyy_FyyGakQ8jd72Oh1vqKWhsev0uqjf-U6MHYjA&_nc_zt=23&_nc_ht=scontent.fuio21-1.fna&_nc_gid=AI0JSTjWARnwXNc7CABx6Kg&oh=00_AYF0-xhFu4PWtoxeCUlYuiRQoc77JSqndUelmPY9EaKlmQ&oe=67D66B83"  // Reemplaza esto con la URL de tu imagen
    alt="Descripción de la imagen"
    style={{
      position: 'absolute',
      top: '53vh',  // Ajusta la posición de la imagen, puede ser diferente según el tamaño de tu página
      right: '55%',  // Alineado a la derecha
      width: '75%',  // Tamaño de la imagen, ajusta como lo necesites
      maxWidth: '200px',  // Opcional: límite máximo del tamaño de la imagen
    }}
  />
</div>


      <div className="responsive-wrapper">
        <div className="resizable-object"></div> {/* Este objeto se hará más grande */}
        <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
          <ambientLight intensity={Math.PI} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment background blur={0.75}>
            <color attach="background" args={['black']} />
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Canvas>
      </div>





    </div>
  );
}



function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef(); // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3(); // prettier-ignore
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(GLTF_PATH); 
  const texture = useTexture(TEXTURE_PATH); 
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]); // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]); // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
       <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}
