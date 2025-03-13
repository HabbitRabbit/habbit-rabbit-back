# Habbit Rabbit - Backend

## Description

This repository contains the backend code for Habbit Rabbit, an Express API that manages user authentication, goals, and habits. It provides endpoints for the frontend to interact with and store data securely.

A repository with the frontend code can be found here: https://github.com/HabbitRabbit/habbit-rabbit-front

## Instructions to Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/HabbitRabbit/habbit-rabbit-back.git

2. **Install Dependencies**

```
npm install
```

3. **Environment Variables**
Create a .env file in the root directory and add the following environment variable:

````
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
````

4. **Run the Application**
Start the development server with

```
npm run dev
```

**DEMO**
The server is deployed on OnRender.com https://habbit-rabbit-back.onrender.com