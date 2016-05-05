function getMap(){
	var map = null; 

	var center = new Microsoft.Maps.Location(43.084100, -77.675647); 
	var birdsEye = Microsoft.Maps.MapTypeId.birdseye
	map = new Microsoft.Maps.Map(document.getElementById('map-canvas'), {credentials: 'Ag_CQwt93qb53RTA_0X356o1E8kyB6NxX9E95E0AVwxdJIdT3aI3T-bMrxENTGUw', 
																		zoom: 17, center: center, mapTypeId: birdsEye});
}