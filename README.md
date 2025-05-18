## 🍕 Foodie - Your Favorite Meals, Just a Click Away

**Foodie** is a full-stack food ordering web application that lets users browse delicious meals fetched from [TheMealDB API](https://www.themealdb.com/),add them to a cart, and place orders with a clean and modern user interface. 

Built using **React.js**, **Material UI**, **Express.js**, and **MongoDB**, this project showcases a seamless frontend experience and a RESTful backend.

> ⚠️ *Order tracking is UI-only (not real-time). No live order status or backend processing of orders yet.*


## 🌐 Live Demo

🔗 [Click here to view the app](https://foodie-8h1h.onrender.com)

## 📸 Screenshots

- **Home Page**  
  ![Screenshot 2025-05-18 131611](https://github.com/user-attachments/assets/da5356ad-fc2e-4993-ac0e-eace988fcd82)

- **Cart Page**  
  ![Screenshot 2025-05-18 131643](https://github.com/user-attachments/assets/a904d56f-fde9-4e1b-bd8a-d6ccdf8992ae)

- **Order History**  
![Screenshot 2025-05-18 131751](https://github.com/user-attachments/assets/a71afb7c-82cf-4525-bdcf-af34077cd794)

- **Track Order UI**
![Screenshot 2025-05-18 131733](https://github.com/user-attachments/assets/8cc44ca7-7bfb-4c52-b74f-0fd557cae883)


## 🚀 Features

- 🍽️ Browse meals from TheMealDB API
- 🛒 Add and remove items from cart
- 💳 Select payment method (Cash/Card) - UI only
- 📦 Place an order (stored in MongoDB)
- 🧾 View past orders (fetched from backend)
- 🎨 Fully responsive Material UI design
- 💾 Data persisted with LocalStorage

## 🧰 Tech Stack

### Frontend:
- React.js
- React Router
- Material UI (MUI)
- Axios
- TheMealDB API
- LocalStorage

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)

### Deployment:
- Render (full-stack deployment as single service)
- GitHub (source control)

## 🗂 Folder Structure
foodie/
├── backend/
│ ├── server.js
│ ├── models/
│ ├── routes/
│ └── ...
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ ├── package.json
│ └── build/
├── package.json (backend)
└── README.md 

## 🛠️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/KunalSingh5431/foodie.git
cd foodie
```

### 2. Install backend dependencies
``` bash
npm install
```

### 3. Setup frontend
``` bash
cd frontend
npm install
npm run build
cd ..
```
### 4. Start the server
``` bash
npm start
```

Your app runs at: http://localhost:5000

## 🌍 Deployment Guide (Render - Full Stack)
🧾 Prerequisites
MongoDB connection string (cloud/local)

GitHub repo with both frontend/ and backend/ folders

## 🏗️ Build Command
``` bash
cd frontend && npm install && npm run build && cd .. && npm install
```
## ▶️ Start Command
``` bash
node backend/server.js
```
## ✅ Ensure these are in your backend/server.js:
``` bash
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
```
## ⚙️ Environment Variables (.env)
``` bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Make sure to add .env to your .gitignore.

## 🧠 Future Enhancements
🔐 User authentication with JWT

📦 Real-time order tracking with sockets

📊 Admin dashboard to manage meals & orders

📱 PWA support for mobile installs

🛍️ Payment gateway integration (Razorpay/Stripe)

## 👨‍💻 Developer
Kunal Singh
📫 Email: kunalsingh5431@gmail.com
🔗 GitHub: @KunalSingh5431
