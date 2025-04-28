# /users/login Endpoint Documentation

## Description

The `/users/login` endpoint authenticates existing users by validating their email and password. Upon successful authentication, it returns a JWT token and user details.

## Endpoint

**POST** `/users/login`

## Request Body

The endpoint expects a JSON payload with the following structure:

- **email** (String, required): Registered email address
- **password** (String, required): User's password (min 6 characters)

### Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Success Response

- **Status Code:** 200 OK

### Example Response

```json
{
  "token": "your_jwt_token_here",
  "user": {
    "_id": "unique_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Error Responses

### Invalid Credentials

- **Status Code:** 401 Unauthorized

```json
{
  "error": "email or password is incorrect"
}
```

### Validation Error

- **Status Code:** 400 Bad Request

```json
{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

# /users/register Endpoint Documentation

## Description

The `/users/register` endpoint is used for registering a new user. It validates the provided data, creates a new user with a hashed password, and returns an authentication token along with the created user object.

## Endpoint

**POST** `/users/register`

## Request Body

The endpoint expects a JSON payload with the following structure:

- **fullname** (Object, required)
  - **firstname** (String, required): Must be at least 3 characters long.
  - **lastname** (String, optional): If provided, must be at least 3 characters long.
- **email** (String, required): Must be a valid email format.
- **password** (String, required): Must be at least 6 characters long.

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Success Response

- **Status Code:** 201 Created

### Example Response

```json
{
  "token": "your_jwt_token_here",
  "user": {
    "_id": "unique_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ... additional fields if available
  }
}
```

## Error Response

- **Status Code:** 400 Bad Request

### Example Error Response

```json
{
  "error": [
    {
      "msg": "first name must be at least 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    }
    // ... additional error objects
  ]
}
```

# /users/profile Endpoint Documentation

## Description

The `/users/profile` endpoint retrieves the authenticated user's profile information. This endpoint requires authentication via JWT token.

## Endpoint

**GET** `/users/profile`

## Authentication

Requires a valid JWT token in one of these formats:

- Cookie named 'token'
- Authorization header: `Bearer <token>`

## Success Response

- **Status Code:** 200 OK

### Example Response

```json
{
  "user": {
    "_id": "unique_user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## Error Responses

- **Status Code:** 401 Unauthorized

```json
{
  "error": "unauthorized"
}
```

# /users/logout Endpoint Documentation

## Description

The `/users/logout` endpoint logs out the current user by invalidating their JWT token and clearing the cookie.

## Endpoint

**GET** `/users/logout`

## Authentication

Requires a valid JWT token in one of these formats:

- Cookie named 'token'
- Authorization header: `Bearer <token>`

## Success Response

- **Status Code:** 200 OK

```json
{
  "message": "logout successfully"
}
```

## Error Response

- **Status Code:** 401 Unauthorized

```json
{
  "error": "unauthorized"
}
```

## Notes

- The token is added to a blacklist to prevent reuse
- The token cookie is cleared from the client
- Blacklisted tokens expire after 24 hours

# /captains/register Endpoint Documentation

## Description

The `/captains/register` endpoint registers new captains (drivers) in the system. It validates the provided data, creates a new captain account with vehicle information, and returns an authentication token along with the created captain object.

## Endpoint

**POST** `/captains/register`

## Request Body

The endpoint expects a JSON payload with the following structure:

- **fullname** (Object, required)
  - **firstname** (String, required): Minimum 3 characters
  - **lastname** (String, optional): Minimum 3 characters if provided
- **email** (String, required): Valid email format
- **password** (String, required): Minimum 6 characters
- **vehicle** (Object, required)
  - **color** (String, required): Minimum 3 characters
  - **plate** (String, required): Minimum 3 characters
  - **capacity** (Number, required): Minimum value of 1
  - **vehicleType** (String, required): Must be one of: "car", "motorcycle", "auto"

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.driver@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Success Response

- **Status Code:** 201 Created

### Example Response

```json
{
  "token": "your_jwt_token_here",
  "captain": {
    "_id": "unique_captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

## Error Responses

### Validation Error

- **Status Code:** 400 Bad Request

```json
{
  "error": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Captain Already Exists

- **Status Code:** 400 Bad Request

```json
{
  "error": "captain already exist"
}
```

## Notes

- New captains are registered with an initial status of "inactive"
- The password is automatically hashed before storage
- The vehicle type must be one of the predefined types: car, motorcycle, or auto

# /captains/login Endpoint Documentation

## Description

The `/captains/login` endpoint authenticates existing captains using their email and password. Upon successful authentication, it returns a JWT token and captain details.

## Endpoint

**POST** `/captains/login`

## Request Body

The endpoint expects a JSON payload with the following structure:

- **email** (String, required): Registered email address
- **password** (String, required): Captain's password (min 6 characters)

### Example Request Body

```json
{
  "email": "john.driver@example.com",
  "password": "password123"
}
```

## Success Response

- **Status Code:** 200 OK

### Example Response

```json
{
  "token": "your_jwt_token_here",
  "captain": {
    "_id": "unique_captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

## Error Responses

### Captain Not Found

- **Status Code:** 400 Bad Request

```json
{
  "error": "captain not found"
}
```

### Invalid Password

- **Status Code:** 400 Bad Request

```json
{
  "error": "password is incorrect"
}
```

# /captains/profile Endpoint Documentation

## Description

The `/captains/profile` endpoint retrieves the authenticated captain's profile information. This endpoint requires captain authentication via JWT token.

## Endpoint

**GET** `/captains/profile`

## Authentication

Requires a valid JWT token in one of these formats:

- Cookie named 'token'
- Authorization header: `Bearer <token>`

## Success Response

- **Status Code:** 200 OK

### Example Response

```json
{
  "captain": {
    "_id": "unique_captain_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

# /captains/logout Endpoint Documentation

## Description

The `/captains/logout` endpoint logs out the current captain by invalidating their JWT token and clearing the cookie.

## Endpoint

**GET** `/captains/logout`

## Authentication

Requires a valid JWT token in one of these formats:

- Cookie named 'token'
- Authorization header: `Bearer <token>`

## Success Response

- **Status Code:** 200 OK

```json
{
  "message": "logout successfully"
}
```

## Error Response

- **Status Code:** 401 Unauthorized

```json
{
  "error": "unauthorized"
}
```

## Notes

- The token is added to a blacklist to prevent reuse
- The token cookie is cleared from the client
- Blacklisted tokens expire after 24 hours

# Maps API Endpoints Documentation

## GET /maps/address

### Description

Gets coordinates for a given address using Google Maps Geocoding API.

### Query Parameters

- **address** (String, required): Address to geocode

### Authentication

Requires user authentication token

### Success Response

- **Status Code:** 200 OK

```json
{
  "lat": 12.3456,
  "lng": 78.9012
}
```

### Error Response

- **Status Code:** 400 Bad Request

```json
{
  "error": [
    {
      "msg": "Address is required",
      "param": "address",
      "location": "query"
    }
  ]
}
```

## GET /maps/distance

### Description

Calculates distance and time between two locations using Google Maps Distance Matrix API.

### Query Parameters

- **origin** (String, required): Starting location
- **destination** (String, required): Ending location

### Authentication

Requires user authentication token

### Success Response

- **Status Code:** 200 OK

```json
{
  "distance": {
    "text": "5.2 km",
    "value": 5200
  },
  "duration": {
    "text": "12 mins",
    "value": 720
  }
}
```

## GET /maps/suggestions

### Description

Gets address suggestions based on input text using Google Places Autocomplete API.

### Query Parameters

- **input** (String, required): Minimum 3 characters to search

### Authentication

Requires user authentication token

### Success Response

- **Status Code:** 200 OK

```json
{
  "predictions": [
    {
      "description": "Times Square, New York, NY, USA",
      "place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU"
    }
  ]
}
```

# Rides API Endpoints Documentation

## POST /rides/create

### Description

Creates a new ride request with fare calculation.

### Authentication

Requires user authentication token

### Request Body

```json
{
  "pickup": "Starting location",
  "destination": "Ending location",
  "vehicleType": "car" // Options: "car", "auto", "motorcycle"
}
```

### Success Response

- **Status Code:** 201 Created

```json
{
  "_id": "ride_id",
  "user": "user_id",
  "pickup": "Starting location",
  "destination": "Ending location",
  "fare": 150.5,
  "status": "pending",
  "otp": "123456"
}
```

### Error Response

- **Status Code:** 400 Bad Request

```json
{
  "errors": [
    {
      "msg": "invalid pickup location",
      "param": "pickup",
      "location": "body"
    }
  ]
}
```

### Notes

- Fare calculation includes:
  - Base fare (Auto: ₹30, Car: ₹50, Motorcycle: ₹20)
  - Per km rate (Auto: ₹10/km, Car: ₹15/km, Motorcycle: ₹8/km)
  - Per minute rate (Auto: ₹2/min, Car: ₹3/min, Motorcycle: ₹1.5/min)
- Ride status can be: pending, accepted, ongoing, completed, cancelled
- A 6-digit OTP is generated for ride verification
