Task Manager Application

This project is a full-stack Task Manager application built with Angular (frontend) and Spring Boot (backend) with MongoDB as the database. 
It demonstrates core REST API functionality, frontend-backend communication, database design, clean modular code, and basic JWT authentication. 
Docker support is also provided for containerized deployment.

Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Running](#installation--running)
- [Running Without Docker](#running-without-docker)
- [Running With Docker Compose](#running-with-docker-compose)
- [Database Setup Details](#database-setup-details)
- [JWT Credentials](#jwt-credentials)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)

---
Features

Backend (Spring Boot):
  - Create, read, update, and delete tasks via a RESTful API.
  - Stores tasks in MongoDB.
  - Basic JWT authentication for login (returns a token).
  - Organized into controllers, services, and repositories.
  - CORS enabled for Angular frontend access.

Frontend (Angular):
  - Responsive UI with task list, filtering, and search.
  - Task Form page for creating and editing tasks.
  - User registration and login pages.
  - JWT token stored in local storage and attached in API request bodies.
  - Custom CSS styling (no external UI library).

  - Dockerized backend and frontend (using Docker Compose).
  - Separate containers for MongoDB, Spring Boot, and Angular.

---
Prerequisites

- **Node.js & npm** (for the Angular frontend)
- **Java 17** (or higher) and **Maven** (for the Spring Boot backend)
- **MongoDB** installed locally or via Docker
- **Docker Desktop** (optional, for containerized deployment)

---
Installation & Running

Running Without Docker
    Backend
    1. **Navigate to the backend folder:**
         bash cd taskmanager
    2. **Build and run the Spring Boot application:**
       bash mvn spring-boot:run
       - The backend will run on [http://localhost:8080](http://localhost:8080).
    Frontend
    1. **Navigate to the frontend folder:**
       bash cd task-manager-frontend
    2. **Install dependencies:**
       bash npm install
    3. **Run the Angular app:**
       bash ng serve --open
       - The frontend will run on [http://localhost:4200](http://localhost:4200).

Running With Docker Compose
    1. **Ensure Docker Desktop is installed and running.**
    2. **At the project root (where `docker-compose.yml` is located), run:**
      bash
       docker-compose up --build -d
    3. **Verify running containers:**
      bash
       docker ps
    4. **Access the application:**
       - **Frontend:** [http://localhost:4200](http://localhost:4200)
       - **Backend API:** [http://localhost:8080](http://localhost:8080)
    To stop the containers, run:
    bash
    docker-compose down

---

Database Setup Details
- **MongoDB:**  
  The application uses MongoDB as its database.  
  - **Local Setup:**  
    Ensure MongoDB is running on `mongodb://localhost:27017`.  
    The database used is named `task_manager_db`.
  - **Docker Setup:**  
    The `docker-compose.yml` file automatically starts a MongoDB container with port mapping `27017:27017` and stores data in a Docker volume named `mongo_data`.

---

JWT Credentials
JWT Secret:  
  The JWT token is generated using a secret key set in the `application.properties` file:
  properties:  jwt.secret=MY_SUPER_SECRET_KEY_1234567890123456
  **Note:** In production, use a more secure and random key.  
  **Login Flow:**  
  On login, the backend verifies credentials and returns a JSON with:
  json
  {
    "username": "your_username",
    "tokenid": "your_generated_jwt_token"
  }
  **Usage:**  
  The frontend stores this token (along with the username) in local storage and includes them in subsequent API request bodies for authentication.

---
Project Structure

task-manager-app
├── docker-compose.yml          # Docker Compose file for running MongoDB, backend, and frontend
├── taskmanager                 # Spring Boot backend folder
│   ├── Dockerfile              # Backend Dockerfile
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java
│           │   └── com
│           │       └── taskmanager
│           │           └── taskmanager
│           │               ├── TaskmanagerApplication.java
│           │               ├── model
│           │               │   ├── User.java
│           │               │   └── Task.java
│           │               ├── repository
│           │               │   ├── UserRepository.java
│           │               │   └── TaskRepository.java
│           │               ├── service
│           │               │   └── TaskService.java
│           │               ├── util
│           │               │   └── JwtUtil.java
│           │               └── controller
│           │                   ├── AuthController.java
│           │                   └── TaskController.java
│           └── resources
│               └── application.properties
└── task-manager-frontend      # Angular frontend folder
    ├── Dockerfile              # Frontend Dockerfile
    ├── package.json
    ├── angular.json
    └── src
        ├── main.ts
        ├── index.html
        ├── styles.css
        └── app
            ├── app.component.ts
            ├── app.component.html
            ├── app.component.css
            ├── app.routes.ts
            ├── services
            │   ├── auth.service.ts
            │   └── task.service.ts
            └── components
                ├── login
                │   ├── login.component.ts
                │   └── login.component.html
                ├── register
                │   ├── register.component.ts
                │   └── register.component.html
                ├── task-list
                │   ├── task-list.component.ts
                │   ├── task-list.component.html
                │   └── task-list.component.css
                └── task-form
                    ├── task-form.component.ts
                    ├── task-form.component.html
                    └── task-form.component.css

Screenshots 

- **Login Page:**
  ![Screenshot 2025-04-06 010348](https://github.com/user-attachments/assets/cc662173-bcc5-49cc-a300-d1ee4649e0bc)
  
- **Register Page:**
  ![Screenshot 2025-04-06 010401](https://github.com/user-attachments/assets/90cfbcee-0c75-43b4-9897-15c9eb43edb6)

- **Task List Page:**
  ![Screenshot 2025-04-06 010303](https://github.com/user-attachments/assets/fb46fd19-123f-4e7e-a149-4f7ac97487f4)

- **Task Form Page:**
  ![Screenshot 2025-04-06 010332](https://github.com/user-attachments/assets/c975b969-2d27-4684-9f0a-2de632efd80d)
