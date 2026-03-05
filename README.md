# BlogApp

A simple full-stack blog application built with **Node.js, Express, MongoDB, and EJS**.
Users can register, log in, create posts, edit them, and view all their posts on their profile page.

---

## 🚀 Features

* User Registration and Login
* Password hashing using **bcrypt**
* Authentication using **JWT (JSON Web Tokens)**
* Protected routes with middleware
* Create new blog posts
* Edit existing posts
* View all posts on the user profile
* Logout functionality
* MongoDB relationships using **Mongoose populate**

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JWT
* bcrypt

**Frontend**

* EJS templating
* TailwindCSS

---

## 📁 Project Structure

```
BlogApp
│
├── models
│   ├── post.js
│   └── user.js
│
├── views
│   ├── edit.ejs
│   ├── index.ejs
│   ├── login.ejs
│   └── profile.ejs
│
├── app.js
├── package.json
└── .gitignore
```

---

## ⚙️ Installation

Clone the repository:

```
git clone https://github.com/YOUR_USERNAME/BlogApp.git
```

Go into the project folder:

```
cd BlogApp
```

Install dependencies:

```
npm install
```

Start MongoDB locally and run the server:

```
node app.js
```

The app will run at:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using **bcrypt**
3. A **JWT token** is generated and stored in cookies
4. Middleware verifies the token for protected routes
5. Logged-in users can create and manage their posts

---

## 📌 Future Improvements

* Delete posts
* Like system for posts
* Edit profile functionality
* Image upload for posts
* Deploy the application online

---

## 👨‍💻 Author

**Ayush Ranjan**

Student at **IIEST Shibpur**
Interested in backend development, machine learning, and building impactful software.

---
