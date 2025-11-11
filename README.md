# Student Management System

A full-stack web application to manage student records, built using Node.js, Express, MongoDB, and plain HTML, CSS, and JavaScript.

## Features
- User registration and login with JWT authentication.
- Add, view, search, update, and delete student records.
- MongoDB used for persistent data storage.
- Clean and simple user interface built without frameworks.

## Setup Instructions

1. Clone this repository:
   git clone https://github.com/Vishali2801/STUDENT-MANAGEMENT/edit/main/README.md
2. Navigate to the backend folder and install dependencies:
   cd backend
   npm install

3. Create a .env file in the project root (use .env.example as reference):

   MONGO_URI=mongodb://<username>:<password>@localhost:27017/studentdb
   PORT=3000
   JWT_SECRET=mySecretKey

4. Start the backend server:
   node backend/server.js

5. Once the server starts, open your browser and go to:
   http://localhost:3000

## Author
Shreejaa SM

