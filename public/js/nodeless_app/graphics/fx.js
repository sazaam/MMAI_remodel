
(function(){
	
	
	
	fetch('/model/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
		{
			


			console.log('yoo1')

			const ARC_REL_LEN = 3.4; // relative to whole arc
			const FLIGHT_TIME = 350;
			const NUM_RINGS = 3;
			const RINGS_MAX_R = 5; // deg
			const RING_PROPAGATION_SPEED = 5; // deg/sec
			
			const globe = Globe({
				animateIn:0
			})
				.backgroundColor('#FFFFFF')
				
				.showGlobe(1)
				.showAtmosphere(0)
				// .showGraticules(1)
				.hexPolygonsData(countries.features)
				.hexPolygonResolution(3)
				.hexPolygonMargin(.7)
				.hexPolygonUseDots(0)
				.hexPolygonColor(() => '#3a6df0')
				.hexPolygonsTransitionDuration(.5)
				.arcColor(() => '#3a6df0')
				.arcAltitude(-.1)
				
				.arcDashLength(ARC_REL_LEN)
				.arcDashLength(.2)
				.arcDashGap(4)
				.arcDashInitialGap(1)
				.arcDashAnimateTime(FLIGHT_TIME)
				.arcsTransitionDuration(0)
				.ringColor(() => t => `rgba(31, 84, 191,${1-t})`)
				.ringMaxRadius(RINGS_MAX_R)
				.ringPropagationSpeed(RING_PROPAGATION_SPEED)
				.ringRepeatPeriod(FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS)
				(document.getElementById('viewport3D'));
			
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
					setTimeout(()=>{emitArc({ lat: Math.random() * 500, lng: Math.random() * 500 })},400*i) ;
				}
				

			}, 500)

			let delta = .0005 ;
			setInterval(function(){
				globe.scene().rotation.y -= delta ;
			}, 5)

			
			let mat = globe.globeMaterial() ; 
			mat.transparent = true ;
			mat.color = new THREE.Color('#789bf3')
			mat.opacity = .1 ;
			/*
			new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
				console.log('THREE')
				globeMaterial.alphaMap = texture;
				globeMaterial.specular = new THREE.Color('lightblue');
				globeMaterial.shininess = 2;
			});
			*/
		});
	
	
	// $('#purechain').on('click', function(){
	// 	$('.scene-container div').trigger('click') ;
	// })
})()