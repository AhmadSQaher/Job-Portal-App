// Minimal test server
import express from 'express'

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.json({ message: 'Test server works!' })
})

app.get('/api/jobs', (req, res) => {
  res.json([{ title: 'Test Job', company: 'Test Company' }])
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${port}`)
}).on('error', (err) => {
  console.error('Server error:', err)
})
