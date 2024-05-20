(function(){
	
	
	fetch('/model/ne_110m_admin_0_countries.geojson').then(res => res.json()).then(countries =>
		{
			
			console.log('yoo')

			const ARC_REL_LEN = 3.4; // relative to whole arc
			const FLIGHT_TIME = 250;
			const NUM_RINGS = 3;
			const RINGS_MAX_R = 5; // deg
			const RING_PROPAGATION_SPEED = 5; // deg/sec
			
			const globe = Globe({
				animateIn:0
			})
				.backgroundColor('#FFFFFF')
				.showGlobe(1)
				.showAtmosphere(0)
				//.showGraticules(1)
				.hexPolygonsData(countries.features)
				.hexPolygonResolution(3)
				.hexPolygonMargin(0.5)
				.hexPolygonUseDots(0)
				.hexPolygonColor(() => '#789bf3')
				
				// .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
				.arcColor(() => '#3a6df0')
				.onGlobeClick(emitArc)
				.arcDashLength(ARC_REL_LEN)
				.arcDashGap(2)
				.arcDashInitialGap(1)
				.arcDashAnimateTime(FLIGHT_TIME)
				.arcsTransitionDuration(0)
				.ringColor(() => t => `rgba(58,109,240,${1-t})`)
				.ringMaxRadius(RINGS_MAX_R)
				.ringPropagationSpeed(RING_PROPAGATION_SPEED)
				.ringRepeatPeriod(FLIGHT_TIME * ARC_REL_LEN / NUM_RINGS)
				(document.getElementById('viewport3D'));
			
			const globeMaterial = globe.globeMaterial();
			// globeMaterial.bumpScale = 10;
			// new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
			//   globeMaterial.specularMap = texture;
			  globeMaterial.specular = '#3a6df0';
			  globeMaterial.shininess = 15;
			// });	
			
			let prevCoords = { lat: 0, lng: 0 };
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
			}
			
			
			
			
			
		});
	
	
	// $('#purechain').on('click', function(){
	// 	$('.scene-container div').trigger('click') ;
	// })
})()