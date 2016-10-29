	var collisionTime = 0;
	for (var vertexIndex = 0; vertexIndex < player.cube_geometry.vertices.length; vertexIndex++) {   
		var localVertex = player.geometry.vertices[vertexIndex].clone();  
		//document.write(typeof(localVertex));
		var globalVertex = localVertex.applyMatrix4(player.matrix);   
		var directionVector = globalVertex.sub(player.position); // RAY Casting Function   
		var ray = new THREE.Raycaster(player.position, directionVector.clone().normalize());   
		var collisionResults = ray.intersectObjects(scene.children);  
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
	// done collision