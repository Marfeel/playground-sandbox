const fs = require('fs');

const root = `${__dirname}/../experiences`;
const tests = fs.readdirSync(root)
    .reduce((acc, cur) => {
        const path = `${root}/${cur}`;
        const files = fs.readdirSync(path)
            .filter(file => file.match(new RegExp(`.*\.(test.js)$`, 'ig')))
            .map(file => `${path}/${file}`);

        return [...acc, ...files];
    }, []);

for (const test of tests) {
    describe(`Dynamic experience loaded from: ${test}`, require(test));
}
