# HealhtDiary application

HealthDiary provides a convenient and user-friendly way to record and monitor information related to health, such as exercise, nutrition, heart rate variability (HRV), and medication.

This repository contains both the back-end server and the front-end client for the HealthDiary application. The back-end is built with Node.js and Express, providing RESTful APIs, while the front-end is served from the `public` directory and is responsible for the user interface.

### Usage (Back-End)

The back-end server is a Node.js + Express application that interacts with a MySQL/MariaDB database to manage health-related data.

To get the back-end server running locally, follow these steps:

## Usage

1. Clone/download code
2. Run `npm i` inside project folder
3. Install & start MySQL/MariaDB server
4. Import database script(s) in `db/` folder
5. Create `.env` file based on `.env.sample`
6. Start the dev server: `npm run dev` / `npm start`

## Front-End Client

The front-end client is a web application located in the `public` directory. It interacts with the back-end server to present data and provide an interactive user interface.

## Resources and endpoints

### `/items` (works with hard-coded mock data only, no need for db)

```http
GET http://127.0.0.1:3000/items
GET http://127.0.0.1:3000/items/:id
DELETE http://127.0.0.1:3000/items/:id

POST http://127.0.0.1:3000/items
content-type: application/json
body: {"name": "New Item"}
```

### `/api/auth`

Example queries:

```http
# Login
POST http://localhost:3000/api/users/login
content-type: application/json
{
  "username": "user",
  "password": "secret"
}

## Get user by token (requires token)
GET http://localhost:3000/api/auth/me
Authorization: Bearer <token>
```

### `/api/users`

Example queries:

```http
# Get all users (requires token)
GET http://127.0.0.1:3000/api/users
Authorization: Bearer <token>

# Get user by id (requires token)
GET http://127.0.0.1:3000/api/users/:id
Authorization: Bearer <token>

# Delete user (requires token)
DELETE http://127.0.0.1:3000/api/users/:id
Authorization: Bearer <token>

# Create user (register)
POST http://127.0.0.1:3000/api/users
content-type: application/json

# Update user's own data (requires token)
PUT http://127.0.0.1:3000/api/users/
Authorization: Bearer <token>
content-type: application/json


```

### `/api/entries`, used to get, post, put and delete Diary entries in the application.

Example queries:

```http
# Get all entries for a logged in user (requires token)
GET http://localhost:3000/api/entries
Authorization: Bearer <token>

# Get entries by id
GET http://localhost:3000/api/entries/:id

# Post entry
POST http://localhost:3000/api/entries
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Happy",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Update entry
PUT http://localhost:3000/api/entries/:id
content-type: application/json

{
  "entry_date": "2024-02-12",
  "mood": "Even more happy now",
  "weight": 69.6,
  "sleep_hours": 7,
  "notes": "This was a good day",
  "user_id": 3
}

# Delete entry
DELETE http://localhost:3000/api/entries/:id
```
