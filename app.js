const express = require("express");
const fs = require("fs");
const utils = require("./utils");
const app = express();
const port = 3000;

"".replaceList({ lel: "le" });

fs.readdir("./contents/", async (err, files) => {
    files.forEach((file) => {
        app.get("/contents/" + file, (req, res) => {
            res.sendFile(__dirname + "/contents/" + file);
        });
    });
});

app.get("/", async (req, res) => {
    fs.readdir("./contents/", (err, files) => {
        var result = "";

        res.send(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <style>
        body {
            overflow: hidden;
            background-color: #333;
            /* Hide scrollbars */
        }

        #slideshow {
            display: grid;
            height: 100%;
        }

        * {
            margin: 0;
            padding: 0;
        }

        .l {
            max-width: 100%;
            max-height: 100vh;
            height: 100vh;
            width: 100%;
            margin: auto;
        }

        img {
            position: fixed;
            max-width: 100%;
            max-height: 100vh;
            width: 100%;
            height: 100vh;
            margin: auto;
            opacity: 1;
        }

        video {
            position: fixed;
            max-width: 100%;
            max-height: 100vh;
            width: 100%;
            height: 100vh;
            margin: auto;
            opacity: 1;
        }

        video::-webkit-media-controls-start-playback-button {
            display: none;
        }
        
    </style>
</head>

<body>
    <div id="slideshow">
        <!-- <img src="contents/PNG_transparency_demonstration_1.png">
        <video controls src="contents/Snapchat-952515864.mp4">
        </video> -->
    </div>
    <script>
        var content = ${JSON.stringify(files)}
        var object = {}

        content.forEach(async (element, index) => {
            var extension = element.substring(element.lastIndexOf(".") + 1);

            var extension_image = ["png", "jpg", "jpeg", "gif"]
            var extension_video = ["mp4", "webm"]

            if (extension_image.includes(extension)) {
                object[index] = document.createElement("img");
                object[index].setAttribute("src", \`contents/\${element}\`)
                object[index].hidden = true
                document.getElementById("slideshow").appendChild(object[index])
            } else if (extension_video.includes(extension)) {
                object[index] = document.createElement("VIDEO");
                object[index].setAttribute("src", \`contents/\${element}\`)
                object[index].hidden = true
                document.getElementById("slideshow").appendChild(object[index])
            }
        })

        setTimeout(() => {
            function fadeIn(el, time) {
                el.style.opacity = 0;
                el.style.display = "block";

                var last = +new Date();
                var tick = function () {
                    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
                    last = +new Date();

                    if (+el.style.opacity < 1) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                    }
                };

                tick();
            }

            function fadeOut(el, time) {
                el.style.opacity = 1;
                el.style.display = "block";

                var last = +new Date();
                var tick = function () {
                    el.style.opacity = el.style.opacity - (new Date() - last) / time;
                    last = +new Date();

                    if (el.style.opacity > 0) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                    }
                };

                tick();
            }

            (refresh = () => {
                var data = {
                    interval: 0,
                    delay: 5000,
                    fadeSpeed: 1000
                }

                console.log("restarted")

                for (const key in object) {
                    if (Object.hasOwnProperty.call(object, key)) {
                        const element = object[key];
                        const index = key

                        const actualInterval = data.interval

                        var delay = data.delay

                        if (element.tagName == "VIDEO") {
                            data.interval += (element.duration * 1000) + (data.fadeSpeed / 2)
                        } else if (element.tagName == "IMG") {
                            data.interval += data.delay
                        }

                        console.log(actualInterval)

                        setTimeout(function () {
                            console.log("GO")

                            if (element.tagName == "IMG") {
                                element.hidden = false
                                fadeIn(element, data.fadeSpeed)

                                setTimeout(() => {
                                    fadeOut(element, data.fadeSpeed)
                                    element.hidden = true
                                    setTimeout(() => {
                                        if (index.toString() === (content.length - 1).toString()) {
                                            refresh()
                                        }
                                    }, data.fadeSpeed);
                                }, delay - data.fadeSpeed);
                            } else if (element.tagName == "VIDEO") {
                                element.hidden = false
                                element.play()
                                fadeIn(element, data.fadeSpeed)

                                setTimeout(() => {
                                    fadeOut(element, data.fadeSpeed)
                                    element.hidden = true
                                    setTimeout(() => {
                                        if (index.toString() === (content.length - 1).toString()) {
                                            refresh()
                                        }
                                    }, data.fadeSpeed);
                                }, (element.duration * 1000) - data.fadeSpeed + 500);
                            }
                        }, actualInterval);
                    }
                }
            })();
        }, 1000);
    </script>
</body>

</html>`);
    });
});

app.get("/manage", async (req, res) => {
    fs.readFile("./public/manage.html", (err, data) => {
        res.send(data.toString().replace(/{{data1}}/g, "lel"));
    });
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
