const path = require("path")
const express = require("express")

const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})