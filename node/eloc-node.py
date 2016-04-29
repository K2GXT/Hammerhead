import requests

serverURL = "http://bustin.student.rit.edu:5000/register"

r = requests.post(serverURL, data={"request":"REGISTER"})


