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
};
