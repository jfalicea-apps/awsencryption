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
    let tmpObj = {
      dbName: DBInstanceIdentifier,
      isEncrypted: StorageEncrypted,
    };
    return tmpObj;
  });
  return dbEncryptedList;
}
