import * as THREE from 'three';
export function transformMesh(sam1, sam2, scen){
    let uniforms={ mousePos: {value: new THREE.Vector3()}}
    let pointsGeometry = new THREE.BufferGeometry();
    let pointsGeometry2 = new THREE.BufferGeometry();
    const vertices = [];
    const vertices2 = [];
    const tempPosition = new THREE.Vector3();
    const tempPosition2 = new THREE.Vector3();
    var reObj = {};
        for (let i = 0; i < 90000; i ++) {
            sam1.sample(tempPosition);
            sam2.sample(tempPosition2);
            vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
            vertices2.push(tempPosition2.x, tempPosition2.y, tempPosition2.z);
        }
        pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        pointsGeometry2.setAttribute('position', new THREE.Float32BufferAttribute(vertices2, 3));
        let pointsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            sizeAttenuation: true,
            alphaMap: new THREE.TextureLoader().load('https://uploads-ssl.webflow.com/63dc61d144eece698f81dda6/63ec1a5f88c4abef69423db4_particle-texture.jpg')
        })

        pointsMaterial.onBeforeCompile = function(shader) {
            shader.uniforms.mousePos = uniforms.mousePos;
            shader.vertexShader = `
            uniform vec3 mousePos;
            varying float vNormal;
            ${shader.vertexShader}`.replace(
            `#include <begin_vertex>`,
            `#include <begin_vertex>   
                vec3 seg = position - mousePos;
                vec3 dir = normalize(seg);
                float dist = length(seg);
                if (dist < 1.5){
                float force = clamp(1.0 / (dist * dist), -0., .5);
                transformed += dir * force;
                vNormal = force /0.5;
                }`
            )
        }
        const points = new THREE.Points(pointsGeometry, pointsMaterial);
        const points2 = new THREE.Points(pointsGeometry2, pointsMaterial);
        const pointG = new THREE.Group();
            pointG.add(points);
            pointG.add(points2);
            scen.add( pointG);
            reObj["sam1"] = sam1;
            reObj["sam2"] = sam2;
            reObj["pmat"] = pointsMaterial, 
            reObj["pg"] =  pointG,
            reObj["scen"] = scen
       return reObj;
    }