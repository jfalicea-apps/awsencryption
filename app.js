const { rds } = require('./awsService/rds');
const { logger } = require('./createLog');
const CronJob = require('cron').CronJob;
//resolve the AWS promise to obtain data
const getRDSInstances = new Promise((resolve, reject) => {
  rds.describeDBInstances((err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});

//handle data: get name and encryption status
async function createDBEncryptionList() {
  //Resolve RDS Data Promise
  const rdsInstances = await getRDSInstances;
  //returns an array of objects - data abstracted from the AWS Request
  const dbEncryptedList = rdsInstances.DBInstances.map((config) => {
    //destructuring the information from each RDS config item
    const { DBInstanceIdentifier, StorageEncrypted } = config;
    let d = new Date();
    //determine if the the RDS instance is an exception
    const isException = StorageEncrypted ? false : true;
    //smaller config object built fromt he destructured information.
    let smallerConfigObj = {
      dbInstanceName: DBInstanceIdentifier,
      isEncrypted: StorageEncrypted,
      dateReviewed: `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`,
      isException: isException,
    };
    return smallerConfigObj;
  });
  //as noted above - array of objects for the report
  return dbEncryptedList;
}

//create the report
async function dbEncryptionReport() {
  let d = new Date();
  // array of encryption'd db info
  const info = await createDBEncryptionList();
  info.forEach((config) => {
    //convert the JSON object into a string
    let stringConfig = JSON.stringify(config);
    //utility function to append each config
    logger.appendToReport(
      `Encryption Audit Report: ${
        d.getMonth() + 1
      }.${d.getDate()}.${d.getFullYear()}.txt`,
      stringConfig
    );
  });
  //
  return job.stop();
}

const job = new CronJob('0 0 1 */3 *', dbEncryptionReport);

job.start();
