# 🛍️ Shoplytics – Shopify Analytics Dashboard

Shoplytics is a simple analytics dashboard built using **Node.js (Express)** and **React (Vite)** that connects to a Shopify store and displays key metrics like revenue and order count.

---

## 🚀 Features

- 📊 Fetch Shopify Orders using GraphQL Admin API
- 💰 Calculate total revenue
- 📦 Display total orders
- 🛒 Fetch products list
- ⚡ Fast frontend with React + Vite
- 🔗 Backend API with Express

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- Axios / Fetch

### API
- Shopify Admin GraphQL API

---

## 📂 Project Structure
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
⚙️ Environment Variables

Create a .env file inside the backend folder:

SHOP=your-store-name.myshopify.com
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
ADMIN_API_TOKEN=your_access_token

SCOPES=read_products,read_orders
HOST=http://localhost:5000
▶️ Running the Project
1️⃣ Start Backend
cd backend
npm install
npm run dev

Backend runs at:

http://localhost:5000
2️⃣ Start Frontend
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔐 Authentication Flow

This project uses a manual OAuth flow:

Open:
http://localhost:5000/auth?shop=your-store.myshopify.com
Approve app installation
Shopify redirects to:
/auth/callback
Access token is generated and used for API requests
📡 API Endpoints
🔹 GET /api/analytics

Returns total revenue and order count.

Example:

{
  "revenue": 1200,
  "orders": 25
}
🔹 GET /api/products

Returns a list of products from Shopify.

⚠️ Known Limitations
Manual OAuth setup required
Access token stored in memory (not secure for production)
App must be reinstalled after changing API scopes
Requires Shopify Admin API permissions (read_orders, read_products)
🛠️ Future Improvements
Integrate Shopify CLI authentication
Store tokens securely (database)
Add charts for analytics (Chart.js / Recharts)
Improve UI/UX with Shopify Polaris
Deploy to cloud (Vercel / AWS / Render)
👨‍💻 Author

Josmy Mathew
MSc Data Science, AI & Digital Business

⭐ Support

If you like this project, give it a ⭐ on GitHub!