# HapiJs-CRUD-API
Developing a RESTFul Api with Hapi.js

// Get all users
localhost:9000/api/users

// create new user
POST
URL: localhost:9000/api/registration/user 
payload
{
 "firstName": "Ram",
 "lastName" : "B",
 "fullName": "Ram B",
 "type" : "TEACHER",
  "sex": "M",
  "mobileNumber": "1234567891"
}

// Update User
Request Type: PUT
URL: localhost:9000/api/updateuser?userID=5b922322f113695d08a349fc
payload
{
 "firstName": "Ramesh",
 "lastName" : "B",
 "fullName": "Ramesh B",
 "type" : "TEACHER",
  "sex": "M",
  "mobileNumber": "1234567891"
}

// DELETE USER

Request Type: Delete
URL: localhost:9000/api/removeuser?userID=5b922322f113695d08a349fc

