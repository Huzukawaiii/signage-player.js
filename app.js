const express = require("express");
const fs = require("fs");
const utils = require("./utils");
const app = express();
const port = 3000;

fs.readdir("./contents/", async (err, files) => {
    files.forEach((file) => {
        app.get("/contents/" + file, (req, res) => {
            res.sendFile(__dirname + "/contents/" + file);
        });
    });
});

app.get("/", async (req, res) => {
    fs.readdir("./contents/", (err, files) => {
        fs.readFile("./public/index.html", (err, data) => {
            res.send(
                utils.replaceByList(data.toString(), {
                    data1: JSON.stringify(files),
                })
            );
        });
    });
});

app.get("/manage", async (req, res) => {
    fs.readFile("./public/manage.html", (err, data) => {
        res.send(
            utils.replaceByList(data.toString(), {
                data1: "lelcarry",
            })
        );
    });
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
