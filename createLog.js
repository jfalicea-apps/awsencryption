const fs = require('fs');

const logger = {
  homeFolder: __dirname,
  appendToReport: function (fileName, content) {
    try {
      fs.appendFileSync(
        this.homeFolder + `/reports/${fileName}`,
        content + `\n`
      );
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = {
  logger,
};
