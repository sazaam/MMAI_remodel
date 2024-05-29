
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
				gltf: '/model/chain.glb',
				
				
				author: 'Sazaam',
				authorURL: 'https://www.sazaam.net/',
				
				
				
				cameraPosition: new THREE.Vector3( 0, 0, 5 ),
				
				objectRotation: new THREE.Euler( 0 , 0, 0),
				// objectPosition: new THREE.Vector3( 0, .5, 0 ),
				objectPosition: new THREE.Vector3( 0, 0, 0 ),
				
				//addLights:spots,
				
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
  	enable:function(cond, canvascontainer, res, cb, args){
    
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
						
						SCI.shuffle = function(array) {
							for (let i = array.length - 1; i > 0; i--) {
								let j = Math.floor(Math.random() * (i + 1)); 
								[array[i], array[j]] = [array[j], array[i]];
							}
							return array ;
						}
						
						const gltfLoader = getGTLFLoader();
						
						gltfLoader.load(SCI.gltf, function(gltf) {
							
							var root = gltf.scene;
							
							trace('GLTF loaded')
							
							SCI.root = root ;
							
							
							//root.material = new THREE.MeshDepthMaterial({opacity:.1,wireframe:true, wireframeLinewidth:.1}) ;
							//scene.add(root) ;
							root.rotation.x = SCI.objectRotation.x ;
							root.rotation.y = SCI.objectRotation.y ;
							root.rotation.z = SCI.objectRotation.z ;
							
							root.position.x = SCI.objectPosition.x ;
							root.position.y = SCI.objectPosition.y ;
							root.position.z = SCI.objectPosition.z ;
							
							
							var numparticles = 160000 ;
							
							
							var children = SCI.children = [].concat(root.children) ;
							
							var locations = {} ;
							
							const sampledpos = new THREE.Vector3();
							const mat = new THREE.Matrix4();
							
							let names = [] ;
							
							let ind = 0 ;
							let ll = children.length ;


							let commands = [] ;
							let sampler ;


							////////// Looping thru Children list
							for(ind = 0 ; ind < ll ; ind++){

								var ch = children[ind] ;
								var comm = new Command(this, function(ch, ind){
									
									let name = ch.name ; 
									names.push(name) ;
									locations[name] = [] ;
									
									sampler = new THREE.MeshSurfaceSampler( ch )
										//.setWeightAttribute( null )
										.build();
									
									for ( let i = 0; i < numparticles ; i ++ ) {
										sampler.sample( sampledpos ) ;
										mat.makeTranslation( sampledpos.x, sampledpos.y, sampledpos.z ) ;
										
										var loc = new THREE.Vector3() ;
										loc.applyMatrix4(mat) ;
										locations[name].push(loc) ;
									}
									
									// trace(this)
									//return this ;
								}, ch, ind) ;
								// creating each command
								comm.name = ch.name ;
								commands.push(comm) ;
							}
							
							var firstcommand ;
							var firstname = res.name!='home' ? res.name == "MMAI" ? "certificates" : res.name : 'chain' ;
							var found = 0 ;

							let retrieveCommandByName = function(name){
								name = name!='home' ? name : 'chain' ;
								let ind, ll = commands.length ;
								let command ;
								for(ind = 0 ; ind < ll ; ind++){
									command = commands[ind] ;
									if(command.name == name){
										commands.splice(ind, 1) ;
										break ;
									}
								}
								return command ;
							}
							
							SCI.morphIndex = firstname ;
								
							SCI.morphInto = function(name){
								if(name == "MMAI") name = "certificates" ;
								if(!locations[name]){
									firstcommand = retrieveCommandByName(name) ;
									let firstcq = new CommandQueue() ;
									firstcq.add(firstcommand) ;
									firstname = firstcommand.name ;
									
									
									firstcq.bind('$', function(){
										MMAI.home.delegMorph() ;
										SCI.morph(firstname) ;
									}) ;
									
									firstcq.execute() ;
								}else{
									SCI.morph(name) ;
								}
							}

							SCI.morph = function(name){
								
								if(name == '*'){
									name = SCI.getRandomName(SCI.morphIndex) ;
								}
								
								
								SCI.morphIndex = name ;
								
								var morphloc = locations[name] ;

								var pos = pointCloud.geometry.attributes.position.array ;
								SCI.shuffle(morphloc) ;
								
								var p = [] ;
								
								if(!!SCI.twParticles){
									if(SCI.twParticles.isPlaying) SCI.twParticles.stop() ;
									//SCI.twParticles.destroy() ;
								} 
								
								SCI.twParticles = BJS.create({
									target:dummy,
									to:{
										scale:.5
									},
									from:{
										scale:0
									},
									time:1.25,
									ease:Expo.easeOut,
									onUpdate:function(){
								
										pointCloud.geometry.attributes.position.needsUpdate = true;
										for ( let i = 0; i < numparticles ; i ++ ) {
											var n = i * 3 ;
											var m = n % 3 ;
											var loc = morphloc[i] ;
											p[ i ] = loc ;
											
											pos[n] 		= (pos[n] 		* (1 - dummy.scale)) + (p[i].x * dummy.scale)
											pos[n + 1] 	= (pos[n + 1] 	* (1 - dummy.scale)) + (p[i].y * dummy.scale)
											pos[n + 2] 	= (pos[n + 2] 	* (1 - dummy.scale)) + (p[i].z * dummy.scale)
										}
										
										
									},
									onComplete:function(){
										pointCloud.sortParticles = true;
										pointCloud.geometry.attributes.position.needsUpdate = false;
									}
								})
								
								/* hack CHROME not triggering */
								setTimeout(function(){SCI.twParticles.play()}, 1) ;
								
								return SCI.morphIndex ;
								
							}

							// let cq = new CommandQueue() ;
							// cq.add(commands) ;
							
							firstcommand = retrieveCommandByName(firstname) ;
							let firstcq = new CommandQueue() ;
							firstcq.add(firstcommand) ;
							
							let pointCloud ;///////////////////// POINTS CREATION (Must not to recreate)
							
							
							// pointCloud.sortParticles = true;
							let dummy = {scale:0} ;

							firstcq.bind('$', MMAI.home.delegMorph = MMAI.home.delegMorph || function(){
								
								
								SCI.getRandomName = SCI.getRandomName || function(curname){
									let str ;
									
									while((str = SCI.shuffle(names)[0]) == curname){
										//
									}
									return str ;
								} ;
								

								let position = new THREE.Vector3() ;
								const matrix = new THREE.Matrix4() ;
								const vecs = [] ;
								
								
								// const randoms = [] ;
								
								var startname = firstname ;
								trace('startbname', startname)
								/////// INITIALIZE SET OF VECTORS
								for ( let i = 0; i < numparticles ; i ++ ) {
									var vec = new THREE.Vector3() ;
									
									position = locations[startname][i] ;
									matrix.makeTranslation( position.x, position.y, position.z ) ;
									vec.applyMatrix4(matrix) ;
									
									vecs.push( vec );
								}
								
								if(!!!pointCloud){
									const geometryPoints = new THREE.BufferGeometry().setFromPoints( vecs );
									const materialPoints = new THREE.PointsMaterial({
										color:0x3a6df0,
										size: .012,
									});
									pointCloud = new THREE.Points( geometryPoints, materialPoints );
								
								}
								
								
								$('#mainloader').addClass('none') ;
								SCI.pointsmesh = pointCloud ;
								if(SCI.objectPosition) pointCloud.position.y = SCI.objectPosition.y ;
								scene.add( pointCloud );
								
								
								if(!!cb) cb.apply(SCI, [].concat(args)) ;

							})
							firstcq.execute() ;
							
						}) ;
						
					}
					

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
					
					
					
					
					(function(){
						
						
						


						return ;
						
						fetch('/model/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
							{
								
								
								const ARC_REL_LEN = 3.4; // relative to whole arc
								const FLIGHT_TIME = 250;
								const NUM_RINGS = 3;
								const RINGS_MAX_R = 5; // deg
								const RING_PROPAGATION_SPEED = 5; // deg/sec
								
								
								const N = 300;
							    const gData = [...Array(N).keys()].map(() => ({
							      lat: (Math.random() - 0.5) * 180,
							      lng: (Math.random() - 0.5) * 360,
							      size: Math.random() / 3,
							      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
							    }));

								
								const globe = new ThreeGlobe({
									animateIn:0
								}).globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
								.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
								.pointsData(gData)
								.pointAltitude('size')
								.pointColor('color');
									
								scene.add(globe) ;
								/**
								const globeMaterial = globe.globeMaterial();
								// globeMaterial.bumpScale = 10;
								// new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
								//   globeMaterial.specularMap = texture;
								  globeMaterial.specular = '#3a6df0';
								  globeMaterial.shininess = 15;
								// });	
								 */
								/* let prevCoords = { lat: 0, lng: 0 };
								function emitArc({ lat: endLat, lng: endLng }) {
								  const { lat: startLat, lng: startLng } = prevCoords;
								  setTimeout(() => { prevCoords = { lat: endLat, lng: endLng }}, FLIGHT_TIME);
									
								  // add and remove arc after 1 cycle
								  const arc = { startLat, startLng, endLat, endLng };
								  globe.arcsData([...globe.arcsData(), arc]);
								  setTimeout(() => globe.arcsData(globe.arcsData().filter(d => d !== arc)), FLIGHT_TIME * 2);
					
								  // add and remove start rings
								  const srcRing = { lat: startLat, lng: startLng };
								  globe.ringsData([...globe.ringsData(), srcRing]);
								  setTimeout(() => globe.ringsData(globe.ringsData().filter(r => r !== srcRing)), FLIGHT_TIME * ARC_REL_LEN);
					
								  // add and remove target rings
								  setTimeout(() => {
									const targetRing = { lat: endLat, lng: endLng };
									globe.ringsData([...globe.ringsData(), targetRing]);
									setTimeout(() => globe.ringsData(globe.ringsData().filter(r => r !== targetRing)), FLIGHT_TIME * ARC_REL_LEN);
								  }, FLIGHT_TIME);
								} */
								
								trace('coucou')
								
							});
						
						
						// $('#purechain').on('click', function(){
						// 	$('.scene-container div').trigger('click') ;
						// })
					})()
					
					
					
					
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

			trace('SCI got Started...')
			
			
			
			
			window.addEventListener( 'resize', onWinResize, false );
			
	    }else{
			
			
			ANIM_TW = res.userData.ANIM_TW ;
			ANIM_TW.halt() ;
			
			trace('SCI got stopped')
			if(!!cb) cb.apply(SCI, [].concat(args)) ;
			window.removeEventListener( 'resize', onWinResize, false ) ;
			
	    }
		
		return SCI ;
	}
}


module.exports = {
	support:support,
	viz3D:viz3D
}


