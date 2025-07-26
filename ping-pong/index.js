const express = require("express")
const app = express()

const port = process.env.PORT
let pongs = 0

app.get('/pingpong', (req, res) => {
    pongs += 1
    res.send(`Pong ${"o".repeat(pongs)}`)
  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})