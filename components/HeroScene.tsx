'use client'

import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 50
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x0a0509, 1)
    containerRef.current.appendChild(renderer.domElement)

    sceneRef.current = scene
    rendererRef.current = renderer

    // Create gold particle system
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const goldColor = new THREE.Color(0xd4af37)
    const roseColor = new THREE.Color(0xc9797a)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200
      positions[i + 1] = (Math.random() - 0.5) * 200
      positions[i + 2] = (Math.random() - 0.5) * 200

      const useGold = Math.random() > 0.5
      const color = useGold ? goldColor : roseColor
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
    particlesRef.current = particles

    // Create floating spheres
    const geometries = [
      new THREE.IcosahedronGeometry(8, 4),
      new THREE.OctahedronGeometry(6, 2),
      new THREE.TetrahedronGeometry(5),
    ]

    geometries.forEach((geometry, index) => {
      const material = new THREE.MeshPhongMaterial({
        color: index === 0 ? 0xd4af37 : 0xc9797a,
        emissive: index === 0 ? 0x8b7355 : 0x8b5f63,
        shininess: 100,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150
      )
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      mesh.userData.velocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
      }
      scene.add(mesh)
    })

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xd4af37, 1, 500)
    pointLight.position.set(50, 50, 50)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xc9797a, 0.8, 400)
    pointLight2.position.set(-50, -30, 30)
    scene.add(pointLight2)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      particles.rotation.x += 0.0001
      particles.rotation.y += 0.0002

      // Update floating meshes
      scene.children.forEach((child) => {
        if (child === particles) return
        if (!(child instanceof THREE.Mesh)) return

        const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>
        const velocity = mesh.userData.velocity as { x: number; y: number; z: number } | undefined
        if (!velocity) return

        mesh.rotation.x += velocity.x
        mesh.rotation.y += velocity.y
        mesh.rotation.z += velocity.z

        mesh.position.x += velocity.x * 0.2
        mesh.position.y += velocity.y * 0.2
        mesh.position.z += velocity.z * 0.2

        // Bounce boundaries
        if (Math.abs(mesh.position.x) > 100) velocity.x *= -1
        if (Math.abs(mesh.position.y) > 100) velocity.y *= -1
        if (Math.abs(mesh.position.z) > 100) velocity.z *= -1
      })

      // Camera follows mouse
      camera.position.x += (mouseRef.current.x * 10 - camera.position.x) * 0.05
      camera.position.y += (mouseRef.current.y * 10 - camera.position.y) * 0.05
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ filter: 'brightness(0.8)' }}
    />
  )
}
