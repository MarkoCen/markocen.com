declare const THREE: any;

import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import React, { Component, ReactElement, RefObject } from 'react';
import styled, { keyframes } from 'styled-components';
import BirdGeometry from './BirdGeometry';
import GPUComputationRenderer from './GPUComputationRenderer';

const Container = styled.div`
    position: absolute;
    z-index: -1;
    background: radial-gradient(
        closest-corner, white, white, white, white, white, white, rgba(211, 211, 211, 0.6)
    );
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: .6;
    }
`;

const CanvasWrap = styled.div`
    width: 100%;
    height: 100%;
    animation: ${fadeIn} 8s ease-in;
    animation-fill-mode: forwards;
`;

@autobind
class BirdBackground extends Component {
    public static propTypes = {};
    private WIDTH: number;
    private BIRDS: number;
    private BOUNDS: number = 800;
    private BOUNDS_HALF: number = 800 / 2;
    private windowHalfX!: number;
    private windowHalfY!: number;
    private mouseX!: number;
    private mouseY!: number;
    private camera!: THREE.PerspectiveCamera;
    private scene!: THREE.Scene;
    private renderer!: THREE.WebGLRenderer;
    private gpuCompute!: any;
    private velocityVariable!: any;
    private positionVariable!: any;
    private positionUniforms!: any;
    private velocityUniforms!: any;
    private birdUniforms!: any;
    private stageRef: RefObject<HTMLDivElement>;
    private last = performance.now();

    constructor(props: any, context: any) {
        super(props, context);
        this.WIDTH = 16;
        this.BIRDS = this.WIDTH * this.WIDTH;
        this.stageRef = React.createRef();
    }

