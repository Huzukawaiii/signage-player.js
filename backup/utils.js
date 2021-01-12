const fs = require("fs");

module.exports = {
    replaceByList: (self, array) => {
        if (array === undefined) return undefined;
        try {
            array.forEach((element, index) => {
                self = self.replace(
                    new RegExp(`"{{${index}}}"`, "g"),
                    element.toString()
                );
                self = self.replace(
                    new RegExp(`'{{${index}}}'`, "g"),
                    element.toString()
                );
                self = self.replace(
                    new RegExp(`\`{{${index}}}\``, "g"),
                    element.toString()
                );
                self = self.replace(
                    new RegExp(`{{${index}}}`, "g"),
                    element.toString()
                );
            });

            return self;
        } catch (error) {
            for (const key in array) {
                if (Object.hasOwnProperty.call(array, key)) {
                    const element = array[key];
                    const index = key;
                    self = self.replace(
                        new RegExp(`"{{${index}}}"`, "g"),
                        element.toString()
                    );
                    self = self.replace(
                        new RegExp(`'{{${index}}}'`, "g"),
                        element.toString()
                    );
                    self = self.replace(
                        new RegExp(`\`{{${index}}}\``, "g"),
                        element.toString()
                    );
                    self = self.replace(
                        new RegExp(`{{${index}}}`, "g"),
                        element.toString()
                    );
                }
            }
            return self;
        }
    },

    findByValue: (object, value) => {
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                const element = object[key];
                if (element == value) return { index: key, value: element };
            }
        }
        return false;
    },

    encodeHTMLEntities: (text) => {
        var textArea = document.createElement("textarea");
        textArea.innerText = text;
        return textArea.innerHTML;
    },

    readFromFile: (path, file) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path + file, function (err, data) {
                if (err) {
                    resolve("");
                } else {
                    resolve(file);
                }
            });
        });
    },

    ArrayToObject: (array, increment) => {
        var object = {};

        array.forEach((element, index) => {
            if (typeof index == "number" && increment != undefined) {
                object[index + increment] = element;
            } else {
                object[index] = element;
            }
        });

        return object;
    },
};
