const fs = require('fs');

const logger = {
  homeFolder: __dirname,

  createReport: function (fileName, content) {
    fs.writeFileSync(this.homeFolder + `/reports/${fileName}`, content);
  },
  appendToReport: function (fileName, content) {
    try {
      fs.appendFileSync(
        this.homeFolder + `/reports/${fileName}`,
        `\n` + content
      );
    } catch (err) {
      consol.log(err);
    }
  },
};

module.exports = {
  logger,
};
