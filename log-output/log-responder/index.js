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

const readPongs = () => {
    try {
        const data = fs.readFileSync('/usr/src/app/files/pongs.txt', 'utf8');
        return Number(data)
      } catch (err) {
        console.error(err);
        return 0 // Return zero on first run
      }
}

const writePongs = (pongs) => {
    try {
        fs.writeFileSync('/usr/src/app/files/pongs.txt', pongs.toString());
        } catch (err) {
        console.error(err);
    }
}

app.get('/', (req, res) => {
    console.log("received GET")
    const string = readString()
    const oldPongs = readPongs()
    const newPongs = oldPongs + 1
    console.log(oldPongs, newPongs)
    writePongs(newPongs)
    res.send(`<div><p>${string}.</p><p>Ping / Pongs: ${newPongs}</p></div>`)
  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})