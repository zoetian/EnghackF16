var container, scene, camera, renderer;

var controls;

init();
//console.log("before animate");
animate(player);

function init() {
	// Setup
	container = document.getElementById( 'container' );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 5;

	renderer = new THREE.WebGLRenderer( { alpha: true} );
	renderer.setSize( window.innerWidth, window.innerHeight);


	// Load game world

	firebase.auth().onAuthStateChanged(function( user ) {
		if ( user ) {
			// User is signed in

			console.log( "Player is signed in " );
			playerID = user.uid;

			fbRef.child( "Players/" + playerID + "/isOnline" ).once( "value" ).then( function( isOnline ) {

				if ( isOnline.val() === null || isOnline.val() === false ) {
					loadGame();
					
				} else {
					alert( "Hey, only one session at a time buddy!" );
				}
			});


		} else {
			// User is signed out
			console.log( "Player is signed out " );

			firebase.auth().signInAnonymously().catch(function(error) {
				console.log( error.code + ": " + error.message );
			})
		}
	});


	// Events
	window.addEventListener( "resize", onWindowResize, false );

	container.appendChild( renderer.domElement );
	document.body.appendChild( container );
}

function animate(player) {
	requestAnimationFrame( animate );

	if ( controls ) {
		controls.update();
	}
	
	var collisionTime = 0;
	for (var vertexIndex = 0; vertexIndex < player.cube_geometry,vertices.length; vertexIndex++) {   
		var localVertex = player.cube_geometry.vertices[vertexIndex].clone();  
		//document.write(typeof(localVertex));
		var globalVertex = localVertex.applyMatrix4(player.matrix);   
		var directionVector = globalVertex.sub(player.position); // RAY Casting Function   
		var ray = new THREE.Raycaster(player.position, directionVector.clone().normalize());   
		var collisionResults = ray.intersectObjects(otherPlayers);  
		if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {   
			cld = true;
		}
	}
	if (cld) {
		collisionTime = collisionTime + 0.01666666666;
		//console.log(collisionTime);
		if ( collisionTime > 1) {
			console.log("Over one second!");
			//var temp = scube.material.color.getHex();
			//scube.material.color.setHex(cube.material.color.getHex());
			cube.material.color.setHex(clr);
			collisionTime = 0;
		}
	}
	else {
		collisionTime = 0;
	}
	cld = false;
	
	render();
}

function render() {

	renderer.clear();
	renderer.render( scene, camera );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}
