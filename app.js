const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    var result;

    fs.readdir("./contents/", async (err, files) => {
        files.forEach((file) => {
            var extension = file.substring(file.lastIndexOf(".") + 1);

            if (extension == "png") {

            }
        });
    });

    res.sendFile(__dirname + "/views/index.1.html");
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
