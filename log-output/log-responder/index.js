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

app.get('/', async (req, res) => {
    console.log("received GET")
    const response = await fetch('http://ping-pong-svc:2346/pings')
    const pings = await response.text()
    const string = readString()
    // For clean CLI output
    res.type('text/plain');
    res.send(`${string}.\nPing / Pongs: ${pings}`);
    //res.send(`<div><p>${string}.</p><p>Ping / Pongs: ${pings}</p></div>`)
  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})