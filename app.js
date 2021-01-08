const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const busboy = require("connect-busboy");
const fs = require("fs-extra");
const _ = require("lodash");
const utils = require("./utils");
var config = require("./config.json");

const app = express();
const port = 3000;

app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(cors());
app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set("view engine", "ejs");

(refreshAll = (resolve_) => {
    fs.readdirSync("./public/contents/").forEach((file, index) => {
        if (utils.findByValue(config.order, file) == false) {
            config.order[index + 1] = file;
            fs.writeFile("./config.json", JSON.stringify(config), () => {});
        }

        config = require("./config.json");

        app.get(encodeURI("/contents/" + file), (req, res) => {
            res.sendFile(__dirname + "/public/contents/" + file);
        });
    });

    const promises = [];

    for (const key in config.order) {
        if (Object.hasOwnProperty.call(config.order, key)) {
            const element = config.order[key];
            promises.push(utils.readFromFile("./public/contents/", element));
        }
    }

    Promise.all(promises).then((result) => {
        var list = {};
        var index = 0;

        for (const key in utils.ArrayToObject(result, 1)) {
            if (
                Object.hasOwnProperty.call(utils.ArrayToObject(result, 1), key)
            ) {
                const element = utils.ArrayToObject(result, 1)[key];
                if (element !== "") {
                    index += 1;
                    list[index] = element;
                }
            }
        }

        config.order = list;
        if (JSON.stringify(list) != JSON.stringify(config.order)) {
            promise = new Promise((resolve, reject) => {
                fs.writeFile("./config.json", JSON.stringify(config), () => {
                    resolve();
                });
            });
            promise.then(() => {
                refreshAll(resolve_);
            });
        } else {
            config = require("./config.json");
            if (resolve_) resolve_();
        }
    });
})();

app.get("/", async (req, res) => {
    var promise = new Promise((resolve, reject) => {
        refreshAll(resolve);
    });

    promise.then(() => {
        var list = [];

        for (const key in config.order) {
            if (Object.hasOwnProperty.call(config.order, key)) {
                const element = config.order[key];
                list.push(element);
                console.log(1);
            }
        }

        fs.readFile("./public/index.html", (err, data) => {
            res.send(
                utils.replaceByList(data.toString(), {
                    data1: JSON.stringify(list),
                })
            );
            console.log(list);
        });
    });
});

app.get("/manage", async (req, res) => {
    var promise = new Promise((resolve, reject) => {
        refreshAll(resolve);
    });

    promise.then(() => {
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
});

app.get("/request/order", async (req, res) => {
    console.log("lele");
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
            var promise = new Promise((resolve, reject) => {
                refreshAll(resolve);
            });

            promise.then(() => {
                return res.redirect("/manage");
            });
        }
    } else if (mode == "up") {
        if (config.order[(parseInt(index) - 1).toString()]) {
            otherIndex = (parseInt(index) - 1).toString();
        }
        if (parseInt(index) - 1 <= 0) {
            var promise = new Promise((resolve, reject) => {
                refreshAll(resolve);
            });

            promise.then(() => {
                return res.redirect("/manage");
            });
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
});

app.post("/request/add", function (req, res) {});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
