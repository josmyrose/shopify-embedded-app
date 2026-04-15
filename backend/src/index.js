require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const crypto = require('crypto')
const axios = require('axios')

const app = express()
app.use(cors())

// 🔥 TEMP storage (later move to DB)
let accessToken = null
let shopDomain = null

console.log("SHOP:", process.env.SHOP)

// =======================
// 🔐 AUTH ROUTES
// =======================

// STEP 1: Redirect to Shopify
app.get('/auth', (req, res) => {
  const shop = req.query.shop

  if (!shop) {
    return res.status(400).send('Missing shop parameter')
  }

  const state = crypto.randomBytes(16).toString('hex')
  const redirectUri = `http://localhost:5000/auth/callback`

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${process.env.SCOPES}&redirect_uri=${redirectUri}&state=${state}`

  console.log("🔥 AUTH HIT:", shop)

  res.redirect(installUrl)
})


// STEP 2: Callback (VERY IMPORTANT)
app.get('/auth/callback', async (req, res) => {
  const { shop, code } = req.query

  if (!shop || !code) {
    return res.status(400).send('Missing shop or code')
  }

  try {
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code
      }
    )

    accessToken = response.data.access_token
    shopDomain = shop

    console.log("✅ ACCESS TOKEN:", accessToken)

    // 🔥 Redirect to frontend
    res.redirect('http://localhost:5173')

  } catch (err) {
    console.error("❌ OAuth Error:", err.response?.data || err.message)
    res.status(500).send("Auth failed")
  }
})


// =======================
// 📊 API ROUTES
// =======================

// Analytics API
app.get('/api/analytics', async (req, res) => {
  try {
    if (!accessToken || !shopDomain) {
      return res.status(401).json({ error: 'App not authenticated' })
    }

    const response = await fetch(
      `https://${shopDomain}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify({
          query: `
            {
              orders(first: 20) {
                edges {
                  node {
                    createdAt
                    totalPriceSet {
                      shopMoney {
                        amount
                      }
                    }
                  }
                }
              }
            }
          `
        })
      }
    )

    const data = await response.json()

    if (!data.data) {
      return res.status(500).json(data)
    }

    let revenue = 0
    let orders = data.data.orders.edges.length

    data.data.orders.edges.forEach(order => {
      revenue += parseFloat(order.node.totalPriceSet.shopMoney.amount)
    })

    res.json({ revenue, orders })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// Products API
app.get('/api/products', async (req, res) => {
  try {
    if (!accessToken || !shopDomain) {
      return res.status(401).json({ error: 'App not authenticated' })
    }

    const response = await fetch(
      `https://${shopDomain}/admin/api/2024-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        body: JSON.stringify({
          query: `
            {
              products(first: 5) {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          `
        })
      }
    )

    const data = await response.json()

    if (!data.data) {
      return res.status(500).json(data)
    }

    res.json(data.data.products.edges)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// =======================
// 🌐 SERVE FRONTEND
// =======================

const frontendPath = path.join(__dirname, '../../frontend/dist')

app.use(express.static(frontendPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})


// =======================
// 🚀 START SERVER
// =======================

app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000')
})