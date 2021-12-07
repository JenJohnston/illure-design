import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'

import particleLeafVertexShader from '../shaders/leafParticles/vertex.glsl'
import particleLeafFragmentShader from '../shaders/leafParticles/fragment.glsl'

class bloomLeaves
{
    constructor (object)
    {
        this.name = object.name
        this.file = object.file
        this.scene = object.scene
        this.placeOnLoad = object.placeOnLoad

        this.color1 = object.color1
        this.color2 = object.color2

        this.isActive = false

        this.loader = new GLTFLoader()
        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('draco/')
        this.loader.setDRACOLoader(this.dracoLoader)

        this.init()
    }

    init(){
        this.loader.load(this.file, (response) =>
        {
              // Original Mesh

              this.mesh = response.scene.children[0]
              
              // Material Mesh
              this.material = new THREE.MeshBasicMaterial(
                  {
                      color: 'red',
                      wireframe: true
                  }
              )

              this.mesh.material = this.material
  
              // Geometry Mesh
  
              this.geometry = this.mesh.geometry

              // Particles Material

            //   this.particlesMaterial = new THREE.PointsMaterial(
                  
            //       {
            //           color: 'red',
            //           size: 0.01
            //       }
                  
            //   )

              this.particlesMaterial = new THREE.ShaderMaterial(
                  {
                    uniforms:
                    {
                        uColor1: { value: new THREE.Color(this.color1)},
                        uColor2: { value: new THREE.Color(this.color2)},
                        uTime: { value: 0 },
                        uScale: { value: 0 }
                    },
                    vertexShader: particleLeafVertexShader,
                    fragmentShader: particleLeafFragmentShader,
                    transparent: true,
                    vertexColors: true,
                    depthWrite: false
                    
                  }
              )

              // Particles Geometry
             
              const sampler = new MeshSurfaceSampler(this.mesh).build()
              const numParticles = 2500
              this.particlesGeometry = new THREE.BufferGeometry()
              const particlesPosition = new Float32Array(numParticles * 3)
              const particlesRandom = new Float32Array(numParticles * 3)

              for (let i = 0; i < numParticles; i++)
              {
                  const newPosition = new THREE.Vector3()
                  sampler.sample(newPosition)
                  particlesPosition.set(
                    [
                        newPosition.x,
                        newPosition.y,
                        newPosition.z
                    ], i * 3
                )

                particlesRandom.set(
                    [
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1,
                        Math.random() * 2 - 1
                    ], i * 3
                )
              }

              this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPosition, 3))
              this.particlesGeometry.setAttribute('aRandom', new THREE.BufferAttribute(particlesRandom, 3))

              // Particles

              this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial)

             
              if(this.placeOnLoad)
              {
                  this.add()
              }
              
        })

    }
    add()
    {
        this.scene.add(this.particles)
        this.isActive = true
    }
}



export default bloomLeaves