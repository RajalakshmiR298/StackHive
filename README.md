# CampusConnect

##  Overview

CampusConnect is a MERN stack web application that helps students discover events that match their interests, skills, and hobbies while also connecting them with like-minded peers. The platform recommends nearby technical and non-technical events and allows users to build meaningful connections with other students.

---

##  Features

###  Personalized Event Recommendations

* Discover nearby events based on your interests, hobbies, and skills.
* Supports both technical and non-technical events.
* View complete event details and registration links.

###  Favorite Events

* Save events you're interested in.
* Access all your favorite events from one place.

###  Connect with Like-minded Students

* Find students with similar interests and skills.
* Send and accept connection requests.

###  Contact Connected Users

* Once connected, users can view each other's email addresses.
* Continue conversations through email or other external platforms.

---

##  Tech Stack

### Frontend

* React.js
* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

---

##  Project Structure

```
CampusConnect
│
├── client/                 # React Frontend
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

##  Database Collections

### Users

* Name
* Email
* Password
* Skills
* Interests
* Hobbies
* Location
* Favorite Events
* Connections

### Events

* Title
* Description
* Category
* Tags
* Venue
* Date & Time
* Registration Link
* Location

### Connection Requests

* Sender ID
* Receiver ID
* Status (Pending / Accepted / Rejected)

---

##  How It Works

1. User signs up and creates a profile.
2. User selects interests, hobbies, and skills.
3. The platform recommends nearby events matching the user's profile.
4. Users can save events to Favorites.
5. Users can discover students with similar interests.
6. Users send and accept connection requests.
7. After connecting, users can view each other's email addresses to communicate outside the platform.

---

## 📄 License

This project is developed for academic purposes as a MERN Stack mini project.
