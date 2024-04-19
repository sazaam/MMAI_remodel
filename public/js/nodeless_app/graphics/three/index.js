
var THREE, effects ;


var support = {
	canvas:!!window.HTMLCanvasElement,
	webgl:!!window.WebGLRenderingContext,
	isSmallScreen:(function(){
		// Galaxy Fold 768 x 1076

		return !!window.matchMedia("only screen and (max-width: 769px)").matches
		
		// THAT CHANGE REMOVES THE HOMEPAGE SCREEN EFFECT
		// return true ;
	})(),
	okFX:false
}

// WILL KIP ALL THIS, THREE + EFFECTS LOADING
// if(1){
//if((!support.isSmallScreen) && support.canvas && support.webgl){
if(support.canvas && support.webgl){
	THREE = window.THREE = require('./three.js') ;
	support.okFX = true ;
}


require('./build/js/controls/OrbitControls.js')
require('./build/js/controls/TrackballControls.js')
require('./build/js/loaders/GLTFLoader.js')
require('./build/js/loaders/DRACOLoader.js')
require('./build/js/loaders/RGBELoader.js') ;
require('./build/js/WebGL.js') ;

require('./addons/math/MeshSurfaceSampler.js') ;

/////////////////////////////////////////////////////////////////////////////// LOADING
var getGTLFLoader = function getGTLFLoader() {
	var gtlfloader = new THREE.GLTFLoader();
	var dracoLoader = new THREE.DRACOLoader();
	dracoLoader.setDecoderPath( '/js/nodeless_app/graphics/three/build/js/libs/draco/gltf/');
	gtlfloader.setDRACOLoader( dracoLoader );
	return gtlfloader;
} ;

var getIMGLoader = function getIMGLoader() {
	var imgloader = new THREE.RGBELoader()
	.setDataType( THREE.UnsignedByteType )
	.setPath('/hdr/') ;
	return imgloader ;
}

// this utility function allows you to use any three.js
// loader with promises and async/await
var THREELoad = function THREELoad(loader, url) {
	var time = performance.now();
	return new Promise((resolve, reject) => {
		loader.load(url, data=> {data.loadingtime = ( performance.now() - time ).toFixed( 2 ) ;return resolve(data)}, null, reject);
	});
}
				
////////////////////////////////////////////////////////////////// LIGHTS
var spots = [
	(()=>{
		var s = new THREE.SpotLight( 0xffffff, 1 );
		s.position.set( 5, 10, 5 );
		s.angle = 0.50;
		s.penumbra = 0.75;
		s.intensity = 100;
		s.decay = 1.3;
		return s ;
	}),
	(()=>{
		var s = new THREE.SpotLight( 0x775BBC, 1 );
		s.position.set( -5, 10, -5 );
		s.angle = 0.50;
		s.penumbra = 0.75;
		s.intensity = 100;
		s.decay = 1.3;
		return s ;
	}),
	(()=>{
		var s = new THREE.SpotLight( 0xFFFFFF, 1 );
		s.position.set( 0, -10, 0 );
		s.angle = 0.50;
		s.penumbra = 0.75;
		s.intensity = 100;
		s.decay = 1.3;
		return s ;
	})
] ;


////////////////////////////////////////////////// GROUND (Not in use yet)
var ground = (() =>{
	var g = new THREE.Mesh( 
		new THREE.PlaneBufferGeometry( 2048, 2048 ), 
		new THREE.MeshStandardMaterial( { color: 0xaaaaaa, transparent:true, opacity:.8, roughness:.4 } )
	) ;
	
	g.receiveShadow = !! SCI.addShadows;

	if ( SCI.groundPosition ) {
		g.position.copy( SCI.groundPosition ) ;
	}
	
	g.rotation.x = -Math.PI / 2 ;
	
	return g ;
}) ;


