const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

fs.readdir("./contents/", async (err, files) => {
    files.forEach((file) => {
        var extension = file.substring(file.lastIndexOf(".") + 1);

        if (extension == "png") {
            app.get("/contents/" + file, (req, res) => {
                res.sendFile(__dirname + "/contents/" + file)
            })
        }
    });
});

app.get("/", async (req, res) => {
    var result = "";

    fs.readdir("./contents/", async (err, files) => {
        files.forEach((file) => {
            var extension = file.substring(file.lastIndexOf(".") + 1);

            if (extension == "png") {
                console.log(file)

                result = result + '<div class="l"><img src="http://127.0.0.1:3000/contents/"></div>'
            }
        });
    });
//     await res.send(`<!DOCTYPE html>
// <html lang="en">

// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
//     <script src="https://code.jquery.com/jquery-3.5.1.min.js"
//         integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
//     <style>
//         body {
//             overflow: hidden;
//             background-color: #333;
//             /* Hide scrollbars */
//         }

//         #slideshow {
//             display: grid;
//             height: 100%;
//         }

//         * {
//             margin: 0;
//             padding: 0;
//         }

//         .l {
//             max-width: 100%;
//             max-height: 100vh;
//             height: 100vh;
//             margin: auto;
//         }

//         img {
//             max-width: 100%;
//             max-height: 100vh;
//             height: 100vh;
//             margin: auto;
//         }
//     </style>
// </head>

// <body>
//     <div id="slideshow">
//         ${result}
//     </div>
//     <script>
//         $("#slideshow > div:gt(0)").hide();

//         var delay = 5

//         setInterval(function () {
//             $('#slideshow > div:first')
//                 .fadeOut(1000)
//                 .next()
//                 .fadeIn(1000)
//                 .end()
//                 .appendTo('#slideshow');
//         }, delay * 1000);
//     </script>
// </body>

// </html>`)
});

app.listen(port, () => {
    console.log(`App listening at http://127.0.0.1:${port}`);
});
