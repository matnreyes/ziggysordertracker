const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Homepage')
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})