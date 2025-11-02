const fs = require("node:fs")

const formatString = (randString) => {
        const timestamp = new Date()
        const isoTimestamp = timestamp.toISOString();
        return `${isoTimestamp}:  ${randString}`
}

const main =  () => {
    const string = crypto.randomUUID()
        setInterval(() => {
            const stringWithTimestamp = formatString(string)
                try {
                    fs.writeFileSync('/usr/src/app/files/string.txt', stringWithTimestamp);
                } catch (err) {
                    console.error(err);
            }
        },5000)
    
}

main()
