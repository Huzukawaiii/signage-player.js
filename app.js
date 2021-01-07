const express = require("express")
const fs = require("fs")
const app = express()
const port = 3000

fs.readdir("./contents/", async (err, files) => {
    files.forEach(file => {
        console.log(typeof file);
        fs.readFile("./contents/" + file, async function read(err, data) {
            await console.log(data)
        })
    });
});

app.get('/', (req, res) => {
    var result;

    

    res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>' + result + '</body></html>')
})

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`)
})
