# Express + Mongoose CRUD API

This is a simple **CRUD API** built using **Express.js** and **Mongoose** to perform Create, Read, Update, and Delete operations on a MongoDB database.

## 🚀 Technologies Used
- **Express.js** - Web framework for Node.js
- **Mongoose** - MongoDB object modeling for Node.js
- **dotenv** - Loads environment variables


## Testing in Postman
Create -
``` bash
      method - post
      API - http://localhost:3000/create
      body - {
          "username":"abc",
          "email":"abc@gmail.com"
        }
```
Read -
``` bash
      method - get
      API - http://localhost:3000/get
      body - no body needed
```
