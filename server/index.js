const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const XLSX = require('xlsx')
const path = require('path')
const cors = require('cors')
app.use(cors())

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Adjust this based on your requirements
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})
// Middleware setup
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// Serve static files from the "public" directory
app.use(express.static('public'))

app.get('/api/excel', (req, res) => {
  console.log('hell from api excel')
  // Define the path to your XLSX file
  const filePath = path.join(__dirname, '/timeline_sample.xlsx')

  // Read the XLSX file
  const workbook = XLSX.readFile(filePath)

  // Assuming a single sheet, you can access it by name
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]

  // Convert the worksheet to JSON data
  const excelData = XLSX.utils.sheet_to_json(worksheet)

  // Send the JSON data as a response
  console.log(excelData)
  res.json(excelData)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
