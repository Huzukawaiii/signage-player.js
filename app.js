const express = require("express");
const fs = require("fs");
const utils = require("./utils");
const app = express();
const port = 3000;

fs.readdir("./public/contents/", async (err, files) => {
    files.forEach((file) => {
        app.get("/contents/" + file, (req, res) => {
            res.sendFile(__dirname + "/public/contents/" + file);
        });
    });
});

app.get("/", async (req, res) => {
    fs.readdir("./public/contents/", (err, files) => {
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
    var content_list = "";

    fs.readdir("./public/contents/", async (err, files) => {
        files.forEach((file, index) => {
            content_list += `<tr><th scope="row">${index}</th><td>${file}</td><td><code>${file.substring(
                file.lastIndexOf(".") + 1
            )}</code></td><td><i class="fas fa-caret-square-up"></i> <i class="fas fa-caret-square-down"></i></td></tr>`;
        });
    });

    fs.readFile("./public/manage.html", (err, data) => {
        res.send(
            utils.replaceByList(data.toString(), {
                "table-content": content_list,
            })
        );
    });
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
