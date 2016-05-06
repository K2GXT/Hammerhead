var map; 
var points = []; 
var oldresponse; 

function getMap(){
	map = new google.maps.Map(document.getElementById('map-canvas'), {
		center: {lat:43.084100, lng: -77.675647}, 
		zoom: 15
	}); 

	window.setInterval(function(){
		getPoints(); 
	}, 3000); 
	
}
		
function getPoints(){
	var rawInfo = getRawInfo(); 
}

function getRawInfo(){
	var url = "http://k2gxt.rit.edu:5000/current"; 

	var req = new XMLHttpRequest(); 
	req.addEventListener("load", reqListener); 
	req.open("GET", url, false); 
	req.send(); 
	
}

function reqListener(){
	if(this.responseText != oldresponse){
		oldresponse = this.responseText; 
		var data = JSON.parse(this.responseText); 
		var source = getCoordinates(data.current);
		points.push(new google.maps.LatLng(source.x, source.y));
		if(points.length > 500){
			points.shift(); 
		}
		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: points, 
			map: map
		}); 
	}
	
}

function getCoordinates(data){
	var x0 = data[0].lat; 
	var y0 = data[0].lon; 

	var heading0 = data[0].heading; 


	var x1 = getX(x0, heading0); 
	var y1 = getY(y0, heading0)

	var x2 = data[1].lat; 
	var y2 = data[1].lon; 

	var heading2 = data[1].heading; 

	var x3 = getX(x2, heading2); 
	var y3 = getY(y2, heading2); 

	var numeratorXfirst = ((x0*y1) - (y0*x1))*(x2-x3); 
	var numeratorXsecond = (x0-x1)*((x2*y3) - (y2*x3)); 
	var numeratorX = numeratorXfirst - numeratorXsecond; 

	var denominatorFirst = (x0-x1)*(y2-y3); 
	var denominatorSecond = (y0-y1)*(x2-x3); 
	var denominator = denominatorFirst - denominatorSecond; 
	var sourceX = numeratorX / denominator;
	
	var numeratorYfirst = ((x0*y1) - (y0*x1))*(y2-y3); 
	var numeratorYsecond = (y0-y1)*((x2*y3) - (y2*x3)); 
	var numeratorY = numeratorYfirst - numeratorYsecond; 

	var sourceY = numeratorY / denominator; 

	return {x: sourceX, y: sourceY}; 
}

function getX(x, heading){
	// t can be anything but 0 
	var t = 2; 
	return x + (t*Math.cos(heading - 90)); 
}

function getY(y, heading){
	// t can be anything but 0 
	var t = 2; 
	return y + (t*Math.sin(heading - 90));
}