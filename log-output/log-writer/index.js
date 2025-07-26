const fs = require("node:fs")

const formatString = (randString) => {
        const timestamp = new Date()
        return `${timestamp}:  ${randString}`
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
