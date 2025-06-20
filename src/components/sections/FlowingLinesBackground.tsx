"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise'; // Only 3D noise needed for this approach
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'; // For FXAA

interface FlowingLinesBackgroundProps {
  curveCount?: number;          // Number of distinct flowing curves
  segmentsPerCurve?: number;    // Smoothness of each curve
  lineColor?: THREE.ColorRepresentation;
  animationSpeed?: number;
  bloomStrength?: number;
  bloomRadius?: number;
  bloomThreshold?: number;
  className?: string;
  backgroundColor?: THREE.ColorRepresentation;
  showGrid?: boolean;
  gridColor?: THREE.ColorRepresentation;
  gridOpacity?: number;
  gridCellSize?: number; // Approximate "world" size for grid cells
  showFocalSphere?: boolean;
  focalSphereColor?: THREE.ColorRepresentation;
  focalSphereSize?: number;
}

interface CurveData {
  mesh: THREE.Mesh;
  pathGenerator: (time: number, viewWidth: number, viewHeight: number) => THREE.CatmullRomCurve3;
  // For focal sphere
  currentPath?: THREE.CatmullRomCurve3;
  focalSphereTime?: number; // Tracks position on its own path
  focalSphereSpeed?: number;
}

const FlowingLinesBackground: React.FC<FlowingLinesBackgroundProps> = ({
  curveCount = 5, // Fewer, more prominent curves
  segmentsPerCurve = 100,
  lineColor = 0xeaddb0, // Softer gold/cream
  animationSpeed = 0.00008, // Much slower
  bloomStrength = 0.4,
  bloomRadius = 0.6,
  bloomThreshold = 0.25, // Higher threshold, less blooms
  className = '',
  backgroundColor = 0x0A0F2A, // Deep navy/indigo
  showGrid = true,
  gridColor = 0x2a3055, // Faint indigo grid
  gridOpacity = 0.03,
  gridCellSize = 75,
  showFocalSphere = true,
  focalSphereColor = 0xffffff,
  focalSphereSize = 0.01, // Relative to viewHeight
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const curvesRef = useRef<CurveData[]>([]);
  const gridMeshRef = useRef<THREE.Mesh | null>(null);
  const focalSphereRef = useRef<THREE.Mesh | null>(null);

  const noise3D = useRef(createNoise3D());
  const animationFrameId = useRef<number | null>(null);

  const lineVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const lineFragmentShader = `
    varying vec2 vUv;
    uniform vec3 uColor;
    void main() {
      // Gentle fade at the tube circumference for softness
      float edgeFade = smoothstep(0.0, 0.45, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
      float alpha = edgeFade * 0.85; // Slightly more opaque lines
      if (alpha < 0.01) discard;
      gl_FragColor = vec4(uColor, alpha);
    }
  `;

  const gridVertexShader = `
    varying vec3 vWorldPosition;
    void main() {
      // Pass world position to fragment shader for consistent grid spacing
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const gridFragmentShader = `
    varying vec3 vWorldPosition;
    uniform vec3 uGridColor;
    uniform float uGridCellSize;
    uniform float uGridOpacity;
    uniform float uTime; // For slow grid movement

    float line(float v, float thickness) {
      return smoothstep(thickness, 0.0, abs(mod(v, uGridCellSize) - uGridCellSize * 0.5) - uGridCellSize * 0.5 + thickness);
    }

    void main() {
      float lineThickness = 0.5; // Very thin lines
      // Apply slow movement to grid
      float xLine = line(vWorldPosition.x + uTime * 2.0, lineThickness); // Adjust speed (2.0)
      float yLine = line(vWorldPosition.y - uTime * 1.5, lineThickness); // Adjust speed (1.5)

      float grid = max(xLine, yLine);
      
      if (grid > 0.0) {
        gl_FragColor = vec4(uGridColor, grid * uGridOpacity);
      } else {
        discard;
      }
    }
  `;
  
  // FXAA Shader for anti-aliasing (helps with thin lines)
  const FXAAShader = {
    uniforms: {
        'tDiffuse': { value: null },
        'resolution': { value: new THREE.Vector2(1 / 1024, 1 / 768) } // Example, will be updated
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;
        // FXAA
        #define FXAA_REDUCE_MIN   (1.0/128.0)
        #define FXAA_REDUCE_MUL   (1.0/8.0)
        #define FXAA_SPAN_MAX     8.0
        void main() {
            vec3 rgbNW = texture2D(tDiffuse, (gl_FragCoord.xy + vec2(-1.0,-1.0)) * resolution).xyz;
            vec3 rgbNE = texture2D(tDiffuse, (gl_FragCoord.xy + vec2(1.0,-1.0)) * resolution).xyz;
            vec3 rgbSW = texture2D(tDiffuse, (gl_FragCoord.xy + vec2(-1.0,1.0)) * resolution).xyz;
            vec3 rgbSE = texture2D(tDiffuse, (gl_FragCoord.xy + vec2(1.0,1.0)) * resolution).xyz;
            vec3 rgbM  = texture2D(tDiffuse,  gl_FragCoord.xy  * resolution).xyz;
            vec3 luma = vec3(0.299, 0.587, 0.114);
            float lumaNW = dot(rgbNW, luma);
            float lumaNE = dot(rgbNE, luma);
            float lumaSW = dot(rgbSW, luma);
            float lumaSE = dot(rgbSE, luma);
            float lumaM  = dot(rgbM,  luma);
            float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
            float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));
            vec2 dir;
            dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
            dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));
            float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);
            float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);
            dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
                  max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * resolution;
            vec3 rgbA = (1.0/2.0) * (
                texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (1.0/3.0 - 0.5)).xyz +
                texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (2.0/3.0 - 0.5)).xyz);
            vec3 rgbB = rgbA * (1.0/2.0) + (1.0/4.0) * (
                texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (0.0/3.0 - 0.5)).xyz +
                texture2D(tDiffuse,  gl_FragCoord.xy  * resolution + dir * (3.0/3.0 - 0.5)).xyz);
            float lumaB = dot(rgbB, luma);
            if((lumaB < lumaMin) || (lumaB > lumaMax)) {
                 gl_FragColor = vec4(rgbA,1.0);
            } else {
                 gl_FragColor = vec4(rgbB,1.0);
            }
        }`
  };


  const createCurvePathGenerator = (index: number, totalCurves: number) => {
    // Each curve gets a unique vertical offset and noise seed for variation
    const yOffsetSeed = (index / totalCurves - 0.5) * 0.8 + (Math.random() - 0.5) * 0.2; // Spreads curves vertically
    const noiseSeedX = Math.random() * 100;
    const noiseSeedY = Math.random() * 100;
    const noiseSeedZ = Math.random() * 100;

    return (time: number, viewWidth: number, viewHeight: number): THREE.CatmullRomCurve3 => {
      const points: THREE.Vector3[] = [];
      const baseAmplitudeY = viewHeight * 0.25; // Controls vertical waviness
      const baseFrequencyX = 0.002; // Controls horizontal scale of waves

      for (let i = 0; i <= segmentsPerCurve; i++) {
        const u = i / segmentsPerCurve; // 0 to 1 progress along curve
        const x = (u - 0.5) * viewWidth * 1.4; // Span slightly wider than view

        // Base Y position for an upward sweep, modified by slow large-scale noise
        // This creates a gentle overall curve shape
        let y = yOffsetSeed * viewHeight; // Base vertical position
        y += Math.sin(u * Math.PI * 1.5 + time * 0.2 + noiseSeedY) * baseAmplitudeY * 0.5; // Main slow wave
        y += noise3D.current(
            x * baseFrequencyX + noiseSeedX,
            time * 0.3 + noiseSeedY, // Slower time component for Y
            u * 0.5 + time * 0.1 // Slow evolution along curve length
        ) * baseAmplitudeY * 0.7; // Large scale noise for gentle flow

        // Upward drift over time and as x increases (subtle)
        y += time * viewHeight * 0.03; // Slow upward drift of all lines
        y -= u * viewHeight * 0.1; // Gentle upward sweep from left to right

        const z = noise3D.current(
            x * baseFrequencyX * 0.8 + noiseSeedZ, // Slightly different frequency for Z
            u * 0.8,
            time * 0.25 // Slower time component for Z
        ) * viewHeight * 0.05 - viewHeight * 0.025; // Subtle Z depth

        points.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(points);
    };
  };


  const init = useCallback(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    sceneRef.current = new THREE.Scene();
    sceneRef.current.background = new THREE.Color(backgroundColor);

    cameraRef.current = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 2000);
    cameraRef.current.position.z = 1000;

    rendererRef.current = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // FXAA handles AA
    rendererRef.current.setSize(width, height);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(rendererRef.current.domElement);

    composerRef.current = new EffectComposer(rendererRef.current);
    composerRef.current.addPass(new RenderPass(sceneRef.current, cameraRef.current));

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), bloomStrength, bloomRadius, bloomThreshold);
    composerRef.current.addPass(bloomPass);

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.uniforms['resolution'].value.x = 1 / (width * window.devicePixelRatio);
    fxaaPass.uniforms['resolution'].value.y = 1 / (height * window.devicePixelRatio);
    composerRef.current.addPass(fxaaPass);


    if (showGrid) {
      const gridGeometry = new THREE.PlaneGeometry(width * 2, height * 2, 1, 1); // Large plane
      const gridMaterial = new THREE.ShaderMaterial({
        vertexShader: gridVertexShader,
        fragmentShader: gridFragmentShader,
        uniforms: {
          uGridColor: { value: new THREE.Color(gridColor) },
          uGridCellSize: { value: gridCellSize },
          uGridOpacity: { value: gridOpacity },
          uTime: { value: 0.0 },
        },
        transparent: true,
        depthWrite: false,
      });
      gridMeshRef.current = new THREE.Mesh(gridGeometry, gridMaterial);
      gridMeshRef.current.position.z = -100; // Behind lines
      sceneRef.current.add(gridMeshRef.current);
    }

    curvesRef.current = [];
    for (let i = 0; i < curveCount; i++) {
      const pathGenerator = createCurvePathGenerator(i, curveCount);
      const initialPath = pathGenerator(0, width, height);
      const geometry = new THREE.TubeGeometry(initialPath, segmentsPerCurve, height * 0.0015, 6, false); // Thin tubes
      const material = new THREE.ShaderMaterial({
        vertexShader: lineVertexShader,
        fragmentShader: lineFragmentShader,
        uniforms: { uColor: { value: new THREE.Color(lineColor) } },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      curvesRef.current.push({ mesh, pathGenerator, currentPath: initialPath, focalSphereTime: Math.random(), focalSphereSpeed: 0.005 + Math.random() * 0.005 });
      sceneRef.current.add(mesh);
    }

    if (showFocalSphere && curvesRef.current.length > 0) {
      const sphereGeometry = new THREE.SphereGeometry(height * focalSphereSize, 16, 16);
      const sphereMaterial = new THREE.MeshBasicMaterial({ color: focalSphereColor, transparent: true, opacity: 0.7 });
      focalSphereRef.current = new THREE.Mesh(sphereGeometry, sphereMaterial);
      // Initial position will be set in animate
      sceneRef.current.add(focalSphereRef.current);
    }

  }, [
    backgroundColor, bloomStrength, bloomRadius, bloomThreshold, showGrid, gridColor, gridCellSize, gridOpacity,
    curveCount, segmentsPerCurve, lineColor,
    showFocalSphere, focalSphereColor, focalSphereSize,
    // Shaders are stable, createCurvePathGenerator is memoized by being outside/or a prop if it had deps
  ]);

  const animate = useCallback(() => {
    if (!composerRef.current || !mountRef.current) return;

    animationFrameId.current = requestAnimationFrame(animate);
    const time = performance.now() * animationSpeed;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    if (gridMeshRef.current && gridMeshRef.current.material instanceof THREE.ShaderMaterial) {
        gridMeshRef.current.material.uniforms.uTime.value = time * 10; // Adjust grid animation speed
    }

    curvesRef.current.forEach((curveData, index) => {
      const newPath = curveData.pathGenerator(time + index * 0.5, width, height); // Stagger animation
      curveData.currentPath = newPath; // Store for focal sphere
      const oldGeometry = curveData.mesh.geometry;
      curveData.mesh.geometry = new THREE.TubeGeometry(newPath, segmentsPerCurve, height * 0.0015, 6, false);
      oldGeometry.dispose();
    });

    if (showFocalSphere && focalSphereRef.current && curvesRef.current.length > 0) {
      // Animate sphere along the first curve, for example
      const targetCurveData = curvesRef.current[0];
      if (targetCurveData.currentPath) {
        targetCurveData.focalSphereTime = (targetCurveData.focalSphereTime || 0) + (targetCurveData.focalSphereSpeed || 0.01);
        if (targetCurveData.focalSphereTime > 1) targetCurveData.focalSphereTime = 0; // Loop
        
        const pointOnCurve = targetCurveData.currentPath.getPointAt(targetCurveData.focalSphereTime);
        focalSphereRef.current.position.copy(pointOnCurve);
        // Make sphere pulse subtly
        const pulse = Math.sin(time * 200) * 0.2 + 0.9; // Faster time for pulse
        focalSphereRef.current.scale.set(pulse, pulse, pulse);
      }
    }

    composerRef.current.render();
  }, [animationSpeed, segmentsPerCurve, showFocalSphere]); // Add dependencies

  const handleResize = useCallback(() => {
    if (!rendererRef.current || !cameraRef.current || !composerRef.current || !mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    rendererRef.current.setSize(width, height);
    composerRef.current.setSize(width, height);

    cameraRef.current.left = width / -2;
    cameraRef.current.right = width / 2;
    cameraRef.current.top = height / 2;
    cameraRef.current.bottom = height / -2;
    cameraRef.current.updateProjectionMatrix();

    const fxaaPass = composerRef.current.passes.find(pass => pass instanceof ShaderPass && pass.uniforms.resolution) as ShaderPass | undefined;
    if (fxaaPass) {
        fxaaPass.uniforms['resolution'].value.x = 1 / (width * window.devicePixelRatio);
        fxaaPass.uniforms['resolution'].value.y = 1 / (height * window.devicePixelRatio);
    }
    
    if (gridMeshRef.current) {
        gridMeshRef.current.geometry.dispose();
        gridMeshRef.current.geometry = new THREE.PlaneGeometry(width * 2, height * 2, 1, 1);
    }

  }, []);

  useEffect(() => {
    init();
    animate();
    window.addEventListener('resize', handleResize);
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', handleResize);
      curvesRef.current.forEach(c => {
        c.mesh.geometry.dispose();
        (c.mesh.material as THREE.Material).dispose();
        sceneRef.current?.remove(c.mesh);
      });
      curvesRef.current = [];
      if (gridMeshRef.current) {
        gridMeshRef.current.geometry.dispose();
        (gridMeshRef.current.material as THREE.Material).dispose();
        sceneRef.current?.remove(gridMeshRef.current);
        gridMeshRef.current = null;
      }
      if (focalSphereRef.current) {
        focalSphereRef.current.geometry.dispose();
        (focalSphereRef.current.material as THREE.Material).dispose();
        sceneRef.current?.remove(focalSphereRef.current);
        focalSphereRef.current = null;
      }
      composerRef.current?.dispose();
      rendererRef.current?.dispose();
      if (mountRef.current && rendererRef.current?.domElement && mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      sceneRef.current = null; cameraRef.current = null; rendererRef.current = null; composerRef.current = null;
    };
  }, [init, animate, handleResize]);

  return <div ref={mountRef} className={`fixed inset-0 -z-10 ${className}`} />;
};

export default FlowingLinesBackground;