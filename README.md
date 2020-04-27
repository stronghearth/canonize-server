# Canonize API

The Canonize API is constructed so that users of the Canonize application can have their own secure account. In this secure account, users can access, create, edit, and delete characters uniquely assigned to them in a PosgtreSQL database. 

## Register User

Returns JSON data for a successfully registered user.

URL: /api/users

METHOD: POST

DATA PARAMS: full_name, user_name, password

EXAMPLE REQUEST BODY: 
    {
      "full_name": "Canonizer Test",
      "user_name": "canonize_test",
      "password": "Whatever!123"
    }

SUCCESS RESPONSE: 201 status
    {
        "id": "14",
        "full_name": "Canonizer Test",
        "user_name": "canonize_test",
        "date_created": "2020-03-01T18:06:34.401Z"
    }

ERROR RESPONSE: 
    400 status { error: 'Missing {full_name, user_name, password} in request body'}

    or

    400 status { error: 'Username already taken'}

    or

    400 status { error: 'Password must be longer than 8 characters'|| 'Password must be less than 72 characters' || 'Password must not start or end with empty spaces' || 'Password must contain 1 upper case, lower case, number and special character'}

## Login Existing User

Returns JWT auth token for a successfully logged in user.

URL: /api/auth/login

METHOD: POST

DATA PARAMS: user_name, password

EXAMPLE REQUEST BODY: 
    {
      "user_name": "canonize_test",
      "password": "Whatever!123"
    }

SUCCESS RESPONSE: 200 status
    {
       "authToken": "authtokenbasedonpasswordandJWTsecret"
    }

ERROR RESPONSE: 
    400 status { error: 'Incorrect username or password' }


## Characters Interactions

GET POST DELETE PATCH for an individual user's character data

## Tech Stack

Node, Express, PostgreSQL

## Related Links

Link to live client: (https://canonize.now.sh/)

Link to client repo: (https://github.com/stronghearth/canonize-client)