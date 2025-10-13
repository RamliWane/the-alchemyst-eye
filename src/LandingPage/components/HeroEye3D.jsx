"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroEye3D() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0505);

    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    // Pencahayaan dramatis untuk mata sakit
    const mainLight = new THREE.SpotLight(0xffffee, 3.2, 15, Math.PI / 4, 0.5, 1);
    mainLight.position.set(2, 2, 4);
    scene.add(mainLight);

    const redLight = new THREE.PointLight(0xff2200, 1.2, 10);
    redLight.position.set(-2, 0, 3);
    scene.add(redLight);

    const yellowLight = new THREE.PointLight(0xffaa00, 1.25, 10);
    yellowLight.position.set(1, -1, 2);
    scene.add(yellowLight);

    scene.add(new THREE.AmbientLight(0x331111, 0.45));

    // small white highlight near camera for crisp corneal spec
    const specLight = new THREE.PointLight(0xffffff, 1.4, 6);
    specLight.position.set(0.6, 0.7, 3.2);
    scene.add(specLight);

    // Master toggle: show/remove blood & pus
    const ENABLE_FLUIDS = false;

    // Soft round sprite texture for liquid droplets (hoisted)
    const createSoftCircleTexture = (inner = 1.0) => {
      const size = 128;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext('2d');
      const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      g.addColorStop(0, `rgba(255,255,255,${inner})`);
      g.addColorStop(0.7, 'rgba(255,255,255,0.3)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(size/2, size/2, size/2, 0, Math.PI*2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };
    const softCircleTex = createSoftCircleTexture(0.95);

    // SISTEM SARAF YANG LUAS DAN KOMPLEKS DI BELAKANG MATA
    const nervousSystem = new THREE.Group();
    
    // Saraf utama (optic nerve) yang membengkak
    const createOpticNerve = () => {
      const nerveGroup = new THREE.Group();
      
      // Saraf utama yang tebal dan bengkak
      const mainNerveCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, -0.8),
        new THREE.Vector3(0, -0.1, -1.5),
        new THREE.Vector3(0.1, -0.3, -2.5),
        new THREE.Vector3(0.2, -0.6, -4.0),
        new THREE.Vector3(0.3, -1.0, -6.0)
      ]);
      
      const mainNerveTube = new THREE.TubeGeometry(mainNerveCurve, 64, 0.08, 16, false);
      const mainNerveMat = new THREE.MeshStandardMaterial({ 
        color: 0x8b0000, 
        emissive: 0x440000,
        emissiveIntensity: 0.4,
        roughness: 0.8,
        metalness: 0.1
      });
      const mainNerve = new THREE.Mesh(mainNerveTube, mainNerveMat);
      nerveGroup.add(mainNerve);

      // Pembuluh darah di saraf utama
      const nerveVesselsCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.05, 0.05, -0.8),
        new THREE.Vector3(0.08, -0.05, -1.5),
        new THREE.Vector3(0.12, -0.25, -2.5),
        new THREE.Vector3(0.15, -0.55, -4.0),
        new THREE.Vector3(0.18, -0.95, -6.0)
      ]);
      
      const nerveVesselsTube = new THREE.TubeGeometry(nerveVesselsCurve, 32, 0.03, 8, false);
      const nerveVesselsMat = new THREE.MeshStandardMaterial({ 
        color: 0xff0000, 
        emissive: 0x660000,
        emissiveIntensity: 0.6,
        roughness: 0.7
      });
      const nerveVessels = new THREE.Mesh(nerveVesselsTube, nerveVesselsMat);
      nerveGroup.add(nerveVessels);

      return nerveGroup;
    };

    const opticNerve = createOpticNerve();
    nervousSystem.add(opticNerve);

    // Jaringan saraf kecil yang menyebar (neural network)
    const neuralNetwork = new THREE.Group();
    
    // Saraf radial utama
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const startRadius = 0.3;
      const endRadius = 1.2 + Math.random() * 0.8;
      
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          Math.cos(angle) * startRadius,
          Math.sin(angle) * startRadius * 0.7,
          -0.6
        ),
        new THREE.Vector3(
          Math.cos(angle) * endRadius * 0.8,
          Math.sin(angle) * endRadius * 0.6,
          -1.2 - Math.random() * 0.8
        ),
        new THREE.Vector3(
          Math.cos(angle) * endRadius * 1.2,
          Math.sin(angle) * endRadius,
          -2.0 - Math.random() * 1.0
        ),
        new THREE.Vector3(
          Math.cos(angle) * endRadius * 1.5,
          Math.sin(angle) * endRadius * 1.3,
          -3.5 - Math.random() * 1.5
        )
      ]);
      
      const tube = new THREE.TubeGeometry(curve, 32, 0.02 + Math.random() * 0.02, 8, false);
      const mat = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color().setHSL(0.0, 0.8, 0.2 + Math.random() * 0.2),
        emissive: new THREE.Color().setHSL(0.0, 0.6, 0.1),
        emissiveIntensity: 0.3 + Math.random() * 0.3,
        roughness: 0.8 + Math.random() * 0.2
      });
      const mesh = new THREE.Mesh(tube, mat);
      neuralNetwork.add(mesh);
    }

    // Saraf kecil yang lebih banyak dan kompleks
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusVariation = Math.random() * 0.4;
      
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(
          (Math.cos(angle) + (Math.random()-0.5)*0.3) * (0.4 + radiusVariation),
          (Math.sin(angle) + (Math.random()-0.5)*0.3) * (0.3 + radiusVariation),
          -0.5 - Math.random() * 0.3
        ),
        new THREE.Vector3(
          (Math.cos(angle) + (Math.random()-0.5)*0.5) * (0.8 + radiusVariation),
          (Math.sin(angle) + (Math.random()-0.5)*0.5) * (0.6 + radiusVariation),
          -1.0 - Math.random() * 0.8
        ),
        new THREE.Vector3(
          (Math.cos(angle) + (Math.random()-0.5)*0.7) * (1.2 + radiusVariation),
          (Math.sin(angle) + (Math.random()-0.5)*0.7) * (0.9 + radiusVariation),
          -1.8 - Math.random() * 1.2
        )
      ]);
      
      const tube = new THREE.TubeGeometry(curve, 20, 0.005 + Math.random() * 0.008, 6, false);
      const mat = new THREE.MeshStandardMaterial({ 
        color: 0x5a0000,
        emissive: 0x220000,
        emissiveIntensity: 0.25 + Math.random() * 0.3,
        roughness: 0.9
      });
      const mesh = new THREE.Mesh(tube, mat);
      neuralNetwork.add(mesh);
    }

    nervousSystem.add(neuralNetwork);
    scene.add(nervousSystem);

    // PARTIKEL DARAH DAN NANAH YANG MENGALIR DARI SARAF
    const createBloodPusParticles = () => {
      const particleCount = 400;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const velocities = new Float32Array(particleCount * 3);
      const life = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Mulai dari berbagai titik di sistem saraf
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.3 + Math.random() * 0.7;
        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle) * radius * 0.6;
        positions[i3 + 2] = -0.8 - Math.random() * 0.4;

        // Warna: darah (merah) atau nanah (kuning-hijau)
        const isBlood = Math.random() > 0.4;
        if (isBlood) {
          colors[i3] = 0.8 + Math.random() * 0.2;     // R
          colors[i3 + 1] = 0.1 + Math.random() * 0.2; // G
          colors[i3 + 2] = 0.1 + Math.random() * 0.1; // B
        } else {
          colors[i3] = 0.8 + Math.random() * 0.2;     // R
          colors[i3 + 1] = 0.7 + Math.random() * 0.3; // G
          colors[i3 + 2] = 0.1 + Math.random() * 0.2; // B
        }

        sizes[i] = 0.01 + Math.random() * 0.03;
        
        // Velocity: mengalir ke bawah dan belakang
        velocities[i3] = (Math.random() - 0.5) * 0.02;
        velocities[i3 + 1] = -0.02 - Math.random() * 0.03; // turun
        velocities[i3 + 2] = -0.01 - Math.random() * 0.02; // belakang
        
        life[i] = 1.0; // full life
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.022,
        sizeAttenuation: true,
        vertexColors: true,
        map: softCircleTex,
        alphaMap: softCircleTex,
        transparent: true,
        opacity: 0.9,
        depthTest: true,
        depthWrite: false,
        alphaTest: 0.03,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      
      return {
        particleSystem,
        positions,
        velocities,
        life,
        count: particleCount
      };
    };

    const bloodPusParticles = createBloodPusParticles();
    scene.add(bloodPusParticles.particleSystem);
    bloodPusParticles.particleSystem.visible = ENABLE_FLUIDS;

    // CAIRAN DARAH YANG BERAT DAN KENTAL MENGALIR
    const createThickBloodFlow = () => {
      const bloodGroup = new THREE.Group();
      
      // Aliran darah utama yang kental
      for (let i = 0; i < 8; i++) {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.3,
            -0.7
          ),
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.6,
            -0.3 - Math.random() * 0.3,
            -1.2
          ),
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.8,
            -0.8 - Math.random() * 0.4,
            -2.0
          ),
          new THREE.Vector3(
            (Math.random() - 0.5) * 1.0,
            -1.5 - Math.random() * 0.5,
            -3.0
          )
        ]);
        
        const tube = new THREE.TubeGeometry(curve, 32, 0.03 + Math.random() * 0.02, 8, false);
        const mat = new THREE.MeshStandardMaterial({ 
          color: 0x8b0000,
          emissive: 0x440000,
          emissiveIntensity: 0.5,
          roughness: 0.9,
          transparent: true,
          opacity: 0.7
        });
        const bloodFlow = new THREE.Mesh(tube, mat);
        bloodGroup.add(bloodFlow);
      }

      return bloodGroup;
    };

    const thickBloodFlow = createThickBloodFlow();
    scene.add(thickBloodFlow);
    thickBloodFlow.visible = ENABLE_FLUIDS;

    // GELEMBUNG NANAH YANG KELUAR
    const createPusBubbles = () => {
      const bubbleCount = 60;
      const bubbles = new THREE.BufferGeometry();
      const positions = new Float32Array(bubbleCount * 3);
      const sizes = new Float32Array(bubbleCount);
      const velocities = new Float32Array(bubbleCount * 3);
      const life = new Float32Array(bubbleCount);

      for (let i = 0; i < bubbleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 0.5;
        positions[i3 + 1] = (Math.random() - 0.5) * 0.4;
        positions[i3 + 2] = -0.7 - Math.random() * 0.3;

        sizes[i] = 0.015 + Math.random() * 0.02;
        
        velocities[i3] = (Math.random() - 0.5) * 0.005;
        velocities[i3 + 1] = 0.008 + Math.random() * 0.01; // naik perlahan
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.004;
        
        life[i] = 0; // mulai non-aktif
      }

      bubbles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      bubbles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const bubbleMaterial = new THREE.PointsMaterial({
        color: 0xdddd00,
        size: 0.024,
        sizeAttenuation: true,
        map: softCircleTex,
        alphaMap: softCircleTex,
        transparent: true,
        opacity: 0.92,
        depthTest: true,
        depthWrite: false,
        alphaTest: 0.03,
        blending: THREE.AdditiveBlending
      });

      const bubbleSystem = new THREE.Points(bubbles, bubbleMaterial);
      
      return {
        bubbleSystem,
        positions,
        velocities,
        life,
        count: bubbleCount
      };
    };

    const pusBubbles = createPusBubbles();
    scene.add(pusBubbles.bubbleSystem);
    pusBubbles.bubbleSystem.visible = ENABLE_FLUIDS;

    // [KODE AWAL UNTUK BAGIAN MATA ITU SENDIRI TETAP SAMA...]
    // Sclera (bagian putih mata) - sangat merah, bengkak dan iritasi
    const scleraGeo = new THREE.SphereGeometry(1, 256, 256);
    const scleraMat = new THREE.MeshPhysicalMaterial({
      color: 0xfff2f2,
      roughness: 0.58,
      metalness: 0.0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.65,
      sheen: 0.4,
      sheenRoughness: 0.7,
      sheenColor: new THREE.Color(0xffdddd)
    });
    const sclera = new THREE.Mesh(scleraGeo, scleraMat);
    scene.add(sclera);

    // Pembuluh darah merah yang membengkak
    const createBloodVessels = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.height = 2048;
      
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 2048, 2048);

      const centerX = 1024;
      const centerY = 1024;

      // Pembuluh darah besar yang bengkak (lebih padat dan merah)
      for (let i = 0; i < 260; i++) {
        let x = centerX + (Math.random() - 0.5) * 1200;
        let y = centerY + (Math.random() - 0.5) * 1200;
        const segments = 10 + Math.random() * 24;
        let width = 2.0 + Math.random() * 5;

        const red = 190 + Math.random() * 65;
        const opacity = 0.5 + Math.random() * 0.4;
        
        ctx.strokeStyle = `rgba(${red}, ${Math.random() * 30}, ${Math.random() * 20}, ${opacity})`;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);

        let angle = Math.atan2(y - centerY, x - centerX) + (Math.random() - 0.5) * 1.2;
        
        for (let s = 0; s < segments; s++) {
          x += Math.cos(angle) * (8 + Math.random() * 15);
          y += Math.sin(angle) * (8 + Math.random() * 15);
          angle += (Math.random() - 0.5) * 0.8;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const bloodTex = createBloodVessels();
    const veinsGeo = new THREE.SphereGeometry(1.002, 128, 128);
    const veinsMat = new THREE.MeshStandardMaterial({
      map: bloodTex,
      transparent: true,
      opacity: 0.75,
      roughness: 0.85,
      color: 0xff4444
    });
    const veins = new THREE.Mesh(veinsGeo, veinsMat);
    scene.add(veins);

    // Iris yang terinfeksi
    const irisGeo = new THREE.SphereGeometry(1.008, 128, 128);
    const irisUniforms = {
      time: { value: 0 },
      pupilSize: { value: 0.15 },
      infection: { value: 1.0 }
    };

    const irisMat = new THREE.ShaderMaterial({
      uniforms: irisUniforms,
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float pupilSize;
        uniform float infection;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        void main() {
          vec3 n = normalize(vNormal);
          vec2 p = n.xy;
          float dist = length(p);
          float angle = atan(p.y, p.x);

          // Iris dengan infeksi
          float irisRadius = 0.45;
          float fibers = abs(sin(angle * 35.0 + noise(p * 20.0) * 3.0));
          float cellular = noise(p * 25.0 + time * 0.1);
          
          // Warna iris yang sakit - sedikit lebih terang agar terlihat jelas
          vec3 irisColorA = vec3(0.48, 0.22, 0.10);
          vec3 irisColorB = vec3(0.72, 0.28, 0.12);
          vec3 infection_color = vec3(0.7, 0.3, 0.0);
          
          float irisMask = smoothstep(pupilSize + 0.03, pupilSize + 0.08, dist) * 
                          (1.0 - smoothstep(irisRadius - 0.03, irisRadius, dist));
          
          vec3 irisBase = mix(irisColorA, irisColorB, fibers * 0.6 + cellular * 0.4);
          
          // Tambahkan efek infeksi kuning-hijau
          float infectionNoise = noise(p * 15.0 + time * 0.2);
          irisBase = mix(irisBase, infection_color, infectionNoise * infection * 0.4);
          
          vec3 col = irisBase * irisMask;

          // Limbus gelap
          float limbus = smoothstep(irisRadius - 0.09, irisRadius - 0.035, dist) * 
                        (1.0 - smoothstep(irisRadius - 0.02, irisRadius, dist));
          col = mix(col, vec3(0.12, 0.06, 0.03), limbus * 0.75);

          // Pupil hitam yang tidak sempurna
          if (dist < pupilSize) {
            col = vec3(0.0);
          }

          if (dist > irisRadius) {
            discard;
          }

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    const iris = new THREE.Mesh(irisGeo, irisMat);
    scene.add(iris);

    // Pus jet particles (semburan nanah)
    const pusJetMax = 300;
    const pusJetGeo = new THREE.BufferGeometry();
    const pusJetPos = new Float32Array(pusJetMax * 3);
    const pusJetVel = new Float32Array(pusJetMax * 3);
    const pusJetLife = new Float32Array(pusJetMax);
    for (let i = 0; i < pusJetMax; i++) { pusJetLife[i] = 0; }
    pusJetGeo.setAttribute('position', new THREE.BufferAttribute(pusJetPos, 3));
    const pusJetMat = new THREE.PointsMaterial({ 
      color: 0xffee66, 
      size: 0.016, 
      map: softCircleTex,
      alphaMap: softCircleTex,
      sizeAttenuation: true, 
      transparent: true, 
      opacity: 0.95, 
      depthTest: true,
      depthWrite: false,
      alphaTest: 0.03,
      blending: THREE.AdditiveBlending 
    });
    const pusJet = new THREE.Points(pusJetGeo, pusJetMat);
    scene.add(pusJet);
    pusJet.visible = ENABLE_FLUIDS;

    const spawnPusJet = (burst = 18) => {
      const origin = new THREE.Vector3(0.0, -0.35, 0.92);
      for (let k = 0; k < pusJetMax && burst > 0; k++) {
        if (pusJetLife[k] <= 0) {
          const i3 = k*3;
          pusJetPos[i3] = origin.x + (Math.random()-0.5)*0.06;
          pusJetPos[i3+1] = origin.y + (Math.random()-0.5)*0.06;
          pusJetPos[i3+2] = origin.z + (Math.random()-0.5)*0.06;
          const dir = new THREE.Vector3((Math.random()-0.5)*0.25, -0.1 - Math.random()*0.2, 0.2 + Math.random()*0.25).normalize();
          pusJetVel[i3] = dir.x * (0.18 + Math.random()*0.22);
          pusJetVel[i3+1] = dir.y * (0.18 + Math.random()*0.22);
          pusJetVel[i3+2] = dir.z * (0.18 + Math.random()*0.22);
          pusJetLife[k] = 1.0;
          burst--;
        }
      }
      pusJetGeo.attributes.position.needsUpdate = true;
    };

    // Nanah dan discharge kuning-hijau
    const createPusTexture = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.height = 1024;
      
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 1024, 1024);

      // Nanah yang mengalir
      for (let i = 0; i < 120; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = 15 + Math.random() * 60;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(220, 200, 60, ${0.6 + Math.random() * 0.3})`);
        gradient.addColorStop(0.5, `rgba(180, 180, 40, ${0.3 + Math.random() * 0.2})`);
        gradient.addColorStop(1, 'rgba(150, 150, 30, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Discharge hijau kekuningan
      for (let i = 0; i < 60; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const size = 25 + Math.random() * 80;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(160, 180, 50, ${0.4 + Math.random() * 0.3})`);
        gradient.addColorStop(0.6, `rgba(140, 150, 40, ${0.2 + Math.random() * 0.2})`);
        gradient.addColorStop(1, 'rgba(120, 130, 30, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const pusTex = createPusTexture();
    const pusGeo = new THREE.SphereGeometry(1.015, 128, 128);
    const pusMat = new THREE.MeshStandardMaterial({
      map: pusTex,
      transparent: true,
      opacity: 0.7,
      roughness: 0.9,
      metalness: 0.1,
      color: 0xffee88
    });
    const pus = new THREE.Mesh(pusGeo, pusMat);
    scene.add(pus);
    pus.visible = ENABLE_FLUIDS;

    // Lapisan lendir dan air mata berdarah
    const mucusGeo = new THREE.SphereGeometry(1.025, 64, 64);
    const mucusMat = new THREE.MeshPhysicalMaterial({
      color: 0xffddaa,
      transparent: true,
      opacity: 0.25,
      roughness: 0.3,
      transmission: 0.6,
      thickness: 0.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.4
    });
    const mucus = new THREE.Mesh(mucusGeo, mucusMat);
    scene.add(mucus);

    // Cornea yang keruh dan berawan
    const corneaGeo = new THREE.SphereGeometry(1.03, 64, 64);
    const corneaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      roughness: 0.35,
      transmission: 0.7,
      thickness: 0.35,
      ior: 1.38,
      clearcoat: 0.9,
      clearcoatRoughness: 0.25
    });
    const cornea = new THREE.Mesh(corneaGeo, corneaMat);
    scene.add(cornea);

    

    // Flowing blood sheet (thin layer that scrolls downward)
    const createBloodFlowTexture = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.height = 1024;
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0,0,1024,1024);
      for (let i=0;i<260;i++){
        const x = Math.random()*1024;
        const y = Math.random()*1024;
        const w = 6 + Math.random()*22;
        const h = 30 + Math.random()*140;
        const grad = ctx.createLinearGradient(x, y, x, y+h);
        grad.addColorStop(0, `rgba(180,10,10,${0.55+Math.random()*0.3})`);
        grad.addColorStop(0.6, `rgba(120,5,5,${0.35+Math.random()*0.2})`);
        grad.addColorStop(1, 'rgba(80,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 2);
        ctx.fill();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1,1);
      return { tex, canvas, ctx };
    };
    const bloodFlowRes = createBloodFlowTexture();
    const bloodFlowTex = bloodFlowRes.tex;
    const bloodFlowGeo = new THREE.SphereGeometry(1.028, 128, 128);
    const bloodFlowMat = new THREE.MeshStandardMaterial({
      map: bloodFlowTex,
      transparent: true,
      opacity: 0.6,
      roughness: 0.85,
      metalness: 0.15,
      color: 0xff2222,
      depthWrite: false
    });
    const bloodFlow = new THREE.Mesh(bloodFlowGeo, bloodFlowMat);
    scene.add(bloodFlow);
    bloodFlow.visible = ENABLE_FLUIDS;

    // Helper: convert spherical surface coords to cartesian on eye
    const sphereToCartesian = (r, theta, phi) => {
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Sprite-based larger droplets for more liquid feel
    const makeSpriteDroplets = (count, r, color, scaleMin, scaleMax, blending) => {
      const sprites = [];
      const theta = new Float32Array(count);
      const phi = new Float32Array(count);
      const vel = new Float32Array(count);
      const scale = new Float32Array(count);
      for (let i=0;i<count;i++){
        theta[i] = Math.random()*Math.PI*2;
        phi[i] = 0.7 + Math.random()*0.8;
        vel[i] = 0.08 + Math.random()*0.22;
        scale[i] = scaleMin + Math.random()*(scaleMax-scaleMin);
        const mat = new THREE.SpriteMaterial({ map: softCircleTex, color, transparent:true, opacity:0.9, depthWrite:false, depthTest:true, blending });
        const spr = new THREE.Sprite(mat);
        const p = sphereToCartesian(r, theta[i], phi[i]);
        spr.position.copy(p);
        spr.scale.setScalar(scale[i]);
        scene.add(spr);
        sprites.push(spr);
      }
      return { sprites, theta, phi, vel, scale, r };
    };
    const bloodSprites = ENABLE_FLUIDS ? makeSpriteDroplets(28, 1.031, 0xaa2222, 0.05, 0.11, THREE.NormalBlending) : {sprites:[], theta:new Float32Array(0), phi:new Float32Array(0), vel:new Float32Array(0), scale:new Float32Array(0), r:1.031};
    const pusSprites = ENABLE_FLUIDS ? makeSpriteDroplets(28, 1.030, 0xffee66, 0.06, 0.12, THREE.AdditiveBlending) : {sprites:[], theta:new Float32Array(0), phi:new Float32Array(0), vel:new Float32Array(0), scale:new Float32Array(0), r:1.030};

    // Gravity-driven droplets on cornea surface (blood + pus)
    const makeDroplets = (count, r, color, sizeMin, sizeMax) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count*3);
      const size = new Float32Array(count);
      const theta = new Float32Array(count);
      const phi = new Float32Array(count);
      const vel = new Float32Array(count);
      for (let i=0;i<count;i++){
        theta[i] = Math.random()*Math.PI*2;
        phi[i] = 0.7 + Math.random()*0.9; // front hemisphere
        vel[i] = 0.08 + Math.random()*0.24;
        size[i] = sizeMin + Math.random()*(sizeMax-sizeMin);
        const p = sphereToCartesian(r, theta[i], phi[i]);
        pos[i*3]=p.x; pos[i*3+1]=p.y; pos[i*3+2]=p.z;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
      geo.setAttribute('size', new THREE.BufferAttribute(size,1));
      const mat = new THREE.PointsMaterial({ 
        color, 
        size: (sizeMin+sizeMax)/2, 
        map: softCircleTex,
        alphaMap: softCircleTex,
        sizeAttenuation:true, 
        transparent:true, 
        opacity:0.96, 
        depthTest: true,
        depthWrite:false, 
        alphaTest: 0.03,
        blending:THREE.NormalBlending 
      });
      const pts = new THREE.Points(geo, mat);
      return { pts, pos, theta, phi, vel, r };
    };
    const bloodDrops = makeDroplets(ENABLE_FLUIDS ? 220 : 0, 1.032, 0xaa1111, 0.008, 0.018);
    const pusDrops = makeDroplets(ENABLE_FLUIDS ? 180 : 0, 1.031, 0xffee66, 0.01, 0.02);
    if (ENABLE_FLUIDS) { scene.add(bloodDrops.pts); scene.add(pusDrops.pts); }

    // Falling drip particles (detach from surface during blink)
    const makeFalling = (maxCount, color) => {
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(maxCount*3);
      const vel = new Float32Array(maxCount*3);
      const life = new Float32Array(maxCount);
      for (let i=0;i<maxCount;i++){ life[i]=0; }
      geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
      const mat = new THREE.PointsMaterial({ 
        color,
        size: 0.022,
        map: softCircleTex,
        alphaMap: softCircleTex,
        sizeAttenuation:true, transparent:true, opacity:0.95,
        depthTest:true, depthWrite:false, alphaTest:0.03,
        blending:THREE.AdditiveBlending
      });
      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return { pts, pos, vel, life, max: maxCount, mat };
    };
    const fallingBlood = ENABLE_FLUIDS ? makeFalling(180, 0xaa2222) : { pts:{ geometry:{ attributes:{ position:{ array:new Float32Array(0), needsUpdate:false } } } }, pos:new Float32Array(0), vel:new Float32Array(0), life:new Float32Array(0), max:0, mat:{ opacity:0 } };
    const fallingPus = ENABLE_FLUIDS ? makeFalling(160, 0xffee66) : { pts:{ geometry:{ attributes:{ position:{ array:new Float32Array(0), needsUpdate:false } } } }, pos:new Float32Array(0), vel:new Float32Array(0), life:new Float32Array(0), max:0, mat:{ opacity:0 } };

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Animation
    const clock = new THREE.Clock();
    let time = 0;
    // Auto behaviors: pus jets and stare
    let jetAcc = 0, nextJet = 9999; // disable periodic jets; we will trigger on blink only
    let stareAcc = 0, nextStare = 3.0 + Math.random()*3.0, stareActive = false, stareTime = 0, stareDur = 0.7;

    // Variabel untuk animasi sistem saraf
    let nervePulse = 0;

    // Blink timers (kedipan)
    let blinkAcc = 0, nextBlink = 4.0 + Math.random()*3.5, blinkActive = false, blinkTime = 0, blinkDur = 0.16;
    // short emission window after blink (allow spurt/trickle ~1.2s)
    let emitTimer = 0;

    const animate = () => {
      const delta = clock.getDelta();
      time += delta;
      jetAcc += delta;
      stareAcc += delta;
      nervePulse += delta;
      blinkAcc += delta;

      // Gerakan mata yang terbatas (mata sakit tidak bergerak banyak)
      const targetX = mouseRef.current.x * 0.15;
      const targetY = mouseRef.current.y * 0.1;
      
      sclera.rotation.y = THREE.MathUtils.lerp(sclera.rotation.y, targetX, 0.05);
      sclera.rotation.x = THREE.MathUtils.lerp(sclera.rotation.x, -targetY, 0.05);

      // Pupil bergerak sedikit
      iris.position.x = targetX * 0.04;
      iris.position.y = targetY * 0.03;

      // ANIMASI SISTEM SARAF - BERDENYUT DAN BERGERAK
      const pulse = Math.sin(nervePulse * 2) * 0.1 + 1.0;
      nervousSystem.scale.set(pulse, pulse, pulse);
      nervousSystem.rotation.y = Math.sin(nervePulse * 0.5) * 0.1;
      nervousSystem.rotation.x = Math.sin(nervePulse * 0.3) * 0.05;

      // ANIMASI PARTIKEL DARAH DAN NANAH DARI SARAF
      if (ENABLE_FLUIDS) {
        const bloodPusPositions = bloodPusParticles.positions;
        const bloodPusVelocities = bloodPusParticles.velocities;
        const bloodPusLife = bloodPusParticles.life;
      
      for (let i = 0; i < bloodPusParticles.count; i++) {
        const i3 = i * 3;
        
        if (bloodPusLife[i] > 0) {
          // Update position
          bloodPusPositions[i3] += bloodPusVelocities[i3] * delta * 10;
          bloodPusPositions[i3 + 1] += bloodPusVelocities[i3 + 1] * delta * 10;
          bloodPusPositions[i3 + 2] += bloodPusVelocities[i3 + 2] * delta * 10;
          
          bloodPusLife[i] -= delta * 0.5;
          
          // Reset particle jika life habis atau terlalu jauh
          if (bloodPusLife[i] <= 0 || bloodPusPositions[i3 + 2] < -8) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 0.3 + Math.random() * 0.7;
            bloodPusPositions[i3] = Math.cos(angle) * radius;
            bloodPusPositions[i3 + 1] = Math.sin(angle) * radius * 0.6;
            bloodPusPositions[i3 + 2] = -0.8 - Math.random() * 0.4;
            bloodPusLife[i] = 1.0;
          }
        } else {
          // Spawn hanya saat blink atau emission window aktif
          if (blinkActive || emitTimer > 0) {
            if (Math.random() < delta * 6) {
              bloodPusLife[i] = 1.0;
            }
          }
        }
      }
        bloodPusParticles.particleSystem.geometry.attributes.position.needsUpdate = true;
      }

      // ANIMASI GELEMBUNG NANAH
      if (ENABLE_FLUIDS) {
      const bubblePositions = pusBubbles.positions;
      const bubbleVelocities = pusBubbles.velocities;
      const bubbleLife = pusBubbles.life;
      
      for (let i = 0; i < pusBubbles.count; i++) {
        const i3 = i * 3;
        
        if (bubbleLife[i] > 0) {
          // Update position
          bubblePositions[i3] += bubbleVelocities[i3] * delta * 8;
          bubblePositions[i3 + 1] += bubbleVelocities[i3 + 1] * delta * 8;
          bubblePositions[i3 + 2] += bubbleVelocities[i3 + 2] * delta * 8;
          
          bubbleLife[i] -= delta * 0.3;
          
          // Reset bubble jika life habis atau terlalu tinggi
          if (bubbleLife[i] <= 0 || bubblePositions[i3 + 1] > 0.5) {
            bubblePositions[i3] = (Math.random() - 0.5) * 0.5;
            bubblePositions[i3 + 1] = (Math.random() - 0.5) * 0.4;
            bubblePositions[i3 + 2] = -0.7 - Math.random() * 0.3;
            bubbleLife[i] = 0;
          }
        } else {
          // Spawn bubble baru hanya saat blink atau window
          if (blinkActive || emitTimer > 0) {
            if (Math.random() < delta * 1.2) {
              bubbleLife[i] = 2.0 + Math.random() * 3.0;
            }
          }
        }
      }
      pusBubbles.bubbleSystem.geometry.attributes.position.needsUpdate = true;
      }

      // Animasi nanah yang bergerak
      if (ENABLE_FLUIDS) {
        pus.rotation.y = time * 0.1;
        pus.rotation.x = Math.sin(time * 0.3) * 0.1;
      }

      // Pembuluh darah berdenyut
      veins.rotation.y = time * 0.05;
      
      // No periodic jets; handled during blink

      // Menacing stare trigger
      if (!stareActive && stareAcc >= nextStare) {
        stareActive = true;
        stareTime = 0;
        stareAcc = 0;
        nextStare = 3.0 + Math.random()*3.0;
      }

      // Blink trigger (kedip)
      if (!blinkActive && blinkAcc >= nextBlink) {
        blinkActive = true;
        blinkTime = 0;
        blinkAcc = 0;
        nextBlink = 4.0 + Math.random()*3.5;
        // big spurt on blink
        if (ENABLE_FLUIDS) {
          const spurt = 24 + Math.floor(Math.random()*18);
          spawnPusJet(spurt);
          emitTimer = 1.2; // allow emissions/trails for a short time after blink
        } else {
          emitTimer = 0;
        }
        // on blink: detach some droplets to falling systems
        const detachSome = (D, falling, count=10) => {
          for (let i=0;i<D.sprites.length && count>0;i++){
            if (Math.random()<0.35){
              const s = D.sprites[i];
              // find slot
              for (let k=0;k<falling.max;k++){
                if (falling.life[k] <= 0){
                  const idx = k*3;
                  falling.pos[idx]=s.position.x; falling.pos[idx+1]=s.position.y; falling.pos[idx+2]=s.position.z;
                  falling.vel[idx]=(Math.random()-0.5)*0.2;
                  falling.vel[idx+1]=-0.5 - Math.random()*0.6;
                  falling.vel[idx+2]=(Math.random()-0.5)*0.2;
                  falling.life[k]=1.0;
                  break;
                }
              }
              // respawn surface droplet near top
              D.phi[i] = 0.8 + Math.random()*0.3;
              D.theta[i] = Math.random()*Math.PI*2;
              count--;
            }
          }
          falling.pts.geometry.attributes.position.needsUpdate = true;
        };
        detachSome(bloodSprites, fallingBlood, 18 + Math.floor(Math.random()*10));
        detachSome(pusSprites, fallingPus, 16 + Math.floor(Math.random()*10));
      }

      // Pupil dynamics
      let pupilTarget = 0.12 + Math.sin(time * 2.0) * 0.03 + Math.sin(time * 5.0) * 0.01;
      if (stareActive) {
        stareTime += delta;
        const k = Math.min(stareTime / (stareDur*0.5), 1.0); // fast in
        pupilTarget = THREE.MathUtils.lerp(pupilTarget, 0.08, k);
        // Emphasize lighting and camera for the stare
        mainLight.intensity = THREE.MathUtils.lerp(mainLight.intensity, 3.6, 0.1);
        yellowLight.intensity = THREE.MathUtils.lerp(yellowLight.intensity, 1.3, 0.1);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3.3, 0.08);
        // Bulge effect (melotot)
        const bulge = 1.0 + Math.min(k*0.06, 0.06);
        sclera.scale.set(bulge, bulge, bulge);
        cornea.scale.set(bulge, bulge, bulge);
        veins.scale.set(bulge, bulge, bulge);
        if (stareTime >= stareDur) {
          stareActive = false;
          // reset scale gradually afterwards
        }
      } else {
        // relax lighting/camera
        mainLight.intensity = THREE.MathUtils.lerp(mainLight.intensity, 3.2, 0.05);
        yellowLight.intensity = THREE.MathUtils.lerp(yellowLight.intensity, 1.1, 0.05);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 3.5, 0.05);
        sclera.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
        cornea.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
        veins.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
      }
      irisUniforms.pupilSize.value = THREE.MathUtils.lerp(irisUniforms.pupilSize.value, pupilTarget, 0.1);
      irisUniforms.time.value = time;

      // Lendir bergerak
      mucus.rotation.z = Math.sin(time * 0.4) * 0.15;

      // Cahaya merah berdenyut
      redLight.intensity = 1.0 + Math.sin(time * 3.0) * 0.3;

      // Simulate pus jet particle motion
      if (pusJetLife) {
        const P = pusJetGeo.attributes.position.array;
        for (let i = 0; i < pusJetMax; i++) {
          if (pusJetLife[i] > 0) {
            const idx = i*3;
            P[idx]   += pusJetVel[idx] * delta;
            P[idx+1] += (pusJetVel[idx+1] - 0.6*delta) * delta; // gravity-like pull
            P[idx+2] += pusJetVel[idx+2] * delta;
            pusJetLife[i] -= delta * 1.2;
            if (pusJetLife[i] <= 0) {
              P[idx] = P[idx+1] = P[idx+2] = 0;
            }
          }
        }
        pusJetGeo.attributes.position.needsUpdate = true;
      }

      // Scroll flowing blood sheet downward (disabled if fluids off)
      if (ENABLE_FLUIDS) {
        const flowSpeed = (blinkActive || emitTimer > 0) ? 0.07 : 0.005;
        bloodFlowTex.offset.y -= delta * flowSpeed;
        if (bloodFlowTex.offset.y < -1) bloodFlowTex.offset.y += 1;
      }

      // Gravity-driven droplets sliding on cornea
      const updateDrops = (d, drift=0.15) => {
        const P = d.pts.geometry.attributes.position.array;
        const count = d.theta.length;
        for (let i=0;i<count;i++){
          // bigger drops move slower (viscosity/adhesion)
          const sp = d.pts.geometry.attributes.size.array ? d.pts.geometry.attributes.size.array[i] : 0.015;
          const slow = THREE.MathUtils.clamp(0.6 + (sp*20.0), 0.6, 1.4);
          d.phi[i] += delta * d.vel[i] / slow;
          d.theta[i] += (Math.random()-0.5) * delta * drift; // slight meander
          // constrain
          if (d.phi[i] > 2.6) {
            d.phi[i] = 0.8 + Math.random()*0.3; // respawn near top/front
            d.theta[i] = Math.random()*Math.PI*2;
            d.vel[i] = 0.12 + Math.random()*0.28;
          }
          const p = {
            x: d.r * Math.sin(d.phi[i]) * Math.cos(d.theta[i]),
            y: d.r * Math.cos(d.phi[i]),
            z: d.r * Math.sin(d.phi[i]) * Math.sin(d.theta[i])
          };
          const idx = i*3;
          P[idx] = p.x; P[idx+1] = p.y; P[idx+2] = p.z;
        }
        d.pts.geometry.attributes.position.needsUpdate = true;
      };
      if (ENABLE_FLUIDS) {
        updateDrops(bloodDrops, 0.12);
        updateDrops(pusDrops, 0.18);
      }

      // Move sprite droplets and stretch scale slightly by motion
      const updateSpriteDrops = (D, drift=0.1) => {
        for (let i=0;i<D.sprites.length;i++){
          const s = D.sprites[i];
          const v = D.vel[i];
          D.phi[i] += delta * v;
          D.theta[i] += (Math.random()-0.5)*delta*drift;
          if (D.phi[i] > 2.6){
            D.phi[i] = 0.8 + Math.random()*0.3;
            D.theta[i] = Math.random()*Math.PI*2;
            D.vel[i] = 0.08 + Math.random()*0.22;
            D.scale[i] = D.scale[i]*0.6 + 0.04; // shrink a bit on respawn
          }
          const p = sphereToCartesian(D.r, D.theta[i], D.phi[i]);
          s.position.copy(p);
          // fake stretch toward down direction using non-uniform scale
          const stretch = 1.0 + Math.min(v*2.0, 0.6);
          s.scale.set(D.scale[i]*0.9, D.scale[i]*stretch, 1);
        }
      };
      if (ENABLE_FLUIDS) {
        updateSpriteDrops(bloodSprites, 0.08);
        updateSpriteDrops(pusSprites, 0.12);
      }

      // Simple coalescence: occasionally merge nearby sprite droplets of same set
      const coalesce = (D) => {
        for (let i=0;i<D.sprites.length-1;i++){
          const a = D.sprites[i].position;
          const b = D.sprites[i+1].position;
          if (a.distanceToSquared(b) < 0.0025){
            // absorb j into i
            D.scale[i] = Math.min(D.scale[i] + D.scale[i+1]*0.3, 0.18);
            D.phi[i+1] = 0.8 + Math.random()*0.3;
            D.theta[i+1] = Math.random()*Math.PI*2;
            D.scale[i+1] = (Math.random()*0.06)+0.05;
          }
        }
      };
      if (ENABLE_FLUIDS) {
        if (Math.random() < 0.2) { coalesce(bloodSprites); }
        if (Math.random() < 0.2) { coalesce(pusSprites); }
      }

      // Update falling particles (gravity + fade)
      const updateFalling = (F, fadeRate=1.2) => {
        const P = F.pts.geometry.attributes.position.array;
        for (let i=0;i<F.max;i++){
          if (F.life[i] > 0){
            const idx = i*3;
            P[idx]   += F.vel[idx] * delta;
            P[idx+1] += F.vel[idx+1] * delta;
            P[idx+2] += F.vel[idx+2] * delta;
            F.vel[idx+1] -= 0.8*delta; // gravity
            F.life[i] -= delta * fadeRate;
            if (F.life[i] <= 0 || P[idx+1] < -2.5){
              P[idx]=P[idx+1]=P[idx+2]=0;
              F.life[i]=0;
            }
          }
        }
        F.pts.geometry.attributes.position.needsUpdate = true;
        // modulate opacity by average life for subtle fade group
        F.mat.opacity = 0.6 + Math.random()*0.3;
      };
      // Only spawn heavy drip during blink window
      if (ENABLE_FLUIDS && blinkActive){
        blinkTime += delta;
        updateFalling(fallingBlood, 1.6);
        updateFalling(fallingPus, 1.4);
        if (blinkTime >= blinkDur){
          blinkActive = false;
        }
      } else if (ENABLE_FLUIDS) {
        // light updates (in case some are mid-air)
        updateFalling(fallingBlood, 1.0);
        updateFalling(fallingPus, 0.9);
      }

      // Control emission window decay
      if (ENABLE_FLUIDS && emitTimer > 0) emitTimer -= delta;

      // Draw smear/trails to bloodFlow canvas based on droplet positions (only in emission window)
      const ctx = bloodFlowRes.ctx;
      if (ENABLE_FLUIDS && (blinkActive || emitTimer > 0)) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        ctx.fillRect(0,0,1024,1024); // slight fade
        const drawStreak = (color, u, v, len, w) => {
          const x = u * 1024;
          const y = v * 1024;
          const grd = ctx.createLinearGradient(x, y, x, y+len);
          grd.addColorStop(0, color.replace('{a}', '0.7'));
          grd.addColorStop(1, color.replace('{a}', '0.0'));
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.roundRect(x - w*0.5, y, w, len, 2);
          ctx.fill();
        };
        const phiToV = (phi) => (phi / Math.PI); // approx mapping for sphere
        const thetaToU = (theta) => (0.5 + theta / (2*Math.PI));
        // sample a subset for perf
        for (let i=0;i<bloodSprites.sprites.length;i+=2){
          drawStreak(`rgba(170,20,20,{a})`, thetaToU(bloodSprites.theta[i]), phiToV(bloodSprites.phi[i]), 12+Math.random()*26, 3+Math.random()*3);
        }
        for (let i=0;i<pusSprites.sprites.length;i+=2){
          drawStreak(`rgba(230,220,80,{a})`, thetaToU(pusSprites.theta[i]), phiToV(pusSprites.phi[i]), 10+Math.random()*22, 3+Math.random()*3);
        }
        bloodFlowTex.needsUpdate = true;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mount.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef}
      className="rounded-2xl overflow-hidden"
      style={{ width: 'min(900px, 90vw)', height: 'min(600px, 60vh)', margin: '0 auto', background: 'radial-gradient(circle, #120202 0%, #000 100%)' }}
    />
  );
};