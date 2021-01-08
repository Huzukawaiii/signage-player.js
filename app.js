const express = require("express");
const fs = require("fs");
const utils = require("./utils");
var config = require("./config.json");
const app = express();
const port = 3000;

fs.readdir("./public/contents/", async (err, files) => {
    files.forEach((file, index) => {
        if (utils.findByValue(config.order, file) == false) {
            config.order[index + 1] = file;
            fs.writeFile("./config.json", JSON.stringify(config), () => {});
        }

        config = require("./config.json");

        app.get(encodeURI("/contents/" + file), (req, res) => {
            res.sendFile(__dirname + "/public/contents/" + file);
        });
    });
});

app.get("/", async (req, res) => {
    config = require("./config.json");

    var list = [];

    for (const key in config.order) {
        if (Object.hasOwnProperty.call(config.order, key)) {
            const element = config.order[key];
            list.push(element);
        }
    }

    fs.readFile("./public/index.html", (err, data) => {
        res.send(
            utils.replaceByList(data.toString(), {
                data1: JSON.stringify(list),
            })
        );
    });
});

app.get("/manage", async (req, res) => {
    var content_list = "";

    for (const key in config.order) {
        if (Object.hasOwnProperty.call(config.order, key)) {
            const element = config.order[key];
            content_list += `<tr><th scope="row">${key}</th><td>${element}</td><td><code>${element.substring(
                element.lastIndexOf(".") + 1
            )}</code></td><td><button style="background: transparent; color: #fff;border: none !important;" onclick="change_order(${key}, 'up')"><i class="fas fa-caret-square-up"></i></button> <button style="background: transparent; color: #fff;border: none !important;" onclick="change_order(${key}, 'down')"><i class="fas fa-caret-square-down"></i></button></td></tr>`;
        }
    }

    fs.readFile("./public/manage.html", (err, data) => {
        res.send(
            utils.replaceByList(data.toString(), {
                "table-content": content_list,
                config: JSON.stringify(require("./config.json")),
            })
        );
    });
});

app.get("/request/order", async (req, res) => {
    var index = req.query.id;
    var mode = req.query.mode;
    var otherIndex;

    if (mode == "down") {
        if (config.order[(parseInt(index) + 1).toString()]) {
            otherIndex = (parseInt(index) + 1).toString();
        }

        var size = 0,
            key;
        for (key in config.order) {
            if (config.order.hasOwnProperty(key)) size++;
        }

        if (parseInt(index) + 1 > size) {
            return res.send(
                "<script>window.location.href = 'http://127.0.0.1:3000/manage'</script>"
            );
        }
    } else if (mode == "up") {
        if (config.order[(parseInt(index) - 1).toString()]) {
            otherIndex = (parseInt(index) - 1).toString();
        }
        if (parseInt(index) - 1 <= 0) {
            return res.send(
                "<script>window.location.href = 'http://127.0.0.1:3000/manage'</script>"
            );
        }
    }

    if (otherIndex === undefined) {
        config.order[(parseInt(index) + 1).toString()] = config.order[index];
        fs.writeFile("./config.json", JSON.stringify(config), () => {});
        config = require("./config.json");
    } else {
        var other_element = config.order[otherIndex];
        config.order[otherIndex] = config.order[index];
        config.order[index] = other_element;
        fs.writeFile("./config.json", JSON.stringify(config), () => {});
        config = require("./config.json");
    }

    console.log(index);
    console.log(otherIndex);
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
