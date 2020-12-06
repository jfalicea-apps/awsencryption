const { rds } = require('./awsService/rds');
const { logger } = require('./createLog');

//resolve the AWS promise to obtain data
const getRDSInstances = new Promise((resolve, reject) => {
  rds.describeDBInstances((err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});

//handle data: get name and encryption status
async function createDBEncryptionList() {
  const rdsInstances = await getRDSInstances;
  const dbEncryptedList = rdsInstances.DBInstances.map((config) => {
    const { DBInstanceIdentifier, StorageEncrypted } = config;
    let d = new Date();
    let tmpObj = {
      dbName: DBInstanceIdentifier,
      isEncrypted: StorageEncrypted,
      dateReviewed: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
    };
    return tmpObj;
  });
  return dbEncryptedList;
}

//create the report
async function dbEncryptionReport() {
  // array of encryption'd db info
  const info = await createDBEncryptionList();
  // logger.appendToReport(`${Date.now()}`, info);
  info.forEach((config) => {
    let stringConfig = JSON.stringify(config);
    logger.appendToReport(`x`, stringConfig);
  });
  return;
}

dbEncryptionReport();
