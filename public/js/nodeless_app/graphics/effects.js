

var viz3D = {
  settings:{},
  enable:function(cond, canvascontainer, e){
    
    var res = e.target ;

    if(cond){
      

      if(!res.userData.ID){
        
      
      var orbitControls;
      var camera, scene, renderer, loader;
      var gltf, background, envMap, mixer, extensionControls;

      // HDR SETTINGS
      const HDRIntensity = 2 ;
      const hdr = 'venice_sunset_1k.hdr' ;
      // const hdr = 'autoshop_01_1k.hdr' ;
      // var showEnvMap = true ;
      var showEnvMap = false ;
      

      //COMPOSITING
      var composer, effect ;

      const clock = new THREE.Clock();

      const scenes = {
        Machine: {
          name: 'DKT Machine (MicroGravure)',
          // url: '/obj/gltf/UV.glb',
          url: '/model/microgravure.glb',
          // url: '/model/untitled.gltf',
          // url: '/model/microgravure-cleaner.gltf',
          // noMetals:true,
          author: 'Sazaam',
          authorURL: 'https://www.metavagrant.com/',
          cameraPosition: new THREE.Vector3( 0.02,0, 4 ),
          // objectRotation: new THREE.Euler( 0, Math.PI / 2, 0 ),
          objectRotation: new THREE.Euler( 0, Math.PI, 0 ),
          objectPosition: new THREE.Vector3( 0, -1.2, 0 ),
          addLights:true,
          // addShadows:true,
          // addGround:true,
          // groundPosition: new THREE.Vector3( 0, -1.04, 0 ),
          // objectRotation: new THREE.Euler( 0, Math.PI, 0 ),
          addEnvMap: true
        }
      };


      const state = {
        scene: 'Machine'
      };

      function onload() {

        sceneInfo = scenes[ state.scene ] ;
        
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        
        renderer.setSize( canvascontainer.width(), canvascontainer.height() );
        // renderer.setClearColor(0xDDDDDD, 1);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.physicallyCorrectLights = true;
        canvascontainer.append( renderer.domElement );

        window.addEventListener( 'resize', onWindowResize, false );

        // Load background and generate envMap

        if(sceneInfo.addEnvMap){
          new THREE.RGBELoader()
            .setDataType( THREE.UnsignedByteType )
            .setPath( '/hdr/' )
            .load( hdr, function ( texture ) {

              envMap = pmremGenerator.fromEquirectangular( texture ).texture ;
              pmremGenerator.dispose() ;

              if(showEnvMap) background = envMap ;

              //
              
              initScene( scenes[ state.scene ] );
              animate();

            } );
          
          const pmremGenerator = new THREE.PMREMGenerator( renderer );
          pmremGenerator.compileEquirectangularShader();
        }else{
          initScene( sceneInfo ) ;
          animate() ;
        }

        

      }
      
      function initScene( sceneInfo ) {
        
        scene = new THREE.Scene() ;
        scene.background = new THREE.Color( 0xe3dcd5 ) ;

        camera = new THREE.PerspectiveCamera( 45, canvascontainer.width() / canvascontainer.height(), 0.001, 1000 ) ;
        scene.add( camera ) ;

        var spot1 ;
        var ground ;


        if ( sceneInfo.addLights ) {

          spot1 = new THREE.SpotLight( 0xffffff, 1 );
          spot1.position.set( 5, 10, 5 );
          spot1.angle = 0.50;
          spot1.penumbra = 0.75;
          spot1.intensity = 100;
          spot1.decay = 1.3;
          
          
          if ( sceneInfo.addShadows ) {

            spot1.castShadow = true;
            spot1.shadow.bias = 0.0001;
            spot1.shadow.mapSize.width = 2048;
            spot1.shadow.mapSize.height = 2048;

          }

          scene.add( spot1 );
        }

        if ( sceneInfo.addShadows ) {

          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        }

        // TODO: Reuse existing OrbitControls, GLTFLoaders, and so on

        orbitControls = new THREE.TrackballControls( camera, renderer.domElement ) ;

        if ( sceneInfo.addGround ) {

          ground = new THREE.Mesh( 
              new THREE.PlaneBufferGeometry( 2048, 2048 ), 
              new THREE.MeshStandardMaterial( { color: 0xaaaaaa } )
          ) ;
          ground.receiveShadow = !! sceneInfo.addShadows;

          if ( sceneInfo.groundPosition ) {

            ground.position.copy( sceneInfo.groundPosition ) ;

          } else {

            ground.position.z = - 70;

          }

          ground.rotation.x = -Math.PI / 2 ;

          scene.add( ground ) ;

        }


        loader = new THREE.GLTFLoader();
        
        const dracoLoader = new THREE.DRACOLoader();
        dracoLoader.setDecoderPath( '/js/threejs/examples/js/libs/draco/gltf/' );
        loader.setDRACOLoader( dracoLoader );

        var url = sceneInfo.url ;
        
        const loadStartTime = performance.now();

        loader.load( url, function ( data ) {

          gltf = data;

          const object = gltf.scene;

          console.info( 'Load time: ' + ( performance.now() - loadStartTime ).toFixed( 2 ) + ' ms.' );

          if ( sceneInfo.cameraPosition ) {

            camera.position.copy( sceneInfo.cameraPosition );

          }

          if ( sceneInfo.center ) {

            orbitControls.target.copy( sceneInfo.center );

          }

          if ( sceneInfo.objectPosition ) {

            object.position.copy( sceneInfo.objectPosition );

            if ( spot1 ) {

              spot1.target.position.copy( sceneInfo.objectPosition );

            }

          }

          if ( sceneInfo.objectRotation ) {

            object.rotation.copy( sceneInfo.objectRotation );

          }

          if ( sceneInfo.objectScale ) {

            object.scale.copy( sceneInfo.objectScale );

          }

          if ( sceneInfo.addEnvMap ) {

            object.traverse( function ( node ) {

              if ( node.material && ( node.material.isMeshStandardMaterial ||
                  ( node.material.isShaderMaterial && node.material.envMap !== undefined ) ) ) {

                node.material.envMap = envMap ;
                node.material.envMapIntensity = HDRIntensity ; 

              }

            } );

            scene.background = background;

          }

          if( sceneInfo.noMetals ){
            unmetallize(object) ;
          }
          if(!!ground){
            // ground.material.color = new THREE.Color( 0x000000 )    
  
            // for(var j = 0 , l= object.children.length ; j < l ; j++){
            //   var ch = object.children[j] ;
            //   console.log(ch.name)
            //   if(ch.name == 'Box001' || ch.name == 'Box002'){
            //     ch.material.color = new THREE.Color( 0x000000 )    
                
            //   } 
              
            // }
  
            // ground.material.transparent = true;
            // ground.material.opacity = .8;
  
            // ground.material.roughness = .4 ;
            // ground.material.envMap = object.children[4].material.envMap ;
          }
          

          object.traverse( function ( node ) {

            if ( node.isMesh || node.isLight ) node.castShadow = true;

          } ) ;
          
          scene.add( object ) ;
          
          onWindowResize() ;

        }, undefined, function ( error ) {

          console.error( error ) ;

        } );
        
      }

      function unmetallize(object) {
        for(var i = 0 , l= object.children.length ; i < l ; i++){
          if(!! object.children[i].material) object.children[i].material.metalness = 0 ;
        }
      }

      function onWindowResize() {

        camera.aspect = canvascontainer.width() / canvascontainer.height() ;
        camera.updateProjectionMatrix() ;
        renderer.setSize( canvascontainer.width(), canvascontainer.height() ) ;

      }

      var animate = res.userData.animate = function animate() {

        res.userData.ID = requestAnimationFrame( animate ) ;
        orbitControls.update() ;
        render() ;

      }

      function render() {
        renderer.render( scene, camera );
      }


      onload() ;


      }else{
        res.userData.animate();
      }


    }else{
      cancelAnimationFrame(res.userData.ID) ;
    }

  }
}


module.exports = {

  viz3D:viz3D

}