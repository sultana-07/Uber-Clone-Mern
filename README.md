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
