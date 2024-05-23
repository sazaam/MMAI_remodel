
(function(){
	
	fetch('/model/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
		{
			$('#viewport3D div').hide() ;
			const ARC_REL_LEN = 3.4; // relative to whole arc
			const FLIGHT_TIME = 350;
			const NUM_RINGS = 3;
			const RINGS_MAX_R = 3; // deg
			const RING_PROPAGATION_SPEED = 5; // deg/sec
			
			const globe = new ThreeGlobe({
				animateIn:0
			})
				
				.showGlobe(0)
				.showAtmosphere(0)
				//.showGraticules(1)
				// .hexPolygonsData(countries.features)
				// .hexPolygonResolution(3)
				// .hexPolygonMargin(.7)
				// .hexPolygonUseDots(0)
				// .hexPolygonColor(() => '#3a6df0')
				// .hexPolygonsTransitionDuration(.5)
				.arcColor(() => '#3a6df0')
				.arcAltitude(-.1)
				
				.arcDashLength(ARC_REL_LEN)
				.arcDashLength(.3)
				.arcStroke(.15)
				.arcDashGap(1)
				.arcDashInitialGap(1)
				.arcDashAnimateTime(FLIGHT_TIME)
				.arcsTransitionDuration(0)
				.ringColor(() => t => `rgba(31, 84, 191,${1-t})`)
				.ringMaxRadius(RINGS_MAX_R)
				.ringPropagationSpeed(RING_PROPAGATION_SPEED)
				.ringRepeatPeriod(FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS) ;

			let sphereGroup = globe.children[0] ;
			let sphere = sphereGroup.children[0] ;
			sphere.material.color = new THREE.Color('#3a6df0') ;
			sphere.material.transparent = true ;
			sphere.material.opacity = .1 ;
				
			// Setup renderer
			const renderer = new THREE.WebGLRenderer({antialias:true});
			renderer.setSize(window.innerWidth, window.innerHeight);
			
			$(renderer.domElement).appendTo('#viewport3D');
			
			// Setup scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color('#FFFFFF')
			scene.add(globe);
			//scene.add(new THREE.AmbientLight('#FFFFFF', Math.PI));
			//scene.add(new THREE.DirectionalLight('#FFFFFF', .6 * Math.PI));
			

			var theta = 90 ;
			var radius = 5 ;

			// Setup camera
			const camera = new THREE.PerspectiveCamera();
			camera.aspect = window.innerWidth/ window.innerHeight;
			camera.updateProjectionMatrix();
			camera.position.z = 400;
			
/*
			// Add camera controls
			const tbControls = new TrackballControls(camera, renderer.domElement);
			tbControls.minDistance = 101;
			tbControls.rotateSpeed = 5;
			tbControls.zoomSpeed = 0.8;
*/
			trace(scene)
			
			let render = function(){
				theta += 0.1;
				theta = theta % 360 ;
				
				scene.rotation.y = THREE.MathUtils.degToRad( theta ) ;
				
				renderer.render(scene, camera);
			}

			let prevCoords = { lat: 0, lng: 0 };
			let emitArc = function emitArc({ lat: endLat, lng: endLng }) {
				
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
			}
			
			setInterval(function(){
				for(var i = 0 ; i < 3 ; i++){
					BJS.serialTweens([
						BJS.timeout(.4, emitArc, [{ lat: Math.random() * 500, lng: Math.random() * 500 }]),
						BJS.timeout(.4, emitArc, [{ lat: Math.random() * 500, lng: Math.random() * 500 }]),
						BJS.timeout(.4, emitArc, [{ lat: Math.random() * 500, lng: Math.random() * 500 }])
					]).start() ;
				}
				

			}, 500)




			var ANIM_TW = /* res.userData.ANIM_TW = */ new BTW.$.Animation(undefined, render) ;
			ANIM_TW.start() ;

		});
})()