var viz3D = {
	settings:{
		scenes:{
			Machine: {
				name: 'MMAI_Home_Anim',
				
				// gltf: '/model/shoe.glb',
				// gltf: '/model/test.glb',
				// gltf: '/model/test3.glb',
				gltf: '/model/chain.glb',
				
				
				author: 'Sazaam',
				authorURL: 'https://www.sazaam.net/',
				
				
				
				cameraPosition: new THREE.Vector3( 0, 0, 5 ),
				
				objectRotation: new THREE.Euler( 0 , 0, 0),
				// objectPosition: new THREE.Vector3( 0, .5, 0 ),
				objectPosition: new THREE.Vector3( 0, 0, 0 ),
				
				addLights:spots,
				
				fog:true,
				
				// addShadows:true,
				
				// groundPosition: new THREE.Vector3( 0, -1.04, 0 ),
				
				// envMap: 'venice_sunset_1k.hdr',
				// showEnvMap:true
			}
		},
		state:{
			scene: 'Machine',
			variant:'variant_1'
		}
	},
  	enable:function(cond, canvascontainer, res){
    
		var ANIM_TW ;
		
	    if(cond){
			
			if(!res.userData.ANIM_TW){
				
				var state, scene, renderer, controls, camera ;
				var lights ;
				
				//COMPOSITING
				// var composer, effect ;
				var theta = 90 ;
				var radius = 5 ;
				var render = function render() {
					var SET = viz3D.settings ;
					var SCI = SET.scenes[ SET.state.scene ] ; // change State to change Model / Scene
					
					
					if(camera && SCI.objectPosition){
						theta += 0.1;
						theta = theta % 360 ;
						camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
						// camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
						camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
						camera.lookAt(SCI.objectPosition);
					}
					
					// if(SCI.chain) SCI.chain.rotation.y = SCI.chain.rotation.y - .002 ;
					// if(SCI.pointsmesh) SCI.pointsmesh.rotation.y = SCI.pointsmesh.rotation.y - .002 ;
					
					// if(SCI.particleGroup) SCI.particleGroup.rotation.y = SCI.particleGroup.rotation.y + .002 ;
			        
					renderer.render( scene, camera );
			    }
				
				var onWinResize = function onWinResize() {
			        camera.aspect = canvascontainer.width() / canvascontainer.height() ;
			        camera.updateProjectionMatrix() ;
			        renderer.setSize( canvascontainer.width(), canvascontainer.height() ) ;
			    }
				
				
	      		// const clock = new THREE.Clock();
				
				// Renderer
				var setRenderer = function setRenderer() {
			        renderer = new THREE.WebGLRenderer( { antialias: true,  alpha: true } );
			        renderer.setPixelRatio( window.devicePixelRatio );
			        
			        renderer.setSize( canvascontainer.width(), canvascontainer.height() );
			        // renderer.setClearColor(0xDDDDDD, 1);
			        renderer.outputEncoding = THREE.sRGBEncoding;
			        renderer.toneMapping = THREE.ACESFilmicToneMapping;
			        renderer.toneMappingExposure = 1;
			        renderer.physicallyCorrectLights = true;
			        canvascontainer.append( renderer.domElement );
							
					return renderer ;
				} ;
				
				// Scene
				var setScene = function setScene() {
	        		return new THREE.Scene() ;
				}
				
				// Camera
				var setCamera = function setCamera() {
					
	        		var cam = new THREE.PerspectiveCamera( 45, canvascontainer.width() / canvascontainer.height(), 0.25, 20 ) ;
					scene.add( cam ) ;
					
					cam.position.x = SCI.cameraPosition.x ;
					cam.position.y = SCI.cameraPosition.y ;
					cam.position.z = SCI.cameraPosition.z ;
					
					cam.lookAt( scene.position );
					
					return cam ;
				}
				
				// Lights
				var setLights = function setLights() {
					return SCI.addLights.map((spot)=>{
						
						s = spot() ;
						
						if ( SCI.addShadows ) {
							s.castShadow = true;
							s.shadow.bias = 0.0001;
							s.shadow.mapSize.width = 2048;
							s.shadow.mapSize.height = 2048;
						}	
						
						scene.add( s );
						return s ;
					}) ;
				}
				
				// Controls
				var setControls = function setControls() {
					return new THREE.OrbitControls( camera, renderer.domElement ) ;
				}
				
				
				

				var loads = async function loads(SCI) {
					
					// if images is required
						// for(...)
					
					if(!!SCI.envMap){
						var imgData = await THREELoad(getIMGLoader(), SCI.envMap) ;
						// console.info( 'Load time: ' + imgData.loadingtime + ' ms.' );
						
						const pmremGenerator = new THREE.PMREMGenerator( renderer );
						pmremGenerator.compileEquirectangularShader();
						
						SCI.envMap = pmremGenerator.fromEquirectangular( imgData ).texture ;
						pmremGenerator.dispose() ;
						
						if(SCI.showEnvMap) background = SCI.envMap ;
					}
					
					

						
///////////////////////////////////////////////////////////////////////////////////////////////////////// MODELS
					if(!!SCI.gltf){
						
						
						
						const gltfLoader = getGTLFLoader();
						
						gltfLoader.load(SCI.gltf, function(gltf) {
							
							var root = gltf.scene;
							
							// ADD Original Model to Scene
							// scene.add(root);
							
							SCI.chain = root ;
							
							root.material = new THREE.MeshDepthMaterial() ;
							
							root.rotation.x = SCI.objectRotation.x ;
							root.rotation.y = SCI.objectRotation.y ;
							root.rotation.z = SCI.objectRotation.z ;
							
							root.position.x = SCI.objectPosition.x ;
							root.position.y = SCI.objectPosition.y ;
							root.position.z = SCI.objectPosition.z ;
							
							
							var numparticles = 50000 ;
							
							var children = root.children ;
							
							var locations = [] ;
							
							const sampledpos = new THREE.Vector3();
							const mat = new THREE.Matrix4();
							
							
							SCI.children = children ;
							
							Array.from(children).forEach(function(ch, ind){
								
								locations[ind] = [] ;
								const sampler = new THREE.MeshSurfaceSampler( ch )
									.setWeightAttribute( null )
									.build();
								
								for ( let i = 0; i < numparticles ; i ++ ) {
									sampler.sample( sampledpos ) ;
									mat.makeTranslation( sampledpos.x, sampledpos.y, sampledpos.z ) ;
									
									var loc = new THREE.Vector3() ;
									loc.applyMatrix4(mat) ;
									locations[ind].push(loc) ;
								}
								
							})
							
							let position = new THREE.Vector3() ;
							const matrix = new THREE.Matrix4() ;
							const vecs = [] ;
							const randoms = [] ;
							
							var startIndex = 2 ;
							/////// INITIALIZE SET OF VECTORS
							for ( let i = 0; i < numparticles ; i ++ ) {
								var vec = new THREE.Vector3() ;
								
								position = locations[startIndex][i] ;
								matrix.makeTranslation( position.x, position.y, position.z ) ;
								vec.applyMatrix4(matrix) ;
								
								vecs.push( vec );
								
								var rand = new THREE.Vector3() ;
								var sc = 15 ;
								
								matrix.makeTranslation( Math.random() * sc - 7.5, Math.random() * sc- 7.5, Math.random() * sc- 7.5 ) ;
								rand.applyMatrix4(matrix) ;
								randoms.push(rand) ;
							}
							
							
							///////////////////// POINTS CREATION (Must not to recreate)
							const geometryPoints = new THREE.BufferGeometry().setFromPoints( vecs );
							const materialPoints = new THREE.PointsMaterial({
								color:0x3a6df0,
								size: .015,
							});
							const pointCloud = new THREE.Points( geometryPoints, materialPoints );
							
							pointCloud.sortParticles = true;
							
							
							$('#mainloader').remove() ;
							SCI.pointsmesh = pointCloud ;
							if(SCI.objectPosition) pointCloud.position.y = SCI.objectPosition.y ;
							scene.add( pointCloud );
							
							function shuffle(array) {
								for (let i = array.length - 1; i > 0; i--) {
									let j = Math.floor(Math.random() * (i + 1)); 
									[array[i], array[j]] = [array[j], array[i]];
								}
							}
							  
							/*
							
							SCI.pointsmesh = pointsmesh ;
							//pointsmesh.rotation.y = (Math.PI / 2) - .165 ;
							pointsmesh.position.y = .5 ;
							scene.add( pointsmesh );
							 */
							
							
							
							const base = children.pop() ;
							const base_loc = locations.pop() ;
							
							SCI.morphIndex = (startIndex + 1) % SCI.children.length ;
							trace(SCI.children.length)
							
							SCI.morphInto = function(idx){
								SCI.morphIndex = SCI.morphIndex % SCI.children.length ;
								var dummy = {scale:0} ;
								
								var pos = pointCloud.geometry.attributes.position.array ;
								shuffle(locations[idx]) ;
								var l = pos.length ;
								var p = [] ;
								var sc = 1.5 ;
								if(!!SCI.twParticles) SCI.twParticles.stop().destroy() ;
								SCI.twParticles = BJS.serial(
									
									BJS.create({
										target:dummy,
										to:{
											scale:1
										},
										from:{
											scale:0
										},
										time:2.75,
										ease:Expo.easeOut,
										onUpdate:function(){
											pointCloud.geometry.attributes.position.needsUpdate = false;
											
											for ( let i = 0; i < numparticles ; i ++ ) {
												var n = i * 3 ;
												var m = n % 3 ;
												var loc = locations[idx][i] ;
												p[ i ] = loc ;
												
												pos[n] 		= (pos[n] 		* (1 - dummy.scale)) + (p[i].x * dummy.scale)
												pos[n + 1] 	= (pos[n + 1] 	* (1 - dummy.scale)) + (p[i].y * dummy.scale)
												pos[n + 2] 	= (pos[n + 2] 	* (1 - dummy.scale)) + (p[i].z * dummy.scale)
											}
											
											pointCloud.geometry.attributes.position.needsUpdate = true;
											
										},
										onComplete:function(){
											pointCloud.sortParticles = true;
										}
									})
								)
								SCI.twParticles.play() ;
								
							}
							
							
							
							
						}) ;
						
					}
					
					
					
///////////////////////////////////////////////////////////////////////////////////////////////////////// SKY PARTICLES
					var particleGroup = SCI.particleGroup = new THREE.Object3D();
					
					var mathRandom = function mathRandom(num = 1) { return - Math.random() * num + Math.random() * num; }
					
					var generateParticle = function generateParticle(num, amp = 2) {
						var gmaterial = new THREE.MeshPhysicalMaterial({color:0x3a6df0, side:THREE.DoubleSide});
						var gparticular = new THREE.CircleGeometry(.25,5);

						for (var i = 1; i < num; i++) {
							var pscale = 0.001+Math.abs(mathRandom(0.03));
							var particular = new THREE.Mesh(gparticular, gmaterial);
							particular.position.set(mathRandom(amp),mathRandom(amp),mathRandom(amp));
							particular.rotation.set(mathRandom(),mathRandom(),mathRandom());
							particular.scale.set(pscale,pscale,pscale);
							particular.speedValue = mathRandom(1);

							particleGroup.add(particular);
						}
					}
					
					generateParticle(200, 2);
					//scene.add(particleGroup);
					
					/////////////////////////////////////////////
					
					
					SCI.clk = function(e){
						SCI.morphInto(SCI.morphIndex ++) ;
					} ;
					
					
					return 'sazaam' ;
				}
				//////////////////////////////////////////////////////////////////////////////////// END LOADS
				
				
///////////////////////////////////////////////////////////////////////////// SETUP
				var setup = async function setup(){
					
					var SET = viz3D.settings ;
					
					SCI = SET.scenes[ SET.state.scene ] ;
					SCI.state = SET.state ;
					
					renderer = setRenderer() ;
					scene = setScene() ;
					camera = setCamera() ;
					controls = setControls() ;
					
					
					
					// LIGHTS
			        if (!!SCI.addLights) {
						lights = setLights() ;
						
						lights.map( (spot) => {
							spot.lookAt( scene.position );	
						}) ;
			        }
					// SHADOWS
			        if (!!SCI.addShadows) {
			          renderer.shadowMap.enabled = true;
			          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			        }
					// GROUND
			        if (!!SCI.addGround) {
						scene.add( SCI.ground = SCI.addGround() ) ;
			        }
					// FOG
					if (!!SCI.fog) {
						// scene.fog = new THREE.Fog(0x121212, 5, 8) ;
						scene.fog = new THREE.Fog(0xFFFFFF, 5, 8) ;
						// scene.fog = new THREE.Fog(0x895099, -0.5, 8) ;
			        }
					
					var p = await loads(SCI).catch(error => { console.error(error); }) ;
					
					/// CAMERA
					if ( SCI.cameraPosition ) {
						camera.position.copy( SCI.cameraPosition ) ;
					}
					
					/// CONTROLS
					if ( SCI.center ) {
						controls.target.copy( SCI.objectPosition ) ;
					}
					
					
					
					ANIM_TW = res.userData.ANIM_TW = new BTW.$.Animation(undefined, render) ;
					ANIM_TW.start() ;
					
				}
				
				setup() ;
				
				
			}else{
				
				ANIM_TW = res.userData.ANIM_TW ;
				ANIM_TW.start() ;
				
			}
			
			$('.page.purechain').on('click', SCI.clk) ;
			
			window.addEventListener( 'resize', onWinResize, false );
			
	    }else{
			
			
			ANIM_TW = res.userData.ANIM_TW ;
			ANIM_TW.halt() ;
			
			
			window.removeEventListener( 'resize', onWinResize, false ) ;
			$('.page.purechain').off('click', SCI.clk) ;
	    }

	}
}


module.exports = {
	support:support,
	viz3D:viz3D
}


