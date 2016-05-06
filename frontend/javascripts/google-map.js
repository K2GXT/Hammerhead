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
		getCoordinates(data.current);
		if(points.length > 500){
			points.shift(); 
			points.shift(); 
			points.shift(); 
		}
		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: points, 
			map: map
		}); 
	}
	
}

function getCoordinates(data){
	var point1 = getPoint(data[0], data[1]); 
	var point2 = getPoint(data[1], data[2]); 
	var point3 = getPoint(data[0], data[2]); 
	point1 = new google.maps.LatLng(point1.x, point1.y); 
	point2 = new google.maps.LatLng(point2.x, point2.y); 
	point3 = new google.maps.LatLng(point3.x, point3.y); 
	points.push(point1, point2, point3); 
}

function getPoint(node1, node2){
	var x0 = node1.lat; 
	var y0 = node1.lon; 

	var heading0 = node1.heading; 


	var x1 = getX(x0, heading0); 
	var y1 = getY(y0, heading0)

	var x2 = node2.lat; 
	var y2 = node2.lon; 

	var heading2 = node2.heading; 

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