    public componentDidMount() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.init();
        this.animate();
    }

    public initComputeRenderer() {
        this.gpuCompute = new GPUComputationRenderer(this.WIDTH, this.WIDTH, this.renderer);

        const dtPosition = this.gpuCompute.createTexture();
        const dtVelocity = this.gpuCompute.createTexture();

        this.fillPositionTexture(dtPosition);
        this.fillVelocityTexture(dtVelocity);

        this.velocityVariable = this.gpuCompute.addVariable(
            'textureVelocity',
            document.getElementById('fragmentShaderVelocity')!.textContent,
            dtVelocity,
        );
        this.positionVariable = this.gpuCompute.addVariable(
            'texturePosition',
            document.getElementById('fragmentShaderPosition')!.textContent,
            dtPosition,
        );

        this.gpuCompute.setVariableDependencies(
            this.velocityVariable,
            [this.positionVariable, this.velocityVariable],
        );
        this.gpuCompute.setVariableDependencies(
            this.positionVariable,
            [this.positionVariable, this.velocityVariable],
        );

        this.positionUniforms = this.positionVariable.material.uniforms;
        this.velocityUniforms = this.velocityVariable.material.uniforms;
        this.positionUniforms.time = { value: 0.0 };
        this.positionUniforms.delta = { value: 0.0 };
        this.velocityUniforms.time = { value: 1.0 };
        this.velocityUniforms.delta = { value: 0.0 };
        this.velocityUniforms.testing = { value: 1.0 };
        this.velocityUniforms.seperationDistance = { value: 1.0 };
        this.velocityUniforms.alignmentDistance = { value: 1.0 };
        this.velocityUniforms.cohesionDistance = { value: 1.0 };
        this.velocityUniforms.freedomFactor = { value: 1.0 };
        this.velocityUniforms.predator = { value: new THREE.Vector3() };
        this.velocityVariable.material.defines.BOUNDS = this.BOUNDS.toFixed(2);
        this.velocityVariable.wrapS = THREE.RepeatWrapping;
        this.velocityVariable.wrapT = THREE.RepeatWrapping;
        this.positionVariable.wrapS = THREE.RepeatWrapping;
        this.positionVariable.wrapT = THREE.RepeatWrapping;

        this.gpuCompute.init();
    }

    public init() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
        this.camera.position.z = 350;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.scene.fog = new THREE.Fog(0xffffff, 100, 1000);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.stageRef.current!.appendChild(this.renderer.domElement);

        this.initComputeRenderer();

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('touchstart', this.onDocumentTouchStart);
        document.addEventListener('touchmove', this.onDocumentTouchMove);
        window.addEventListener('resize', this.onWindowResize);

        const effectController = {
            alignment: 20.0,
            cohesion: 20.0,
            freedom: 0.75,
            seperation: 20.0,
        };

        const valuesChanger = () => {
            this.velocityUniforms.seperationDistance.value = effectController.seperation;
            this.velocityUniforms.alignmentDistance.value = effectController.alignment;
            this.velocityUniforms.cohesionDistance.value = effectController.cohesion;
            this.velocityUniforms.freedomFactor.value = effectController.freedom;
        };
        valuesChanger();

        this.initBirds();
    }

    public initBirds() {
        const geometry = new BirdGeometry(this.BIRDS, this.WIDTH);
        // For Vertex and Fragment
        this.birdUniforms = {
            color: { value: new THREE.Color('0xff2200') },
            delta: { value: 0.0 },
            texturePosition: { value: null },
            textureVelocity: { value: null },
            time: { value: 1.0 },
        };
        // ShaderMaterial
        const material = new THREE.ShaderMaterial({
            fragmentShader: document.getElementById('birdFS')!.textContent,
            side: THREE.DoubleSide,
            uniforms: this.birdUniforms,
            vertexShader: document.getElementById('birdVS')!.textContent,
        });
        const birdMesh = new THREE.Mesh(geometry, material);
        birdMesh.rotation.y = Math.PI / 2;
        birdMesh.matrixAutoUpdate = false;
        birdMesh.updateMatrix();
        this.scene.add(birdMesh);
    }

    public fillPositionTexture(texture: any) {
        const theArray = texture.image.data;
        for (let k = 0, kl = theArray.length; k < kl; k += 4) {
            const x = Math.random() * this.BOUNDS - this.BOUNDS_HALF;
            const y = Math.random() * this.BOUNDS - this.BOUNDS_HALF;
            const z = Math.random() * this.BOUNDS - this.BOUNDS_HALF;
            theArray[ k + 0 ] = x;
            theArray[ k + 1 ] = y;
            theArray[ k + 2 ] = z;
            theArray[ k + 3 ] = 1;
        }
    }

    public fillVelocityTexture(texture: any) {
        const theArray = texture.image.data;
        for (let k = 0, kl = theArray.length; k < kl; k += 4) {
            const x = Math.random() - 0.5;
            const y = Math.random() - 0.5;
            const z = Math.random() - 0.5;
            theArray[ k + 0 ] = x * 10;
            theArray[ k + 1 ] = y * 10;
            theArray[ k + 2 ] = z * 10;
            theArray[ k + 3 ] = 1;
        }
    }

    public onDocumentMouseMove(event: MouseEvent) {
        this.mouseX = event.clientX - this.windowHalfX;
        this.mouseY = event.clientY - this.windowHalfY;
    }

    public onDocumentTouchStart(event: TouchEvent) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
            this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
        }
    }

    public onDocumentTouchMove(event: TouchEvent) {
        if (event.touches.length === 1) {
            event.preventDefault();
            this.mouseX = event.touches[ 0 ].pageX - this.windowHalfX;
            this.mouseY = event.touches[ 0 ].pageY - this.windowHalfY;
        }
    }

    public onWindowResize() {
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public animate() {
        window.requestAnimationFrame(this.animate);
        this.renderCanvas();
    }

    public renderCanvas() {
        const now = performance.now();
        let delta = (now - this.last) / 1000;
        if (delta > 1) { delta = 1; } // safety cap on large deltas
        this.last = now;
        this.positionUniforms.time.value = now;
        this.positionUniforms.delta.value = delta;
        this.velocityUniforms.time.value = now;
        this.velocityUniforms.delta.value = delta;
        this.birdUniforms.time.value = now;
        this.birdUniforms.delta.value = delta;
        this.velocityUniforms.predator.value.set(
            0.5 * this.mouseX / this.windowHalfX,
            - 0.5 * this.mouseY / this.windowHalfY,
            0,
        );
        this.mouseX = 10000;
        this.mouseY = 10000;
        this.gpuCompute.compute();
        this.birdUniforms.texturePosition.value = this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture;
        this.birdUniforms.textureVelocity.value = this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture;
        this.renderer.render(this.scene, this.camera);
    }

    public render() {
        return (
            <Container>
                <CanvasWrap innerRef={this.stageRef} />
                <script
                    id="fragmentShaderPosition"
                    type="x-shader/x-fragment"
                    dangerouslySetInnerHTML={{__html: `
uniform float time;
uniform float delta;
void main()	{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 tmpPos = texture2D( texturePosition, uv );
    vec3 position = tmpPos.xyz;
    vec3 velocity = texture2D( textureVelocity, uv ).xyz;
    float phase = tmpPos.w;
    phase = mod( ( phase + delta +
        length( velocity.xz ) * delta * 3. +
        max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );
    gl_FragColor = vec4( position + velocity * delta * 15. , phase );
}
                    `}}
                />
                <script
                    id="fragmentShaderVelocity"
                    type="x-shader/x-fragment"
                    dangerouslySetInnerHTML={{__html: `
uniform float time;
uniform float testing;
uniform float delta; // about 0.016
uniform float seperationDistance; // 20
uniform float alignmentDistance; // 40
uniform float cohesionDistance; //
uniform float freedomFactor;
uniform vec3 predator;
const float width = resolution.x;
const float height = resolution.y;
const float PI = 3.141592653589793;
const float PI_2 = PI * 2.0;
// const float VISION = PI * 0.55;
float zoneRadius = 40.0;
float zoneRadiusSquared = 1600.0;
float separationThresh = 0.45;
float alignmentThresh = 0.65;
const float UPPER_BOUNDS = BOUNDS;
const float LOWER_BOUNDS = -UPPER_BOUNDS;
const float SPEED_LIMIT = 9.0;
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
void main() {
    zoneRadius = seperationDistance + alignmentDistance + cohesionDistance;
    separationThresh = seperationDistance / zoneRadius;
    alignmentThresh = ( seperationDistance + alignmentDistance ) / zoneRadius;
    zoneRadiusSquared = zoneRadius * zoneRadius;
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 birdPosition, birdVelocity;
    vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
    vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;
    float dist;
    vec3 dir; // direction
    float distSquared;
    float seperationSquared = seperationDistance * seperationDistance;
    float cohesionSquared = cohesionDistance * cohesionDistance;
    float f;
    float percent;
    vec3 velocity = selfVelocity;
    float limit = SPEED_LIMIT;
    dir = predator * UPPER_BOUNDS - selfPosition;
    dir.z = 0.;
    // dir.z *= 0.6;
    dist = length( dir );
    distSquared = dist * dist;
    float preyRadius = 150.0;
    float preyRadiusSq = preyRadius * preyRadius;
    // move birds away from predator
    if (dist < preyRadius) {
        f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
        velocity += normalize( dir ) * f;
        limit += 5.0;
    }
    // if (testing == 0.0) {}
    // if ( rand( uv + time ) < freedomFactor ) {}
    // Attract flocks to the center
    vec3 central = vec3( 0., 0., 0. );
    dir = selfPosition - central;
    dist = length( dir );
    dir.y *= 2.5;
    velocity -= normalize( dir ) * delta * 5.;
    for (float y=0.0;y<height;y++) {
        for (float x=0.0;x<width;x++) {
            vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
            birdPosition = texture2D( texturePosition, ref ).xyz;
            dir = birdPosition - selfPosition;
            dist = length(dir);
            if (dist < 0.0001) continue;
            distSquared = dist * dist;
            if (distSquared > zoneRadiusSquared ) continue;
            percent = distSquared / zoneRadiusSquared;
            if ( percent < separationThresh ) { // low
                // Separation - Move apart for comfort
                f = (separationThresh / percent - 1.0) * delta;
                velocity -= normalize(dir) * f;
            } else if ( percent < alignmentThresh ) { // high
                // Alignment - fly the same direction
                float threshDelta = alignmentThresh - separationThresh;
                float adjustedPercent = ( percent - separationThresh ) / threshDelta;
                birdVelocity = texture2D( textureVelocity, ref ).xyz;
                f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
                velocity += normalize(birdVelocity) * f;
            } else {
                // Attraction / Cohesion - move closer
                float threshDelta = 1.0 - alignmentThresh;
                float adjustedPercent = ( percent - alignmentThresh ) / threshDelta;
                f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;
                velocity += normalize(dir) * f;
            }
        }
    }
    // this make tends to fly around than down or up
    // if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);
    // Speed Limits
    if ( length( velocity ) > limit ) {
        velocity = normalize( velocity ) * limit;
    }
    gl_FragColor = vec4( velocity, 1.0 );
}
                    `}}
                />
                <script
                    type="x-shader/x-vertex"
                    id="birdVS"
                    dangerouslySetInnerHTML={{__html: `
attribute vec2 reference;
attribute float birdVertex;
attribute vec3 birdColor;
uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
varying vec4 vColor;
varying float z;
uniform float time;
void main() {
    vec4 tmpPos = texture2D( texturePosition, reference );
    vec3 pos = tmpPos.xyz;
    vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);
    vec3 newPosition = position;
    if ( birdVertex == 4.0 || birdVertex == 7.0 ) {
        // flap wings
        newPosition.y = sin( tmpPos.w ) * 5.;
    }
    newPosition = mat3( modelMatrix ) * newPosition;
    velocity.z *= -1.;
    float xz = length( velocity.xz );
    float xyz = 1.;
    float x = sqrt( 1. - velocity.y * velocity.y );
    float cosry = velocity.x / xz;
    float sinry = velocity.z / xz;
    float cosrz = x / xyz;
    float sinrz = velocity.y / xyz;
    mat3 maty =  mat3(
        cosry, 0, -sinry,
        0    , 1, 0     ,
        sinry, 0, cosry
    );
    mat3 matz =  mat3(
        cosrz , sinrz, 0,
        -sinrz, cosrz, 0,
        0     , 0    , 1
    );
    newPosition =  maty * matz * newPosition;
    newPosition += pos;
    z = newPosition.z;
    vColor = vec4( birdColor, 1.0 );
    gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );
}
                    `}}
                />
                <script
                    type="x-shader/x-fragment"
                    id="birdFS"
                    dangerouslySetInnerHTML={{__html: `
varying vec4 vColor;
varying float z;
uniform vec3 color;
void main() {
    // Fake colors for now
    float z2 = 0.2 + ( 1000. - z ) / 1000. * vColor.x;
    gl_FragColor = vec4( z2, z2, z2, 1. );
}
                    `}}
                />
            </Container>
        );
    }
}

export default BirdBackground;
