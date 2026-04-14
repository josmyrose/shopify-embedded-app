const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())


// Set Content Security Policy to allow embedding in Shopify admin
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "frame-ancestors https://admin.shopify.com https://*.myshopify.com"
  )
  next()
})
// Example API
// app.get('/api/analytics', (req, res) => {
//   res.json({ revenue: 10000 })
// })

// Serve frontend
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

// Catch-all route (React handles routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.listen(5000, () => console.log('Server running'))