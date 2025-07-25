import fs from "node:fs";


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
        console.log(timestamp, ": ", data)
      } catch (err) {
        console.error(err);
      }
}

const main =  () => {
    generateAndSaveString()
        setInterval(() => {
            outputString()
        },5000)
    
}
main()