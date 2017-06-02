const fs = require('fs');
const path = require('path');
const csvParser = require('csvtojson');
const stream = require('stream');
const kebabCase = require('lodash.kebabcase');

const csvReadStream = fs.createReadStream(
  path.join(process.cwd(), '__csv__/london.csv')
);
const jsonWriteStream = fs.createWriteStream(
  path.join(process.cwd(), 'public/data/london.json')
);

csvParser()
  .fromStream(csvReadStream)
  .on('done', err => {
    jsonWriteStream.write(']');
    console.log('end');
  })
  .pipe(transform())
  .pipe(jsonWriteStream);

function transform() {
  let rowIndex = 0;
  return new stream.Transform({
    objectMode: true,
    transform(chunk, encoding, cb) {
      const jsonObj = JSON.parse(chunk.toString());
      const dataStr = JSON.stringify(
        {
          id: kebabCase(jsonObj['Company']),
          name: jsonObj['Company'],
          industry: jsonObj['Industry'],
          station: jsonObj['Tube'],
          address: jsonObj['Address'],
          technology: [
            // jsonObj['Frontend Language'],
            jsonObj['Backend Language'],
            jsonObj['Frontend Frameworks']
            // jsonObj['Backend Frameworks'],
            // jsonObj['Backend testing frameworks'],
            // jsonObj['Frontend testing frameworks'],
            // jsonObj['Bundlers'],
            // jsonObj['Supersets']
          ]
            .filter(technology => technology)
            .filter(technology => technology !== '-')
            .filter(technology => technology !== '?')
            .reduce((a, b) => a.concat(b.split(', ')), [])
            .map(technology => technology.trim())
            .filter((val, id, array) => array.indexOf(val) === id)
        },
        null,
        2
      );

      this.push(rowIndex ? `,\n${dataStr}` : `[${dataStr}`);
      rowIndex++;
      cb();
    }
  });
}
