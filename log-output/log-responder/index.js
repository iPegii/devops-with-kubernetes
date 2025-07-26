const express = require("express")
const fs = require("node:fs")

const app = express()

const port = process.env.PORT

const readString = () => {
    try {
        const data = fs.readFileSync('/usr/src/app/files/string.txt', 'utf8');
        return data
      } catch (err) {
        console.error(err);
      }
}

app.get('/', (req, res) => {
    console.log("received GET")
    const string = readString()
    res.send(string)
  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})