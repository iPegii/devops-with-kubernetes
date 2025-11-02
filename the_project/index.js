const express = require("express")
const fs = require("node:fs")
const { Readable } = require("stream");

const app = express()

const port = 3000

app.get("/daily-image.jpg", (req, res) => {
  const imagePath = "/usr/src/app/files/daily-image.jpg";
  res.sendFile(imagePath);
});
app.get('/', async (req, res) => {
    await checkImage()
    res.send(`
      <div>
      <h1>The Project App</h1>
      <img src="/daily-image.jpg" alt="Random image"/>
      <form>
      <input type="text" placeholder="Type here..." maxlength="140"/>
      <button type="submit">Submit</button>
      </form>
      <div>
      <h2>Todos</h2>
      <ul>
      <li>Learn Kubernetes</li>
      <li>Build awesome apps</li>
      <li>Contribute to Open Source</li>
      </ul>
      </div>
      <p>DevOps with Kubernetes 2025</p>
      </div>
      `);
  })

app.listen(port, () => {
console.log(`Server started in port ${port}`)
})

const checkImage = async () => {
    const {image,imageDate} = await readImageFromCache()
    if(image && imageDate) {
    const now = new Date()
    const hour = 60 * 60 * 1000
    if(now - imageDate <  hour) {
      return image
    }
  } else {
    updateImage()
  }
}

const readImageFromCache = async () => {
  try {
    const image =  fs.readFileSync("/usr/src/app/files/daily-image.jpg");
    const imageDate = fs.readFileSync('/usr/src/app/files/daily-image.txt', 'utf8');
    const imageDateFormatted = new Date(imageDate)
    return {image,imageDate:imageDateFormatted}
  } catch (err) {
    console.error(err);
    return {image:null, imageDate:null}
  }
}

const updateImage = async () => {
  const url = "https://picsum.photos/1200";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    saveImage(await response)
  } catch (error) {
    console.error(error.message);
  }
}

const saveImage = async (response) => {
  try {
    // Write the image blob
    console.log(response)
    const nodeStream = Readable.fromWeb(response.body);
    const fileStream = fs.createWriteStream("/usr/src/app/files/daily-image.jpg");
    nodeStream.pipe(fileStream);

    fileStream.on("finish", () => {
      console.log("Image saved!");
    });
    try {
      // Write the image date for caching
      const timestamp = new Date().toISOString()
      fs.writeFileSync('/usr/src/app/files/daily-image.txt', timestamp);
    } catch(err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
}