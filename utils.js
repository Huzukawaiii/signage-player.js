String.prototype.replaceList = (array) => {
    if (array === undefined) return undefined;
    try {
        array.forEach((element, index) => {
            return true;
        });
    } catch (error) {
        for (const key in array) {
            if (Object.hasOwnProperty.call(array, key)) {
                const element = array[key];
                return false;
            }
        }
    }
};

module.exports = {};
