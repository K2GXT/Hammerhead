function getPoints(){


	var rawInfo = getRawInfo(); 
}

function getRawInfo(){
	var username = "pi"; 
	var password = "k2gxtimaginerit"; 
	var url = "http://www.kc2tnr.student.rit.edu:5000/"; 

	var req = new XMLHttpRequest(); 
	req.addEventListener("load", reqListener); 
	req.open("GET", url, false); 
	req.setRequestHeader("Authorization", "Basic" + btoa(username + ":" + "password")); 
	// req.setRequestHeader("password", password); 
	req.send(); 
}

function reqListener(){
	console.log(this.responseText); 
}