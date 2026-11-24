# 🌍 Wanderlust – Travel & Accommodation Booking Platform

Wanderlust is a full-stack web application inspired by Airbnb that allows users to explore, create, manage, and share travel accommodation listings.

The platform provides an interactive experience where users can discover different properties, view their details, and manage their own listings.

## ✨ Features

- **Explore Listings:** Browse available travel accommodations.
- **Create Listings:** Add new property listings with details.
- **View Listings:** View property descriptions, prices, locations, and images.
- **Edit Listings:** Update existing property information.
- **Delete Listings:** Remove listings when no longer needed.
- **User Authentication:** Sign up, log in, and log out securely using Passport.js.
- **Reviews:** Logged-in users can add and delete reviews on listings.
- **Image Upload:** Upload listing images, stored on Cloudinary.
- **Maps & Geocoding:** Listing locations are converted to coordinates using Mapbox.
- **Validation & Flash Messages:** Server-side validation with Joi and user feedback with connect-flash.
- **Responsive UI:** User-friendly interface built with Bootstrap.
- **Database Integration:** Store and manage listing information using MongoDB.

## 🛠️ Tech Stack

**Frontend**

- HTML5
- CSS3
- JavaScript
- EJS & EJS-Mate
- Bootstrap

**Backend**

- Node.js
- Express.js

**Database**

- MongoDB
- Mongoose
- connect-mongo (session store)

**Authentication & Validation**

- Passport.js (passport-local, passport-local-mongoose)
- express-session
- Joi

**Cloud Services**

- Cloudinary (image storage, via Multer)
- Mapbox (geocoding)

**Tools & Libraries**

- Git & GitHub
- Method-Override
- dotenv

## 📂 Project Structure

```
Wanderlust/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── listings/
│   ├── layouts/
│   └── includes/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── init/
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/rishabh-1605/wanderlust.git
```

### 2. Navigate to the project directory

```bash
cd wanderlust
```

### 3. Install dependencies

Requires Node.js 22 or later.

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
```

> Make sure `.env` is listed in your `.gitignore` so your database credentials are never pushed to GitHub.

### 5. Start the application

```bash
node app.js
```

Open your browser and visit:

```
http://localhost:8080
```

## 🎯 Project Objective

The main objective of Wanderlust is to develop a practical full-stack web application while understanding backend development, RESTful routing, database operations, server-side rendering, and CRUD functionality.

## 👨‍💻 Developer

**Rishabh Chaubey**

- LinkedIn: [Connect with me](https://www.linkedin.com/in/rishabh-chaubey-47144a372/)

---

⭐ If you find this project interesting, consider giving it a star!
