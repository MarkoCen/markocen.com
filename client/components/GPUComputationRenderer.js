function GPUComputationRenderer(sizeX, sizeY, renderer) {
	this.variables = [];

	this.currentTextureIndex = 0;

	const scene = new THREE.Scene();

	const camera = new THREE.Camera();
	camera.position.z = 1;

	const passThruUniforms = {
		texture: { value: null },
	};

	const passThruShader = createShaderMaterial(getPassThroughFragmentShader(), passThruUniforms);

	const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), passThruShader);
	scene.add(mesh);

	this.addVariable = function(variableName, computeFragmentShader, initialValueTexture) {

		const material = this.createShaderMaterial(computeFragmentShader);

		const variable = {
			name: variableName,
			initialValueTexture,
			material,
			dependencies: null,
			renderTargets: [],
			wrapS: null,
			wrapT: null,
			minFilter: THREE.NearestFilter,
			magFilter: THREE.NearestFilter,
		};

		this.variables.push(variable);

		return variable;

	};

	this.setVariableDependencies = function(variable, dependencies) {

		variable.dependencies = dependencies;

	};

	this.init = function() {

		if (! renderer.extensions.get('OES_texture_float')) {

			return 'No OES_texture_float support for float textures.';

		}

		if (renderer.capabilities.maxVertexTextures === 0) {

			return 'No support for vertex shader textures.';

		}

		for (let i = 0; i < this.variables.length; i++) {

			const variable = this.variables[ i ];

			// Creates rendertargets and initialize them with input texture
			variable.renderTargets[ 0 ] = this.createRenderTarget(sizeX, sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter);
			variable.renderTargets[ 1 ] = this.createRenderTarget(sizeX, sizeY, variable.wrapS, variable.wrapT, variable.minFilter, variable.magFilter);
			this.renderTexture(variable.initialValueTexture, variable.renderTargets[ 0 ]);
			this.renderTexture(variable.initialValueTexture, variable.renderTargets[ 1 ]);

			// Adds dependencies uniforms to the ShaderMaterial
			const material = variable.material;
			const uniforms = material.uniforms;
			if (variable.dependencies !== null) {

				for (let d = 0; d < variable.dependencies.length; d++) {

					const depVar = variable.dependencies[ d ];

					if (depVar.name !== variable.name) {

						// Checks if variable exists
						let found = false;
						for (let j = 0; j < this.variables.length; j++) {

							if (depVar.name === this.variables[ j ].name) {
								found = true;
								break;
							}

						}
						if (! found) {
							return 'Variable dependency not found. Variable=' + variable.name + ', dependency=' + depVar.name;
						}

					}

					uniforms[ depVar.name ] = { value: null };

					material.fragmentShader = '\nuniform sampler2D ' + depVar.name + ';\n' + material.fragmentShader;

				}
			}
		}

		this.currentTextureIndex = 0;

		return null;

	};

	this.compute = function() {

		const currentTextureIndex = this.currentTextureIndex;
		const nextTextureIndex = this.currentTextureIndex === 0 ? 1 : 0;

		for (let i = 0, il = this.variables.length; i < il; i++) {

			const variable = this.variables[ i ];

			// Sets texture dependencies uniforms
			if (variable.dependencies !== null) {

				const uniforms = variable.material.uniforms;
				for (let d = 0, dl = variable.dependencies.length; d < dl; d++) {

					const depVar = variable.dependencies[ d ];

					uniforms[ depVar.name ].value = depVar.renderTargets[ currentTextureIndex ].texture;

				}

			}

			// Performs the computation for this variable
			this.doRenderTarget(variable.material, variable.renderTargets[ nextTextureIndex ]);

		}

		this.currentTextureIndex = nextTextureIndex;
	};

	this.getCurrentRenderTarget = function(variable) {

		return variable.renderTargets[ this.currentTextureIndex ];

	};

	this.getAlternateRenderTarget = function(variable) {

		return variable.renderTargets[ this.currentTextureIndex === 0 ? 1 : 0 ];

	};

	function addResolutionDefine(materialShader) {

		materialShader.defines.resolution = 'vec2( ' + sizeX.toFixed(1) + ', ' + sizeY.toFixed(1) + ' )';

	}
	this.addResolutionDefine = addResolutionDefine;

	// The following functions can be used to compute things manually

	function createShaderMaterial(computeFragmentShader, uniforms) {

		uniforms = uniforms || {};

		const material = new THREE.ShaderMaterial({
			uniforms,
			vertexShader: getPassThroughVertexShader(),
			fragmentShader: computeFragmentShader,
		});

		addResolutionDefine(material);

		return material;
	}
	this.createShaderMaterial = createShaderMaterial;

	this.createRenderTarget = function(sizeXTexture, sizeYTexture, wrapS, wrapT, minFilter, magFilter) {

		sizeXTexture = sizeXTexture || sizeX;
		sizeYTexture = sizeYTexture || sizeY;

		wrapS = wrapS || THREE.ClampToEdgeWrapping;
		wrapT = wrapT || THREE.ClampToEdgeWrapping;

		minFilter = minFilter || THREE.NearestFilter;
		magFilter = magFilter || THREE.NearestFilter;

		const renderTarget = new THREE.WebGLRenderTarget(sizeXTexture, sizeYTexture, {
			wrapS,
			wrapT,
			minFilter,
			magFilter,
			format: THREE.RGBAFormat,
			type: (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) ? THREE.HalfFloatType : THREE.FloatType,
			stencilBuffer: false,
			depthBuffer: false,
		});

		return renderTarget;

	};

	this.createTexture = function() {

		const a = new Float32Array(sizeX * sizeY * 4);
		const texture = new THREE.DataTexture(a, sizeX, sizeY, THREE.RGBAFormat, THREE.FloatType);
		texture.needsUpdate = true;

		return texture;

	};

	this.renderTexture = function(input, output) {

		// Takes a texture, and render out in rendertarget
		// input = Texture
		// output = RenderTarget

		passThruUniforms.texture.value = input;

		this.doRenderTarget(passThruShader, output);

		passThruUniforms.texture.value = null;

	};

	this.doRenderTarget = function(material, output) {

		mesh.material = material;
		renderer.render(scene, camera, output);
		mesh.material = passThruShader;

	};

	// Shaders

	function getPassThroughVertexShader() {

		return	'void main()	{\n' +
				'\n' +
				'	gl_Position = vec4( position, 1.0 );\n' +
				'\n' +
				'}\n';

	}

	function getPassThroughFragmentShader() {

		return	'uniform sampler2D texture;\n' +
				'\n' +
				'void main() {\n' +
				'\n' +
				'	vec2 uv = gl_FragCoord.xy / resolution.xy;\n' +
				'\n' +
				'	gl_FragColor = texture2D( texture, uv );\n' +
				'\n' +
				'}\n';

	}

}

export default GPUComputationRenderer;