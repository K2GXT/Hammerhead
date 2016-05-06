function getMap(){
	var map = null; 

	var center = new Microsoft.Maps.Location(43.084100, -77.675647); 
	var birdsEye = Microsoft.Maps.MapTypeId.birdseye
	map = new Microsoft.Maps.Map(document.getElementById('map-canvas'), {credentials: 'Ag_CQwt93qb53RTA_0X356o1E8kyB6NxX9E95E0AVwxdJIdT3aI3T-bMrxENTGUw', zoom: 15, center: center, mapTypeId: birdsEye}); 
	
	var points = [
		new Microsoft.Maps.Location(43.086973, -77.668174), 
		new Microsoft.Maps.Location(43.084935, -77.671865), 
		new Microsoft.Maps.Location(43.085217, -77.682122),
		new Microsoft.Maps.Location(43.082616, -77.674655)
	]; 

	Microsoft.Maps.Events.addHandler(map, 'viewchange', function(){makeHeatMap(map, points, 100, .5)});

	 makeHeatMap(map, points, 100, .5); 
	
}

function makeHeatMap(map, points, radius, intensity){
	for(var i = 0; i < points.length; i++){
		var point = points[i]; 

		//Conver coordinates to pixel location 
		var pixel = map.tryLocationToPixel(point, Microsoft.Maps.PixelReference.control); 
		var x = pixel.x; 
		var y = pixel.y; 

		var ctx = document.createElement('canvas').getContext('2d'); 
	
		ctx.canvasid = 'heatmapctx'; 
		ctx.canvas.style.position = 'absolute'; 
		ctx.canvas.height = 800; 
		ctx.canvas.width = 1024; 
		ctx.canvas.style.zIndex = 1; 
		document.getElementById('map-canvas').lastChild.appendChild(ctx.canvas);

		//Create radial gradient centered on the point 
		var gradient = ctx.createRadialGradient(x, y, 0, x, y, radius); 
		gradient.addColorStop(0.0, 'rgba(255, 1, 0, ' + intensity + ')');
		gradient.addColorStop(0.1, 'rgba(0, 255, 0, ' + intensity + ')');
		// gradient.addColorStop(1.0, 'red'); 
		gradient.addColorStop(1.0, 'transparent'); 

		//Draw the heatpoint onto the canvas 
		ctx.fillStyle = gradient; 
		ctx.fillRect(x - radius, y - radius, x + radius, y + radius); 
	}
}