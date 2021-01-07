const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

fs.readdir("./contents/", async (err, files) => {
    files.forEach((file) => {        
        app.get("/contents/" + file, (req, res) => {
            res.sendFile(__dirname + "/contents/" + file)
        })
    });
});

app.get("/", async (req, res) => {
    fs.readdir("./contents/", (err, files) => {
        var result = ""

        files.forEach((file) => {
            var extension = file.substring(file.lastIndexOf(".") + 1);

            var extension_image = ["png", "jpg", "jpeg", "gif"]
            var extension_video = ["mp4", "webm"]

            if (extension_image.includes(extension)) {
                result += `<div class="l"><img src="contents/${file}"></div>`
            } else if (extension_video.includes(extension)) {
                result += `<div class="l"><video controls autoplay class="l"><source src="contents/${file}"></video></div>`
            }
        });

        res.sendFile(__dirname + "/views/index.html")
    });
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
