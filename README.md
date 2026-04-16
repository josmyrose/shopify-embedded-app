# 🛍️ Shoplytics

### Shopify Analytics Dashboard

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![Shopify](https://img.shields.io/badge/Shopify-API-7AB55C)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📌 Overview

**Shoplytics** is a full-stack web application that connects to a Shopify store and provides key business insights such as:

* 📊 Total Revenue
* 📦 Order Count
* 🛒 Product Data

Built using **React (Vite)** and **Node.js (Express)** with Shopify’s **GraphQL Admin API**.

---

## ✨ Features

* 📈 Real-time Shopify analytics
* 💰 Revenue calculation
* 📦 Order tracking
* 🛍️ Product listing
* ⚡ Fast and lightweight UI

---

## 🧱 Tech Stack

### 🔹 Frontend

* React (Vite)
* JavaScript (ES6)

### 🔹 Backend

* Node.js
* Express.js

### 🔹 API

* Shopify Admin GraphQL API

---

## 📁 Project Structure

```
shopify-embedded-app/
│
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder:

```
SHOP=your-store-name.myshopify.com
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
ADMIN_API_TOKEN=your_access_token

SCOPES=read_products,read_orders
HOST=http://localhost:5000
```

---

## ▶️ Getting Started

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/shoplytics.git
cd shoplytics
```

---

### 2️⃣ Start Backend

```
cd backend
npm install
npm run dev
```

👉 Runs on: http://localhost:5000

---

### 3️⃣ Start Frontend

```
cd frontend
npm install
npm run dev
```

👉 Runs on: http://localhost:5173

---

## 🔐 Authentication Flow

This project uses a **manual OAuth flow**:

1. Open:

```
http://localhost:5000/auth?shop=your-store.myshopify.com
```

2. Approve the app

3. Shopify redirects to:

```
/auth/callback
```

4. Access token is generated

---

## 📡 API Endpoints

### 🔹 GET /api/analytics

Returns revenue and order count

```
{
  "revenue": 1200,
  "orders": 25
}
```

---

### 🔹 GET /api/products

Returns Shopify product list

---

## ⚠️ Limitations

* Manual OAuth setup required
* Token stored in memory (not production safe)
* Requires correct Shopify scopes
* App reinstall needed after scope changes

---

## 🚀 Future Improvements

* Shopify CLI integration
* Secure token storage (DB)
* Data visualization (charts)
* UI improvements using Shopify Polaris
* Deployment (AWS / Vercel)

---

## 📸 Screenshots

*Add screenshots here*

---

## 👨‍💻 Author

**Josmy Mathew**
MSc Data Science, AI & Digital Business

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
