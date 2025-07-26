const path = require("path")
const express = require("express")
const fs = require("node:fs")

const app = express()

const port = process.env.PORT

const generateAndSaveString = () => {
    const string = crypto.randomUUID()
    try {
        fs.writeFileSync('./string.txt', string);
    } catch (err) {
        console.error(err);
    }
}
const outputString = () => {
    try {
        const timestamp = new Date()
        const data = fs.readFileSync('./string.txt', 'utf8');
        return `${timestamp}:  ${data}`
      } catch (err) {
        console.error(err);
      }
}

const main =  () => {
    generateAndSaveString()
        setInterval(() => {
            console.log(outputString())
        },5000)
    
}

main()

app.get('/', (req, res) => {
    res.send(outputString())
  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})