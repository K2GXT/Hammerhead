function getMap(){
	var map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {lat:43.084100, lng: -77.675647}, 
		zoom: 8
	}); 

	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: getPoints(), 
		map: map
	}); 
}

function getPoints(){
	return [
		new google.maps.LatLng(43.086973, -77.668174), 
		new google.maps.LatLng(43.084935, -77.671865), 
		new google.maps.LatLng(43.085217, -77.682122),
		new google.maps.LatLng(43.082616, -77.674655)]
}

		