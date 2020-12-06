const { rds } = require('./awsService/rds');
let rdsInstances;
rds.describeDBInstances((prams = {}), (err, data) => {
  if (err) {
    console.log('oops');
    return err;
  }
  rdsinstances = data.DBInstances;
  return rdsInstances;
});
